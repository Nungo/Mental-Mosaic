import { useLocalStorageArray } from './useLocalStorage'

/**
 * Custom hook for managing journal entries
 */
export const useJournalData = () => {
  const { items: journalEntries, addItem, updateItem, deleteItem, clearItems } = useLocalStorageArray('mental-mosaic-journal-data')

  const addJournalEntry = (entryData) => {
    const entry = {
      title: entryData.title || 'Untitled Entry',
      content: entryData.content || '',
      mood: entryData.mood || 'neutral', // 'positive', 'neutral', 'negative'
      tags: entryData.tags || [],
      sentiment: entryData.sentiment || null, // AI sentiment analysis result
      aiInsights: entryData.aiInsights || null, // AI-generated insights
      relatedResources: entryData.relatedResources || [],
      date: entryData.date || new Date().toISOString()
    }
    return addItem(entry)
  }

  const getEntriesByMood = (mood) => {
    return journalEntries.filter(entry => entry.mood === mood)
  }

  const getEntriesByDateRange = (startDate, endDate) => {
    const start = new Date(startDate).getTime()
    const end = new Date(endDate).getTime()

    return journalEntries.filter(entry => {
      const entryDate = new Date(entry.date).getTime()
      return entryDate >= start && entryDate <= end
    })
  }

  const searchEntries = (searchTerm) => {
    const term = searchTerm.toLowerCase()
    return journalEntries.filter(entry =>
      entry.title.toLowerCase().includes(term) ||
      entry.content.toLowerCase().includes(term) ||
      entry.tags?.some(tag => tag.toLowerCase().includes(term))
    )
  }

  const getRecentEntries = (limit = 5) => {
    return [...journalEntries]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit)
  }

  const getJournalStats = () => {
    if (journalEntries.length === 0) {
      return {
        totalEntries: 0,
        moodCounts: { positive: 0, neutral: 0, negative: 0 },
        averageWordsPerEntry: 0,
        mostUsedTags: []
      }
    }

    const moodCounts = { positive: 0, neutral: 0, negative: 0 }
    const tagCounts = {}
    let totalWords = 0

    journalEntries.forEach(entry => {
      // Count moods
      moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1

      // Count tags
      entry.tags?.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })

      // Count words
      totalWords += entry.content.split(/\s+/).length
    })

    const mostUsedTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([tag]) => tag)

    return {
      totalEntries: journalEntries.length,
      moodCounts,
      averageWordsPerEntry: Math.round(totalWords / journalEntries.length),
      mostUsedTags
    }
  }

  return {
    journalEntries,
    addJournalEntry,
    updateJournalEntry: updateItem,
    deleteJournalEntry: deleteItem,
    clearJournalData: clearItems,
    getEntriesByMood,
    getEntriesByDateRange,
    searchEntries,
    getRecentEntries,
    getJournalStats
  }
}
