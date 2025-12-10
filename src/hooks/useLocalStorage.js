import { useState, useEffect } from 'react'

/**
 * Custom hook for managing localStorage with React state
 * @param {string} key - The localStorage key
 * @param {*} initialValue - The initial value if no value exists in localStorage
 * @returns {[*, Function]} - Returns the current value and a setter function
 */
export const useLocalStorage = (key, initialValue) => {
  // Get initial value from localStorage or use initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Update localStorage when state changes
  const setValue = (value) => {
    try {
      // Allow value to be a function like useState
      const valueToStore = value instanceof Function ? value(storedValue) : value

      setStoredValue(valueToStore)

      // Save to localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue]
}

/**
 * Custom hook for managing array data in localStorage
 * @param {string} key - The localStorage key
 * @returns {[Array, Function, Function, Function]} - Returns [items, addItem, updateItem, deleteItem]
 */
export const useLocalStorageArray = (key) => {
  const [items, setItems] = useLocalStorage(key, [])

  const addItem = (item) => {
    const newItem = {
      ...item,
      id: item.id || generateId(),
      createdAt: item.createdAt || new Date().toISOString()
    }
    setItems([...items, newItem])
    return newItem
  }

  const updateItem = (id, updates) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, ...updates, updatedAt: new Date().toISOString() } : item
    ))
  }

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id))
  }

  const clearItems = () => {
    setItems([])
  }

  return { items, addItem, updateItem, deleteItem, clearItems, setItems }
}

/**
 * Generate a unique ID
 * @param {string} prefix - Optional prefix for the ID
 * @returns {string} - A unique ID
 */
const generateId = (prefix = 'item') => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
