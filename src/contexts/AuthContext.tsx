'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import { UserProfile, UserRole } from '@/types/auth'

interface AuthContextType {
  user: User | null
  session: Session | null
  profile: UserProfile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, fullName: string, role?: UserRole) => Promise<void>
  signOut: () => Promise<void>
  signInWithGoogle: () => Promise<void>
  updateUserRole: (userId: string, newRole: UserRole) => Promise<boolean>
  refreshProfile: () => Promise<void>
  hasPermission: (permission: keyof RolePermissions) => boolean
}

interface RolePermissions {
  canViewAllUsers: boolean
  canManageCourses: boolean
  canManageUsers: boolean
  canAccessAnalytics: boolean
  canCreateContent: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [profileCache, setProfileCache] = useState<Map<string, UserProfile>>(new Map())
  const supabase = createClient()

  // Persist profile in localStorage for faster loading
  useEffect(() => {
    if (profile && typeof window !== 'undefined') {
      localStorage.setItem('shriarya-profile', JSON.stringify(profile))
    }
  }, [profile])

  // Load profile from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && !profile) {
      const savedProfile = localStorage.getItem('shriarya-profile')
      if (savedProfile) {
        try {
          const parsedProfile = JSON.parse(savedProfile)
          setProfile(parsedProfile)
          console.log('Loaded profile from localStorage:', parsedProfile)
        } catch (error) {
          console.error('Error parsing saved profile:', error)
          localStorage.removeItem('shriarya-profile')
        }
      }
    }
  }, [profile]) // Add profile dependency

    // Fetch user profile from database with retry logic
  const fetchProfile = useCallback(async (userId: string, retries = 2) => {
    try {
      console.log('Fetching profile for user ID:', userId)
      
      // Check cache first
      const cachedProfile = profileCache.get(userId)
      if (cachedProfile) {
        console.log('Using cached profile for user:', userId)
        return cachedProfile
      }
      
      // Check localStorage as fallback
      if (typeof window !== 'undefined') {
        const savedProfile = localStorage.getItem('shriarya-profile')
        if (savedProfile) {
          try {
            const parsedProfile = JSON.parse(savedProfile)
            if (parsedProfile.id === userId) {
              console.log('Using localStorage profile for user:', userId)
              setProfileCache(prev => new Map(prev).set(userId, parsedProfile))
              return parsedProfile
            }
          } catch (error) {
            console.error('Error parsing localStorage profile:', error)
            localStorage.removeItem('shriarya-profile')
          }
        }
      }
      
      // Add timeout to prevent hanging (reduced to 5s for faster failure)
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Profile fetch timeout')), 5000) // 5 second timeout
      })
      
      const fetchPromise = supabase
        .from('profiles')
        .select('id, first_name, last_name, email, role, created_at, updated_at')
        .eq('id', userId)
        .single()

      const { data, error } = await Promise.race([fetchPromise, timeoutPromise]) as { data: UserProfile | null; error: { code?: string; message?: string } | null }

      console.log('Profile fetch result:', { data, error })

      if (error) {
        console.error('Error fetching profile:', error)
        
        // If profile doesn't exist, create it
        if (error.code === 'PGRST116') {
          console.log('Profile not found, creating new profile for user:', userId)
          const newProfile = await createProfile(userId)
          if (newProfile) {
            setProfileCache(prev => new Map(prev).set(userId, newProfile))
          }
          console.log('Created profile:', newProfile)
          return newProfile
        }
        
        // If it's a timeout or network error, create a fallback profile
        if (error.message?.includes('timeout') || error.message?.includes('network') || error.message?.includes('fetch')) {
          console.log('Network/timeout error, creating fallback profile for user:', userId)
          const fallbackProfile = await createFallbackProfile(userId)
          if (fallbackProfile) {
            setProfileCache(prev => new Map(prev).set(userId, fallbackProfile))
          }
          return fallbackProfile
        }
        
        return null
      }

      console.log('Successfully fetched profile:', data)

      // Cache the profile
      setProfileCache(prev => new Map(prev).set(userId, data as UserProfile))

      return data as UserProfile
    } catch (error) {
      console.error('Error fetching profile:', error)
      
      // Retry logic for timeout errors with exponential backoff
      if (retries > 0 && error instanceof Error && error.message.includes('timeout')) {
        const delay = Math.pow(2, 3 - retries) * 1000 // Exponential backoff: 1s, 2s, 4s
        console.log(`Retrying profile fetch (${retries} attempts left) after ${delay}ms...`)
        await new Promise(resolve => setTimeout(resolve, delay))
        return fetchProfile(userId, retries - 1)
      }
      
      // If all retries failed, create a fallback profile
      console.log('All retries failed, creating fallback profile for user:', userId)
      const fallbackProfile = await createFallbackProfile(userId)
      if (fallbackProfile) {
        setProfileCache(prev => new Map(prev).set(userId, fallbackProfile))
      }
      return fallbackProfile
    }
  }, [supabase, profileCache, createFallbackProfile, createProfile])

  // Create user profile if it doesn't exist
  const createProfile = async (userId: string) => {
    try {
      // Get user data from auth.users
      const { data: userData, error: userError } = await supabase.auth.getUser()
      
      if (userError || !userData.user) {
        console.error('Error getting user data:', userError)
        return null
      }

      const user = userData.user
      const email = user.email || ''
      
      // All new users get student role by default
      const role: UserRole = 'student'
      console.log('Setting default role student for email:', email)

      // Extract name from user metadata
      const fullName = user.user_metadata?.full_name || user.user_metadata?.name || ''
      const firstName = user.user_metadata?.first_name || fullName.split(' ')[0] || ''
      const lastName = user.user_metadata?.last_name || fullName.split(' ').slice(1).join(' ') || ''

      // Insert new profile
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          first_name: firstName,
          last_name: lastName,
          email: email,
          role: role
        })
        .select()
        .single()

      if (error) {
        console.error('Error creating profile:', error)
        console.error('Profile data attempted:', {
          id: userId,
          first_name: firstName,
          last_name: lastName,
          role: role
        })
        return null
      }

      console.log('Successfully created profile with role:', role, 'for email:', email)

      // Remove client-side role update to prevent admin demotion
      // Role should only be managed server-side for security

      return data as UserProfile
    } catch (error) {
      console.error('Error creating profile:', error)
      return null
    }
  }

  // Create fallback profile when database is unavailable
  const createFallbackProfile = async (userId: string) => {
    try {
      console.log('Creating fallback profile for user:', userId)
      
      // Get user data from auth.users
      const { data: userData, error: userError } = await supabase.auth.getUser()
      
      if (userError || !userData.user) {
        console.error('Error getting user data for fallback profile:', userError)
        return null
      }

      const user = userData.user
      const email = user.email || ''
      
      // All fallback users get student role by default
      const role: UserRole = 'student'
      
      // Extract name from user metadata
      const fullName = user.user_metadata?.full_name || user.user_metadata?.name || ''
      const firstName = user.user_metadata?.first_name || fullName.split(' ')[0] || ''
      const lastName = user.user_metadata?.last_name || fullName.split(' ').slice(1).join(' ') || ''

      // Create fallback profile object (not saved to database)
      const fallbackProfile: UserProfile = {
        id: userId,
        full_name: fullName || null,
        first_name: firstName || null,
        last_name: lastName || null,
        email: email || null,
        role: role,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      console.log('Successfully created fallback profile with role:', role, 'for email:', email)
      
      // Save to localStorage for persistence
      if (typeof window !== 'undefined') {
        localStorage.setItem('shriarya-profile', JSON.stringify(fallbackProfile))
      }

      return fallbackProfile
    } catch (error) {
      console.error('Error creating fallback profile:', error)
      return null
    }
  }

  // Check if user has specific permission
  const hasPermission = (permission: keyof RolePermissions): boolean => {
    if (!profile) return false
    
    const permissions: Record<UserRole, RolePermissions> = {
      student: {
        canViewAllUsers: false,
        canManageCourses: false,
        canManageUsers: false,
        canAccessAnalytics: false,
        canCreateContent: false,
      },
      admin: {
        canViewAllUsers: true,
        canManageCourses: true,
        canManageUsers: true,
        canAccessAnalytics: true,
        canCreateContent: true,
      },
    }

    return permissions[profile.role]?.[permission] || false
  }

  // Update user role (admin only)
  const updateUserRole = async (userId: string, newRole: UserRole): Promise<boolean> => {
    if (!hasPermission('canManageUsers')) {
      throw new Error('Insufficient permissions')
    }

    try {
      // Update the role in the profiles table
      const { data, error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId)
        .select()
        .single()

      if (error) {
        console.error('Error updating user role in profiles:', error)
        return false
      }

      // Update cached role in session metadata (for current user only)
      if (userId === user?.id) {
        try {
          await supabase.auth.updateUser({
            data: { role: newRole }
          })
          console.log('Successfully updated current user metadata with role:', newRole)
          // Refresh profile to update local state
          await refreshProfile()
        } catch (error) {
          console.error('Error updating current user metadata:', error)
        }
      }

      return !!data
    } catch (error) {
      console.error('Error updating user role:', error)
      return false
    }
  }

  // Refresh user profile with error handling
  const refreshProfile = async () => {
    if (user) {
      try {
        const userProfile = await fetchProfile(user.id)
        setProfile(userProfile)
      } catch (error) {
        console.error('Error refreshing profile:', error)
        // Don't crash the app, just log the error
      }
    }
  }

  useEffect(() => {
    // Only run auth logic in browser
    if (typeof window !== 'undefined') {
      // Get initial session
      const getSession = async () => {
        try {
          console.log('Getting initial session...')
          
          // Try to get current user first
          const { data: { user: currentUser } } = await supabase.auth.getUser()
          console.log('Current user result:', { user: !!currentUser, email: currentUser?.email })
          
          // Then get session
          const { data: { session } } = await supabase.auth.getSession()
          console.log('Session result:', { session: !!session, user: session?.user?.email })
          
          // Use current user if session is not available
          const user = session?.user || currentUser
          setSession(session)
          setUser(user)
          
          // Fetch profile if user exists
          if (user) {
            try {
              const userProfile = await fetchProfile(user.id)
              setProfile(userProfile)
            } catch (error) {
              console.error('Error fetching profile during session init:', error)
              // Continue without crashing
            }
          }
        } catch (error) {
          console.error('Error getting session:', error)
        } finally {
          setLoading(false)
        }
      }

      getSession()

      // Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          try {
            setSession(session)
            setUser(session?.user ?? null)
            
            // Handle signout event - redirect to login page
            if (event === 'SIGNED_OUT') {
              console.log('User signed out, redirecting to login page')
              if (typeof window !== 'undefined') {
                window.location.href = '/auth'
              }
              return
            }
            
            // Handle signin event - redirect to enrolled courses (only for email/password login)
            if (event === 'SIGNED_IN' && session?.user) {
              console.log('User signed in, checking if redirect is needed')
              if (typeof window !== 'undefined') {
                // Only redirect if we're not already on the enrolled courses page
                // and not coming from OAuth callback (which handles its own redirect)
                const currentPath = window.location.pathname
                const isFromCallback = document.referrer.includes('/auth/callback')
                
                if (currentPath !== '/courses/enrolled' && !isFromCallback) {
                  console.log('Redirecting to enrolled courses after login')
                  setTimeout(() => {
                    window.location.href = '/courses/enrolled'
                  }, 100)
                } else {
                  console.log('Skipping redirect - already on target page or from OAuth callback')
                }
              }
              return
            }
            
            // Fetch profile if user exists
            if (session?.user) {
              try {
                const userProfile = await fetchProfile(session.user.id)
                setProfile(userProfile)
              } catch (error) {
                console.error('Error fetching profile during auth state change:', error)
                // Continue without crashing
              }
            } else {
              setProfile(null)
            }
          } catch (error) {
            console.error('Error in auth state change:', error)
          } finally {
            setLoading(false)
          }
        }
      )

      return () => subscription.unsubscribe()
    } else {
      setLoading(false)
    }
  }, [supabase.auth, fetchProfile])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
  }

  const signUp = async (email: string, password: string, fullName: string, role: UserRole = 'student') => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role,
        },
      },
    })
    if (error) throw error
  }

  const signOut = async () => {
    console.log('SignOut function called')
    try {
      // Clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('shriarya-profile')
        console.log('Cleared localStorage profile')
      }
      
      // Clear profile cache
      setProfileCache(new Map())
      console.log('Cleared profile cache')
      
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('SignOut error:', error)
        throw error
      }
      console.log('SignOut successful')
      
      // Redirect to login page after successful signout
      if (typeof window !== 'undefined') {
        window.location.href = '/auth'
      }
    } catch (error) {
      console.error('SignOut failed:', error)
      throw error
    }
  }

  const signInWithGoogle = async () => {
    // Automatically detect environment and use appropriate URL
    let siteUrl: string
    
    if (typeof window !== 'undefined') {
      // Client-side: use current origin
      siteUrl = window.location.origin
    } else {
      // Server-side: use environment variable or fallback
      siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    }
    
    // Debug logging
    console.log('AuthContext - Site URL:', siteUrl)
    console.log('AuthContext - Environment variable:', process.env.NEXT_PUBLIC_SITE_URL)
    console.log('AuthContext - Current location:', typeof window !== 'undefined' ? window.location.origin : 'server')
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${siteUrl}/auth/callback`,
        // Force Supabase to use the specific redirect URL
        queryParams: {
          redirect_to: `${siteUrl}/auth/callback`
        }
      },
    })
    if (error) {
      console.error('Google OAuth error:', error)
      throw error
    }
  }

  const value = {
    user,
    session,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    updateUserRole,
    refreshProfile,
    hasPermission,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
