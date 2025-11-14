import React, { useState } from 'react';
import { Device, DeviceSettings } from '../../types';
import { LightVisual } from '../devices/Light/LightVisual';
import { LightController } from '../devices/Light/LightController';
import { FanVisual } from '../devices/Fan/FanVisual';
import { FanController } from '../devices/Fan/FanController';
import { X } from 'lucide-react';

interface CanvasDeviceProps {
    device: Device;
    isModified: boolean;
    onSettingsChange: (id: string, settings: DeviceSettings) => void;
    onRemove: (id: string) => void;
    onRemoveWithConfirm: (id: string) => void;
}

export const CanvasDevice: React.FC<CanvasDeviceProps> = ({
    device,
    isModified,
    onSettingsChange,
    onRemove,
    onRemoveWithConfirm,
}) => {

    const handleSettingsChange = (newSettings: DeviceSettings) => {
        onSettingsChange(device.id, newSettings);
    };

    return (
        <div className="relative w-full h-full rounded-lg border border-slate-600 bg-slate-900 p-4 md:p-6 lg:p-8 shadow-lg hover:border-slate-500 transition-colors duration-200 flex flex-col items-center justify-center gap-20">
            {/* Delete button - top right */}
            <button
                onClick={() => isModified ? onRemoveWithConfirm(device.id) : onRemove(device.id)}
                className="absolute top-3 right-3 md:top-4 md:right-4 rounded-md p-1 hover:bg-red-900 hover:bg-opacity-30 transition-colors duration-200 cursor-pointer z-10"
                title="Remove device"
            >
                <X className="h-5 w-5 text-red-400" />
            </button>

            {/* Device Visual - Full width on mobile, 60% on desktop */}
            <div className="w-full lg:w-3/5 flex justify-center items-center h-auto">
                <div className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56">
                    {device.type === 'light' ? (
                        <LightVisual settings={device.settings as any} />
                    ) : (
                        <FanVisual settings={device.settings as any} />
                    )}
                </div>
            </div>

            {/* Device Controller - Full width on mobile, 40% on desktop */}
            <div className="w-full lg:w-2/5 flex justify-center items-center">
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
