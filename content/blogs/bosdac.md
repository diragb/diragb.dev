ISRO does something genuinely incredible that most Indians don't know about: they broadcast **live satellite imagery** of the entire Indian subcontinent, updated roughly every 15 minutes, completely free. All of it sourced from <a href='https://en.wikipedia.org/wiki/INSAT-3D'>INSAT-3x</a> satellites orbiting 36,000 km above the equator.

Cloud formations spiraling over the Bay of Bengal. Cyclone tracks curving towards the coast. Snow cover creeping across the Himalayas. Fire plumes rising from crop burning season in Punjab. All of it. And in near real-time. It's some of the most valuable open data any space agency in the world publishes.

So, what's the catch? The website hosting all this data, <a href='https://mosdac.gov.in/'>MOSDAC</a> (Meteorological and Oceanographic Satellite Data Archival Centre), has the UX of a website that was built when Orkut was still alive and people used to unironically "scrap" each other.

I don't say this lightly. I love ISRO. I think ISRO is one of the most extraordinary institutions this country has ever produced. But MOSDAC's interface is the kind of thing that makes you wonder whether the website is intentionally hostile to its users, or whether it just sort of... happened.

The map interaction is clunky. There's no caching, so every time you switch a timestamp you're re-downloading the same imagery from scratch. Satellite images load one at a time with zero visual feedback. And God forbid you try to use it on mobile - you'll have a better time reading the raw WMS URLs by hand.

**It's the classic government-website problem: world-class data, imprisoned behind an interface designed for absolutely no one.**

I ran into this wall one night while trying to track a cyclone forming in the Bay of Bengal. Opened MOSDAC. Spent 10 minutes fighting the interface. Closed the tab. Tried again the next day. Same experience. Closed it again.

Third time, I thought: this data is too good to be trapped behind this UX. What if I just... built something better?

## BOSDAC

**BOSDAC** stands for **Better MOSDAC**. The name is stupid. I'm aware. But the thing it does is not. Try it out [here](https://bosdac.diragb.dev).

BOSDAC wraps MOSDAC's live and archival satellite products in a modern map UI. Same data, same source, same INSAT-3x satellites beaming down imagery from geostationary orbit. The difference is entirely in how that data is presented to you:

- **6 color modes**: For the same imagery - greyscale, rainbow, SST, ferret, NHC, red/blue.
- **10+ weather layers**: Wind vectors, fire detection, snow cover, heavy rain forecasts, rip current warnings.
- **Timelapse animation**: Stitch any range of historical frames into a WebM video, entirely in your browser.
- **IndexedDB caching**: Revisiting timestamps is basically free after the first load.

Or, to put it in terms your manager would appreciate: I took an existing government API, proxied it through Next.js, cached it client-side, composited the imagery onto a Leaflet map, and shipped it on Vercel.

## How It Actually Works

I'm going to walk through the architecture here, but I'll keep it at a level that's useful whether you're a developer or just someone who's curious about what happens when you open a weather map. If you want the full deep-dive, the <a href='https://github.com/diragb/bosdac'>source is open</a>.

### Discovery

Before any pixels appear on screen, BOSDAC needs to figure out **what MOSDAC has actually published**. It hits a catalog endpoint that returns a comma-separated list of available INSAT L1B STD scenes. Essentially, it's a timeline of "here's what we have, and when it was captured."

Each entry gets parsed into a timestamp and a formatted string used later to construct WMS image URLs. Entries starting with `3R` are filtered out. The list is sorted newest-first so the most recent imagery shows up by default.

