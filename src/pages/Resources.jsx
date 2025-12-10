import { useState } from 'react'

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = ['all', 'stress', 'anxiety', 'depression', 'sleep', 'meditation', 'relationships']

  const resources = [
    {
      id: 1,
      title: 'Managing Work Stress',
      category: 'stress',
      type: 'article',
      description: 'Practical techniques for managing workplace pressure and preventing burnout.',
      icon: '📚',
      duration: '5 min read',
      tags: ['Work', 'Stress Management']
    },
    {
      id: 2,
      title: 'Guided Meditation for Beginners',
      category: 'meditation',
      type: 'audio',
      description: '10-minute guided meditation to help you relax and center yourself.',
      icon: '🎧',
      duration: '10 min',
      tags: ['Meditation', 'Relaxation']
    },
    {
      id: 3,
      title: 'Understanding Anxiety',
      category: 'anxiety',
      type: 'article',
      description: 'Learn about anxiety symptoms, causes, and effective coping strategies.',
      icon: '💡',
      duration: '8 min read',
      tags: ['Anxiety', 'Education']
    },
    {
      id: 4,
      title: 'Better Sleep Habits',
      category: 'sleep',
      type: 'guide',
      description: 'Evidence-based tips for improving sleep quality and establishing healthy routines.',
      icon: '😴',
      duration: '7 min read',
      tags: ['Sleep', 'Wellness']
    },
    {
      id: 5,
      title: 'Breathing Exercises',
      category: 'stress',
      type: 'exercise',
      description: 'Simple breathing techniques to reduce stress and promote calmness.',
      icon: '🌬️',
      duration: '5 min',
      tags: ['Breathing', 'Stress Relief']
    },
    {
      id: 6,
      title: 'Building Healthy Relationships',
      category: 'relationships',
      type: 'article',
      description: 'Communication strategies for stronger, more fulfilling relationships.',
      icon: '💝',
      duration: '10 min read',
      tags: ['Relationships', 'Communication']
    }
  ]

  const filteredResources = selectedCategory === 'all'
    ? resources
    : resources.filter(r => r.category === selectedCategory)

  const getTypeColor = (type) => {
    const colors = {
      article: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      audio: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      guide: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      exercise: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
    }
    return colors[type] || colors.article
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Resources</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Helpful content for your mental wellness journey</p>
      </div>

      {/* Category Filter */}
      <div className="card">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <div key={resource.id} className="card card-hover cursor-pointer">
            <div className="text-4xl mb-4">{resource.icon}</div>

            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex-1">
                {resource.title}
              </h3>
              <span className={`badge ${getTypeColor(resource.type)} ml-2`}>
                {resource.type}
              </span>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {resource.description}
            </p>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {resource.duration}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {resource.tags.map((tag) => (
                <span key={tag} className="badge badge-info">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="card text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No resources found in this category</p>
        </div>
      )}
    </div>
  )
}

export default Resources
