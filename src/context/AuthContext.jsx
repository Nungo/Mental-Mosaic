import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('mental-mosaic-auth-token')
    const userData = localStorage.getItem('mental-mosaic-user-data')

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Error parsing user data:', error)
        localStorage.removeItem('mental-mosaic-auth-token')
        localStorage.removeItem('mental-mosaic-user-data')
      }
    }

    setLoading(false)
  }, [])

  const login = async (email, password, rememberMe = false) => {
    // Mock authentication - replace with real API call
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))

      // For demo purposes, accept any login
      const mockUser = {
        id: 'user_' + Date.now(),
        email: email,
        firstName: email.split('@')[0] || 'User',
        lastName: '',
        createdAt: new Date().toISOString()
      }

      const mockToken = 'mock_token_' + Date.now()

      // Save to localStorage
      localStorage.setItem('mental-mosaic-auth-token', mockToken)
      localStorage.setItem('mental-mosaic-user-data', JSON.stringify(mockUser))

      if (rememberMe) {
        localStorage.setItem('mental-mosaic-remember-me', 'true')
      }

      setUser(mockUser)
      setIsAuthenticated(true)

      return { success: true, user: mockUser }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'Login failed. Please try again.' }
    }
  }

  const signup = async (email, password, firstName, lastName) => {
    // Mock signup - replace with real API call
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))

      const newUser = {
        id: 'user_' + Date.now(),
        email: email,
        firstName: firstName,
        lastName: lastName,
        createdAt: new Date().toISOString()
      }

      const mockToken = 'mock_token_' + Date.now()

      // Save to localStorage
      localStorage.setItem('mental-mosaic-auth-token', mockToken)
      localStorage.setItem('mental-mosaic-user-data', JSON.stringify(newUser))

      setUser(newUser)
      setIsAuthenticated(true)

      return { success: true, user: newUser }
    } catch (error) {
      console.error('Signup error:', error)
      return { success: false, error: 'Signup failed. Please try again.' }
    }
  }

  const logout = () => {
    localStorage.removeItem('mental-mosaic-auth-token')
    localStorage.removeItem('mental-mosaic-user-data')
    localStorage.removeItem('mental-mosaic-remember-me')
    setUser(null)
    setIsAuthenticated(false)
  }

  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData }
    localStorage.setItem('mental-mosaic-user-data', JSON.stringify(updatedUser))
    setUser(updatedUser)
  }

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    signup,
    logout,
    updateUser
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
