import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useMoodData } from '../hooks/useMoodData'
import { useJournalData } from '../hooks/useJournalData'
import Notification from '../components/Notification'

const Dashboard = () => {
  const { user } = useAuth()
  const { addMoodEntry, getMoodTrends } = useMoodData()
  const { getRecentEntries } = useJournalData()

  const [notification, setNotification] = useState({ show: false, message: '', type: 'info' })
  const [selectedMood, setSelectedMood] = useState(null)
  const [moodFilter, setMoodFilter] = useState('week')
  const [recentEntries, setRecentEntries] = useState([])

  useEffect(() => {
    // Load recent journal entries
    setRecentEntries(getRecentEntries(3))
  }, [])

  const moods = [
    { value: 'great', icon: '😄', label: 'Great', color: 'text-green-500' },
    { value: 'good', icon: '😊', label: 'Good', color: 'text-green-400' },
    { value: 'okay', icon: '😐', label: 'Okay', color: 'text-yellow-500' },
    { value: 'low', icon: '😟', label: 'Low', color: 'text-orange-500' },
    { value: 'terrible', icon: '😢', label: 'Terrible', color: 'text-red-500' }
  ]

  const handleQuickMood = (mood) => {
    setSelectedMood(mood)
    addMoodEntry({
      mood: mood,
      intensity: getMoodIntensity(mood),
      notes: 'Quick mood check from dashboard'
    })

    setNotification({
      show: true,
      message: `Mood logged: ${mood}`,
      type: 'success'
    })

    setTimeout(() => setSelectedMood(null), 1000)
  }

  const getMoodIntensity = (mood) => {
    const intensityMap = {
      great: 9,
      good: 7,
      okay: 5,
      low: 3,
      terrible: 1
    }
    return intensityMap[mood] || 5
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return {
      day: date.getDate(),
      month: date.toLocaleString('default', { month: 'short' })
    }
  }

  const getSentimentColor = (sentiment) => {
    if (sentiment === 'positive' || sentiment === 'great' || sentiment === 'good') {
      return 'text-green-500 bg-green-100 dark:bg-green-900'
    } else if (sentiment === 'negative' || sentiment === 'terrible' || sentiment === 'low') {
      return 'text-red-500 bg-red-100 dark:bg-red-900'
    }
    return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900'
  }

  const resources = [
    {
      id: 1,
      icon: '📚',
      title: 'Managing Work Stress',
      description: 'Practical techniques for managing workplace pressure and burnout.',
      tags: ['Stress', 'Work']
    },
    {
      id: 2,
      icon: '🎧',
      title: 'Guided Meditation',
      description: '10-minute guided meditation for calming anxiety and improving focus.',
      tags: ['Meditation', 'Audio']
    },
    {
      id: 3,
      icon: '💪',
      title: 'Building Resilience',
      description: 'Strategies to develop mental resilience and cope with challenges.',
      tags: ['Growth', 'Mindset']
    }
  ]

  return (
    <div className="space-y-6">
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.show}
        onClose={() => setNotification({ ...notification, show: false })}
      />

      {/* Welcome Card */}
      <section className="card bg-gradient-to-r from-primary to-secondary text-white">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Welcome back, {user?.firstName || 'User'}!
          </h2>
          <p className="text-blue-100 mb-6">How are you feeling today?</p>
        </div>

        {/* Quick Mood Check */}
        <div className="flex flex-wrap gap-3 mb-6">
          {moods.map((mood) => (
            <button
              key={mood.value}
              onClick={() => handleQuickMood(mood.value)}
              className={`flex flex-col items-center p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-all transform hover:scale-105 ${
                selectedMood === mood.value ? 'ring-2 ring-white scale-105' : ''
              }`}
            >
              <span className="text-3xl mb-1">{mood.icon}</span>
              <span className="text-sm font-medium">{mood.label}</span>
            </button>
          ))}
        </div>

        <Link
          to="/mood-tracker"
          className="inline-flex items-center px-6 py-3 bg-white text-primary rounded-lg hover:bg-blue-50 transition-colors font-medium"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Detailed Mood Entry
        </Link>
      </section>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mood Trends Card */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Mood Trends</h3>
            <div className="flex space-x-2">
              {['week', 'month', 'year'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setMoodFilter(filter)}
                  className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                    moodFilter === filter
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p>Chart will appear here</p>
              <p className="text-sm mt-1">Track your moods to see trends</p>
            </div>
          </div>

          <div className="mt-4">
            <Link to="/mood-tracker" className="text-primary hover:text-primary-600 text-sm font-medium">
              View Full History →
            </Link>
          </div>
        </div>

        {/* Recent Journal Entries */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recent Journal Entries</h3>
            <Link
              to="/journal"
              className="inline-flex items-center px-3 py-1 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Entry
            </Link>
          </div>

          <div className="space-y-4">
            {recentEntries.length > 0 ? (
              recentEntries.map((entry) => {
                const date = formatDate(entry.date)
                return (
                  <div key={entry.id} className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex-shrink-0 text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{date.day}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{date.month}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1 truncate">
                        {entry.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                        {entry.content}
                      </p>
                    </div>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${getSentimentColor(entry.mood)}`}>
                      {entry.mood === 'positive' ? '↑' : entry.mood === 'negative' ? '↓' : '→'}
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <p>No journal entries yet</p>
                <p className="text-sm mt-1">Start journaling to track your thoughts</p>
              </div>
            )}
          </div>

          {recentEntries.length > 0 && (
            <div className="mt-4">
              <Link to="/journal" className="text-primary hover:text-primary-600 text-sm font-medium">
                View All Entries →
              </Link>
            </div>
          )}
        </div>

        {/* Recommended Resources */}
        <div className="card lg:col-span-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recommended Resources</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {resources.map((resource) => (
              <div key={resource.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className="text-3xl mb-3">{resource.icon}</div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {resource.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  {resource.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {resource.tags.map((tag) => (
                    <span key={tag} className="badge badge-info">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <Link to="/resources" className="text-primary hover:text-primary-600 text-sm font-medium">
              Explore All Resources →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
