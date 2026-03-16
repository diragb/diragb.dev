To start off with, I've struggled with sleep since my earliest days. I'd bought into hustle culture's most hardcore BS:

> 4 hours of sleep is good enough, you should be working 16 to 20 hours a day!
> <br />
> It's OK to sleep late into the night! You should continue hustling!

<iframe width='100%' height='378' src='https://www.youtube-nocookie.com/embed/_o7qjN3KF8U?si=OnKOij5jec5eh-Vz' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' referrerpolicy='strict-origin-when-cross-origin' allowfullscreen></iframe>

In my defense, I was 15. And while that did not seem to affect my health much at the time, it did affect, as one would guess, my productivity.
But even while growing up and working at different places, I found people the same age as me (or even older!) believing wholeheartedly in the same philosophy.

I've now spent the better part of a decade trying to improve my relationship with sleep. From seeing it as a period of unproductivity that's enforced on my soul like some sort of cosmic sin tax for being born an animal, to seeing it as one of the highest-leverage forms of maintenance we have. Sleep is:

1. Crucial for preventing several classes of cancers.<span id='cite_ref-15'>[$$^{[15]}$$](#cite_note-15)</span>
2. Prevention of neurodegenerative diseases (like Alzheimer's).<span id='cite_ref-7'>[$$^{[7]}$$](#cite_note-7)</span><span id='cite_ref-8'>[$$^{[8]}$$](#cite_note-8)</span>
3. Healing microtears in muscle fibres that happen during exercise.<span id='cite_ref-6'>[$$^{[6]}$$](#cite_note-6)</span><span id='cite_ref-16'>[$$^{[16]}$$](#cite_note-16)</span>
4. Cleaning up the gunk in my brain that would otherwise lead to neurodegenerative diseases (like Alzheimer's).<span id='cite_ref-7b'>[$$^{[7]}$$](#cite_note-7)</span><span id='cite_ref-8b'>[$$^{[8]}$$](#cite_note-8)</span>
5. For improving memory recall<span id='cite_ref-1'>[$$^{[1]}$$](#cite_note-1)</span><span id='cite_ref-2'>[$$^{[2]}$$](#cite_note-2)</span> and.. wait, did I just repeat myself there?

At any rate, **sleep is very important**, and here are some of the lessons I've learned over the years.

<span style='text-decoration: underline; text-decoration-style: wavy; text-underline-offset: 2px;'>**Reader Beware**</span>: These insights are anecdotal by nature, and might not apply to you. Wherever possible, I've attempted to systematize my knowledge, using tables and equations wherever necessary.

I'm certain this article will be revisited by my future selves multiple times, and if so, you'll find the latest versions here:

## Regularity
Before we get into the meat of this article, know this:

**<div style='text-align: center; font-size: 1.25rem;'>Regularity > Timing > Duration</div>**

If you consistently sleep at 12 AM and pack in 7 hours of quality sleep ***and*** wake up feeling well-rested? Follow it.<span id='cite_ref-4b'>[$$^{[4]}$$](#cite_note-4)</span> But if you want to precess your cycle forward by an hour or two, do it with caution.

In my varied personal experience with sleep - from sleeping between 9 PM → 3 AM, to the unhealthy 5 AM → 11 AM slot - **I've found that a precession of $$ \pm1$$ hour requires ~2 days, provided you want to perform at 90%.**

Age also matters. Younger people generally need more sleep overall, and healthy older adults appear somewhat less vulnerable than younger adults to acute sleep deprivation in experimental settings.<span id='cite_ref-5b'>[$$^{[5]}$$](#cite_note-5)</span><span id='cite_ref-9'>[$$^{[9]}$$](#cite_note-9)</span>

So, for a $$\Delta h = 5$$, you can either shift over ~10 days at 90% overall performance ($$p = 0.9$$), or you can squeeze it into 2 days at 20% overall performance ($$p = 0.2$$). In summary:

$$
D(\Delta h, p, α) = \max(2 \cdot α \cdot \Delta h \cdot p, 1.5)
$$

Where $$\Delta h$$ is the number of hours you want to shift your sleep schedule, $$p$$ is your target performance level (0 to 1), and $$α$$ is an age sensitivity multiplier, derived from:
| Group        | Age   | α              |
|--------------|-------|----------------|
| Teenagers    | 13-17 | 1.5            |
| Young adults | 18-35 | 1.0 (baseline) |
| Older adults | 55+   | 0.7            |

Want to find out how many days it'll take for you? Play around with the widget below:
<sleep-days-calculator></sleep-days-calculator>

## Timing Matters
**When** you fall asleep matters just as much, if not more, than **how many** hours you clock. Sleeping from 9 PM → 3 AM != sleeping from 3 AM → 9 AM. 6 hours in both cases, but the first leaves you sharp and recovered, while the second leaves you groggy, irritated, and inflamed. That's because sleep timing impacts your circadian phase and overall sleep architecture.<span id='cite_ref-10'>[$$^{[10]}$$](#cite_note-10)</span><span id='cite_ref-11'>[$$^{[11]}$$](#cite_note-11)</span>

The key insight here is this: **Your body doesn't treat every hour of the night equally.**

Human Growth Hormone (HGH), the hormone involved in tissue repair, protein synthesis, and recovery, has its largest sleep-related pulse shortly after sleep onset during the first slow-wave-rich part of the night - roughly between 10 PM → 2 AM.<span id='cite_ref-6b'>[$$^{[6]}$$](#cite_note-6)</span>

There's also a diurnal hormonal cycle at play here. Melatonin rises in the evening and helps promote sleep. Cortisol, on the other hand, reaches its nadir in the late evening or early night and then rises toward the habitual wake period.<span id='cite_ref-10b'>[$$^{[10]}$$](#cite_note-10)</span><span id='cite_ref-11b'>[$$^{[11]}$$](#cite_note-11)</span>

<img src='/blog/optimizing-sleep/high-cortisol.jpg' />

**When your sleep schedule is misaligned with that rhythm, you're essentially fighting an uphill battle.**

If you're regularly sleeping well into the morning, you're essentially trying to rest while your body is already revving up. Seriously, it's a really bad idea over the long run, unless you're trying to catch *Mega Cancer*. That's why late-morning sleep feels shallow and unsatisfying even if the duration is "enough".<span id='cite_ref-10c'>[$$^{[10]}$$](#cite_note-10)</span>

### Sleep Units

A simple heuristic I came across on [Quora](https://www.quora.com/How-many-hours-should-one-sleep-according-to-the-Vedas-and-Hinduism/answer/Someone-R-6) several years back reframed this idea elegantly: instead of counting hours, count **sleep units** i.e. a weighted measure that accounts for *when* each hour of sleep occurs.

I've refined the model over time, and the version below is what I currently use. The $$β$$ parameter captures chronotype: $$β = 0$$ for early birds, $$β = 1$$ for night owls, shifting all windows forward by 2 hours.

| Window       | Early Bird ($$β=0$$) | Night Owl ($$β=1$$) | Units/hr |
|--------------|------------------|-----------------|----------|
| High quality | 9 PM → 12 AM     | 11 PM → 2 AM    | 2.0      |
| Mid quality  | 12 AM → 3 AM     | 2 AM → 5 AM     | 1.0      |
| Low quality  | 3 AM+            | 5 AM+           | 0.5      |
| Target total | 9-12 units (age-dependent) | 9-12 units | -   |

The intuition is straightforward: **An hour of sleep before midnight is worth *twice* as much as an hour after 3 AM.**

Let $$τ$$ be the number of hours elapsed since the start of the high-quality window (9 PM if $$β = 0$$, 11 PM if $$β = 1$$). The quality multiplier is:
$$
Q(\tau) = \begin{cases} 2 & 0 \leq \tau < 3 \\ 1 & 3 \leq \tau < 6 \\ 0.5 & \tau \geq 6 \end{cases}
$$

The total sleep value over a sleep duration of $$H$$ hours is then:
$$
S(H, β) = \int_0^H Q(τ - 2β) \, dτ
$$

And the target $$S$$ varies by age group, reflecting how sleep needs vary across the lifespan:
$$
S_{\text{target}} = \begin{cases} 12 & \text{teens} \\ 10 & \text{young adults} \\ 9 & \text{older adults} \end{cases}
$$

### Sleep Cycle
While you sleep, your brain cycles through multiple discrete stages, each cycle lasting roughly 90 to 120 minutes. The number of complete cycles you fit in matters, but so does the quality and the composition of those cycles across the night.

And, as you might've guessed, it varies by age as well.<span id='cite_ref-2b'>[$$^{[2]}$$](#cite_note-2)</span><span id='cite_ref-3b'>[$$^{[3]}$$](#cite_note-3)</span><span id='cite_ref-9b'>[$$^{[9]}$$](#cite_note-9)</span> Overall:

| Age Group | Sleep Need | Cycles Required |
|-----------|------------|-----------------|
| Teens (13-17) | 8-10 hrs | 5-7 cycles |
| Young adults (18-35) | 7-9 hrs | 4-6 cycles |
| Older adults (55+) | 7-8 hrs | 4-5 cycles |

One important nuance, though: Sleep architecture changes significantly with age. Healthy older adults generally spend less time in slow-wave sleep and more time in lighter sleep stages than younger adults.<span id='cite_ref-9c'>[$$^{[9]}$$](#cite_note-9)</span> So older adults aren't necessarily just running fewer cycles. On average, their sleep is also lighter.

### So, When Should I Sleep?
I used to rely on this website called [sleepyti.me](https://sleepyti.me) that allowed me to calculate when I should fall asleep or wake up, given the sleep and/or wake time. But while it did take my age into account, it calculated based on hours slept, not, as we've seen above, sleep units.

So here's a widget that lets you do exactly that:
<br />

<sleep-time-calculator></sleep-time-calculator>

## Drugs
**Are you unable to function without your morning coffee?**

<video src='/blog/optimizing-sleep/almost-forgot-this-is-the-whole-point.mp4' controls></video>

Like it or not, caffeine is a psychoactive drug. It's classified as a central nervous system (CNS) stimulant of the methylxanthine class, and about a third of regular coffee users matched the criteria for addiction.<span id='cite_ref-12'>[$$^{[12]}$$](#cite_note-12)</span>

Yes, that includes craving, withdrawal symptoms, the whole 9 yards. But chances are, you probably already knew all of that.

The next practical question is obvious: **how late can you get away with caffeine before it starts mugging your sleep?**

Annoyingly enough, there is no universal answer. Age matters. CYP1A2 activity matters. Oral contraceptives matter. And "2 cups of coffee" is not a unit recognized by God, because one person's 2 cups is another person's "It's 3 AM and I'm doomscrolling YouTube shorts."<span id='cite_ref-13'>[$$^{[13]}$$](#cite_note-13)</span>

So instead of asking a vague question like "Is 4 PM too late?", I model caffeine as a decay curve. I'm not aiming for literally zero caffeine by bedtime. I'm aiming for *low enough* that my sleep isn't [negotiating with a stimulant](https://youtu.be/sPKJUlSbR2M). I use a personal sleep threshold of $$\theta = 25 \text{ mg}$$.

Let $$t_{1/2}$$ be the effective caffeine half-life:
$$
t_{1/2} = t_{\text{base}}(a) \cdot m_{\text{CYP}} \cdot m_{\text{OCP}}
$$

Then the caffeine remaining $$t$$ hours after your last cup is:
$$
C(t) = C_0 \cdot 2^{-t / t_{1/2}}
$$

Where $$C_0 = n \cdot c$$, with $$n$$ cups and $$c$$ milligrams of caffeine per cup.

To find how long it takes to clear below the sleep threshold, solve for $$t$$:
$$
t_{\text{clear}} = t_{1/2} \cdot \log_2\!\left(\frac{C_0}{\theta}\right)
$$

And if your target bedtime is $$T_{\text{bed}}$$, your caffeine cutoff becomes:
$$
T_{\text{cutoff}} = T_{\text{bed}} - t_{\text{clear}}
$$

So for a young adult with a 5-hour half-life, drinking 2 cups at 100 mg each, and aiming to sleep at midnight:
$$
t_{\text{clear}} = 5 \cdot \log_2\!\left(\frac{200}{25}\right) = 15 \text{ hours}
$$

**Which means the mathematically "safe" cutoff is 9 AM.**

Yes, that sounds deranged. That's also the point: caffeine hangs around *much* longer than we think. Experimental work has shown that a 400 mg dose taken even 6 hours before bedtime can still significantly disrupt sleep.<span id='cite_ref-14'>[$$^{[14]}$$](#cite_note-14)</span>
<br/>

<caffeine-cutoff-calculator></caffeine-cutoff-calculator>

## Fixing It
So, you're sleeping late and waking up groggy. You want to wake up early and do healthy people activities. **What do?**

<blockquote class='twitter-tweet' data-dnt='true' align='center'><p lang='en' dir='ltr'>The problem with 10:30pm is that it comes exactly one minute before 2:30am if you’re not careful.</p>&mdash; Josh Gondelman (@joshgondelman) <a href='https://twitter.com/joshgondelman/status/1264447102505160705?ref_src=twsrc%5Etfw'>May 24, 2020</a></blockquote> <script async src='https://platform.twitter.com/widgets.js' charset='utf-8'></script>

The most reliable method I've come across so far requires a handful of methods (that are great as standalone methods too) working in conjunction.

### Actions
#### Your Phone
<img src='/blog/optimizing-sleep/your-phone.jpg' />

**The phone (and the brainrot content on it) is the core problem.** Blue light from your screen suppresses melatonin production precisely when your body should be ramping it up.

So what should you do instead? Put away all electronics approximately an hour or two before you plan on sleeping. Replace it with activities like reading a physical book (when was the last time you did that?), journaling, or even just meditating in dim light.

Want to optimize it even further? Turn on your device's blue light filter. Here's how to do it on [Android](https://www.androidpolice.com/enable-disable-blue-light-filter-android/), [iOS](https://support.apple.com/en-in/118583), and [Mac](https://support.apple.com/en-in/102191). I don't like MicroSlop Windows' out-of-the-box blue light filter, so I use [f.lux](https://justgetflux.com/) instead.

#### Get Some Light Into Your Eyes
Hey, I heard that Iran is fighting a war against Israel and the US. I wouldn't worry about it too much, though.

<img src='/blog/optimizing-sleep/nothing-ever-happens.jpg' />

Let's focus on the thing that truly matters: **Getting morning bright light within 30 minutes of waking up**. The source should ideally be the Sun.

Go outside, even for just 10 minutes. Getting bright light into your eyes is the single most powerful circadian signal available to you. It nukes the residual melatonin in your system and gets you to cortisolmaxx at the right time.

#### Cold Room $$\propto$$ Honk Shoo Mimimi
Your core body temperature needs to drop roughly 1–2°C to initiate sleep. This is non-negotiable. Your body will literally not begin the process of shutting down until it cools off. So if your bedroom feels like the inside of a tandoor oven, you are actively sabotaging yourself.

The sweet spot is somewhere around 18–20°C (64–68°F). I know, that sounds cold, but that's the point. You want your room to feel like a cave that a hibernating bear would approve of. Get a fan, crack a window, do whatever you need to do, but get the temperature down. Bonus points if the room is also dark enough that you can't see your hand in front of your face. 

Blackout curtains are a cheat code here. If light is leaking in from somewhere, your brain interprets it as "Oh, it's still bright outside" and you end up lying there for hours. Not ideal.

One trick that works well in my experience: Take a warm shower 1-2 hours before bed. The warm water dilates your blood vessels and causes a rapid drop in core temperature *after* you step out. It's the biological equivalent of flipping your pillow to the cold side, except it's your entire body.

#### Early Dinner
For the love of God, **eat your dinner early.** Late dinner screws up sleep and digestion.

<img src='/blog/optimizing-sleep/late-night-snack.jpg' />

Late meals (anything after 8-9 PM) raises your core body temperature (sensing a theme?) and delays sleep onset. Your digestive system is still active and generating heat even after you're in bed. Your body can't cool down and digest a large meal at the same time. It has to pick one, **and digestion wins every time**.

I try to have dinner at 5 PM if I can help it. Yes, I eat dinner like a retiree in Florida. No, I don't care. The difference in sleep quality is noticeable enough that I happily accept the social consequences of saying "sorry, I already ate" at 7 PM.

If you absolutely **must** eat late, keep it light. A tub of ice cream at 10 PM is not "a light snack." Your stomach knows. Your sleep knows. You know.

#### Chill Out
No intense exercise within 3 hours of bedtime. I know. Here's the problem: **Intense exercise spikes your core temperature *and* dumps adrenaline into your system**. You're essentially telling your body **"WE ARE IN DANGER, STAY ALERT"** and then 90 minutes later going "ok now sleep 😊."

Your body doesn't work like that.

The flip side, though, is genuinely great news: morning or early afternoon exercise actually **deepens** slow-wave sleep the following night. So you get the gains **and** the recovery. It's one of those rare situations in life where the virtuous choice and the selfish choice are the same thing.

### "I Want Drugs!"
I hear you. You just want to take some pill that fixes everything, Limitless style. Now while there are pills that get you in the [exact opposite state](https://www.sfchronicle.com/sf/article/fentanyl-fold-drug-user-19561190.php), there's no perfect pill or drug that fixes your sleep cycle.

That being said, there are some OTC supplements I take that help me sleep on time and stay awake in the morning.

#### Pills To Sleep On Time
In my (limited) personal experience, I've found that I get the best results from **melatonin, magnesium supplements, and L-theanine** - in that order.<span id='cite_ref-17'>[$$^{[17]}$$](#cite_note-17)</span><span id='cite_ref-19'>[$$^{[19]}$$](#cite_note-19)</span>

**Melatonin** (0.5-1 mg, ~2 hours before honk shoo mimimi) is the big one. Melatonin precesses your circadian clock earlier. It tells your brain "Hey, bedtime now." So if your core issue is that you *can't fall asleep on time*, melatonin might just be the thing you need. If your issue is that your brain won't shut up about that embarrassing thing you said in 2014, melatonin will unfortunately do absolutely nothing for you.

Also, some of my friends tell me that taking melatonin gives them nightmares. I've personally never encountered this but be careful, I guess? It sounds *roughly* similar to how people taking Benadryl (DPH) report seeing nightmares involving [The Hat Man](https://youtu.be/faTEGbFg2vs?si=24yrLDE7B9sivq2u). Not sure. [Let me know](mailto:hey@diragb.dev) if you have any interesting stories though.

**L-theanine** (100-200 mg, ~30 min before bed) is the thing in green tea that makes you feel calm without feeling drowsy. It promotes those nice alpha brain waves that make you relaxed and alert. If anxiety or a racing mind is what's keeping you up, this is the better pick IMO.

<img src='/blog/optimizing-sleep/low-cortisol.gif' />

**Magnesium glycinate** (200-400 mg, ~1 hour before bed) is the unsung hero of the stack. It calms your nervous system down, lowers cortisol, and deepens slow-wave sleep. If your issue is a straightforward phase delay and you want to sleep earlier (but your body disagrees) then **melatonin + magnesium** is the ultimate combo.

Finally there's **Ashwagandha** (KSM-66, 300 mg, split into two doses across the day). It takes 4-8 weeks to really kick in, so don't expect overnight miracles. But if you're the type who falls asleep fine and then wakes up at 3 AM staring at the ceiling, then it's worth a shot. It lowers cortisol, which tends to spike at exactly the wrong time in people with messed up sleep schedules.

<video src='/blog/optimizing-sleep/ashwagandha.mp4' controls></video>

#### Pills To Stay Awake
**Creatine**. No, It's not just for gym bros. It genuinely helps buffer the cognitive hit from short sleep, and there's actually a lot of research into it.<span id='cite_ref-17b'>[$$^{[17]}$$](#cite_note-17)</span><span id='cite_ref-18'>[$$^{[18]}$$](#cite_note-18)</span> Creatine is useful when you're in the middle of precessing your schedule and running on fumes.

**Coffee**, but only if you have it early in the day and at least 1.5 hours after waking up. Why? Adenosine builds up during those first 90 minutes and if you block it immediately with caffeine, you get a sharper crash later in the day.

And one last trick: **The Coffee Nap**.

Drink coffee, then immediately [take a 20-minute nap](https://www.scientificamerican.com/article/thomas-edisons-naps-inspire-a-way-to-spark-your-own-creativity/). Caffeine takes about 20 minutes to absorb, so by the time it kicks in, you're waking up. You get the restorative benefit of the nap **and** the stimulant benefit of the caffeine. Science backs it up too.<span id='cite_ref-17c'>[$$^{[17]}$$](#cite_note-17)</span>

## Final Words
I'm going to keep updating this article over time as I continue running experiments on myself (and my friends, sometimes without their knowledge or consent).

If you liked this article, feel free to share it with your friends!

<img src='/blog/optimizing-sleep/bryan-johnson.jpg' />

<newsletter-callout></newsletter-callout>

## References
1. [<span id='cite_note-1'>^</span>](#cite_ref-1) Stickgold, R., & Walker, M. P. (2007). *Sleep-Dependent Memory Consolidation and Reconsolidation*. Sleep Medicine, 8(4), 331-343. [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC2680680/).
2. [<span id='cite_note-2'>^</span>](#cite_ref-2) Watson, N. F., Badr, M. S., Belenky, G., et al. (2015). *Recommended Amount of Sleep for a Healthy Adult: A Joint Consensus Statement of the American Academy of Sleep Medicine and Sleep Research Society*. Sleep, 38(6), 843-844. [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC4434546/).
3. [<span id='cite_note-3'>^</span>](#cite_ref-3) Paruthi, S., Brooks, L. J., D'Ambrosio, C., et al. (2016). *Consensus Statement of the American Academy of Sleep Medicine on the Recommended Amount of Sleep for Healthy Children: Methodology and Discussion*. Journal of Clinical Sleep Medicine, 12(11), 1549-1561. [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC5078711/).
4. [<span id='cite_note-4'>^</span>](#cite_ref-4) Windred, D. P., Burns, A. C., Lane, J. M., et al. (2023). *Sleep regularity is a stronger predictor of mortality risk than sleep duration: A prospective cohort study*. Sleep. [PubMed](https://pubmed.ncbi.nlm.nih.gov/37738616/).
5. [<span id='cite_note-5'>^</span>](#cite_ref-5) Duffy, J. F., Willson, H. J., Wang, W., & Czeisler, C. A. (2009). *Healthy older adults better tolerate sleep deprivation than young adults*. Journal of the American Geriatrics Society, 57(7), 1245-1251. [PubMed](https://pubmed.ncbi.nlm.nih.gov/19460089/).
6. [<span id='cite_note-6'>^</span>](#cite_ref-6) Van Cauter, E., & Plat, L. (1996). *Physiology of growth hormone secretion during sleep*. The Journal of Pediatrics, 128(5), S32-S37. [PubMed](https://pubmed.ncbi.nlm.nih.gov/8627466/).
7. [<span id='cite_note-7'>^</span>](#cite_ref-7) Zhao, L., Tannenbaum, A., Bakker, E. N. T. P., & Benveniste, H. (2022). *Physiology of Glymphatic Solute Transport and Waste Clearance from the Brain*. Physiology, 37(6), 349-362. [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC9550574/).
8. [<span id='cite_note-8'>^</span>](#cite_ref-8) Abbott, S. M., & Videnovic, A. (2016). *Chronic sleep disturbance and neural injury: links to neurodegenerative disease*. Nature and Science of Sleep, 8, 55-61. [PMC](https://ncbi.nlm.nih.gov/pmc/articles/PMC4734786/).
9. [<span id='cite_note-9'>^</span>](#cite_ref-9) Li, J., Vitiello, M. V., & Gooneratne, N. (2018). *Sleep in Normal Aging*. Sleep Medicine Clinics, 13(1), 1-11. [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC5841578/).
10. [<span id='cite_note-10'>^</span>](#cite_ref-10) Baron, K. G., & Reid, K. J. (2014). *Circadian Misalignment and Health*. International Review of Psychiatry, 26(2), 139-154. [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC4677771/).
11. [<span id='cite_note-11'>^</span>](#cite_ref-11) O'Byrne, N. A., Yuen, F., Butt, W. Z., & Liu, P. Y. (2021). *Sleep and Circadian Regulation of Cortisol: A Short Review*. Current Opinion in Endocrine and Metabolic Research, 18, 178-186. [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC8813037/).
12. [<span id='cite_note-12'>^</span>](#cite_ref-12) Striley, C. L. W., Griffiths, R. R., & Cottler, L. B. (2011). *Evaluating Dependence Criteria for Caffeine*. Journal of Caffeine Research, 1(4), 219-225. [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC3621326/).
13. [<span id='cite_note-13'>^</span>](#cite_ref-13) Grzegorzewski, J., Bartsch, F., Köller, A., & König, M. (2022). *Pharmacokinetics of Caffeine: A Systematic Analysis of Reported Data for Application in Metabolic Phenotyping and Liver Function Testing*. Frontiers in Pharmacology, 12, 752826. [PMC](https://ncbi.nlm.nih.gov/pmc/articles/PMC8914174/).
14. [<span id='cite_note-14'>^</span>](#cite_ref-14) Drake, C., Roehrs, T., Shambroom, J., & Roth, T. (2013). *Caffeine Effects on Sleep Taken 0, 3, or 6 Hours before Going to Bed*. Journal of Clinical Sleep Medicine, 9(11), 1195-1200. [PMC](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3805807/).
15. [<span id='cite_note-15'>^</span>](#cite_ref-15) Shi, T., Min, M., Sun, C., Zhang, Y., Liang, M., & Sun, Y. (2020). *Does insomnia predict a high risk of cancer? A systematic review and meta-analysis of cohort studies*. Journal of Sleep Research, 29(1), e12876. [PubMed](https://pubmed.ncbi.nlm.nih.gov/31352687/).
16. [<span id='cite_note-16'>^</span>](#cite_ref-16) Dolezal, B. A., Neufeld, E. V., Boland, D. M., Martin, J. L., & Cooper, C. B. (2017). *Interrelationship between Sleep and Exercise: A Systematic Review*. Advances in Preventive Medicine, 2017, 1364387. [PMC](https://ncbi.nlm.nih.gov/pmc/articles/PMC5385214/).
17. [<span id='cite_note-17'>^</span>](#cite_ref-17) Alhola, P., & Polo-Kantola, P. (2007). *Sleep deprivation: Impact on cognitive performance*. Neuropsychiatric Disease and Treatment, 3(5), 553-567. [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC2656292/).
18. [<span id='cite_note-18'>^</span>](#cite_ref-18) Drummond, S. P., et al. (2009). *Older adults are less vulnerable to sleep deprivation than younger adults during cognitive performance*. Presented at SLEEP 2009, 23rd Annual Meeting of the Associated Professional Sleep Societies. [AASM](https://aasm.org/older-adults-are-less-affected-by-sleep-deprivation-than-younger-adults-during-cognitive-performance/).
19. [<span id='cite_note-19'>^</span>](#cite_ref-19) Dzierzewski, J. M., Perez, E., Ravyts, S. G., & Dautovich, N. (2022). *Sleep and Cognition: A Narrative Review Focused on Older Adults*. Sleep Medicine Clinics, 17(2), 205-222. [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC9177059/).
