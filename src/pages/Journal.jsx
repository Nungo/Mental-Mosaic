import { useState, useEffect } from 'react'
import { useJournalData } from '../hooks/useJournalData'
import Modal from '../components/Modal'
import Notification from '../components/Notification'

const Journal = () => {
  const { journalEntries, addJournalEntry, updateJournalEntry, deleteJournalEntry, searchEntries } = useJournalData()
  const [showModal, setShowModal] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredEntries, setFilteredEntries] = useState([])
  const [notification, setNotification] = useState({ show: false, message: '', type: 'info' })

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    mood: 'neutral',
    tags: []
  })

  useEffect(() => {
    if (searchTerm) {
      setFilteredEntries(searchEntries(searchTerm))
    } else {
      setFilteredEntries([...journalEntries].sort((a, b) => new Date(b.date) - new Date(a.date)))
    }
  }, [journalEntries, searchTerm])

  const prompts = [
    { icon: '🙏', title: 'Gratitude', text: 'What are three things you\'re grateful for today?' },
    { icon: '💪', title: 'Challenge', text: 'What challenge did you face today and how did you handle it?' },
    { icon: '💭', title: 'Reflection', text: 'How are you feeling right now? What\'s on your mind?' },
    { icon: '🌱', title: 'Growth', text: 'What did you learn about yourself today?' }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.title || !formData.content) {
      setNotification({ show: true, message: 'Title and content are required', type: 'error' })
      return
    }

    if (selectedEntry) {
      updateJournalEntry(selectedEntry.id, formData)
      setNotification({ show: true, message: 'Journal entry updated!', type: 'success' })
    } else {
      addJournalEntry(formData)
      setNotification({ show: true, message: 'Journal entry created!', type: 'success' })
    }

    setShowModal(false)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      mood: 'neutral',
      tags: []
    })
    setSelectedEntry(null)
  }

  const handleEdit = (entry) => {
    setSelectedEntry(entry)
    setFormData({
      title: entry.title,
      content: entry.content,
      mood: entry.mood,
      tags: entry.tags || []
    })
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      deleteJournalEntry(id)
      setNotification({ show: true, message: 'Entry deleted', type: 'success' })
    }
  }

  const handlePromptUse = (prompt) => {
    setFormData({
      ...formData,
      title: prompt.title,
      content: prompt.text + '\n\n'
    })
    setShowModal(true)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const getMoodColor = (mood) => {
    const colors = {
      positive: 'text-green-500 bg-green-100 dark:bg-green-900',
      neutral: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900',
      negative: 'text-red-500 bg-red-100 dark:bg-red-900'
    }
    return colors[mood] || colors.neutral
  }

  const getMoodIcon = (mood) => {
    const icons = {
      positive: '😊',
      neutral: '😐',
      negative: '😔'
    }
    return icons[mood] || '😐'
  }

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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Journal</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Express your thoughts and feelings</p>
        </div>
        <button
          onClick={() => {
            resetForm()
            setShowModal(true)
          }}
          className="btn-primary mt-4 sm:mt-0"
        >
          <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Entry
        </button>
      </div>

      {/* Journal Prompts */}
      <div className="card">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Writing Prompts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {prompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => handlePromptUse(prompt)}
              className="p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg hover:from-primary/20 hover:to-secondary/20 transition-all text-left"
            >
              <div className="text-2xl mb-2">{prompt.icon}</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{prompt.title}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">{prompt.text}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="card">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search entries..."
            className="input pl-10"
          />
        </div>
      </div>

      {/* Journal Entries */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Your Entries ({filteredEntries.length})
        </h2>

        {filteredEntries.length > 0 ? (
          <div className="space-y-4">
            {filteredEntries.map((entry) => (
              <div key={entry.id} className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{entry.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${getMoodColor(entry.mood)}`}>
                        {getMoodIcon(entry.mood)} {entry.mood}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(entry.date)}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(entry)}
                      className="text-gray-400 hover:text-primary transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {entry.content.length > 300 ? entry.content.substring(0, 300) + '...' : entry.content}
                </p>

                {entry.tags && entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {entry.tags.map((tag) => (
                      <span key={tag} className="badge badge-info">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <p className="text-lg font-medium mb-2">
              {searchTerm ? 'No entries found' : 'No journal entries yet'}
            </p>
            <p className="text-sm mb-4">
              {searchTerm ? 'Try a different search term' : 'Start writing to capture your thoughts and feelings'}
            </p>
            {!searchTerm && (
              <button onClick={() => setShowModal(true)} className="btn-primary">
                Create Your First Entry
              </button>
            )}
          </div>
        )}
      </div>

      {/* Entry Modal */}
      <Modal isOpen={showModal} onClose={() => { setShowModal(false); resetForm(); }} title={selectedEntry ? 'Edit Entry' : 'New Journal Entry'} size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input"
              placeholder="Give your entry a title..."
              required
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Content
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={12}
              className="input"
              placeholder="Write your thoughts here..."
              required
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {formData.content.split(/\s+/).filter(w => w).length} words
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              How are you feeling?
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['positive', 'neutral', 'negative'].map((mood) => (
                <button
                  key={mood}
                  type="button"
                  onClick={() => setFormData({ ...formData, mood })}
                  className={`p-3 rounded-lg border-2 transition-all capitalize ${
                    formData.mood === mood
                      ? 'border-primary bg-primary/10'
                      : 'border-gray-300 dark:border-gray-600 hover:border-primary/50'
                  }`}
                >
                  <div className="text-2xl mb-1">{getMoodIcon(mood)}</div>
                  <div className="text-sm font-medium">{mood}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button type="submit" className="flex-1 btn-primary">
              {selectedEntry ? 'Update Entry' : 'Save Entry'}
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

export default Journal
