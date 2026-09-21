import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { authService } from '../services/authService';
import { profileService } from '../services/profileService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  /**
   * Builds an immediate fallback athlete user object from Supabase auth user
   */
  const buildInitialUser = (user) => {
    if (!user) return null;
    return {
      id: user.id,
      email: user.email,
      name: user.user_metadata?.full_name || (user.email ? user.email.split('@')[0] : 'Athlete'),
      role: user.user_metadata?.role || 'athlete',
      goal: user.user_metadata?.primary_goal || 'General Fitness',
      tier: 'FitSphere Pro'
    };
  };

  /**
   * Loads the athlete profile from Supabase PostgreSQL
   */
  const loadUserProfile = useCallback(async (userId, userEmail, userMetadata) => {
    try {
      const { data: profile, error } = await profileService.getProfile(userId);
      
      const basicUser = {
        id: userId,
        email: userEmail,
        name: profile?.name || userMetadata?.full_name || (userEmail ? userEmail.split('@')[0] : 'Athlete'),
        role: userMetadata?.role || 'athlete',
        goal: profile?.fitness_goal || userMetadata?.primary_goal || 'General Fitness',
        tier: 'FitSphere Pro'
      };

      setCurrentUser(basicUser);
      setUserProfile(profile || null);
    } catch (err) {
      console.error('Error loading athlete profile:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Refreshes the active profile from Supabase
   */
  const refreshProfile = useCallback(async () => {
    if (!session?.user?.id) return null;
    const { data: profile, error } = await profileService.getProfile(session.user.id);
    if (!error && profile) {
      setUserProfile(profile);
      setCurrentUser((prev) => ({
        ...prev,
        name: profile.name || prev?.name || 'Athlete',
        goal: profile.fitness_goal || prev?.goal || 'General Fitness'
      }));
      return profile;
    }
    return null;
  }, [session]);

  // Synchronize on mount and handle auth state transitions
  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    let mounted = true;

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      if (session?.user) {
        const initialUser = buildInitialUser(session.user);
        setCurrentUser(initialUser);
        setSession(session);
        setIsAuthenticated(true);
        loadUserProfile(session.user.id, session.user.email, session.user.user_metadata);
      } else {
        setSession(null);
        setCurrentUser(null);
        setUserProfile(null);
        setIsAuthenticated(false);
        setLoading(false);
      }
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      if (!mounted) return;
      if (currentSession?.user) {
        const initialUser = buildInitialUser(currentSession.user);
        setCurrentUser(initialUser);
        setSession(currentSession);
        setIsAuthenticated(true);
        await loadUserProfile(currentSession.user.id, currentSession.user.email, currentSession.user.user_metadata);
      } else {
        setSession(null);
        setCurrentUser(null);
        setUserProfile(null);
        setIsAuthenticated(false);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, [loadUserProfile]);

  /**
   * Sign in with Supabase credentials
   */
  const login = async (email, password) => {
    if (!isSupabaseConfigured) {
      return { success: false, error: new Error('Supabase is not configured.') };
    }

    const { data, error } = await authService.signIn({ email, password });
    if (error) {
      return { success: false, error };
    }

    if (data?.session?.user) {
      const initialUser = buildInitialUser(data.session.user);
      setCurrentUser(initialUser);
      setSession(data.session);
      setIsAuthenticated(true);
      await loadUserProfile(data.session.user.id, data.session.user.email, data.session.user.user_metadata);
    }

    return { success: true, data };
  };

  /**
   * Sign out session and purge private profile data from memory
   */
  const logout = async () => {
    if (isSupabaseConfigured) {
      await authService.signOut();
    }
    setSession(null);
    setCurrentUser(null);
    setUserProfile(null);
    setIsAuthenticated(false);
    setLoading(false);
  };

  /**
   * Sign up a new user with Supabase
   */
  const register = async (userData) => {
    if (!isSupabaseConfigured) {
      return { success: false, error: new Error('Supabase is not configured.') };
    }

    const { data, error } = await authService.signUp({
      email: userData.email,
      password: userData.password,
      fullName: userData.name,
      primaryGoal: userData.goal
    });

    if (error) {
      return { success: false, error };
    }

    // If session was established immediately
    if (data?.session?.user) {
      const initialUser = buildInitialUser(data.session.user);
      setCurrentUser(initialUser);
      setSession(data.session);
      setIsAuthenticated(true);
      await loadUserProfile(data.session.user.id, data.session.user.email, data.session.user.user_metadata);
    }

    return { success: true, data };
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        currentUser,
        userProfile,
        isAuthenticated,
        loading,
        isSupabaseConfigured,
        login,
        logout,
        register,
        refreshProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
