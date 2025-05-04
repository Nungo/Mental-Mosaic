/**
 * MentalMosaic - Community JavaScript
 * Handles community discussions, groups, and events
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    if (!window.NungoApp.checkAuth()) {
      return;
    }
    
    // Initialize tabs
    window.NungoApp.initializeTabs();
    
    // Initialize new post button
    initializeNewPostButton();
    
    // Initialize tag filters
    initializeTagFilters();
    
    // Initialize sort options
    initializeSortOptions();
    
    // Initialize group join buttons
    initializeGroupButtons();
    
    // Initialize event registration
    initializeEventRegistration();
  });
  
  /**
   * Initialize new post button
   */
  function initializeNewPostButton() {
    const newPostButton = document.getElementById('new-post-button');
    const newPostModal = document.getElementById('new-post-modal');
    
    if (newPostButton && newPostModal) {
      newPostButton.addEventListener('click', function() {
        window.NungoApp.openModal(newPostModal);
      });
      
      // Initialize selectable tags
      const selectableTags = document.querySelectorAll('.selectable-tag');
      
      selectableTags.forEach(tag => {
        tag.addEventListener('click', function() {
          this.classList.toggle('selected');
        });
      });
      
      // Initialize publish button
      const publishButton = document.getElementById('publish-post-button');
      
      if (publishButton) {
        publishButton.addEventListener('click', function() {
          publishPost();
        });
      }
    }
  }
  
  /**
   * Publish new post
   */
  function publishPost() {
    // Get form values
    const title = document.getElementById('post-title').value.trim();
    const content = document.getElementById('post-content').value.trim();
    const privacy = document.getElementById('post-privacy').value;
    
    // Get selected tags
    const selectedTags = Array.from(document.querySelectorAll('.selectable-tag.selected'))
      .map(tag => tag.getAttribute('data-tag'));
    
    // Validate form
    if (!title) {
      window.NungoApp.showNotification('Please enter a title for your post', 'error');
      return;
    }
    
    if (!content) {
      window.NungoApp.showNotification('Please enter content for your post', 'error');
      return;
    }
    
    if (selectedTags.length === 0) {
      window.NungoApp.showNotification('Please select at least one tag', 'error');
      return;
    }
    
    // Show loading state
    const publishButton = document.getElementById('publish-post-button');
    publishButton.disabled = true;
    publishButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Publishing...';
    
    // Simulate API call delay
    setTimeout(() => {
      // Add new post to DOM
      addNewPostToDOM(title, content, selectedTags, privacy);
      
      // Close modal
      const modal = document.getElementById('new-post-modal');
      window.NungoApp.closeModal(modal);
      
      // Reset form
      document.getElementById('post-title').value = '';
      document.getElementById('post-content').value = '';
      document.querySelectorAll('.selectable-tag.selected').forEach(tag => {
        tag.classList.remove('selected');
      });
      
      // Reset button
      publishButton.disabled = false;
      publishButton.innerHTML = 'Publish Post';
      
      // Show success notification
      window.NungoApp.showNotification('Your post has been published!', 'success');
    }, 1500);
  }
  
  /**
   * Add new post to DOM
   */
  function addNewPostToDOM(title, content, tags, privacy) {
    const discussionsContainer = document.getElementById('discussions-container');
    
    if (discussionsContainer) {
      // Create new post element
      const postElement = document.createElement('div');
      postElement.className = 'discussion-post';
      
      // Get user data
      const userData = window.NungoApp.getUserData() || {
        name: 'John Doe',
        avatar: 'https://via.placeholder.com/40'
      };
      
      // Create post HTML
      postElement.innerHTML = `
        <div class="post-author">
          <img src="${privacy === 'anonymous' ? 'https://via.placeholder.com/40' : userData.avatar}" alt="Author Avatar">
          <div class="author-info">
            <span class="author-name">${privacy === 'anonymous' ? 'Anonymous' : userData.name}</span>
            <span class="post-time">Just now</span>
          </div>
        </div>
        <div class="post-content">
          <h3>${title}</h3>
          <p>${content}</p>
          <div class="post-tags">
            ${tags.map(tag => `<span class="tag">${tag.charAt(0).toUpperCase() + tag.slice(1)}</span>`).join('')}
          </div>
        </div>
        <div class="post-stats">
          <span class="stat"><i class="fas fa-heart"></i> 0</span>
          <span class="stat"><i class="fas fa-comment"></i> 0</span>
        </div>
      `;
      
      // Add to container at top
      discussionsContainer.insertBefore(postElement, discussionsContainer.firstChild);
      
      // Add animation
      postElement.classList.add('fade-in');
    }
  }
  
  /**
   * Initialize tag filters
   */
  function initializeTagFilters() {
    const tagFilters = document.querySelectorAll('.tag-filter');
    
    tagFilters.forEach(filter => {
      filter.addEventListener('click', function() {
        // Remove active class from all filters
        tagFilters.forEach(f => f.classList.remove('active'));
        
        // Add active class to clicked filter
        this.classList.add('active');
        
        // Filter discussions
        filterDiscussions();
      });
    });
  }
  
  /**
   * Initialize sort options
   */
  function initializeSortOptions() {
    const sortSelect = document.getElementById('sort-by');
    
    if (sortSelect) {
      sortSelect.addEventListener('change', function() {
        // Sort discussions
        sortDiscussions();
      });
    }
  }
  
  /**
   * Filter discussions based on selected tag
   */
  function filterDiscussions() {
    const activeTag = document.querySelector('.tag-filter.active').getAttribute('data-tag');
    const discussionPosts = document.querySelectorAll('.discussion-post');
    
    discussionPosts.forEach(post => {
      if (activeTag === 'all') {
        post.style.display = 'flex';
      } else {
        const postTags = Array.from(post.querySelectorAll('.post-tags .tag'))
          .map(tag => tag.textContent.toLowerCase());
        
        if (postTags.includes(activeTag.toLowerCase())) {
          post.style.display = 'flex';
        } else {
          post.style.display = 'none';
        }
      }
    });
  }
  
  /**
   * Sort discussions based on selected option
   */
  function sortDiscussions() {
    const sortOption = document.getElementById('sort-by').value;
    const discussionsContainer = document.getElementById('discussions-container');
    const discussionPosts = Array.from(document.querySelectorAll('.discussion-post'));
    
    if (discussionsContainer) {
      // Sort posts
      discussionPosts.sort((a, b) => {
        if (sortOption === 'recent') {
          // Sort by date (most recent first)
          const dateA = a.querySelector('.post-time').textContent;
          const dateB = b.querySelector('.post-time').textContent;
          
          // Convert date strings to comparable values (simplified for demo)
          return dateA === 'Just now' ? -1 : dateB === 'Just now' ? 1 : -1;
        } else if (sortOption === 'popular') {
          // Sort by likes
          const likesA = parseInt(a.querySelector('.fa-heart').nextSibling.textContent.trim());
          const likesB = parseInt(b.querySelector('.fa-heart').nextSibling.textContent.trim());
          
          return likesB - likesA;
        } else if (sortOption === 'commented') {
          // Sort by number of comments
          const commentsA = parseInt(a.querySelector('.fa-comment').nextSibling.textContent.trim());
          const commentsB = parseInt(b.querySelector('.fa-comment').nextSibling.textContent.trim());
          
          return commentsB - commentsA;
        }
        
        return 0;
      });
      
      // Clear container
      discussionsContainer.innerHTML = '';
      
      // Add sorted posts back to container
      discussionPosts.forEach(post => {
        discussionsContainer.appendChild(post);
      });
    }
  }
  
  /**
   * Initialize group join buttons
   */
  function initializeGroupButtons() {
    const joinButtons = document.querySelectorAll('.join-group-button');
    
    joinButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Toggle joined state
        if (this.classList.contains('joined')) {
          this.classList.remove('joined');
          this.textContent = 'Join Group';
          
          // Notify left group
          const groupName = this.closest('.group-card').querySelector('h3').textContent;
          window.NungoApp.showNotification(`You have left the ${groupName} group`, 'info');
        } else {
          this.classList.add('joined');
          this.textContent = 'Leave Group';
          
          // Notify joined group
          const groupName = this.closest('.group-card').querySelector('h3').textContent;
          window.NungoApp.showNotification(`You have joined the ${groupName} group`, 'success');
        }
      });
    });
  }
  
  /**
   * Initialize event registration
   */
  function initializeEventRegistration() {
    const registerButtons = document.querySelectorAll('.register-button');
    
    registerButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Toggle registered state
        if (this.classList.contains('registered')) {
          this.classList.remove('registered');
          this.textContent = 'Register';
          
          // Notify unregistered
          const eventName = this.closest('.event-card').querySelector('h3').textContent;
          window.NungoApp.showNotification(`You have unregistered from "${eventName}"`, 'info');
        } else {
          this.classList.add('registered');
          this.textContent = 'Unregister';
          
          // Notify registered
          const eventName = this.closest('.event-card').querySelector('h3').textContent;
          window.NungoApp.showNotification(`You have registered for "${eventName}"`, 'success');
        }
      });
    });
  }