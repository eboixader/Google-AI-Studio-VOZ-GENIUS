export interface VoiceOption {
  id: string;
  name: string;
  gender: 'Hombre' | 'Mujer';
  apiVoiceName: string; // The actual name needed for the API
  variantDescription?: string; // Instruction to prompt for slight variation
}

export type Accent = 'España' | 'México' | 'Argentina';
export type Style = 'Alegre' | 'Triste' | 'Susurrar' | 'Storyteller' | 'Natural';

export interface TTSRequest {
  text: string;
  voiceId: string;
  accent: Accent;
  style: Style;
  speed: number; // 0.5 to 2.0
  pitch: number; // -10 to 10 (abstract scale)
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  text: string;
  audioUrl: string; // Blob URL for playback
  duration: number; // Duration in seconds
  voiceName: string;
  style: Style;
}
