import React, { useState } from 'react';
import { Device, DeviceSettings } from '../../types';
import { LightVisual } from './Light/LightVisual';
import { LightController } from './Light/LightController';
import { FanVisual } from './Fan/FanVisual';
import { FanController } from './Fan/FanController';
import { X } from 'lucide-react';

interface DeviceWrapperProps {
    device: Device;
    onSettingsChange: (id: string, settings: DeviceSettings) => void;
    onRemove: (id: string) => void;
}

export const DeviceWrapper: React.FC<DeviceWrapperProps> = ({
    device,
    onSettingsChange,
    onRemove,
}) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const handleSettingsChange = (newSettings: DeviceSettings) => {
        onSettingsChange(device.id, newSettings);
    };

    return (
        <div className="relative w-full h-full rounded-lg border border-slate-600 bg-slate-900 p-8 shadow-lg hover:border-slate-500 transition-colors duration-200 flex flex-col items-center justify-center gap-8">
            {/* Delete button - top right */}
            <button
                onClick={() => onRemove(device.id)}
                className="absolute top-4 right-4 rounded-md p-1 hover:bg-red-900 hover:bg-opacity-30 transition-colors duration-200"
                title="Remove device"
            >
                <X className="h-5 w-5 text-red-400" />
            </button>

            {/* Device Visual - 60% width */}
            <div className="w-3/5 h-full flex justify-center items-center">
                {device.type === 'light' ? (
                    <LightVisual settings={device.settings as any} />
                ) : (
                    <FanVisual settings={device.settings as any} />
                )}
            </div>

            {/* Device Controller - 40% width */}
            <div className="w-2/5 h-full flex justify-center items-center">
                {device.type === 'light' ? (
                    <LightController
                        settings={device.settings as any}
                        onSettingsChange={handleSettingsChange}
                    />
                ) : (
                    <FanController
                        settings={device.settings as any}
                        onSettingsChange={handleSettingsChange}
                    />
                )}
            </div>
        </div>
    );
};
