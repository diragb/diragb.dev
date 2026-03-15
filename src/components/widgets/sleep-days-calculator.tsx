// Packages:
import React, { useState, useMemo } from 'react'

// Components:
import { Slider } from '@/components/ui/slider'

// Constants:
const AGE_GROUPS = [
  { label: 'Teenager (13 to 17)', alpha: 1.5 },
  { label: 'Young adult (18 to 35)', alpha: 1.0 },
  { label: 'Older adult (55+)', alpha: 0.7 },
] as const

// Functions:
const SleepDaysCalculator = () => {
  // State:
  const [deltaH, setDeltaH] = useState(3)
  const [performance, setPerformance] = useState(0.9)
  const [ageIndex, setAgeIndex] = useState(1)
  const alpha = AGE_GROUPS[ageIndex].alpha

  // Memo:
  const days = useMemo(
    () => Math.max(2 * alpha * deltaH * performance, 1.5),
    [deltaH, performance, alpha]
  )

  // Return:
  return (
    <div className='flex flex-col gap-4 w-full mt-4'>
      <div className='flex flex-col gap-1'>
        <label className='text-sm font-medium text-zinc-500'>
          Hours to shift (Δh): <span className='text-zinc-950 font-semibold'>{deltaH}h</span>
        </label>
        <Slider
          min={1}
          max={12}
          step={1}
          value={[deltaH]}
          onValueChange={([v]) => setDeltaH(v)}
          trackClassName='bg-teal-600/20'
          rangeClassName='bg-teal-600'
          thumbClassName='border-teal-600/50 focus-visible:ring-teal-600'
        />
        <div className='flex justify-between text-xs text-zinc-400'>
          <span>1h</span>
          <span>12h</span>
        </div>
      </div>

      <div className='flex flex-col gap-1'>
        <label className='text-sm font-medium text-zinc-500'>
          Target performance (p): <span className='text-zinc-950 font-semibold'>{Math.round(performance * 100)}%</span>
        </label>
        <Slider
          min={10}
          max={100}
          step={10}
          value={[Math.round(performance * 100)]}
          onValueChange={([v]) => setPerformance(v / 100)}
          trackClassName='bg-teal-600/20'
          rangeClassName='bg-teal-600'
          thumbClassName='border-teal-600/50 focus-visible:ring-teal-600'
        />
        <div className='flex justify-between text-xs text-zinc-400'>
          <span>10%</span>
          <span>100%</span>
        </div>
      </div>

      <div className='flex flex-col gap-1'>
        <label className='text-sm font-medium text-zinc-500'>Age group</label>
        <div className='flex gap-2 flex-wrap'>
          {AGE_GROUPS.map((group, i) => (
            <button
              key={group.label}
              onClick={() => setAgeIndex(i)}
              className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                i === ageIndex
                  ? 'bg-teal-600 text-white border-teal-600'
                  : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300'
              }`}
            >
              {group.label}
              <span className='ml-1 opacity-60'>α={group.alpha}</span>
            </button>
          ))}
        </div>
      </div>

      <div className='flex flex-col items-center gap-2 mt-4'>
        <span className='text-6xl font-instrument-serif text-teal-600'>
          {days % 1 === 0 ? days : days.toFixed(1)} days
        </span>
        <span className='text-base leading-relaxed text-zinc-500'>Estimated adjustment period</span>
      </div>
    </div>
  )
}

// Exports:
export default SleepDaysCalculator
