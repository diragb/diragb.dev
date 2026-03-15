// Packages:
import React, { useMemo, useState } from 'react'

// Components:
import {
  Select,
  SelectContent,
  SelectItem,
  SelectToggleItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'

// Typescript:
type AgeGroupId = 'teen' | 'young' | 'mid' | 'old'
type Sex = 'male' | 'female'
type MetaboliserId = 'fast' | 'avg' | 'slow'
type SignalId =
  | 'smoking'
  | 'heavy-coffee'
  | 'cruciferous'
  | 'curcumin'
  | 'illness'
  | 'black-ancestry'

interface AgeGroup {
  id: AgeGroupId
  label: string
  baseHalfLife: number
}

interface Metaboliser {
  id: MetaboliserId
  label: string
  modifier: number
}

interface PhenotypeSignal {
  id: SignalId
  label: string
  score: number
}

// Constants:
const AGE_GROUPS: AgeGroup[] = [
  { id: 'teen', label: 'Teen (13-17)', baseHalfLife: 3.5 },
  { id: 'young', label: 'Young adult (18-35)', baseHalfLife: 5.0 },
  { id: 'mid', label: 'Middle-aged (36-54)', baseHalfLife: 6.0 },
  { id: 'old', label: 'Older adult (55+)', baseHalfLife: 7.5 },
]

const METABOLISERS: Metaboliser[] = [
  { id: 'fast', label: 'Fast CYP1A2', modifier: 0.7 },
  { id: 'avg', label: 'Average CYP1A2', modifier: 1.0 },
  { id: 'slow', label: 'Slow CYP1A2', modifier: 1.5 },
]

const PHENOTYPE_SIGNALS: PhenotypeSignal[] = [
  { id: 'smoking', label: 'I smoke or use marijuana regularly', score: 2 },
  { id: 'heavy-coffee', label: 'I usually drink 3+ cups of coffee per day', score: 1 },
  { id: 'cruciferous', label: 'I eat cruciferous vegetables regularly', score: 1 },
  { id: 'curcumin', label: 'I take curcumin / turmeric supplements regularly', score: -1 },
  { id: 'illness', label: 'I have acute inflammation or I am currently ill', score: -2 },
  { id: 'black-ancestry', label: 'I have Black ancestry', score: -1 },
]

const THRESHOLD_MG = 25

// Functions:
const toMinutes = (time: string) => {
  const [hoursText = '23', minutesText = '00'] = time.split(':')
  const hours = Number(hoursText)
  const minutes = Number(minutesText)
  return hours * 60 + minutes
}

const toClockLabel = (minutes: number) => {
  const roundedMinutes = Math.round(minutes)
  const safeMinutes = ((roundedMinutes % 1440) + 1440) % 1440
  const hour24 = Math.floor(safeMinutes / 60)
  const minute = safeMinutes % 60
  const meridiem = hour24 >= 12 ? 'PM' : 'AM'
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12
  return `${hour12}:${minute.toString().padStart(2, '0')} ${meridiem}`
}

const CaffeineCutoffCalculator = () => {
  // State:
  const [bedtime, setBedtime] = useState('23:00')
  const [ageGroupId, setAgeGroupId] = useState<AgeGroupId>('young')
  const [sex, setSex] = useState<Sex>('male')
  const [usesOcp, setUsesOcp] = useState(false)
  const [cups, setCups] = useState(2)
  const [mgPerCup, setMgPerCup] = useState(100)
  const [selectedSignalIds, setSelectedSignalIds] = useState<SignalId[]>([])
  const ageGroup = AGE_GROUPS.find(group => group.id === ageGroupId) ?? AGE_GROUPS[1]
  const ocpModifier = sex === 'female' && usesOcp ? 1.8 : 1
  const totalCaffeineMg = Math.max(cups, 0) * Math.max(mgPerCup, 0)
  const selectedSignals = PHENOTYPE_SIGNALS.filter(signal =>
    selectedSignalIds.includes(signal.id)
  )

  // Memo:
  const metaboliser = useMemo(() => {
    const score =
      (sex === 'male' ? 1 : -1) +
      selectedSignals.reduce((total, signal) => total + signal.score, 0)

    if (score >= 2) return METABOLISERS[0]
    if (score <= -2) return METABOLISERS[2]
    return METABOLISERS[1]
  }, [selectedSignals, sex])

  const effectiveHalfLife = useMemo(() => {
    return ageGroup.baseHalfLife * metaboliser.modifier * ocpModifier
  }, [ageGroup.baseHalfLife, metaboliser.modifier, ocpModifier])

  const model = useMemo(() => {
    const clearHours =
      totalCaffeineMg <= THRESHOLD_MG
        ? 0
        : effectiveHalfLife * Math.log2(totalCaffeineMg / THRESHOLD_MG)
    const bedtimeMinutes = toMinutes(bedtime)
    const cutoffMinutes = bedtimeMinutes - clearHours * 60
    const chartHours = Math.max(12, Math.ceil(clearHours + 3))
    const maxY = Math.max(totalCaffeineMg, THRESHOLD_MG * 1.4, 100)

    return {
      clearHours,
      cutoffLabel: toClockLabel(cutoffMinutes),
      bedtimeLabel: toClockLabel(bedtimeMinutes),
      maxY,
      chartHours,
    }
  }, [bedtime, effectiveHalfLife, totalCaffeineMg])

  const chart = useMemo(() => {
    const width = 320
    const height = 176
    const paddingLeft = 14
    const paddingRight = 10
    const paddingTop = 12
    const paddingBottom = 24
    const usableWidth = width - paddingLeft - paddingRight
    const usableHeight = height - paddingTop - paddingBottom
    const pointCount = 40

    const points = Array.from({ length: pointCount + 1 }, (_, index) => {
      const hour = (index / pointCount) * model.chartHours
      const caffeine =
        totalCaffeineMg === 0 ? 0 : totalCaffeineMg * Math.pow(0.5, hour / effectiveHalfLife)
      const x = paddingLeft + (hour / model.chartHours) * usableWidth
      const y = paddingTop + (1 - caffeine / model.maxY) * usableHeight
      return { x, y, hour, caffeine }
    })

    const linePath = points
      .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`)
      .join(' ')

    const thresholdY =
      paddingTop + (1 - Math.min(THRESHOLD_MG / model.maxY, 1)) * usableHeight
    const clearanceX =
      paddingLeft + Math.min(model.clearHours / model.chartHours, 1) * usableWidth

    return {
      width,
      height,
      linePath,
      thresholdY,
      clearanceX,
    }
  }, [effectiveHalfLife, model.chartHours, model.clearHours, model.maxY, totalCaffeineMg])

  // Functions:
  const toggleSignal = (signalId: string) => {
    const nextSignalId = signalId as SignalId
    setSelectedSignalIds(current =>
      current.includes(nextSignalId)
        ? current.filter(currentId => currentId !== nextSignalId)
        : [...current, nextSignalId]
    )
  }

  // Return:
  return (
    <div className='flex flex-col gap-4 w-full'>
      <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
        <div className='rounded-xl border border-zinc-200 p-4 flex flex-col gap-4'>
          <div className='flex flex-col gap-1'>
            <label className='text-sm font-medium text-zinc-500'>Bedtime</label>
            <input
              type='time'
              value={bedtime}
              onChange={event => setBedtime(event.target.value)}
              className='h-10 rounded-lg border border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-800 outline-none transition focus:border-teal-600'
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label className='text-sm font-medium text-zinc-500'>Age group</label>
            <Select value={ageGroupId} onValueChange={value => setAgeGroupId(value as AgeGroupId)}>
              <SelectTrigger className='h-10 rounded-lg border-zinc-200 text-zinc-800'>
                <SelectValue placeholder='Select age group' />
              </SelectTrigger>
              <SelectContent>
                {AGE_GROUPS.map(group => (
                  <SelectItem key={group.id} value={group.id}>
                    {group.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-sm font-medium text-zinc-500'>Biological sex</label>
            <div className='flex gap-2'>
              {(['male', 'female'] as const).map(option => (
                <button
                  key={option}
                  onClick={() => {
                    setSex(option)
                    if (option === 'male') setUsesOcp(false)
                  }}
                  className={`px-3 py-2 rounded-full text-sm border transition-colors ${
                    sex === option
                      ? 'bg-teal-600 text-white border-teal-600'
                      : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  {option === 'male' ? 'Male' : 'Female'}
                </button>
              ))}
            </div>
          </div>

          <label
            className={`flex items-center gap-2 text-sm ${
              sex === 'female' ? 'text-zinc-600' : 'text-zinc-400'
            }`}
          >
            <Checkbox
              checked={usesOcp}
              disabled={sex !== 'female'}
              onCheckedChange={checked => setUsesOcp(checked === true)}
              className='border-zinc-300 data-[state=checked]:bg-teal-600 data-[state=checked]:text-white'
            />
            On oral contraceptives (OCP)
          </label>
        </div>

        <div className='rounded-xl border border-zinc-200 bg-zinc-50 p-4 flex flex-col gap-4'>
          <div className='flex flex-col gap-1'>
            <label className='text-sm font-medium text-zinc-500'>Signals that apply to you</label>
            <Select>
              <SelectTrigger className='h-10 rounded-lg border-zinc-200 text-zinc-800'>
                <span className='truncate'>
                  {selectedSignalIds.length === 0
                    ? 'Select signals'
                    : `${selectedSignalIds.length} signal${selectedSignalIds.length > 1 ? 's' : ''} selected`}
                </span>
              </SelectTrigger>
              <SelectContent>
                {PHENOTYPE_SIGNALS.map(option => (
                  <SelectToggleItem
                    key={option.id}
                    checked={selectedSignalIds.includes(option.id)}
                    onClick={() => toggleSignal(option.id)}
                  >
                    <span className='flex items-center justify-between gap-3 w-full pr-2'>
                      <span>{option.label}</span>
                    </span>
                  </SelectToggleItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='grid grid-cols-2 gap-3'>
            <div className='flex flex-col gap-1'>
              <label className='text-sm font-medium text-zinc-500'>Cups of coffee</label>
              <input
                type='number'
                min={1}
                max={10}
                step={1}
                value={cups}
                onChange={event => setCups(Number(event.target.value))}
                className='h-10 rounded-lg border border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-800 outline-none transition focus:border-teal-600'
              />
            </div>

            <div className='flex flex-col gap-1'>
              <label className='text-sm font-medium text-zinc-500'>Caffeine per cup (mg)</label>
              <input
                type='number'
                min={30}
                max={300}
                step={10}
                value={mgPerCup}
                onChange={event => setMgPerCup(Number(event.target.value))}
                className='h-10 rounded-lg border border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-800 outline-none transition focus:border-teal-600'
              />
            </div>
          </div>
        </div>
      </div>

      <div className='rounded-xl border border-zinc-200 bg-zinc-50 p-3 flex flex-col'>
        <span className='mb-3 text-xs uppercase tracking-wide text-zinc-500'>
          Probable CYP1A2 baseline
        </span>
        <span className='mb-2 text-4xl leading-none font-instrument-serif text-teal-600'>
          {metaboliser.label}
        </span>
        <span className='text-sm text-zinc-500'>
          <b>Note</b>: This is a heuristic. Genetic testing is still the definitive answer.
        </span>
      </div>

      <div className='grid grid-cols-1 gap-2 sm:grid-cols-3'>
        <div className='rounded-xl border border-zinc-200 bg-zinc-50 p-3 flex flex-col'>
          <span className='mb-3 text-xs uppercase tracking-wide text-zinc-500'>Effective half-life</span>
          <span className='mb-2 text-4xl sm:text-5xl leading-none font-instrument-serif text-teal-600'>
            {effectiveHalfLife.toFixed(1)}h
          </span>
          <span className='text-sm text-zinc-500'>after age and metabolism modifiers</span>
        </div>

        <div className='rounded-xl border border-zinc-200 bg-zinc-50 p-3 flex flex-col'>
          <span className='mb-3 text-xs uppercase tracking-wide text-zinc-500'>Stop drinking by</span>
          <span className='mb-2 text-4xl sm:text-5xl leading-none font-instrument-serif text-teal-600'>
            {model.cutoffLabel}
          </span>
          <span className='text-sm text-zinc-500'>
            {model.clearHours.toFixed(1)} hours before your {model.bedtimeLabel} bedtime
          </span>
        </div>

        <div className='rounded-xl border border-zinc-200 bg-zinc-50 p-3 flex flex-col'>
          <span className='mb-3 text-xs uppercase tracking-wide text-zinc-500'>Starting load</span>
          <span className='mb-2 text-4xl sm:text-5xl leading-none font-instrument-serif text-teal-600'>
            {Math.round(totalCaffeineMg)}mg
          </span>
          <span className='text-sm text-zinc-500'>clearing to the 25mg sleep threshold</span>
        </div>
      </div>

      <div className='rounded-xl border border-zinc-200 bg-zinc-50 p-4 flex flex-col gap-3'>
        <div className='flex items-center justify-between gap-3 text-sm text-zinc-500'>
          <span>Caffeine decay curve after your last cup</span>
          <span>{model.chartHours}h window</span>
        </div>

        <div className='w-full aspect-[320/176]'>
          <svg
            viewBox={`0 0 ${chart.width} ${chart.height}`}
            className='block w-full h-full overflow-visible'
            role='img'
            aria-label='Caffeine decay chart'
          >
            <line
              x1='14'
              x2={String(chart.width - 10)}
              y1={String(chart.thresholdY)}
              y2={String(chart.thresholdY)}
              stroke='#dc2626'
              strokeDasharray='5 4'
              strokeWidth='2'
            />
            <line
              x1={String(chart.clearanceX)}
              x2={String(chart.clearanceX)}
              y1='12'
              y2={String(chart.height - 24)}
              stroke='#0d9488'
              strokeDasharray='4 4'
              strokeWidth='1.5'
            />
            <path
              d={chart.linePath}
              fill='none'
              stroke='#0d9488'
              strokeWidth='3'
              strokeLinecap='round'
            />
            <text x='14' y={String(chart.height - 6)} fontSize='11' fill='#71717a'>
              0h
            </text>
            <text x={String(chart.width - 34)} y={String(chart.height - 6)} fontSize='11' fill='#71717a'>
              {model.chartHours}h
            </text>
            <text x='14' y={String(Math.max(chart.thresholdY - 6, 12))} fontSize='11' fill='#dc2626'>
              25mg threshold
            </text>
            <text
              x={String(Math.min(chart.clearanceX + 6, chart.width - 90))}
              y='22'
              fontSize='11'
              fill='#0d9488'
            >
              clears at {model.clearHours.toFixed(1)}h
            </text>
          </svg>
        </div>

        <div className='flex justify-center flex-wrap gap-x-4 gap-y-2 text-xs text-zinc-500'>
          <span>Total load = cups × mg per cup</span>
          <span>Threshold = 25mg</span>
          <span>OCP modifier = ×1.8</span>
        </div>
      </div>
    </div>
  )
}

// Exports:
export default CaffeineCutoffCalculator
