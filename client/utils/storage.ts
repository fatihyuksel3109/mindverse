import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dream } from '../types/dream';

const DREAMS_KEY = '@mindverse_dreams';
const MAX_DREAMS = 5;

export const saveDream = async (dream: Dream) => {
  try {
    const existingDreams = await getDreams();
    const updatedDreams = [dream, ...existingDreams].slice(0, MAX_DREAMS);
    await AsyncStorage.setItem(DREAMS_KEY, JSON.stringify(updatedDreams));
    return updatedDreams;
  } catch (error) {
    console.error('Error saving dream:', error);
    throw error;
  }
};

export const getDreams = async (): Promise<Dream[]> => {
  try {
    const dreams = await AsyncStorage.getItem(DREAMS_KEY);
    return dreams ? JSON.parse(dreams) : [];
  } catch (error) {
    console.error('Error getting dreams:', error);
    return [];
  }
};

export const deleteDream = async (id: string) => {
  try {
    const dreams = await getDreams();
    const updatedDreams = dreams.filter(dream => dream.id !== id);
    await AsyncStorage.setItem(DREAMS_KEY, JSON.stringify(updatedDreams));
    return updatedDreams;
  } catch (error) {
    console.error('Error deleting dream:', error);
    throw error;
  }
};