import React from 'react';
import { Package } from 'lucide-react';
import { Preset } from '../../types';
import { formatPresetDate } from '../../utils/dateHelpers';

interface PresetItemProps {
    preset: Preset;
}

export const PresetItem: React.FC<PresetItemProps> = ({ preset }) => {
    const createdDate = formatPresetDate(preset.created_at);

    return (
        <>
            <div className="flex-shrink-0">
                <Package className="h-5 w-5 text-slate-300" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate text-slate-200">
                    {preset.name}
                </div>
                <div className="flex items-center justify-between gap-2 text-xs">
                    <div className="capitalize text-slate-400">
                        {preset.device?.name || preset.device?.type}
                    </div>
                    <div className="text-slate-400 whitespace-nowrap flex-shrink-0">
                        {createdDate}
                    </div>
                </div>
            </div>
        </>
    );
};
