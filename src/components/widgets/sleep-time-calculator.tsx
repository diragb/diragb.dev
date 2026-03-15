// Packages:
import React, { useMemo, useState } from 'react'

// Typescript:
interface AgeGroup {
  id: 'teens' | 'young-adults' | 'older-adults'
  label: string
  targetUnits: number
  cycles: {
    best: number
    work: number
    bare: number
  }
}

interface Chronotype {
  id: 'early-bird' | 'night-owl'
  label: string
  beta: 0 | 1
}

// Components:
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Constants:
const AGE_GROUPS: AgeGroup[] = [
  {
    id: 'teens',
    label: 'Teens (13-17)',
    targetUnits: 12,
    cycles: { best: 7, work: 6, bare: 5 },
  },
  {
    id: 'young-adults',
    label: 'Young Adults (18-35)',
    targetUnits: 10,
    cycles: { best: 6, work: 5, bare: 4 },
  },
  {
    id: 'older-adults',
    label: 'Older Adults (55+)',
    targetUnits: 9,
    cycles: { best: 5, work: 4, bare: 4 },
  },
]

const CHRONOTYPES: Chronotype[] = [
  { id: 'early-bird', label: 'Early Bird', beta: 0 },
  { id: 'night-owl', label: 'Night Owl', beta: 1 },
]

const HOURS = Array.from({ length: 12 }, (_, i) => i + 1)
const MINUTES = Array.from({ length: 12 }, (_, i) => i * 5)
const CYCLE_MINUTES = 90

// Functions:
const toMinutes = (hour: number, minute: number, meridiem: 'AM' | 'PM') => {
  const hour24 = (hour % 12) + (meridiem === 'PM' ? 12 : 0)
  return hour24 * 60 + minute
}

const fromMinutesToLabel = (minutes: number) => {
  const safeMinutes = ((minutes % 1440) + 1440) % 1440
  const hour24 = Math.floor(safeMinutes / 60)
  const minute = safeMinutes % 60
  const meridiem = hour24 >= 12 ? 'PM' : 'AM'
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12
  const minuteText = minute.toString().padStart(2, '0')
  return `${hour12}:${minuteText} ${meridiem}`
}

const getQualityAtTau = (tauHours: number) => {
  if (tauHours < 3) return 2
  if (tauHours < 6) return 1
  return 0.5
}

const getSleepUnits = ({
  startMinutes,
  durationMinutes,
  beta,
}: {
  startMinutes: number
  durationMinutes: number
  beta: 0 | 1
}) => {
  const highQualityStart = beta === 0 ? 21 * 60 : 23 * 60
  const deltaFromWindowStart = ((startMinutes - highQualityStart) % 1440 + 1440) % 1440
  const tauStart = deltaFromWindowStart / 60
  const durationHours = durationMinutes / 60
  const step = 1 / 12

  let units = 0
  for (let t = 0; t < durationHours; t += step) {
    const slice = Math.min(step, durationHours - t)
    const tauMidpoint = tauStart + t + slice / 2
    units += getQualityAtTau(tauMidpoint) * slice
  }

  return units
}

