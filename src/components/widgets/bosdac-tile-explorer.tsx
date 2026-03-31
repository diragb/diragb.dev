// Packages:
import React, { useCallback, useMemo, useRef, useState } from 'react'

// Components:
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Typescript:
type ColorMode = 'greyscale' | 'rainbow' | 'sst'
type TileState = 'empty' | 'loading' | 'loaded'

interface TileData {
  intensity: number
  state: TileState
  fromCache: boolean
}

// Constants:
const ROWS = 6
const COLS = 7
const TOTAL_TILES = ROWS * COLS

const TILE_INTENSITIES = [
  [0.30, 0.35, 0.50, 0.60, 0.72, 0.80, 0.68],
  [0.22, 0.38, 0.62, 0.82, 0.91, 0.73, 0.48],
  [0.15, 0.42, 0.71, 0.88, 0.78, 0.58, 0.35],
  [0.20, 0.32, 0.55, 0.68, 0.62, 0.45, 0.28],
  [0.28, 0.25, 0.40, 0.52, 0.42, 0.32, 0.18],
  [0.35, 0.30, 0.28, 0.38, 0.30, 0.22, 0.12],
]

const COLOR_MODES: { id: ColorMode; label: string }[] = [
  { id: 'greyscale', label: 'Greyscale' },
  { id: 'rainbow', label: 'Rainbow' },
  { id: 'sst', label: 'SST (Thermal)' },
]

