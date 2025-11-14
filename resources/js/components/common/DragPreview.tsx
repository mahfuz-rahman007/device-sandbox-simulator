import React from 'react';
import { DeviceType, Preset } from '../../types';
import { getDeviceConfig } from '../devices';
import { PresetItem } from '../presets';

interface DragPreviewProps {
    type: 'device' | 'preset';
    deviceType?: DeviceType;
    preset?: Preset;
}

export const DragPreview: React.FC<DragPreviewProps> = ({ type, deviceType, preset }) => {
    if (type === 'device' && deviceType) {
        const deviceConfig = getDeviceConfig(deviceType as 'light' | 'fan');
        const ItemComponent = deviceConfig?.Item;

        if (!ItemComponent) return null;

        return (
            <div className="flex cursor-grab items-center gap-2 rounded-lg border-2 border-slate-600 bg-slate-800 px-4 py-3 transition-all duration-200 hover:border-slate-500 hover:bg-slate-700 active:cursor-grabbing">
                <ItemComponent label={deviceConfig.label} />
            </div>
        );
    }

    if (type === 'preset' && preset) {
        return (
            <div className="flex cursor-grab items-center justify-between gap-2 rounded-lg border-2 border-slate-600 bg-slate-800 px-4 py-3 transition-all duration-200 hover:border-slate-500 hover:bg-slate-700 active:cursor-grabbing">
                <PresetItem preset={preset} />
            </div>
        );
    }

    return null;
};
