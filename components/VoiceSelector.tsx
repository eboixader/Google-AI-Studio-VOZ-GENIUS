import React from 'react';
import { VoiceOption } from '../types';
import { VOICES } from '../constants';
import { Check, Mic } from 'lucide-react';

interface VoiceSelectorProps {
  selectedVoiceId: string;
  onSelect: (id: string) => void;
}

export const VoiceSelector: React.FC<VoiceSelectorProps> = ({ selectedVoiceId, onSelect }) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-300 uppercase tracking-wider">
        1. Selecciona una Voz
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {VOICES.map((voice) => {
          const isSelected = selectedVoiceId === voice.id;
          return (
            <button
              key={voice.id}
              onClick={() => onSelect(voice.id)}
              className={`
                relative flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200
                ${isSelected 
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-900/50' 
                  : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-750 hover:border-gray-600'}
              `}
            >
              <div className={`p-2 rounded-full mb-2 ${isSelected ? 'bg-indigo-500' : 'bg-gray-700'}`}>
                <Mic size={18} />
              </div>
              <span className="text-xs font-semibold">{voice.name}</span>
              <span className="text-[10px] opacity-70 mt-0.5">{voice.gender}</span>
              {isSelected && (
                <div className="absolute top-2 right-2">
                  <Check size={14} className="text-white" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
