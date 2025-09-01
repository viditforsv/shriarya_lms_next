'use client'

import { createContext, useContext, useEffect, useState } from 'react'
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
  const [mounted, setMounted] = useState(false)
  const supabase = createClient()

  // Fetch user profile from database
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching profile:', error)
        
        // If profile doesn't exist, create it
        if (error.code === 'PGRST116') {
          console.log('Profile not found, creating new profile for user:', userId)
          const newProfile = await createProfile(userId)
          console.log('Created profile:', newProfile)
          return newProfile
        }
        
        return null
      }

      // Cache the role in session metadata for middleware optimization
      if (data?.role) {
        await supabase.auth.updateUser({
          data: { role: data.role }
        })
      }

      return data as UserProfile
    } catch (error) {
      console.error('Error fetching profile:', error)
      return null
    }
  }

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
      
      // Determine role based on email
      let role: UserRole = 'student'
      if (email === 'vidit@shrividhya.in') {
        role = 'admin'
      }

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

      console.log('Successfully created profile:', data)

      // Cache the role in session metadata
      await supabase.auth.updateUser({
        data: { role: role }
      })

      return data as UserProfile
    } catch (error) {
      console.error('Error creating profile:', error)
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
      const { data, error } = await supabase.rpc('update_user_role', {
        target_user_id: userId,
        new_role: newRole
      })

      if (error) {
        console.error('Error updating user role:', error)
        return false
      }

      // Update cached role in session metadata
      if (userId === user?.id) {
        await supabase.auth.updateUser({
          data: { role: newRole }
        })
        // Refresh profile to update local state
        await refreshProfile()
      }

      return data
    } catch (error) {
      console.error('Error updating user role:', error)
      return false
    }
  }

  // Refresh user profile
  const refreshProfile = async () => {
    if (user) {
      const userProfile = await fetchProfile(user.id)
      setProfile(userProfile)
    }
  }

  useEffect(() => {
    setMounted(true)
    
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
            const userProfile = await fetchProfile(user.id)
            setProfile(userProfile)
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
            
            // Fetch profile if user exists
            if (session?.user) {
              const userProfile = await fetchProfile(session.user.id)
              setProfile(userProfile)
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
  }, [supabase.auth])

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
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('SignOut error:', error)
        throw error
      }
      console.log('SignOut successful')
    } catch (error) {
      console.error('SignOut failed:', error)
      throw error
    }
  }

  const signInWithGoogle = async () => {
    // Use environment variable for production, fallback to localhost only for development
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    
    // Debug logging (remove in production)
    console.log('AuthContext - Site URL:', siteUrl)
    console.log('AuthContext - Environment variable:', process.env.NEXT_PUBLIC_SITE_URL)
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${siteUrl}/auth/callback`,
      },
    })
    if (error) throw error
  }

  const value = {
    user,
    session,
    profile,
    loading: !mounted,
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
