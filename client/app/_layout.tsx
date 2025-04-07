import { useEffect, useState } from 'react';
import { Stack, useRouter, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider, MD3DarkTheme, MD3LightTheme, adaptNavigationTheme } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from '@react-navigation/native';
import { I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import '../i18n';

// Theme storage key
const THEME_KEY = '@theme_mode';

// Custom themes
const customDarkTheme = {
  ...MD3DarkTheme,
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

const customLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#2f3d3e',
    secondary: '#7FDBDA',
    background: '#ffffff',
  },
};

export type ThemeType = 'light' | 'dark' | 'system';

// Theme Context
import { createContext, useContext } from 'react';

export const ThemeContext = createContext<{
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  isDark: boolean;
}>({
  theme: 'system',
  setTheme: () => {},
  isDark: false,
});

export const useAppTheme = () => useContext(ThemeContext);

export default function RootLayout() {
  const systemColorScheme = useColorScheme();
  const [themeType, setThemeType] = useState<ThemeType>('system');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_KEY);
        if (savedTheme) {
          setThemeType(savedTheme as ThemeType);
        }
        const token = await AsyncStorage.getItem('token');
        setIsAuthenticated(!!token);
      } catch (error) {
        console.error('Error initializing app:', error);
        setIsAuthenticated(false);
      }
    };
    initializeApp();
  }, []);

  const isDark = themeType === 'system' 
    ? systemColorScheme === 'dark'
    : themeType === 'dark';

  const theme = isDark ? customDarkTheme : customLightTheme;

  const mapToNavigationTheme = (theme: any) => ({
    dark: theme.dark,
    colors: {
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.surface,
      text: theme.colors.text,
      border: theme.colors.onSurface,
      notification: theme.colors.accent,
    },
    fonts: theme.fonts,
  });

  const { DarkTheme, LightTheme } = adaptNavigationTheme({
    reactNavigationDark: mapToNavigationTheme(customDarkTheme),
    reactNavigationLight: mapToNavigationTheme(customLightTheme),
  });

  const navigationTheme = {
    ...(isDark ? DarkTheme : LightTheme),
    fonts: {
      regular: { fontFamily: 'sans-serif', fontWeight: 'normal' as const },
      medium: { fontFamily: 'sans-serif-medium', fontWeight: '500' as const },
      bold: { fontFamily: 'sans-serif-bold', fontWeight: 'bold' as const },
      heavy: { fontFamily: 'sans-serif-bold', fontWeight: '900' as const },
    },
  };

  const setTheme = async (newTheme: ThemeType) => {
    setThemeType(newTheme);
    await AsyncStorage.setItem(THEME_KEY, newTheme);
  };

  useEffect(() => {
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(false);
  }, []);

  useEffect(() => {
    if (isAuthenticated === null) return;

    const publicRoutes = ['/signin', '/signup'];
    const isPublicRoute = publicRoutes.includes(pathname);

    if (!isAuthenticated && !isPublicRoute) {
      router.replace('/signin' as any); // Type assertion to bypass error
    } else if (isAuthenticated && isPublicRoute) {
      router.replace('/' as any); // Type assertion to bypass error
    }
  }, [isAuthenticated, pathname, router]);

  if (isAuthenticated === null) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme: themeType, setTheme, isDark }}>
      <PaperProvider theme={isDark ? customDarkTheme : customLightTheme}>
        <ThemeProvider value={navigationTheme}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style={isDark ? 'light' : 'dark'} />
        </ThemeProvider>
      </PaperProvider>
    </ThemeContext.Provider>
  );
}