export interface Dream {
  id: string;
  content: string;
  interpretation: string;
  date: string;
  language: string;
}

export interface DreamState {
  dreams: Dream[];
  loading: boolean;
  error: string | null;
}