'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

interface SessionManager {
  isSessionValid: boolean
  isRefreshing: boolean
  lastRefresh: number | null
}

export function useSessionPersistence() {
  const [sessionState, setSessionState] = useState<SessionManager>({
    isSessionValid: false,
    isRefreshing: false,
    lastRefresh: null
  })

  useEffect(() => {
    const supabase = createClient()
    
    // Check initial session
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Session check error:', error)
          setSessionState(prev => ({ ...prev, isSessionValid: false }))
          return
        }

        if (session) {
          setSessionState(prev => ({ 
            ...prev, 
            isSessionValid: true,
            lastRefresh: Date.now()
          }))
        } else {
          setSessionState(prev => ({ ...prev, isSessionValid: false }))
        }
      } catch (error) {
        console.error('Session check failed:', error)
        setSessionState(prev => ({ ...prev, isSessionValid: false }))
      }
    }

    // Initial check
    checkSession()

    // Set up session refresh interval (every 5 minutes)
    const refreshInterval = setInterval(async () => {
      try {
        setSessionState(prev => ({ ...prev, isRefreshing: true }))
        
        const { data: { session }, error } = await supabase.auth.refreshSession()
        
        if (error) {
          console.error('Session refresh error:', error)
          setSessionState(prev => ({ 
            ...prev, 
            isSessionValid: false,
            isRefreshing: false 
          }))
        } else if (session) {
          setSessionState(prev => ({ 
            ...prev, 
            isSessionValid: true,
            isRefreshing: false,
            lastRefresh: Date.now()
          }))
        }
      } catch (error) {
        console.error('Session refresh failed:', error)
        setSessionState(prev => ({ 
          ...prev, 
          isSessionValid: false,
          isRefreshing: false 
        }))
      }
    }, 5 * 60 * 1000) // 5 minutes

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session ? 'session exists' : 'no session')
        
        switch (event) {
          case 'SIGNED_IN':
            setSessionState(prev => ({ 
              ...prev, 
              isSessionValid: true,
              lastRefresh: Date.now()
            }))
            break
            
          case 'SIGNED_OUT':
            setSessionState(prev => ({ 
              ...prev, 
              isSessionValid: false,
              lastRefresh: null
            }))
            break
            
          case 'TOKEN_REFRESHED':
            setSessionState(prev => ({ 
              ...prev, 
              isSessionValid: true,
              isRefreshing: false,
              lastRefresh: Date.now()
            }))
            break
        }
      }
    )

    // Cleanup
    return () => {
      clearInterval(refreshInterval)
      subscription.unsubscribe()
    }
  }, [])

  return sessionState
}

// Enhanced session storage utilities
export class SessionStorage {
  private static readonly SESSION_KEY = 'shriarya-lms-session'
  private static readonly REFRESH_KEY = 'shriarya-lms-refresh'
  private static readonly USER_KEY = 'shriarya-lms-user'

  static saveSession(session: any) {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(session))
      localStorage.setItem(this.REFRESH_KEY, Date.now().toString())
    } catch (error) {
      console.error('Failed to save session:', error)
    }
  }

  static getSession() {
    if (typeof window === 'undefined') return null
    
    try {
      const sessionData = localStorage.getItem(this.SESSION_KEY)
      return sessionData ? JSON.parse(sessionData) : null
    } catch (error) {
      console.error('Failed to get session:', error)
      return null
    }
  }

  static saveUser(user: any) {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user))
    } catch (error) {
      console.error('Failed to save user:', error)
    }
  }

  static getUser() {
    if (typeof window === 'undefined') return null
    
    try {
      const userData = localStorage.getItem(this.USER_KEY)
      return userData ? JSON.parse(userData) : null
    } catch (error) {
      console.error('Failed to get user:', error)
      return null
    }
  }

  static clearSession() {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.removeItem(this.SESSION_KEY)
      localStorage.removeItem(this.REFRESH_KEY)
      localStorage.removeItem(this.USER_KEY)
    } catch (error) {
      console.error('Failed to clear session:', error)
    }
  }

  static getLastRefresh() {
    if (typeof window === 'undefined') return null
    
    try {
      const refreshTime = localStorage.getItem(this.REFRESH_KEY)
      return refreshTime ? parseInt(refreshTime) : null
    } catch (error) {
      console.error('Failed to get last refresh:', error)
      return null
    }
  }

  static isSessionExpired(maxAge: number = 30 * 24 * 60 * 60 * 1000) { // 30 days default
    const lastRefresh = this.getLastRefresh()
    if (!lastRefresh) return true
    
    return Date.now() - lastRefresh > maxAge
  }
}

// Session persistence hook for components
export function usePersistentSession() {
  const [isLoading, setIsLoading] = useState(true)
  const [session, setSession] = useState<any>(null)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const supabase = createClient()
    
    // Try to restore session from storage
    const restoreSession = async () => {
      try {
        // Check if we have a valid session in storage
        const storedSession = SessionStorage.getSession()
        const storedUser = SessionStorage.getUser()
        
        if (storedSession && !SessionStorage.isSessionExpired()) {
          setSession(storedSession)
          setUser(storedUser)
        }

        // Verify with Supabase
        const { data: { session: currentSession }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Session verification error:', error)
          SessionStorage.clearSession()
        } else if (currentSession) {
          setSession(currentSession)
          setUser(currentSession.user)
          SessionStorage.saveSession(currentSession)
          SessionStorage.saveUser(currentSession.user)
        } else {
          SessionStorage.clearSession()
        }
      } catch (error) {
        console.error('Session restoration failed:', error)
        SessionStorage.clearSession()
      } finally {
        setIsLoading(false)
      }
    }

    restoreSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          setSession(session)
          setUser(session.user)
          SessionStorage.saveSession(session)
          SessionStorage.saveUser(session.user)
        } else {
          setSession(null)
          setUser(null)
          SessionStorage.clearSession()
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return {
    session,
    user,
    isLoading,
    isAuthenticated: !!session
  }
}
