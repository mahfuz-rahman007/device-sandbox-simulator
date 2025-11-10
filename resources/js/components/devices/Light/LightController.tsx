import React from 'react';
import { LightSettings, ColorTemperature } from '../../../types';

interface LightControllerProps {
    settings: LightSettings;
    onSettingsChange: (settings: LightSettings) => void;
}

export const LightController: React.FC<LightControllerProps> = ({
    settings,
    onSettingsChange,
}) => {
    const { power, brightness, colorTemp } = settings;

    const colorTemperatures: { name: ColorTemperature; label: string; color: string; accentColor: string }[] = [
        { name: 'warm', label: 'Warm', color: 'bg-yellow-400', accentColor: '#FBBF24' },
        { name: 'neutral', label: 'Neutral', color: 'bg-yellow-100', accentColor: '#FEF3C7' },
        { name: 'cool', label: 'Cool', color: 'bg-blue-300', accentColor: '#93C5FD' },
        { name: 'pink', label: 'Pink', color: 'bg-pink-300', accentColor: '#F472B6' },
    ];

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

            {/* Color Temperature */}
            <div className="mb-6">
                <span className="mb-3 block text-sm font-medium text-slate-200">
                    Color Temperature
                </span>
                <div className="grid grid-cols-4 gap-2">
                    {colorTemperatures.map(({ name, label, color }) => (
                        <button
                            key={name}
                            onClick={() =>
                                onSettingsChange({
                                    ...settings,
                                    colorTemp: name,
                                })
                            }
                            disabled={!power}
                            className={`rounded-lg p-3 transition-all duration-200 ${color} ${
                                !power
                                    ? 'opacity-30 cursor-not-allowed'
                                    : colorTemp === name
                                      ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-800'
                                      : 'opacity-60 hover:opacity-80'
                            }`}
                            title={label}
                        />
                    ))}
                </div>
            </div>

            {/* Brightness Slider */}
            <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-200">Brightness</span>
                <span className="text-sm text-slate-400">{brightness}%</span>
            </div>
            <input
                type="range"
                min="0"
                max="100"
                value={brightness}
                onChange={(e) =>
                    onSettingsChange({
                        ...settings,
                        brightness: parseInt(e.target.value),
                    })
                }
                className="h-2 w-full rounded-lg bg-slate-700"
                style={{
                    accentColor: power ? colorTemperatures.find(c => c.name === colorTemp)?.accentColor : '#64748b'
                }}
                disabled={!power}
            />

            {/* Info text */}
            <div className="mt-4 text-xs text-slate-500">
                {power
                    ? `Brightness: ${brightness}%, Color: ${colorTemp}`
                    : 'Light is off - Toggle power to enable'}
            </div>
        </div>
    );
};
