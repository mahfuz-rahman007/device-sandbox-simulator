import React from 'react';
import { FanSettings } from '../../../types';

interface FanControllerProps {
    settings: FanSettings;
    onSettingsChange: (settings: FanSettings) => void;
}

export const FanController: React.FC<FanControllerProps> = ({ settings, onSettingsChange }) => {
    const { power, speed } = settings;

    return (
        <div className="w-full max-w-sm rounded-lg border border-slate-600 bg-slate-800 p-6 shadow-lg">
            {/* Power Toggle */}
            <div className="mb-6 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-200">Power</span>
                <button
                    onClick={() =>
                        onSettingsChange({
                            ...settings,
                            power: !power,
                        })
                    }
                    className={`relative h-8 w-14 rounded-full transition-colors duration-300 ${
                        power ? 'bg-blue-600' : 'bg-slate-600'
                    }`}
                >
                    <div
                        className={`absolute top-1 h-6 w-6 rounded-full bg-white transition-transform duration-300 ${
                            power ? 'translate-x-7' : 'translate-x-1'
                        }`}
                    />
                </button>
            </div>

            {/* Speed Slider */}
            <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-200">Speed</span>
                <span className="text-sm text-slate-400">{speed}%</span>
            </div>
            <input
                type="range"
                min="0"
                max="100"
                value={speed}
                onChange={(e) =>
                    onSettingsChange({
                        ...settings,
                        speed: parseInt(e.target.value),
                    })
                }
                className="h-2 w-full rounded-lg bg-slate-700 accent-blue-600"
                disabled={!power}
            />
        </div>
    );
};
