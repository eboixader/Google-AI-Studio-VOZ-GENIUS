import React, { useRef } from 'react';
import { SPECIAL_TAGS } from '../constants';
import { MessageSquarePlus } from 'lucide-react';

interface TextInputProps {
  text: string;
  setText: (text: string) => void;
  isGenerating: boolean;
  onGenerate: () => void;
}

export const TextInput: React.FC<TextInputProps> = ({ text, setText, isGenerating, onGenerate }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertTag = (tag: string) => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const newText = text.substring(0, start) + tag + text.substring(end);
      setText(newText);
      
      // Restore focus and move cursor after tag
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + tag.length;
        }
      }, 0);
    } else {
      setText(text + tag);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-gray-400 uppercase tracking-wide flex items-center mr-2">
          Etiquetas especiales:
        </span>
        {SPECIAL_TAGS.map((tag) => (
          <button
            key={tag.tag}
            onClick={() => insertTag(tag.tag)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs rounded-full border border-gray-600 transition-colors"
            title={`Insertar ${tag.label}`}
          >
            <span>{tag.icon}</span>
            <span>{tag.tag}</span>
          </button>
        ))}
      </div>

      <div className="relative">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe aquí el texto que quieres convertir a voz..."
          className="w-full h-40 bg-gray-800 border-2 border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none text-lg"
          spellCheck={false}
        />
        <div className="absolute bottom-4 right-4 text-xs text-gray-500">
          {text.length} caracteres
        </div>
      </div>

      <button
        onClick={onGenerate}
        disabled={!text.trim() || isGenerating}
        className={`
          w-full py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-3 transition-all transform active:scale-[0.99]
          ${!text.trim() || isGenerating
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-900/50'
          }
        `}
      >
        {isGenerating ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generando Audio...
          </>
        ) : (
          <>
            <MessageSquarePlus size={24} />
            Generar Voz
          </>
        )}
      </button>
    </div>
  );
};
