import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { I18nManager } from 'react-native';
import { useAuth } from '@/context/AuthContext';

const API_URL = 'http://localhost:3000'; // TODO: Move to environment variable

export default function ProfileScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslation();
  const { logout, token } = useAuth(); // Use AuthContext
  const [userData, setUserData] = useState<{ email: string; createdAt: string } | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        
        if (!token) {
          console.log('No token found, redirecting to signin');
          router.replace('/signin');
          return;
        }

        console.log('Fetching profile from:', `${API_URL}/api/profile`);
        
        const response = await fetch(`${API_URL}/api/profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        console.log('Profile response:', response.status, data);
        
        if (response.ok) {
          setUserData(data);
        } else {
          setError(data.error || t('profile.loadFailed'));
        }
      } catch (err) {
        console.error('Profile fetch error:', err);
        setError(t('profile.networkError'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [router, t, token]); // Add token as dependency

  const handleSignOut = async () => {
    try {
      await logout();
      console.log('Logged out via AuthContext');
      // No need for router.replace here; _layout.tsx will handle it
    } catch (error) {
      console.error('Sign out error:', error);
      setError(t('profile.signOutFailed'));
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={styles.loading}>{t('profile.loading')}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.primary }]}>
        {t('profile.title')}
      </Text>
      {error ? (
        <>
          <Text style={styles.error}>{error}</Text>
          <Button mode="contained" onPress={handleSignOut} style={styles.button}>
            {t('profile.signOut')}
          </Button>
        </>
      ) : (
        <>
          <Text style={styles.info}>{t('profile.email')}: {userData?.email}</Text>
          <Text style={styles.info}>
            {t('profile.joined')}: {new Date(userData?.createdAt || '').toLocaleDateString()}
          </Text>
          <Button mode="contained" onPress={handleSignOut} style={styles.button}>
            {t('profile.signOut')}
          </Button>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  info: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: I18nManager.isRTL ? 'right' : 'center',
  },
  button: {
    marginVertical: 16,
  },
  error: {
    color: 'red',
    textAlign: I18nManager.isRTL ? 'right' : 'center',
    marginBottom: 16,
  },
  loading: {
    textAlign: 'center',
    fontSize: 16,
  },
});