import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Device, DeviceType, DeviceSettings } from '../../types';
import { CanvasDevice } from './CanvasDevice';

interface CanvasProps {
    devices: Device[];
    isModified: boolean;
    onAddDevice: (type: DeviceType) => void;
    onSettingsChange: (id: string, settings: DeviceSettings) => void;
    onRemoveDevice: (id: string) => void;
    onRemoveDeviceWithConfirm: (id: string) => void;
}

export const Canvas: React.FC<CanvasProps> = ({
    devices,
    isModified,
    onSettingsChange,
    onRemoveDevice,
    onRemoveDeviceWithConfirm,
}) => {
    const { setNodeRef, isOver } = useDroppable({
        id: 'canvas-droppable',
    });

    return (
        <div
            ref={setNodeRef}
            className={`flex flex-1 flex-col rounded-lg border-2 border-slate-700 bg-slate-900 transition-all duration-200 ${
                isOver ? 'opacity-30' : 'opacity-100'
            }`}
        >
            {/* Canvas header */}
            <div className="border-b border-slate-700 bg-slate-900 px-4 py-3 md:px-6 md:py-4 lg:px-8 lg:py-4">
                <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-slate-100">Device Configuration</h1>
            </div>

            {/* Canvas content area */}
            <div className="flex flex-1 items-center justify-center p-4 md:p-6 lg:p-8">
                {devices.length === 0 ? (
                    /* Empty state */
                    <div className="bg-opacity-50 flex h-full w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-600 bg-slate-900 py-20 transition-colors duration-200 hover:border-slate-500">
                        <div className="text-center">
                            <div className="mb-4 animate-bounce text-5xl">🎯</div>
                            <h2 className="mb-3 text-xl font-semibold text-slate-200">Drop Your Devices Here</h2>
                            <div className="space-y-2">
                                <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
                                    <span>💡</span>
                                    <p>
                                        Drag a <span className="font-medium text-slate-300">Light</span> or{' '}
                                        <span className="font-medium text-slate-300">Fan</span> from the sidebar
                                    </p>
                                </div>
                                <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
                                    <span>📦</span>
                                    <p>
                                        Or drag a <span className="font-medium text-slate-300">saved preset</span> to restore
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Device - fills the canvas */
                    devices.map((device) => (
                        <CanvasDevice
                            key={device.id}
                            device={device}
                            isModified={isModified}
                            onSettingsChange={onSettingsChange}
                            onRemove={onRemoveDevice}
                            onRemoveWithConfirm={onRemoveDeviceWithConfirm}
                        />
                    ))
                )}
            </div>
        </div>
    );
};
