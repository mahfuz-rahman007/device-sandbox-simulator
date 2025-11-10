import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Lightbulb, Wind, Trash2 } from 'lucide-react';
import { Preset } from '../../types';

interface DraggableDeviceProps {
    type: 'light' | 'fan';
    label: string;
}

const DraggableDevice: React.FC<DraggableDeviceProps> = ({ type, label }) => {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: `device-${type}`,
        data: { type: 'device', deviceType: type },
    });

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className={`flex items-center gap-2 rounded-lg border-2 border-slate-600 bg-slate-800 px-4 py-3 cursor-grab active:cursor-grabbing transition-all duration-200 hover:border-slate-500 ${
                isDragging ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
            }`}
        >
            {type === 'light' ? (
                <Lightbulb className="h-5 w-5 text-yellow-400" />
            ) : (
                <Wind className="h-5 w-5 text-blue-400" />
            )}
            <span className="text-sm font-medium text-slate-200">{label}</span>
        </div>
    );
};

interface DraggablePresetProps {
    preset: Preset;
    onDelete: (id: number) => void;
}

const DraggablePreset: React.FC<DraggablePresetProps> = ({ preset, onDelete }) => {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: `preset-${preset.id}`,
        data: { type: 'preset', presetId: preset.id, preset },
    });

    return (
        <div
            ref={setNodeRef}
            className={`flex items-center justify-between gap-2 rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 cursor-grab active:cursor-grabbing transition-all duration-200 hover:border-slate-500 ${
                isDragging ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
            }`}
            {...attributes}
            {...listeners}
        >
            <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-slate-200 truncate">
                    {preset.name}
                </div>
                <div className="text-xs text-slate-500 capitalize">
                    {preset.configuration.type}
                </div>
            </div>
            <div className="flex-shrink-0 pointer-events-auto">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onDelete(preset.id);
                    }}
                    type="button"
                    className="rounded-md p-1 text-slate-400 hover:bg-red-900 hover:bg-opacity-30 hover:text-red-400 transition-colors duration-200"
                    title="Delete preset"
                >
                    <Trash2 className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};

interface SidebarProps {
    presets: Preset[];
    onDeletePreset: (id: number) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ presets, onDeletePreset }) => {
    return (
        <aside className="w-full lg:w-80 flex-shrink-0 overflow-y-auto border-r border-slate-700 bg-slate-800 px-6 py-8 max-h-screen">
            {/* Devices Section */}
            <div className="mb-8">
                <h2 className="mb-4 text-lg font-semibold text-slate-100">Devices</h2>
                <div className="space-y-3">
                    <DraggableDevice type="light" label="Light" />
                    <DraggableDevice type="fan" label="Fan" />
                </div>
            </div>

            {/* Divider */}
            <div className="mb-8 border-t border-slate-700" />

            {/* Saved Presets Section */}
            <div>
                <h2 className="mb-4 text-lg font-semibold text-slate-100">Saved Presets</h2>

                {presets.length === 0 ? (
                    /* Empty State */
                    <div className="rounded-lg border-2 border-dashed border-slate-600 bg-slate-900 px-4 py-8 text-center">
                        <div className="text-sm text-slate-400">Nothing added yet</div>
                        <div className="mt-2 text-xs text-slate-500">
                            Save a configuration to create a preset
                        </div>
                    </div>
                ) : (
                    /* Preset List */
                    <div className="space-y-3">
                        {presets.map((preset) => (
                            <DraggablePreset
                                key={preset.id}
                                preset={preset}
                                onDelete={onDeletePreset}
                            />
                        ))}
                    </div>
                )}
            </div>
        </aside>
    );
};
