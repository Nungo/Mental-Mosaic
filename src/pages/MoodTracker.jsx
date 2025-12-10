import { useState } from 'react'
import { useMoodData } from '../hooks/useMoodData'
import Modal from '../components/Modal'
import Notification from '../components/Notification'

const MoodTracker = () => {
  const { moodEntries, addMoodEntry, deleteMoodEntry, getMoodStats } = useMoodData()
  const [showModal, setShowModal] = useState(false)
  const [notification, setNotification] = useState({ show: false, message: '', type: 'info' })

  const [formData, setFormData] = useState({
    mood: '',
    emotions: [],
    factors: [],
    notes: '',
    intensity: 5
  })

  const moods = [
    { value: 'great', icon: '😄', label: 'Great', color: 'bg-green-500' },
    { value: 'good', icon: '😊', label: 'Good', color: 'bg-green-400' },
    { value: 'okay', icon: '😐', label: 'Okay', color: 'bg-yellow-500' },
    { value: 'low', icon: '😟', label: 'Low', color: 'bg-orange-500' },
    { value: 'terrible', icon: '😢', label: 'Terrible', color: 'bg-red-500' }
  ]

  const availableEmotions = ['Happy', 'Sad', 'Anxious', 'Calm', 'Angry', 'Excited', 'Tired', 'Energetic', 'Lonely', 'Content']
  const availableFactors = ['Work', 'Relationships', 'Health', 'Sleep', 'Exercise', 'Weather', 'Social', 'Family', 'Finances', 'Other']

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.mood) {
      setNotification({ show: true, message: 'Please select a mood', type: 'error' })
      return
    }

    addMoodEntry(formData)
    setNotification({ show: true, message: 'Mood entry added successfully!', type: 'success' })
    setShowModal(false)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      mood: '',
      emotions: [],
      factors: [],
      notes: '',
      intensity: 5
    })
  }

  const toggleSelection = (array, item) => {
    if (array.includes(item)) {
      return array.filter(i => i !== item)
    }
    return [...array, item]
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  const getMoodColor = (mood) => {
    const colors = {
      great: 'text-green-500',
      good: 'text-green-400',
      okay: 'text-yellow-500',
      low: 'text-orange-500',
      terrible: 'text-red-500'
    }
    return colors[mood] || 'text-gray-500'
  }

  const getMoodIcon = (mood) => {
    const icons = {
      great: '😄',
      good: '😊',
      okay: '😐',
      low: '😟',
      terrible: '😢'
    }
    return icons[mood] || '😐'
  }

  const stats = getMoodStats()

  return (
    <div className="space-y-6">
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.show}
        onClose={() => setNotification({ ...notification, show: false })}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mood Tracker</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Track and analyze your emotional well-being</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary mt-4 sm:mt-0"
        >
          <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Log Mood
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Entries</div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalEntries}</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Average Intensity</div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.averageIntensity || 0}</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Most Common Mood</div>
          <div className="text-3xl">{getMoodIcon(stats.mostCommonMood)}</div>
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">{stats.mostCommonMood}</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Entries This Week</div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {moodEntries.filter(e => {
              const entryDate = new Date(e.date)
              const weekAgo = new Date()
              weekAgo.setDate(weekAgo.getDate() - 7)
              return entryDate >= weekAgo
            }).length}
          </div>
        </div>
      </div>

      {/* Mood History */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Mood History</h2>

        {moodEntries.length > 0 ? (
          <div className="space-y-4">
            {[...moodEntries].reverse().map((entry) => (
              <div key={entry.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className={`text-4xl ${getMoodColor(entry.mood)}`}>
                      {getMoodIcon(entry.mood)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                          {entry.mood}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(entry.date)}
                        </span>
                        <span className="badge badge-info">
                          Intensity: {entry.intensity}/10
                        </span>
                      </div>

                      {entry.emotions && entry.emotions.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Emotions:</span>
                          {entry.emotions.map((emotion) => (
                            <span key={emotion} className="badge badge-success">
                              {emotion}
                            </span>
                          ))}
                        </div>
                      )}

                      {entry.factors && entry.factors.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Factors:</span>
                          {entry.factors.map((factor) => (
                            <span key={factor} className="badge badge-warning">
                              {factor}
                            </span>
                          ))}
                        </div>
                      )}

                      {entry.notes && (
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                          {entry.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (window.confirm('Delete this mood entry?')) {
                        deleteMoodEntry(entry.id)
                        setNotification({ show: true, message: 'Mood entry deleted', type: 'success' })
                      }
                    }}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-lg font-medium mb-2">No mood entries yet</p>
            <p className="text-sm mb-4">Start tracking your moods to see patterns and insights</p>
            <button onClick={() => setShowModal(true)} className="btn-primary">
              Log Your First Mood
            </button>
          </div>
        )}
      </div>

      {/* Add Mood Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Log Your Mood">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Mood Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              How are you feeling?
            </label>
            <div className="grid grid-cols-5 gap-2">
              {moods.map((mood) => (
                <button
                  key={mood.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, mood: mood.value })}
                  className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                    formData.mood === mood.value
                      ? 'border-primary bg-primary/10 scale-105'
                      : 'border-gray-300 dark:border-gray-600 hover:border-primary/50'
                  }`}
                >
                  <span className="text-2xl mb-1">{mood.icon}</span>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{mood.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Intensity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Intensity: {formData.intensity}/10
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={formData.intensity}
              onChange={(e) => setFormData({ ...formData, intensity: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>

          {/* Emotions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select emotions (optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {availableEmotions.map((emotion) => (
                <button
                  key={emotion}
                  type="button"
                  onClick={() => setFormData({ ...formData, emotions: toggleSelection(formData.emotions, emotion) })}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${
                    formData.emotions.includes(emotion)
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {emotion}
                </button>
              ))}
            </div>
          </div>

          {/* Factors */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Contributing factors (optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {availableFactors.map((factor) => (
                <button
                  key={factor}
                  type="button"
                  onClick={() => setFormData({ ...formData, factors: toggleSelection(formData.factors, factor) })}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${
                    formData.factors.includes(factor)
                      ? 'bg-secondary text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {factor}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Notes (optional)
            </label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="input"
              placeholder="Any additional thoughts or context..."
            />
          </div>

          {/* Submit */}
          <div className="flex space-x-3">
            <button type="submit" className="flex-1 btn-primary">
              Save Mood Entry
            </button>
            <button
              type="button"
              onClick={() => {
                setShowModal(false)
                resetForm()
              }}
              className="flex-1 btn-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default MoodTracker
