import { VoiceOption, Accent, Style } from './types';

// Using the 5 available Gemini voices, creating 10 "Profiles" via prompt engineering hints.
export const VOICES: VoiceOption[] = [
  { id: 'v1', name: 'Mateo', gender: 'Hombre', apiVoiceName: 'Fenrir', variantDescription: 'Standard' },
  { id: 'v2', name: 'Santiago', gender: 'Hombre', apiVoiceName: 'Puck', variantDescription: 'Standard' },
  { id: 'v3', name: 'Diego', gender: 'Hombre', apiVoiceName: 'Charon', variantDescription: 'Standard' },
  { id: 'v4', name: 'Lucas', gender: 'Hombre', apiVoiceName: 'Fenrir', variantDescription: 'Slightly deeper and calmer' },
  { id: 'v5', name: 'Alejandro', gender: 'Hombre', apiVoiceName: 'Puck', variantDescription: 'More energetic' },
  { id: 'v6', name: 'Sofía', gender: 'Mujer', apiVoiceName: 'Kore', variantDescription: 'Standard' },
  { id: 'v7', name: 'Valentina', gender: 'Mujer', apiVoiceName: 'Zephyr', variantDescription: 'Standard' },
  { id: 'v8', name: 'Isabella', gender: 'Mujer', apiVoiceName: 'Kore', variantDescription: 'Soft and gentle' },
  { id: 'v9', name: 'Camila', gender: 'Mujer', apiVoiceName: 'Zephyr', variantDescription: 'Deeper professional tone' },
  { id: 'v10', name: 'Mariana', gender: 'Mujer', apiVoiceName: 'Kore', variantDescription: 'Very cheerful and bright' },
];

export const ACCENTS: Accent[] = ['España', 'México', 'Argentina'];

export const STYLES: Style[] = ['Natural', 'Alegre', 'Triste', 'Susurrar', 'Storyteller'];

export const SPECIAL_TAGS = [
  { label: 'Pausa', tag: '[pausa]', icon: '⏸️' },
  { label: 'Risa', tag: '[risa]', icon: '😄' },
  { label: 'Grito', tag: '[grito]', icon: '📢' },
  { label: 'Llanto', tag: '[llanto]', icon: '😢' },
];
