import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean | null;
  isLoading: boolean;
  interpretationCredits: number;
  login: (newToken: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [interpretationCredits, setInterpretationCredits] = useState(0);
  const router = useRouter();

  const fetchUserData = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      if (!storedToken) {
        setIsAuthenticated(false);
        setInterpretationCredits(0);
        return;
      }
      const response = await fetch('http://localhost:3000/api/profile', {
        headers: { 'Authorization': `Bearer ${storedToken}` },
      });
      const data = await response.json();
      if (response.ok) {
        setToken(storedToken);
        setIsAuthenticated(true);
        setInterpretationCredits(data.interpretationCredits || 0);
      } else {
        setIsAuthenticated(false);
        setInterpretationCredits(0);
      }
    } catch (e) {
      console.error('Failed to fetch user data', e);
      setIsAuthenticated(false);
      setInterpretationCredits(0);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const login = async (newToken: string) => {
    setIsLoading(true);
    try {
      await AsyncStorage.setItem('token', newToken);
      setToken(newToken);
      setIsAuthenticated(true);
      await fetchUserData(); // Fetch credits after login
    } catch (e) {
      console.error('Failed to save token', e);
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
      setInterpretationCredits(0);
    } catch (e) {
      console.error('Failed to remove token', e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, isLoading, interpretationCredits, login, logout, fetchUserData }}>
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