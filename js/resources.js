/**
 * MentalMosaic - Resources JavaScript
 * Handles resources listing, filtering, and viewing
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    if (!window.NungoApp.checkAuth()) {
      return;
    }
    
    // Load resources
    loadResources();
    
    // Initialize search and filters
    initializeSearch();
    initializeFilters();
  });
  
  /**
   * Load resources from JSON data
   */
  function loadResources() {
    // For hackathon demo, we'll use static data
    // In a production app, this would fetch from an API or database
    const resourcesData = getResourcesData();
    
    // Render resources
    renderResources(resourcesData);
    
    // Set up resource click handlers
    setupResourceHandlers();
  }
  
  /**
   * Get mock resources data
   */
  function getResourcesData() {
    return [
      {
        id: 'resource-1',
        title: 'Understanding Stress: Signs, Symptoms, and Coping Strategies',
        description: 'Learn to identify stress triggers and develop effective coping mechanisms.',
        category: 'stress',
        type: 'Article',
        icon: 'fas fa-file-alt',
        length: '8 min read',
        featured: false,
        content: `
          <h3>Understanding Stress</h3>
          <p>Stress is your body's reaction to a challenge or demand. In short bursts, stress can be positive, but chronic stress can cause numerous health issues.</p>
          
          <h3>Common Signs of Stress</h3>
          <ul>
            <li>Headaches or chest pain</li>
            <li>Fatigue</li>
            <li>Sleep problems</li>
            <li>Anxiety or restlessness</li>
            <li>Lack of motivation or focus</li>
            <li>Irritability</li>
          </ul>
          
          <h3>Effective Coping Strategies</h3>
          <p>Consider these strategies to help manage your stress levels:</p>
          <ol>
            <li><strong>Practice relaxation techniques</strong> - Deep breathing, meditation, or yoga</li>
            <li><strong>Stay physically active</strong> - Regular exercise can help reduce stress</li>
            <li><strong>Maintain a healthy diet</strong> - Proper nutrition supports overall wellbeing</li>
            <li><strong>Get enough sleep</strong> - Aim for 7-9 hours of quality sleep each night</li>
            <li><strong>Set realistic goals</strong> - Break large tasks into smaller, manageable steps</li>
            <li><strong>Connect with others</strong> - Social support is crucial for stress management</li>
          </ol>
        `
      },
      {
        id: 'resource-2',
        title: '5-Minute Mindfulness Meditation',
        description: 'A quick guided meditation practice that can be done anywhere to center yourself.',
        category: 'mindfulness',
        type: 'Audio',
        icon: 'fas fa-headphones',
        length: '5 min',
        featured: false,
        content: `
          <h3>5-Minute Mindfulness Meditation</h3>
          <p>This quick meditation can help you recenter and find calm in the midst of a busy day.</p>
          
          <div class="audio-player">
            <div class="player-controls">
              <button class="play-button">
                <i class="fas fa-play"></i>
              </button>
              <div class="progress-bar">
                <div class="progress-fill"></div>
              </div>
              <span class="time-display">0:00 / 5:00</span>
            </div>
          </div>
          
          <h3>How to Practice</h3>
          <ol>
            <li>Find a comfortable seated position</li>
            <li>Close your eyes or maintain a soft gaze</li>
            <li>Focus on your breath, noticing the sensation of breathing in and out</li>
            <li>When your mind wanders, gently bring your attention back to your breath</li>
            <li>Continue for the duration of the meditation</li>
          </ol>
          
          <p>Remember, mindfulness is a practice. The more consistently you practice, the more benefits you'll experience.</p>
        `
      },
      {
        id: 'resource-3',
        title: 'Improving Sleep Quality',
        description: 'Practical techniques for better sleep, including establishing a nighttime routine and optimizing your sleep environment.',
        category: 'sleep',
        type: 'Guide',
        icon: 'fas fa-bed',
        length: '10 min read',
        featured: false,
        content: `
          <h3>Improving Sleep Quality</h3>
          <p>Quality sleep is essential for mental and physical health. Here are practical strategies to improve your sleep:</p>
          
          <h4>Establish a Sleep Schedule</h4>
          <p>Go to bed and wake up at the same time every day, even on weekends. This helps regulate your body's internal clock.</p>
          
          <h4>Create a Restful Environment</h4>
          <ul>
            <li>Keep your bedroom cool, quiet, and dark</li>
            <li>Use comfortable bedding</li>
            <li>Remove electronic devices</li>
            <li>Consider using white noise if helpful</li>
          </ul>
          
          <h4>Develop a Bedtime Routine</h4>
          <p>Create a relaxing pre-sleep routine to signal to your body that it's time to wind down:</p>
          <ul>
            <li>Read a book</li>
            <li>Take a warm bath</li>
            <li>Practice gentle stretching or meditation</li>
            <li>Avoid screens at least 1 hour before bed</li>
          </ul>
          
          <h4>Watch Your Diet</h4>
          <ul>
            <li>Avoid caffeine and alcohol close to bedtime</li>
            <li>Don't go to bed hungry or overly full</li>
            <li>Limit fluids before bed</li>
          </ul>
        `
      },
      {
        id: 'resource-4',
        title: 'Managing Work-Related Anxiety',
        description: 'Strategies for staying calm and productive in high-pressure work environments.',
        category: 'anxiety',
        type: 'Article',
        icon: 'fas fa-briefcase',
        length: '7 min read',
        featured: false,
        content: `
          <h3>Managing Work-Related Anxiety</h3>
          <p>Work-related anxiety can significantly impact your productivity and overall wellbeing. Here are practical strategies to help manage anxiety in the workplace:</p>
          
          <h4>Identify Your Triggers</h4>
          <p>Take note of situations, interactions, or tasks that consistently trigger your anxiety. Awareness is the first step toward management.</p>
          
          <h4>Practice Time Management</h4>
          <ul>
            <li>Break large projects into smaller, manageable tasks</li>
            <li>Set realistic deadlines and prioritize tasks</li>
            <li>Use the Pomodoro Technique: work for 25 minutes, then take a 5-minute break</li>
          </ul>
          
          <h4>Set Boundaries</h4>
          <p>Establish clear boundaries between work and personal life:</p>
          <ul>
            <li>Define your working hours and stick to them</li>
            <li>Take your entitled breaks and vacation time</li>
            <li>Avoid checking work emails during off-hours</li>
          </ul>
          
          <h4>Communication Strategies</h4>
          <ul>
            <li>Ask clarifying questions when assignments are unclear</li>
            <li>Learn to delegate when appropriate</li>
            <li>Practice saying no when your workload is too heavy</li>
          </ul>
        `
      },
      {
        id: 'resource-5',
        title: 'Mindful Breathing Techniques',
        description: 'Simple breathing exercises to help reduce stress and increase focus throughout the day.',
        category: 'mindfulness',
        type: 'Guide',
        icon: 'fas fa-lungs',
        length: '5 min read',
        featured: true,
        content: `
          <h3>Mindful Breathing Techniques</h3>
          <p>Breathing is something we do automatically, but with conscious attention, it can become a powerful tool for managing stress and improving focus. Here are some simple breathing techniques you can practice anywhere:</p>
          
          <h4>4-7-8 Breathing</h4>
          <ol>
            <li>Inhale quietly through your nose for 4 counts</li>
            <li>Hold your breath for 7 counts</li>
            <li>Exhale completely through your mouth for 8 counts</li>
            <li>Repeat the cycle 3-4 times</li>
          </ol>
          
          <h4>Box Breathing</h4>
          <p>This technique is used by Navy SEALs to stay calm and focused:</p>
          <ol>
            <li>Inhale for 4 counts</li>
            <li>Hold for 4 counts</li>
            <li>Exhale for 4 counts</li>
            <li>Hold for 4 counts</li>
            <li>Repeat as needed</li>
          </ol>
          
          <h4>Diaphragmatic Breathing</h4>
          <ol>
            <li>Place one hand on your chest and the other on your abdomen</li>
            <li>Breathe in slowly through your nose, feeling your abdomen expand</li>
            <li>Your chest should remain relatively still</li>
            <li>Exhale slowly through your mouth</li>
            <li>Practice for 5-10 minutes daily</li>
          </ol>
        `
      },
      {
        id: 'resource-6',
        title: 'Creating Work-Life Balance',
        description: 'Practical strategies for maintaining boundaries between work and personal life.',
        category: 'work',
        type: 'Guide',
        icon: 'fas fa-balance-scale',
        length: '12 min read',
        featured: false,
        content: `
          <h3>Creating Work-Life Balance</h3>
          <p>In today's always-connected world, maintaining a healthy work-life balance is more important—and more challenging—than ever. Here are practical strategies to help you separate your professional and personal life:</p>
          
          <h4>Set Clear Boundaries</h4>
          <ul>
            <li>Establish specific working hours and stick to them</li>
            <li>Create a dedicated workspace if working from home</li>
            <li>Communicate your boundaries clearly to colleagues</li>
          </ul>
          
          <h4>Practice the Art of Unplugging</h4>
          <ul>
            <li>Turn off work notifications outside of working hours</li>
            <li>Designate technology-free times each day</li>
            <li>Take regular digital detoxes</li>
          </ul>
          
          <h4>Prioritize Self-Care</h4>
          <p>Make time for activities that replenish your energy:</p>
          <ul>
            <li>Regular physical exercise</li>
            <li>Adequate sleep</li>
            <li>Hobbies and interests outside of work</li>
            <li>Social connections and relationships</li>
          </ul>
          
          <h4>Learn to Say No</h4>
          <p>Protect your time and energy by declining additional commitments when necessary. Remember that saying no to one thing means saying yes to something else.</p>
        `
      }
    ];
  }
  
  /**
   * Render resources in the container
   */
  function renderResources(resources) {
    const resourcesContainer = document.getElementById('resources-container');
    
    if (!resourcesContainer) return;
    
    // Clear container
    resourcesContainer.innerHTML = '';
    
    // Check if empty
    if (resources.length === 0) {
      resourcesContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">
            <i class="fas fa-search"></i>
          </div>
          <h3>No resources found</h3>
          <p>Try adjusting your filters or search criteria.</p>
        </div>
      `;
      return;
    }
    
    // Add resources
    resources.forEach(resource => {
      const resourceCard = document.createElement('div');
      resourceCard.className = 'resource-card';
      resourceCard.setAttribute('data-id', resource.id);
      resourceCard.setAttribute('data-category', resource.category);
      
      resourceCard.innerHTML = `
        <div class="resource-icon">
          <i class="${resource.icon}"></i>
        </div>
        <div class="resource-details">
          <h3>${resource.title}</h3>
          <p>${resource.description}</p>
          <div class="resource-meta">
            <span class="resource-type"><i class="fas fa-tag"></i> ${resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}</span>
            <span class="resource-length"><i class="fas fa-clock"></i> ${resource.length}</span>
          </div>
        </div>
      `;
      
      resourcesContainer.appendChild(resourceCard);
    });
    
    // Update featured resource
    updateFeaturedResource(resources);
  }
  
  /**
   * Update featured resource
   */
  function updateFeaturedResource(resources) {
    const featuredResource = resources.find(resource => resource.featured);
    
    if (!featuredResource) return;
    
    const featuredTitle = document.querySelector('.featured-details h3');
    const featuredDescription = document.querySelector('.featured-description');
    const featuredType = document.querySelector('.featured-type');
    const featuredLength = document.querySelector('.featured-length');
    const featuredButton = document.querySelector('.featured-details .primary-button');
    
    if (featuredTitle) featuredTitle.textContent = featuredResource.title;
    if (featuredDescription) featuredDescription.textContent = featuredResource.description;
    if (featuredType) featuredType.innerHTML = `<i class="${featuredResource.icon}"></i> ${featuredResource.type}`;
    if (featuredLength) featuredLength.innerHTML = `<i class="fas fa-clock"></i> ${featuredResource.length}`;
    
    if (featuredButton) {
      featuredButton.setAttribute('data-id', featuredResource.id);
    }
  }
  
  /**
   * Set up resource click handlers
   */
  function setupResourceHandlers() {
    // Resource cards
    const resourceCards = document.querySelectorAll('.resource-card');
    
    resourceCards.forEach(card => {
      card.addEventListener('click', function() {
        const resourceId = this.getAttribute('data-id');
        showResourceDetails(resourceId);
      });
    });
    
    // Featured resource button
    const featuredButton = document.querySelector('.featured-details .primary-button');
    
    if (featuredButton) {
      featuredButton.addEventListener('click', function(e) {
        e.preventDefault();
        const resourceId = this.getAttribute('data-id');
        showResourceDetails(resourceId);
      });
    }
  }
  
  /**
   * Show resource details in modal
   */
  function showResourceDetails(resourceId) {
    const resourcesData = getResourcesData();
    const resource = resourcesData.find(r => r.id === resourceId);
    
    if (!resource) return;
    
    // Get modal elements
    const modal = document.getElementById('resource-details-modal');
    const modalTitle = document.getElementById('resource-modal-title');
    const modalContent = document.getElementById('resource-modal-content');
    const downloadButton = document.getElementById('resource-download-button');
    
    // Set modal content
    if (modalTitle) modalTitle.textContent = resource.title;
    if (modalContent) modalContent.innerHTML = resource.content;
    
    // Handle download button visibility
    if (downloadButton) {
      if (resource.type === 'Guide' || resource.type === 'PDF') {
        downloadButton.style.display = 'inline-flex';
        downloadButton.href = `#${resource.id}-download`;
      } else {
        downloadButton.style.display = 'none';
      }
    }
    
    // Open modal
    if (modal) {
      window.NungoApp.openModal(modal);
    }
  }
  
  /**
   * Initialize search functionality
   */
  function initializeSearch() {
    const searchInput = document.getElementById('resource-search-input');
    
    if (searchInput) {
      searchInput.addEventListener('input', window.NungoApp.debounce(function() {
        const searchTerm = this.value.toLowerCase().trim();
        filterResources();
      }, 300));
    }
  }
  
  /**
   * Initialize category filters
   */
  function initializeFilters() {
    const filterButtons = document.querySelectorAll('.category-filter');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Filter resources
        filterResources();
      });
    });
  }
  
  /**
   * Filter resources based on search term and category
   */
  function filterResources() {
    const resourcesData = getResourcesData();
    const searchTerm = document.getElementById('resource-search-input').value.toLowerCase().trim();
    const activeCategory = document.querySelector('.category-filter.active').getAttribute('data-category');
    
    // Filter resources
    const filteredResources = resourcesData.filter(resource => {
      // Check category filter
      const categoryMatch = activeCategory === 'all' || resource.category === activeCategory;
      
      // Check search term
      const searchMatch = searchTerm === '' || 
                          resource.title.toLowerCase().includes(searchTerm) ||
                          resource.description.toLowerCase().includes(searchTerm);
      
      return categoryMatch && searchMatch;
    });
    
    // Render filtered resources
    renderResources(filteredResources);
    
    // Set up resource click handlers
    setupResourceHandlers();
  }