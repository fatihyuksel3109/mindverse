import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router'; // Import useRouter

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean | null; // null means initial loading state
  isLoading: boolean;
  login: (newToken: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter(); // Get router instance

  useEffect(() => {
    // Check token on initial load
    const loadToken = async () => {
      setIsLoading(true);
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
          setIsAuthenticated(true); // Assume token presence means authenticated initially
          // Optional: Add validation here if needed (call /api/profile)
        } else {
          setIsAuthenticated(false);
        }
      } catch (e) {
        console.error("Failed to load token", e);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    loadToken();
  }, []);

  const login = async (newToken: string) => {
    setIsLoading(true);
    try {
      await AsyncStorage.setItem('token', newToken);
      setToken(newToken);
      setIsAuthenticated(true);
       // router.replace('/'); // Redirect happens in _layout now based on state change
    } catch (e) {
       console.error("Failed to save token", e);
       // Handle error appropriately
    } finally {
        setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem('token');
      setToken(null);
      setIsAuthenticated(false);
      // router.replace('/signin'); // Redirect happens in _layout now based on state change
    } catch (e) {
        console.error("Failed to remove token", e);
        // Handle error appropriately
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};