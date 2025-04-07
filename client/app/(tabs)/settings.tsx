import React from 'react';
import { StyleSheet, ScrollView, I18nManager } from 'react-native';
import { Text, List, Switch, useTheme, Divider } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '../_layout'; 

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ar', name: 'العربية' },
];

export default function SettingsScreen() {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const { isDark, setTheme } = useAppTheme(); 

  const changeLanguage = async (langCode: string) => {
    if (langCode === 'ar' && !I18nManager.isRTL) {
      I18nManager.forceRTL(true);
    } else if (langCode !== 'ar' && I18nManager.isRTL) {
      I18nManager.forceRTL(false);
    }
    await i18n.changeLanguage(langCode);
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.primary }]}>
        {t('settings.title')}
      </Text>

      <List.Section>
        <List.Item
          title={t('settings.darkMode')}
          left={props => <List.Icon {...props} icon="theme-light-dark" />}
          right={() => (
            <Switch
              value={isDark}
              onValueChange={() => setTheme(isDark ? 'light' : 'dark')}
            />
          )}
        />
        <Divider />
        <List.Subheader>{t('settings.language')}</List.Subheader>
        {LANGUAGES.map((lang) => (
          <List.Item
            key={lang.code}
            title={lang.name}
            left={props => <List.Icon {...props} icon="translate" />}
            onPress={() => changeLanguage(lang.code)}
            right={() => (
              i18n.language === lang.code && <List.Icon icon="check" />
            )}
          />
        ))}
        <Divider />
        <List.Item
          title={t('settings.about')}
          left={props => <List.Icon {...props} icon="information" />}
          onPress={() => {}}
        />
      </List.Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
  },
});
