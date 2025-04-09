import React, { useEffect, useState, createContext, useContext } from 'react';
import { Stack, useRouter, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider, MD3DarkTheme, MD3LightTheme, adaptNavigationTheme } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { ThemeProvider, Theme } from '@react-navigation/native';
import { I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthProvider, useAuth } from '../context/AuthContext';
import '../i18n';

const THEME_KEY = '@theme_mode';

// Custom Paper Themes
const customDarkPaperTheme = {
  ...MD3DarkTheme,
  fonts: MD3DarkTheme.fonts,
  colors: {
    ...MD3DarkTheme.colors,
    background: '#263132',
    surface: '#2f3d3e',
    primary: '#7FDBDA',
    secondary: '#B8E4E3',
    accent: '#E8F8F7',
    text: '#FFFFFF',
    onSurface: '#FFFFFF',
  },
};

const customLightPaperTheme = {
  ...MD3LightTheme,
  fonts: MD3LightTheme.fonts,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#2f3d3e',
    secondary: '#7FDBDA',
    background: '#ffffff',
    surface: MD3LightTheme.colors.surface,
    onSurface: MD3LightTheme.colors.onSurface,
    accent: '#E8F8F7',
    text: '#2f3d3e',
  },
};

// Base Navigation Themes
const baseNavDarkTheme = {
  dark: true,
  colors: {
    primary: customDarkPaperTheme.colors.primary,
    background: customDarkPaperTheme.colors.background,
    card: customDarkPaperTheme.colors.surface,
    text: customDarkPaperTheme.colors.text,
    border: customDarkPaperTheme.colors.onSurface,
    notification: customDarkPaperTheme.colors.accent,
  },
};

const baseNavLightTheme = {
  dark: false,
  colors: {
    primary: customLightPaperTheme.colors.primary,
    background: customLightPaperTheme.colors.background,
    card: customLightPaperTheme.colors.surface,
    text: customLightPaperTheme.colors.text,
    border: customLightPaperTheme.colors.onSurface,
    notification: customLightPaperTheme.colors.accent,
  },
};

// Adapt Navigation Themes
const { DarkTheme: AdaptedNavDarkTheme } = adaptNavigationTheme({
  reactNavigationDark: baseNavDarkTheme,
  materialDark: customDarkPaperTheme,
});
const { LightTheme: AdaptedNavLightTheme } = adaptNavigationTheme({
  reactNavigationLight: baseNavLightTheme,
  materialLight: customLightPaperTheme,
});

export type ThemeType = 'light' | 'dark' | 'system';

export const AppThemeContext = createContext<{
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  isDark: boolean;
}>({
  theme: 'system',
  setTheme: () => {},
  isDark: false,
});

export const useAppTheme = () => useContext(AppThemeContext);

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const systemColorScheme = useColorScheme();
  const [appThemeMode, setAppThemeMode] = useState<ThemeType>('system');

  useEffect(() => {
    const initializeTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_KEY);
        if (savedTheme) {
          setAppThemeMode(savedTheme as ThemeType);
        }
      } catch (error) {
        console.error('Error initializing theme mode:', error);
      }
    };
    initializeTheme();
  }, []);

  const isDark = appThemeMode === 'system' ? systemColorScheme === 'dark' : appThemeMode === 'dark';
  const currentPaperTheme = isDark ? customDarkPaperTheme : customLightPaperTheme;
  const baseAdaptedNavTheme = isDark ? AdaptedNavDarkTheme : AdaptedNavLightTheme;

  const navigationFonts: Theme['fonts'] = {
    regular: { fontFamily: 'System', fontWeight: '400' as const },
    medium: { fontFamily: 'System', fontWeight: '500' as const },
    bold: { fontFamily: 'System', fontWeight: '700' as const },
    heavy: { fontFamily: 'System', fontWeight: '900' as const },
  };

  const finalNavigationTheme: Theme = {
    ...baseAdaptedNavTheme,
    fonts: navigationFonts,
  };

  const setAppTheme = async (newThemeMode: ThemeType) => {
    setAppThemeMode(newThemeMode);
    await AsyncStorage.setItem(THEME_KEY, newThemeMode);
  };

  useEffect(() => {
    if (isLoading) return;

    const publicRoutes = ['/signin', '/signup'];
    const currentRouteBase = pathname.split('?')[0];
    const isPublicRoute = publicRoutes.includes(currentRouteBase);

    console.log(`Auth Check: isLoading=${isLoading}, isAuthenticated=${isAuthenticated}, pathname=${pathname}, isPublicRoute=${isPublicRoute}`);

    if (isAuthenticated === false && !isPublicRoute) {
      console.log("Redirecting to /signin (unauthenticated)");
      router.replace('/signin');
    } else if (isAuthenticated && isPublicRoute) {
      console.log("Redirecting to /(tabs) (authenticated)");
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  if (isLoading) return null;

  return (
    <AppThemeContext.Provider value={{ theme: appThemeMode, setTheme: setAppTheme, isDark }}>
      <PaperProvider theme={currentPaperTheme}>
        <ThemeProvider value={finalNavigationTheme}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
          </Stack>
          <StatusBar style={isDark ? 'light' : 'dark'} />
        </ThemeProvider>
      </PaperProvider>
    </AppThemeContext.Provider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}