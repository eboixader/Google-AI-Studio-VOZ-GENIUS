import React from 'react';
import { Accent, Style } from '../types';
import { ACCENTS, STYLES } from '../constants';
import { Sliders, Globe, Zap, Gauge } from 'lucide-react';

interface ControlPanelProps {
  accent: Accent;
  setAccent: (a: Accent) => void;
  style: Style;
  setStyle: (s: Style) => void;
  speed: number;
  setSpeed: (s: number) => void;
  pitch: number;
  setPitch: (p: number) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  accent,
  setAccent,
  style,
  setStyle,
  speed,
  setSpeed,
  pitch,
  setPitch,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-800/50 p-5 rounded-2xl border border-gray-700">
      
      {/* Accent Selector */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
          <Globe size={16} className="text-blue-400" />
          2. Acento
        </label>
        <div className="flex bg-gray-900 rounded-lg p-1 border border-gray-700">
          {ACCENTS.map((item) => (
            <button
              key={item}
              onClick={() => setAccent(item)}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
                accent === item ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Style Selector */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
          <Zap size={16} className="text-yellow-400" />
          3. Estilo
        </label>
        <select
          value={style}
          onChange={(e) => setStyle(e.target.value as Style)}
          className="w-full bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
        >
          {STYLES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Speed Selector */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
          <Gauge size={16} className="text-green-400" />
          4. Velocidad: <span className="text-white font-bold">{speed.toFixed(1)}x</span>
        </label>
        <input
          type="range"
          min="0.5"
          max="2.0"
          step="0.1"
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
        />
        <div className="flex justify-between text-[10px] text-gray-500 px-1">
          <span>Lento</span>
          <span>Normal</span>
          <span>Rápido</span>
        </div>
      </div>

      {/* Pitch Selector */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
          <Sliders size={16} className="text-purple-400" />
          5. Tono: <span className="text-white font-bold">{pitch > 0 ? `+${pitch}` : pitch}</span>
        </label>
        <input
          type="range"
          min="-10"
          max="10"
          step="1"
          value={pitch}
          onChange={(e) => setPitch(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
        />
        <div className="flex justify-between text-[10px] text-gray-500 px-1">
          <span>Grave</span>
          <span>Natural</span>
          <span>Agudo</span>
        </div>
      </div>
    </div>
  );
};
