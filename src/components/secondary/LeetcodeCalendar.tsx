'use client'

// Packages:
import React, { useEffect, useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import axios from 'axios'
import logError from '@/utils/logError'

// Components:
import ActivityCalendar from 'react-activity-calendar'

// Typescript:
interface LeetcodeStatsResponse {
  status: string
  message: string
  totalSolved: number
  totalQuestions: number
  easySolved: number
  totalEasy: number
  mediumSolved: number
  totalMedium: number
  hardSolved: number
  totalHard: number
  acceptanceRate: number
  ranking: number
  contributionPoints: number
  reputation: number
  submissionCalendar: {
    [timestamp: number]: number
  }
}

// Functions:
const LeetcodeCalendar = () => {
  // Constants:
  const { toast } = useToast()

  // State:
  const [isFetchingLeetcodeStatsResponse, setIsFetchingLeetcodeStatsResponse] = useState(true)
  const [leetcodeStatsResponse, setLeetcodeStatsResponse] = useState<LeetcodeStatsResponse | null>(null)
  const [calendarData, setCalendarData] = useState<{
    date: string
    count: number
    level: number
  }[]>([])

  // Functions:
  const getLeetcodeStats = async () => {
    try {
      const response = (await axios.get('https://leetcode-stats-api.herokuapp.com/diragb')).data
      console.log(response)
      setLeetcodeStatsResponse(response)
    } catch (error) {
      logError({
        data: null,
        error,
        functionName: 'LeetcodeCalendar.getLeetcodeStats'
      })

      toast({
        variant: 'destructive',
        title: 'Leetcode Calendar could not be loaded',
        description: "We're currently facing some problems, please try again later!",
      })
    } finally {
      setIsFetchingLeetcodeStatsResponse(false)
    }
  }

  // Effects:
  useEffect(() => {
    getLeetcodeStats()
  }, [])
  
  // Return:
  return (
    <ActivityCalendar
      data={[
        {
          date: '2024-06-23',
          count: 2,
          level: 1,
        },
        {
          date: '2024-08-02',
          count: 16,
          level: 4,
        },
        {
          date: '2024-11-29',
          count: 11,
          level: 3,
        },
      ]}
    />
  )
}

// Exports:
export default LeetcodeCalendar
