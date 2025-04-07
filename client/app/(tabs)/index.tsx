import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, I18nManager } from 'react-native';
import { Text, TextInput, Button, useTheme, Card, HelperText } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { Dream } from '../../types/dream';
import { saveDream } from '../../utils/storage';
import { interpretDream } from '../../utils/ai';

export default function HomeScreen() {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const [dreamText, setDreamText] = useState('');
  const [loading, setLoading] = useState(false);
  const [interpretation, setInterpretation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInterpretDream = async () => {
    if (!dreamText.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const dreamInterpretation = await interpretDream(dreamText, i18n.language);
      
      const newDream: Dream = {
        id: Date.now().toString(),
        content: dreamText,
        interpretation: dreamInterpretation,
        date: new Date().toISOString(),
        language: i18n.language,
      };

      await saveDream(newDream);
      setInterpretation(dreamInterpretation);
    } catch (error) {
      console.error('Error interpreting dream:', error);
      setError(t('home.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={[
        styles.contentContainer,
        { alignItems: I18nManager.isRTL ? 'flex-end' : 'flex-start' }
      ]}
    >
      <View style={styles.header}>
        <Text variant="displaySmall" style={[styles.title, { color: theme.colors.primary }]}>
          {t('home.title')}
        </Text>
        <Text variant="titleMedium" style={[styles.subtitle, { color: theme.colors.onSurface }]}>
          {t('home.subtitle')}
        </Text>
      </View>

      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <TextInput
            mode="outlined"
            multiline
            numberOfLines={6}
            value={dreamText}
            onChangeText={(text) => {
              setDreamText(text);
              setError(null);
            }}
            placeholder={t('home.placeholder')}
            style={[styles.input, { textAlign: I18nManager.isRTL ? 'right' : 'left' }]}
            error={!!error}
            theme={{ ...theme, colors: { ...theme.colors, primary: theme.colors.primary } }}
          />
          {error && (
            <HelperText type="error" visible={!!error}>
              {error}
            </HelperText>
          )}
          <Button
            mode="contained"
            onPress={handleInterpretDream}
            loading={loading}
            disabled={loading || !dreamText.trim()}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            {loading ? t('home.loading') : t('home.interpret')}
          </Button>
        </Card.Content>
      </Card>

      {interpretation && (
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text variant="titleMedium" style={[styles.interpretationTitle, { color: theme.colors.primary }]}>
              {t('home.interpretation')}
            </Text>
            <Text style={[
              styles.interpretationText,
              { color: theme.colors.onSurface, textAlign: I18nManager.isRTL ? 'right' : 'left' }
            ]}>
              {interpretation}
            </Text>
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    width: '100%',
    maxWidth: 800,
    alignSelf: 'center',
  },
  header: {
    marginBottom: 32,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    marginBottom: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.8,
  },
  card: {
    marginBottom: 24,
    width: '100%',
    elevation: 4,
    borderRadius: 12,
  },
  input: {
    marginBottom: 16,
    fontSize: 16,
    lineHeight: 24,
  },
  button: {
    marginTop: 8,
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  interpretationTitle: {
    marginBottom: 12,
    fontWeight: 'bold',
  },
  interpretationText: {
    fontSize: 16,
    lineHeight: 24,
  },
});