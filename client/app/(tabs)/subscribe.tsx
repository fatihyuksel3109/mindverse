import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, useTheme, Card } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { subscriptionPlans } from '@/types/subscription';

export default function SubscribeScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const { token, fetchUserData } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (planId: string) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/subscribe', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId }),
      });
      const data = await response.json();
      if (response.ok) {
        await fetchUserData(); // Refresh credits
        console.log('Subscription successful:', data);
      } else {
        console.error('Subscription failed:', data.error);
      }
    } catch (error) {
      console.error('Error subscribing:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.primary }]}>
        {t('subscribe.title')}
      </Text>
      {subscriptionPlans.map((plan) => (
        <Card key={plan.id} style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text style={[styles.planName, { color: theme.colors.onSurface }]}>
              {plan.name}
            </Text>
            <Text style={[styles.planPrice, { color: theme.colors.primary }]}>
              ₺{plan.price}
            </Text>
            <Button
              mode="contained"
              onPress={() => handleSubscribe(plan.id)}
              disabled={loading}
              style={styles.button}
            >
              {t('subscribe.buy')}
            </Button>
          </Card.Content>
        </Card>
      ))}
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
  card: {
    marginBottom: 16,
    padding: 16,
  },
  planName: {
    fontSize: 18,
    marginBottom: 8,
  },
  planPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  button: {
    borderRadius: 8,
  },
});