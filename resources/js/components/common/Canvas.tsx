import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Device, DeviceType, DeviceSettings } from '../../types';
import { DeviceWrapper } from '../devices/DeviceWrapper';

interface CanvasProps {
    devices: Device[];
    onAddDevice: (type: DeviceType) => void;
    onSettingsChange: (id: string, settings: DeviceSettings) => void;
    onRemoveDevice: (id: string) => void;
}

export const Canvas: React.FC<CanvasProps> = ({
    devices,
    onAddDevice,
    onSettingsChange,
    onRemoveDevice,
}) => {
    const { setNodeRef, isOver } = useDroppable({
        id: 'canvas-droppable',
    });

    return (
        <div
            ref={setNodeRef}
            className={`flex-1 flex flex-col rounded-lg border-2 transition-all duration-200 ${
                isOver
                    ? 'border-blue-500 bg-slate-900 bg-opacity-50'
                    : 'border-slate-700 bg-slate-900'
            }`}
        >
            {/* Canvas header */}
            <div className="border-b border-slate-700 bg-slate-900 px-8 py-4">
                <h1 className="text-2xl font-bold text-slate-100">Device Configuration</h1>
            </div>

            {/* Canvas content area */}
            <div className="flex-1 flex items-center justify-center p-8">
                {devices.length === 0 ? (
                    /* Empty state */
                    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-600 bg-slate-900 bg-opacity-50 py-20 w-full h-full">
                        <div className="text-center">
                            <div className="text-4xl mb-4">🎯</div>
                            <h2 className="text-lg font-semibold text-slate-300 mb-2">
                                No Devices Added Yet
                            </h2>
                            <p className="text-sm text-slate-500 mb-4">
                                Drag a Light or Fan from the sidebar to add it to the canvas
                            </p>
                            <p className="text-sm text-slate-500">
                                Or drag a saved preset to restore its configuration
                            </p>
                        </div>
                    </div>
                ) : (
                    /* Device - fills the canvas */
                    devices.map((device) => (
                        <DeviceWrapper
                            key={device.id}
                            device={device}
                            onSettingsChange={onSettingsChange}
                            onRemove={onRemoveDevice}
                        />
                    ))
                )}
            </div>
        </div>
    );
};