const SleepTimeCalculator = () => {
  // State:
  const [ageGroupIndex, setAgeGroupIndex] = useState(1)
  const [chronotypeIndex, setChronotypeIndex] = useState(0)
  const [mode, setMode] = useState<'wake-up-time' | 'bed-time'>('wake-up-time')
  const [hour, setHour] = useState(10)
  const [minute, setMinute] = useState(30)
  const [meridiem, setMeridiem] = useState<'AM' | 'PM'>('PM')
  const ageGroup = AGE_GROUPS[ageGroupIndex]
  const chronotype = CHRONOTYPES[chronotypeIndex]
  const referenceMinutes = toMinutes(hour, minute, meridiem)
  const tiers = [
    { id: 'best', label: 'Best for you', cycles: ageGroup.cycles.best, highlight: true },
    { id: 'work', label: 'Will work', cycles: ageGroup.cycles.work, highlight: false },
    { id: 'bare', label: 'Bare minimum', cycles: ageGroup.cycles.bare, highlight: false },
  ] as const

  // Memo:
  const results = useMemo(
    () =>
      tiers.map(tier => {
        const durationMinutes = tier.cycles * CYCLE_MINUTES
        const startMinutes =
          mode === 'wake-up-time'
            ? referenceMinutes
            : referenceMinutes - durationMinutes
        const endMinutes =
          mode === 'wake-up-time'
            ? referenceMinutes + durationMinutes
            : referenceMinutes
        const units = getSleepUnits({
          startMinutes,
          durationMinutes,
          beta: chronotype.beta,
        })

        return {
          ...tier,
          units,
          durationMinutes,
          timeLabel:
            mode === 'wake-up-time'
              ? fromMinutesToLabel(endMinutes)
              : fromMinutesToLabel(startMinutes),
        }
      }),
    [chronotype.beta, mode, referenceMinutes, tiers]
  )

  // Return:
  return (
    <div className='flex flex-col gap-4 w-full'>
      <div className='flex flex-col gap-1'>
        <label className='text-sm font-medium text-zinc-500'>Age group</label>
        <div className='flex gap-2 flex-wrap mt-1'>
          {AGE_GROUPS.map((group, i) => (
            <button
              key={group.id}
              onClick={() => setAgeGroupIndex(i)}
              className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                i === ageGroupIndex
                  ? 'bg-teal-600 text-white border-teal-600'
                  : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300'
              }`}
            >
              {group.label}
            </button>
          ))}
        </div>
      </div>

      <div className='flex flex-col gap-1'>
        <label className='text-sm font-medium text-zinc-500'>Chronotype</label>
        <div className='flex gap-2 flex-wrap mt-1'>
          {CHRONOTYPES.map((option, i) => (
            <button
              key={option.id}
              onClick={() => setChronotypeIndex(i)}
              className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                i === chronotypeIndex
                  ? 'bg-teal-600 text-white border-teal-600'
                  : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <Tabs
        value={mode}
        onValueChange={value => setMode(value as 'wake-up-time' | 'bed-time')}
        className='w-full'
      >
        <TabsList className='grid w-full grid-cols-2 bg-zinc-100 rounded-xl h-10'>
          <TabsTrigger
            value='wake-up-time'
            className='rounded-lg data-[state=active]:bg-white data-[state=active]:text-zinc-950 data-[state=active]:shadow-sm'
          >
            Wake Up Time
          </TabsTrigger>
          <TabsTrigger
            value='bed-time'
            className='rounded-lg data-[state=active]:bg-white data-[state=active]:text-zinc-950 data-[state=active]:shadow-sm'
          >
            Bed Time
          </TabsTrigger>
        </TabsList>

        <TabsContent value='wake-up-time' className='mt-4'>
          <div className='flex flex-col gap-2'>
            <span className='text-sm font-medium text-zinc-500'>I plan to fall asleep at:</span>
            <div className='flex items-center gap-2'>
              <Select value={String(hour)} onValueChange={value => setHour(Number(value))}>
                <SelectTrigger className='w-[88px] h-10 rounded-lg border-zinc-200 text-zinc-800'>
                  <SelectValue placeholder='Hour' />
                </SelectTrigger>
                <SelectContent>
                  {HOURS.map(h => (
                    <SelectItem key={h} value={String(h)}>
                      {h}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={String(minute)} onValueChange={value => setMinute(Number(value))}>
                <SelectTrigger className='w-[88px] h-10 rounded-lg border-zinc-200 text-zinc-800'>
                  <SelectValue placeholder='Minute' />
                </SelectTrigger>
                <SelectContent>
                  {MINUTES.map(m => (
                    <SelectItem key={m} value={String(m)}>
                      {m.toString().padStart(2, '0')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={meridiem} onValueChange={value => setMeridiem(value as 'AM' | 'PM')}>
                <SelectTrigger className='w-[88px] h-10 rounded-lg border-zinc-200 text-zinc-800'>
                  <SelectValue placeholder='AM/PM' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='AM'>AM</SelectItem>
                  <SelectItem value='PM'>PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value='bed-time' className='mt-4'>
          <div className='flex flex-col gap-2'>
            <span className='text-sm font-medium text-zinc-500'>I plan to wake up at:</span>
            <div className='flex items-center gap-2'>
              <Select value={String(hour)} onValueChange={value => setHour(Number(value))}>
                <SelectTrigger className='w-[88px] h-10 rounded-lg border-zinc-200 text-zinc-800'>
                  <SelectValue placeholder='Hour' />
                </SelectTrigger>
                <SelectContent>
                  {HOURS.map(h => (
                    <SelectItem key={h} value={String(h)}>
                      {h}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={String(minute)} onValueChange={value => setMinute(Number(value))}>
                <SelectTrigger className='w-[88px] h-10 rounded-lg border-zinc-200 text-zinc-800'>
                  <SelectValue placeholder='Minute' />
                </SelectTrigger>
                <SelectContent>
                  {MINUTES.map(m => (
                    <SelectItem key={m} value={String(m)}>
                      {m.toString().padStart(2, '0')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={meridiem} onValueChange={value => setMeridiem(value as 'AM' | 'PM')}>
                <SelectTrigger className='w-[88px] h-10 rounded-lg border-zinc-200 text-zinc-800'>
                  <SelectValue placeholder='AM/PM' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='AM'>AM</SelectItem>
                  <SelectItem value='PM'>PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
        {results.map(result => (
          <div
            key={result.id}
            className={`rounded-xl border p-3 flex flex-col gap-1 ${
              result.highlight
                ? 'bg-teal-50/70 border-teal-200'
                : 'bg-white border-zinc-200'
            }`}
          >
            <span className='text-xs uppercase tracking-wide text-zinc-500'>{result.label}</span>
            <span className='text-4xl sm:text-5xl leading-none font-instrument-serif text-teal-600'>
              {result.timeLabel}
            </span>
            <span className='text-sm text-zinc-600'>{result.units.toFixed(1)} units (target {ageGroup.targetUnits} units)</span>
            <span className='text-sm text-zinc-500'>
              {result.cycles} cycle{result.cycles > 1 ? 's' : ''}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Exports:
export default SleepTimeCalculator
