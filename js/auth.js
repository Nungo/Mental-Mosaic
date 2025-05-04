/**
 * MentalMosaic - Authentication JavaScript
 * Handles user login, signup, and authentication flows
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the auth page
    if (document.querySelector('.auth-container')) {
      // Initialize form tabs
      initializeAuthTabs();
      
      // Initialize forms
      initializeLoginForm();
      initializeSignupForm();
      
      // Check if user is already logged in - but only redirect if we're not in forced logout state
      const forcedLogout = sessionStorage.getItem('forced-logout');
      if (!forcedLogout && window.NungoApp && window.NungoApp.checkAuth()) {
        window.location.href = 'dashboard.html';
      }
      
      // Clear the forced logout flag
      sessionStorage.removeItem('forced-logout');
    }
  });
  
  /**
   * Initialize authentication tabs
   */
  function initializeAuthTabs() {
    const loginTab = document.getElementById('show-login');
    const signupTab = document.getElementById('show-signup');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    if (loginTab && signupTab && loginForm && signupForm) {
      loginTab.addEventListener('click', function(e) {
        e.preventDefault();
        
        loginForm.classList.remove('hidden');
        signupForm.classList.remove('active');
        
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
      });
      
      signupTab.addEventListener('click', function(e) {
        e.preventDefault();
        
        loginForm.classList.add('hidden');
        signupForm.classList.add('active');
        
        loginTab.classList.remove('active');
        signupTab.classList.add('active');
      });
    }
  }
  
  /**
   * Initialize login form
   */
  function initializeLoginForm() {
    const loginForm = document.getElementById('login-form-element');
    
    if (loginForm) {
      loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const rememberMe = document.getElementById('remember-me') ? document.getElementById('remember-me').checked : false;
        
        // Validate form
        if (!validateLoginForm(email, password)) {
          return;
        }
        
        // Show loading state
        toggleLoginLoadingState(true);
        
        // For hackathon demo purposes, simulate login
        setTimeout(() => {
          // Check if user exists (in localStorage)
          const userDataStr = localStorage.getItem('nungo-user-data');
          
          if (userDataStr) {
            const userData = JSON.parse(userDataStr);
            
            // Simple check for demo (in production, would use proper authentication)
            if (email === userData.email) {
              // Store auth token and user data
              const authToken = 'demo-token-' + Math.random().toString(36).substring(2);
              const expiration = rememberMe ? null : new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day if not remember me
              
              // Save auth data
              localStorage.setItem('nungo-auth-token', authToken);
              localStorage.setItem('nungo-auth-state', 'true');
              
              if (expiration) {
                localStorage.setItem('nungo-auth-expiration', expiration.toString());
              } else {
                localStorage.removeItem('nungo-auth-expiration');
              }
              
              // Redirect to dashboard
              window.location.href = 'dashboard.html';
            } else {
              showLoginError('Invalid email or password');
              toggleLoginLoadingState(false);
            }
          } else {
            // If for some reason we need to work with a non-existent user (for demo purposes)
            if (email === 'demo@example.com' && password === 'password') {
              // Create a demo user
              const demoUser = {
                id: 'user-demo',
                name: 'Demo User',
                email: 'demo@example.com',
                avatar: 'https://via.placeholder.com/40'
              };
              
              localStorage.setItem('nungo-user-data', JSON.stringify(demoUser));
              localStorage.setItem('nungo-auth-token', 'demo-token');
              localStorage.setItem('nungo-auth-state', 'true');
              
              // Redirect to dashboard
              window.location.href = 'dashboard.html';
            } else {
              showLoginError('User not found. Please sign up.');
              toggleLoginLoadingState(false);
            }
          }
        }, 1500);
      });
    }
  }
  
  /**
   * Initialize signup form
   */
  function initializeSignupForm() {
    const signupForm = document.getElementById('signup-form-element');
    
    if (signupForm) {
      signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;
        const termsAccepted = document.getElementById('terms') ? document.getElementById('terms').checked : false;
        
        // Validate form
        if (!validateSignupForm(name, email, password, confirmPassword, termsAccepted)) {
          return;
        }
        
        // Show loading state
        toggleSignupLoadingState(true);
        
        // For hackathon demo purposes, simulate account creation
        setTimeout(() => {
          // Store user data (but don't log in yet)
          const userData = {
            id: 'user-' + Math.random().toString(36).substring(2),
            name: name,
            email: email,
            avatar: 'https://via.placeholder.com/40'
          };
          
          localStorage.setItem('nungo-user-data', JSON.stringify(userData));
          
          // Get the form container
          const formContainer = document.querySelector('#signup-form');
          
          if (formContainer) {
            // Create success message
            const successHTML = `
              <div class="signup-success">
                <div class="success-icon">
                  <i class="fas fa-check-circle"></i>
                </div>
                <h3>Account Created Successfully!</h3>
                <p>Your account has been created. You can now login with your credentials.</p>
                <button id="goto-login" class="primary-button" style="margin-top: 20px;">Go to Login</button>
              </div>
            `;
            
            // Update the form HTML
            formContainer.innerHTML = successHTML;
            
            // Add event listener to the button
            document.getElementById('goto-login').addEventListener('click', function() {
              document.getElementById('show-login').click();
            });
            
            // Automatically switch to login after 3 seconds
            setTimeout(() => {
              document.getElementById('show-login').click();
            }, 3000);
          }
        }, 1500);
      });
    }
  }
  
  /**
   * Validate login form
   */
  function validateLoginForm(email, password) {
    // Reset error messages
    document.querySelectorAll('.error-message').forEach(error => {
      error.remove();
    });
    
    // Validate email
    if (!email) {
      showFormError('login-email', 'Email is required');
      return false;
    }
    
    // Simple email validation
    if (!isValidEmail(email)) {
      showFormError('login-email', 'Please enter a valid email');
      return false;
    }
    
    // Validate password
    if (!password) {
      showFormError('login-password', 'Password is required');
      return false;
    }
    
    return true;
  }
  
  /**
   * Validate signup form
   */
  function validateSignupForm(name, email, password, confirmPassword, termsAccepted) {
    // Reset error messages
    document.querySelectorAll('.error-message').forEach(error => {
      error.remove();
    });
    
    // Validate name
    if (!name) {
      showFormError('signup-name', 'Name is required');
      return false;
    }
    
    // Validate email
    if (!email) {
      showFormError('signup-email', 'Email is required');
      return false;
    }
    
    // Simple email validation
    if (!isValidEmail(email)) {
      showFormError('signup-email', 'Please enter a valid email');
      return false;
    }
    
    // Validate password
    if (!password) {
      showFormError('signup-password', 'Password is required');
      return false;
    }
    
    // Password strength validation
    if (password.length < 8) {
      showFormError('signup-password', 'Password must be at least 8 characters');
      return false;
    }
    
    // Validate confirm password
    if (password !== confirmPassword) {
      showFormError('signup-confirm-password', 'Passwords do not match');
      return false;
    }
    
    // Validate terms acceptance
    if (!termsAccepted) {
      showFormError('terms', 'You must accept the terms and conditions');
      return false;
    }
    
    return true;
  }
  
  /**
   * Validate email format
   */
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  /**
   * Show form error message
   */
  function showFormError(fieldId, message) {
    const field = document.getElementById(fieldId);
    
    if (field) {
      // Create error message element
      const errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      errorElement.textContent = message;
      
      // Add error message after the field
      if (field.type === 'checkbox') {
        field.parentNode.insertAdjacentElement('afterend', errorElement);
      } else {
        field.insertAdjacentElement('afterend', errorElement);
      }
      
      // Add error class to field
      field.classList.add('error');
    }
  }
  
  /**
   * Show login error message
   */
  function showLoginError(message) {
    const loginForm = document.getElementById('login-form-element');
    
    if (loginForm) {
      // Remove existing error messages
      const existingError = loginForm.querySelector('.form-error');
      if (existingError) {
        existingError.remove();
      }
      
      // Create error message element
      const errorElement = document.createElement('div');
      errorElement.className = 'form-error';
      errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
      
      // Add error message to the form
      loginForm.insertBefore(errorElement, loginForm.firstChild);
    }
  }
  
  /**
   * Toggle login loading state
   */
  function toggleLoginLoadingState(isLoading) {
    const loginButton = document.querySelector('#login-form-element button[type="submit"]');
    
    if (loginButton) {
      if (isLoading) {
        loginButton.disabled = true;
        loginButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
      } else {
        loginButton.disabled = false;
        loginButton.innerHTML = 'Log In';
      }
    }
  }
  
  /**
   * Toggle signup loading state
   */
  function toggleSignupLoadingState(isLoading) {
    const signupButton = document.querySelector('#signup-form-element button[type="submit"]');
    
    if (signupButton) {
      if (isLoading) {
        signupButton.disabled = true;
        signupButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
      } else {
        signupButton.disabled = false;
        signupButton.innerHTML = 'Sign Up';
      }
    }
  }