import React, { useRef, useState, useEffect } from 'react';
import { HistoryItem } from '../types';
import { Download, Play, Pause, Clock, Trash2 } from 'lucide-react';

interface HistoryListProps {
  history: HistoryItem[];
  onDelete: (id: string) => void;
}

const AudioPlayerItem: React.FC<{ item: HistoryItem; onDelete: () => void }> = ({ item, onDelete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors group">
      <audio ref={audioRef} src={item.audioUrl} preload="metadata" />
      
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-medium text-white text-sm line-clamp-1">{item.text}</h4>
          <div className="flex gap-2 text-xs text-gray-400 mt-1">
            <span className="flex items-center gap-1"><Clock size={10} /> {new Date(item.timestamp).toLocaleTimeString()}</span>
            <span>•</span>
            <span className="text-indigo-400">{item.voiceName}</span>
            <span>•</span>
            <span>{item.style}</span>
          </div>
        </div>
        <button onClick={onDelete} className="text-gray-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
          <Trash2 size={16} />
        </button>
      </div>

      <div className="flex items-center gap-3 mt-3">
        <button
          onClick={togglePlay}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-600 text-white hover:bg-indigo-500 transition-colors flex-shrink-0"
        >
          {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="ml-0.5" />}
        </button>

        <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-500 rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        <a
          href={item.audioUrl}
          download={`vozgenius-${item.timestamp}.wav`}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
          title="Descargar WAV"
        >
          <Download size={18} />
        </a>
      </div>
    </div>
  );
};

export const HistoryList: React.FC<HistoryListProps> = ({ history, onDelete }) => {
  if (history.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 bg-gray-800/30 rounded-xl border border-dashed border-gray-700">
        <p>No hay historial reciente.</p>
        <p className="text-sm mt-1">Genera tu primer audio para verlo aquí.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-300 flex items-center gap-2">
        <Clock size={20} />
        Historial Generado
      </h3>
      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
        {history.map((item) => (
          <AudioPlayerItem key={item.id} item={item} onDelete={() => onDelete(item.id)} />
        ))}
      </div>
    </div>
  );
};
