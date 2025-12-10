import { useLocalStorageArray } from './useLocalStorage'

/**
 * Custom hook for managing mood data
 */
export const useMoodData = () => {
  const { items: moodEntries, addItem, updateItem, deleteItem, clearItems } = useLocalStorageArray('mental-mosaic-mood-data')

  const addMoodEntry = (moodData) => {
    const entry = {
      mood: moodData.mood, // 'great', 'good', 'okay', 'low', 'terrible'
      emotions: moodData.emotions || [], // Array of emotions
      factors: moodData.factors || [], // Array of factors affecting mood
      notes: moodData.notes || '',
      intensity: moodData.intensity || 5, // 1-10 scale
      date: moodData.date || new Date().toISOString()
    }
    return addItem(entry)
  }

  const getMoodByDateRange = (startDate, endDate) => {
    const start = new Date(startDate).getTime()
    const end = new Date(endDate).getTime()

    return moodEntries.filter(entry => {
      const entryDate = new Date(entry.date).getTime()
      return entryDate >= start && entryDate <= end
    })
  }

  const getMoodTrends = (period = 'week') => {
    const now = new Date()
    let startDate

    switch (period) {
      case 'week':
        startDate = new Date(now.setDate(now.getDate() - 7))
        break
      case 'month':
        startDate = new Date(now.setMonth(now.getMonth() - 1))
        break
      case 'year':
        startDate = new Date(now.setFullYear(now.getFullYear() - 1))
        break
      default:
        startDate = new Date(now.setDate(now.getDate() - 7))
    }

    return getMoodByDateRange(startDate, new Date())
  }

  const getMoodStats = () => {
    if (moodEntries.length === 0) {
      return {
        totalEntries: 0,
        averageIntensity: 0,
        moodCounts: {},
        mostCommonMood: null,
        mostCommonFactors: []
      }
    }

    const moodCounts = {}
    const factorCounts = {}
    let totalIntensity = 0

    moodEntries.forEach(entry => {
      // Count moods
      moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1

      // Count factors
      entry.factors?.forEach(factor => {
        factorCounts[factor] = (factorCounts[factor] || 0) + 1
      })

      // Sum intensity
      totalIntensity += entry.intensity || 5
    })

    const mostCommonMood = Object.keys(moodCounts).reduce((a, b) =>
      moodCounts[a] > moodCounts[b] ? a : b
    )

    const mostCommonFactors = Object.entries(factorCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([factor]) => factor)

    return {
      totalEntries: moodEntries.length,
      averageIntensity: (totalIntensity / moodEntries.length).toFixed(1),
      moodCounts,
      mostCommonMood,
      mostCommonFactors
    }
  }

  return {
    moodEntries,
    addMoodEntry,
    updateMoodEntry: updateItem,
    deleteMoodEntry: deleteItem,
    clearMoodData: clearItems,
    getMoodByDateRange,
    getMoodTrends,
    getMoodStats
  }
}