If that fetch fails (which happens more often than you'd like), the app surfaces a dialog telling you the upstream is unavailable. No blank screens. No ambiguity. Just a straightforward "MOSDAC is down, sorry."

### The Tile Grid

Here's where it gets interesting.

INSAT full-disk products aren't one giant image in BOSDAC. They're requested as **WMS `GetMap` PNGs** - 41 of them - each covering a fixed bounding box in <a href='https://epsg.io/3857'>EPSG:3857</a> (Web Mercator). Think of it like a mosaic: 41 puzzle pieces that, when placed on a Leaflet map at the right coordinates, reconstruct the full satellite view of the region.

**Why tiles instead of one image?** Control. Each tile can be fetched independently, cached independently, and retried independently. If one tile fails, the other 40 still render. If you've already seen a timestamp, the tiles come straight from IndexedDB instead of hitting the network.

Here's a simplified model of how the grid works. Hit "Fetch from MOSDAC", watch the tiles load in, then try reloading to see the caching difference:

<bosdac-tile-explorer></bosdac-tile-explorer>

When you pick a timestamp and color mode, BOSDAC loops through every tile and either:
1. Serves a **blob from IndexedDB** (cache key: `bbox + mode + timestamp`), or
2. Fetches `/api/history` which proxies MOSDAC's WMS, normalizes the response to PNG, and sets `Cache-Control: public, max-age=3600`

Successful downloads get written back to IndexedDB. On **quota exceeded**, the cache is nuked and the fetch retries on next access. It's not elegant, but it works. Your browser's storage budget is the only real limit.

### Color Modes

Same satellite data, wildly different presentation. MOSDAC's WMS service supports multiple `STYLES` parameters, and BOSDAC exposes all of them: greyscale (the default), rainbow, SST (sea surface temperature), Ferret, NHC, and red/blue.

Each mode gets its own cache key suffix, so switching modes doesn't re-fetch imagery you've already loaded in a different style. The visual difference between modes is surprisingly dramatic. Greyscale is great for cloud structure. Rainbow makes cyclones look like psychedelic album covers. SST reveals ocean temperature gradients that are invisible in other modes.

### Weather Layers

On top of the base satellite imagery, BOSDAC offers a stack of optional data overlays. All of them proxy through first-party API routes so your browser only talks to BOSDAC's origin (which sidesteps CORS headaches and lets me normalize upstream responses):

| Layer | What It Shows |
|-------|---------------|
| Wind Direction | Animated particle vectors (<a href='https://github.com/onaci/leaflet-velocity'>leaflet-velocity</a>) |
| Wind Heatmap | Same wind data, rendered as intensity |
| Fire & Smoke | Active fire points as circle markers + optional heatmap |
| Heavy Rain | Current precipitation data |
| Heavy Rain Forecast | Precipitation predictions |
| Cloudburst Forecast | Severe weather warnings |
| Rip Current | Coastal hazard image overlay |
| Snow Cover | Per-tile snow extent mapping |

If a layer fetch fails, BOSDAC shows a toast and removes the layer from selection. No silent failures. No stale data lingering on your map.

### Timelapse

Now this is the fun one.

BOSDAC can stitch any range of historical satellite frames into a video, rendered entirely in your browser. No server-side encoding. No uploads. Here's how the pipeline works:

1. **Tile selection** - With recording controls visible, you click grid cells over the map. Each cell maps to one of the 41 tiles.
2. **Per-frame compositing** - For each selected tile and each timestamp, BOSDAC builds a frame on a **canvas**: four OpenStreetMap 256x256 tiles as the base, then the 512x512 MOSDAC satellite PNG on top at your chosen opacity.
3. **Multi-tile layout** - Multiple selected tiles get arranged into a larger canvas grid.
4. **Video encoding** - All frames are drawn in sequence on an off-screen canvas. **`MediaRecorder`** captures `canvas.captureStream()` as **WebM** (VP9 preferred, VP8 fallback). Bitrate scales with resolution, FPS derives from the speed preset you chose.

The result: satellite timelapse videos generated client-side. It's just canvas compositing and the MediaRecorder API doing exactly what they were built for. No ffmpeg. No cloud rendering. Just your browser, doing browser things.

## The Stack

For the fellow nerds:

| Layer | Tech |
|-------|------|
| Framework | Next.js 15, React 19, TypeScript |
| Mapping | Leaflet + React-Leaflet |
| UI | Radix UI + Tailwind CSS |
| Caching | LocalForage → IndexedDB |
| Video | Canvas + MediaRecorder (WebM/VP9) |
| Observability | Vercel Analytics + Speed Insights |
| Hosting | Vercel |

## Why Build This?

I touched on this earlier, but it's worth saying explicitly: **the frustration was the point.**

The data MOSDAC provides is extraordinary. The amount of engineering that goes into launching satellites, maintaining them in geostationary orbit, processing raw sensor data into calibrated imagery, and publishing it all for free? That's an achievement most people will never fully appreciate.

But if nobody can *use* it because the frontend was built as an afterthought, then all that engineering might as well not exist. The best data in the world is worthless if it's locked behind a door that nobody wants to open.

<blockquote class='twitter-tweet' data-dnt='true' align='center'><p lang='en' dir='ltr'>i finally did it.<br><br>weather timelapse generation entirely inside my webapp.<br><br>visit <a href='https://t.co/PaKxuLYsxK'>https://t.co/PaKxuLYsxK</a>:<br>1. click on &quot;timelapse&quot;<br>2. select tiles<br>3. click on &quot;start recording&quot; <a href='https://t.co/QW0Y6wRcZG'>https://t.co/QW0Y6wRcZG</a> <a href='https://t.co/U9EGTeplUc'>pic.twitter.com/U9EGTeplUc</a></p>&mdash; dirag (@diragb) <a href='https://twitter.com/diragb/status/1989045922182172720?ref_src=twsrc%5Etfw'>November 13, 2025</a></blockquote> <script async src='https://platform.twitter.com/widgets.js' charset='utf-8'></script>

BOSDAC is, I think, a small act of that same impulse. Take something that exists but is hard to access, and make it beautiful. Make it usable. Make it something that a weather-obsessed kid in Kolkata can pull up on their phone during monsoon season and actually enjoy using.

The <a href='https://github.com/diragb/bosdac'>source code is on GitHub</a>. If you want to contribute, or if you find a bug, or if you just want to watch cyclones form in real-time with a UI that doesn't make you want to close the tab. You know where to find it.

<newsletter-callout></newsletter-callout>
