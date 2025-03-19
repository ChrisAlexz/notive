// src/components/context/UserAuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../../supabase';

// 1. Create the context with a default shape
const UserAuthContext = createContext({
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {}
});

// 2. The provider component
export function UserAuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // A) Get current session on mount
    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) console.error('Error fetching session:', error);
      console.log('UserAuthProvider -> getSession:', session);
      setUser(session?.user || null);
    };
    getSession();

    // B) Listen for sign-in/out changes
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('UserAuthProvider -> onAuthStateChange:', event, session);
        setUser(session?.user || null);
      }
    );

    // Cleanup
    return () => {
      subscription?.subscription?.unsubscribe();
    };
  }, []);

  // Helper to store user in state after manual login
  const login = (userData) => {
    setUser(userData);
  };

  // Helper to logout
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <UserAuthContext.Provider value={{ isLoggedIn: !!user, user, login, logout }}>
      {children}
    </UserAuthContext.Provider>
  );
}

// 3. Export the context by default
export default UserAuthContext;
