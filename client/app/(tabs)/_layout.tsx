import * as Updates from 'expo-updates';
import { Tabs } from 'expo-router';
import { useTheme, IconButton, Menu, Switch, Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { View, Image, StyleSheet, Platform, I18nManager } from 'react-native';
import { useAppTheme } from '../_layout';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';


const LANGUAGES = [
  { code: 'en', flag: '🇺🇸', name: 'English' },
  { code: 'fr', flag: '🇫🇷', name: 'Français' },
  { code: 'tr', flag: '🇹🇷', name: 'Türkçe' },
  { code: 'de', flag: '🇩🇪', name: 'Deutsch' },
  { code: 'ar', flag: '🇸🇦', name: 'العربية' },
];


export default function TabLayout() {
  const theme = useTheme();
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [menuVisible, setMenuVisible] = useState(false);
  const { isDark, setTheme } = useAppTheme();

  const currentLanguage = LANGUAGES.find(lang => lang.code === i18n.language) || LANGUAGES[0];

  const changeLanguage = async (langCode: string) => {
    setMenuVisible(false);
    const isArabic = langCode === 'ar';
  
    if (I18nManager.isRTL !== isArabic) {
      await I18nManager.forceRTL(isArabic);
      await I18nManager.allowRTL(isArabic);
      await i18n.changeLanguage(langCode);
  
      // Only reload in production mode
      if (!__DEV__) {
        await Updates.reloadAsync();
      } else {
        console.warn('Restart the app manually for full RTL effect in development mode.');
      }
    } else {
      await i18n.changeLanguage(langCode);
    }
  };

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: theme.colors.primary,
        headerStyle: {
          backgroundColor: theme.colors.background,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: theme.colors.primary,
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.push('/')}>
          <Image
            source={isDark ? require('../../assets/images/mindverse-dark.png') : require('../../assets/images/mindverse-light.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <View style={styles.headerRight}>
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <IconButton
                  icon={() => (
                    <View style={styles.languageButton}>
                      <Text style={styles.languageFlag}>{currentLanguage.flag}</Text>
                    </View>
                  )}
                  onPress={() => setMenuVisible(true)}
                />
              }>
              {LANGUAGES.map((lang) => (
                <Menu.Item
                  key={lang.code}
                  onPress={() => changeLanguage(lang.code)}
                  title={`${lang.flag} ${lang.name}`}
                  leadingIcon={i18n.language === lang.code ? 'check' : undefined}
                />
              ))}
            </Menu>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              style={styles.switch}
            />
          </View>
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabs.home'),
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: t('tabs.history'),
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="time" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('tabs.settings'),
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('tabs.profile'),
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 48,
    height: 48,
    marginTop: 12,
    marginLeft: I18nManager.isRTL ? 0 : 16,
    marginRight: I18nManager.isRTL ? 16 : 0,
  },
  headerRight: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    marginLeft: I18nManager.isRTL ? 8 : 0,
    marginRight: I18nManager.isRTL ? 0 : 8,
  },
  languageButton: {
    padding: 4,
  },
  languageFlag: {
    fontSize: 20,
  },
  switch: {
    marginHorizontal: 8,
  },
});