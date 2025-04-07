import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, IconButton, useTheme, Button } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { Dream } from '../../types/dream';
import { getDreams, deleteDream } from '../../utils/storage';

export default function HistoryScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [dreams, setDreams] = useState<Dream[]>([]);

  useEffect(() => {
    loadDreams();
  }, []);

  const loadDreams = async () => {
    const loadedDreams = await getDreams();
    setDreams(loadedDreams);
  };

  const handleDelete = async (id: string) => {
    await deleteDream(id);
    await loadDreams();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.primary }]}>
        {t('history.title')}
      </Text>

      {dreams.length === 0 ? (
        <Card style={[styles.emptyCard, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text style={{ color: theme.colors.onSurface, textAlign: 'center' }}>
              {t('history.empty')}
            </Text>
          </Card.Content>
        </Card>
      ) : (
        dreams.map((dream) => (
          <Card
            key={dream.id}
            style={[styles.card, { backgroundColor: theme.colors.surface }]}
          >
            <Card.Content>
              <View style={styles.dateContainer}>
                <Text style={{ color: theme.colors.primary }}>
                  {formatDate(dream.date)}
                </Text>
                <IconButton
                  icon="delete"
                  size={20}
                  onPress={() => handleDelete(dream.id)}
                  iconColor={theme.colors.error}
                />
              </View>
              <Text style={[styles.dreamContent, { color: theme.colors.onSurface }]}>
                {dream.content}
              </Text>
              <Text style={[styles.interpretation, { color: theme.colors.onSurface }]}>
                {dream.interpretation}
              </Text>
            </Card.Content>
          </Card>
        ))
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
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
  },
  emptyCard: {
    padding: 16,
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dreamContent: {
    marginBottom: 12,
    fontStyle: 'italic',
  },
  interpretation: {
    lineHeight: 20,
  },
});