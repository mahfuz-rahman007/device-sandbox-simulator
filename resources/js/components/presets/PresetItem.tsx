import React from 'react';
import { Package } from 'lucide-react';
import { Preset } from '../../types';

interface PresetItemProps {
    preset: Preset;
}

export const PresetItem: React.FC<PresetItemProps> = ({ preset }) => (
    <>
        <div className="flex-shrink-0">
            <Package className="h-5 w-5 text-slate-300" />
        </div>
        <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate text-slate-200">
                {preset.name}
            </div>
            <div className="text-xs capitalize text-slate-500">
                {preset.device?.name || preset.device?.type}
            </div>
        </div>
    </>
);
