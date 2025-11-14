import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Preset } from '../../types';
import { PresetItem } from './PresetItem';

interface PresetDraggableProps {
    preset: Preset;
}

export const PresetDraggable: React.FC<PresetDraggableProps> = ({ preset }) => {
    const { attributes, listeners, setNodeRef } = useDraggable({
        id: `preset-${preset.id}`,
        data: { type: 'preset', presetId: preset.id, preset },
    });

    return (
        <div
            ref={setNodeRef}
            className="flex items-center gap-2 rounded-lg border-2 border-slate-600 bg-slate-800 px-4 py-3 cursor-grab active:cursor-grabbing transition-all duration-200 hover:border-slate-500 hover:bg-slate-700"
            {...attributes}
            {...listeners}
        >
            <PresetItem preset={preset} />
        </div>
    );
};
