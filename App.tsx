import React, { useState } from 'react';
import { VoiceOption, Accent, Style, HistoryItem } from './types';
import { VOICES, ACCENTS, STYLES } from './constants';
import { generateSpeech } from './services/geminiService';
import { VoiceSelector } from './components/VoiceSelector';
import { ControlPanel } from './components/ControlPanel';
import { TextInput } from './components/TextInput';
import { HistoryList } from './components/HistoryList';
import { AudioWaveform } from 'lucide-react';

const App: React.FC = () => {
  // State
  const [text, setText] = useState('');
  const [selectedVoiceId, setSelectedVoiceId] = useState<string>(VOICES[0].id);
  const [accent, setAccent] = useState<Accent>(ACCENTS[0]);
  const [style, setStyle] = useState<Style>(STYLES[0]);
  const [speed, setSpeed] = useState<number>(1.0);
  const [pitch, setPitch] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!text.trim()) return;

    setIsGenerating(true);
    setError(null);

    try {
      const { buffer, blob } = await generateSpeech({
        text,
        voiceId: selectedVoiceId,
        accent,
        style,
        speed,
        pitch,
      });

      const audioUrl = URL.createObjectURL(blob);
      const voiceName = VOICES.find(v => v.id === selectedVoiceId)?.name || 'Desconocido';

      const newItem: HistoryItem = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        text: text.substring(0, 50) + (text.length > 50 ? '...' : ''),
        audioUrl,
        duration: buffer.duration,
        voiceName,
        style,
      };

      setHistory((prev) => [newItem, ...prev]);
    } catch (err: any) {
      setError(err.message || 'Error al generar el audio');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDeleteHistory = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-800">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-xl shadow-lg shadow-indigo-500/20">
            <AudioWaveform size={32} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              VozGenius AI
            </h1>
            <p className="text-gray-400 text-sm">Generador de Voz TTS Avanzado</p>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Controls & Input */}
          <div className="lg:col-span-7 space-y-8">
            <section className="space-y-6">
              <VoiceSelector 
                selectedVoiceId={selectedVoiceId} 
                onSelect={setSelectedVoiceId} 
              />
              <ControlPanel 
                accent={accent} setAccent={setAccent}
                style={style} setStyle={setStyle}
                speed={speed} setSpeed={setSpeed}
                pitch={pitch} setPitch={setPitch}
              />
            </section>

            <section>
              <TextInput 
                text={text} 
                setText={setText} 
                isGenerating={isGenerating} 
                onGenerate={handleGenerate} 
              />
              {error && (
                <div className="mt-4 p-4 bg-red-900/50 border border-red-800 rounded-xl text-red-200 text-sm">
                  Error: {error}
                </div>
              )}
            </section>
          </div>

          {/* Right Column: History */}
          <div className="lg:col-span-5">
             <div className="sticky top-8">
               <div className="bg-gray-900/50 rounded-2xl p-1">
                 <HistoryList history={history} onDelete={handleDeleteHistory} />
               </div>
             </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default App;