// Functions:
const getColor = (intensity: number, mode: ColorMode): string => {
  switch (mode) {
    case 'greyscale': {
      const lightness = 25 + intensity * 55
      return `hsl(0, 0%, ${lightness}%)`
    }
    case 'rainbow': {
      const hue = (1 - intensity) * 240
      return `hsl(${hue}, 78%, 52%)`
    }
    case 'sst': {
      const hue = (1 - intensity) * 240
      const saturation = 75 + intensity * 25
      const lightness = 32 + intensity * 28
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`
    }
  }
}

const shuffle = <T,>(arr: T[]): T[] => {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

const BOSDACTileExplorer = () => {
  // State:
  const [colorMode, setColorMode] = useState<ColorMode>('greyscale')
  const [tiles, setTiles] = useState<TileData[]>(() =>
    TILE_INTENSITIES.flat().map(intensity => ({
      intensity,
      state: 'empty' as TileState,
      fromCache: false,
    }))
  )
  const [isLoading, setIsLoading] = useState(false)
  const [loadedCount, setLoadedCount] = useState(0)
  const [cacheHits, setCacheHits] = useState(0)
  const [hasBeenLoaded, setHasBeenLoaded] = useState(false)
  const [elapsedMs, setElapsedMs] = useState(0)
  const abortRef = useRef(false)

  // Memo:
  const statusText = useMemo(() => {
    if (!isLoading && !hasBeenLoaded) return 'Click "Fetch from MOSDAC" to load satellite tiles.'
    if (isLoading) return `Fetching tile ${loadedCount + 1} of ${TOTAL_TILES}...`
    if (cacheHits > 0) return `All ${TOTAL_TILES} tiles served from IndexedDB cache. Try "Clear Cache" then reload to see the difference.`
    return `All ${TOTAL_TILES} tiles fetched from MOSDAC. Click "Reload (from cache)" to see how fast cached tiles load.`
  }, [isLoading, hasBeenLoaded, loadedCount, cacheHits])

  // Functions:
  const fetchTiles = useCallback(async () => {
    if (isLoading) return
    abortRef.current = false
    const cached = hasBeenLoaded

    setIsLoading(true)
    setLoadedCount(0)
    setCacheHits(0)
    setElapsedMs(0)
    setTiles(prev => prev.map(t => ({ ...t, state: 'empty', fromCache: false })))

    const startTime = performance.now()
    const indices = shuffle(Array.from({ length: TOTAL_TILES }, (_, i) => i))

    for (let i = 0; i < indices.length; i++) {
      if (abortRef.current) break
      const idx = indices[i]

      setTiles(prev => {
        const next = [...prev]
        next[idx] = { ...next[idx], state: 'loading' }
        return next
      })

      const delay = cached
        ? 10 + Math.random() * 18
        : 35 + Math.random() * 75
      await new Promise(resolve => setTimeout(resolve, delay))

      if (abortRef.current) break

      setTiles(prev => {
        const next = [...prev]
        next[idx] = { ...next[idx], state: 'loaded', fromCache: cached }
        return next
      })
      setLoadedCount(i + 1)
      if (cached) setCacheHits(prev => prev + 1)
      setElapsedMs(performance.now() - startTime)
    }

    setIsLoading(false)
    setHasBeenLoaded(true)
    setElapsedMs(performance.now() - startTime)
  }, [isLoading, hasBeenLoaded])

  const clearCache = useCallback(() => {
    abortRef.current = true
    setTiles(prev => prev.map(t => ({ ...t, state: 'empty', fromCache: false })))
    setHasBeenLoaded(false)
    setIsLoading(false)
    setLoadedCount(0)
    setCacheHits(0)
    setElapsedMs(0)
  }, [])

  // Return:
  return (
    <div className='flex flex-col gap-4 w-full'>
      <div className='flex flex-wrap items-center gap-3'>
        <Select value={colorMode} onValueChange={v => setColorMode(v as ColorMode)}>
          <SelectTrigger className='w-40 h-9 rounded-lg border-zinc-200 text-zinc-800 text-sm'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {COLOR_MODES.map(mode => (
              <SelectItem key={mode.id} value={mode.id}>{mode.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <button
          onClick={fetchTiles}
          disabled={isLoading}
          className='px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isLoading ? 'Fetching...' : hasBeenLoaded ? 'Reload (from cache)' : 'Fetch from MOSDAC'}
        </button>

        {hasBeenLoaded && !isLoading && (
          <button
            onClick={clearCache}
            className='px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-zinc-100 text-zinc-600 border border-zinc-200 hover:bg-zinc-200'
          >
            Clear Cache
          </button>
        )}
      </div>

      <div className='rounded-xl border border-zinc-200 bg-zinc-100 p-3 sm:p-4'>
        <div
          className='grid gap-[3px] sm:gap-1'
          style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}
        >
          {tiles.map((tile, i) => (
            <div
              key={i}
              className='aspect-square rounded-[3px] sm:rounded-sm transition-all duration-300'
              style={{
                backgroundColor:
                  tile.state === 'empty'
                    ? '#d4d4d8'
                    : tile.state === 'loading'
                    ? '#a1a1aa'
                    : getColor(tile.intensity, colorMode),
                opacity: tile.state === 'loaded' ? 0.88 : 1,
                animation: tile.state === 'loading' ? 'pulse 0.8s ease-in-out infinite' : 'none',
                boxShadow: tile.fromCache ? 'inset 0 0 0 2px rgba(20, 184, 166, 0.5)' : 'none',
              }}
            />
          ))}
        </div>
      </div>

      <div className='grid grid-cols-3 gap-2'>
        <div className='rounded-xl border border-zinc-200 bg-zinc-50 p-3 flex flex-col'>
          <span className='text-xs uppercase tracking-wide text-zinc-500 mb-1'>Tiles</span>
          <span className='text-2xl sm:text-3xl font-instrument-serif text-teal-600'>
            {loadedCount}/{TOTAL_TILES}
          </span>
        </div>
        <div className='rounded-xl border border-zinc-200 bg-zinc-50 p-3 flex flex-col'>
          <span className='text-xs uppercase tracking-wide text-zinc-500 mb-1'>Cache Hits</span>
          <span className='text-2xl sm:text-3xl font-instrument-serif text-teal-600'>
            {cacheHits}
          </span>
        </div>
        <div className='rounded-xl border border-zinc-200 bg-zinc-50 p-3 flex flex-col'>
          <span className='text-xs uppercase tracking-wide text-zinc-500 mb-1'>Elapsed</span>
          <span className='text-2xl sm:text-3xl font-instrument-serif text-teal-600'>
            {(elapsedMs / 1000).toFixed(1)}s
          </span>
        </div>
      </div>

      <p className='text-sm text-zinc-500 text-center'>{statusText}</p>
    </div>
  )
}

// Exports:
export default BOSDACTileExplorer
