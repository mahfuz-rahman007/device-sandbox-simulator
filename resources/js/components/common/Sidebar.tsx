import React from 'react';
import { X } from 'lucide-react';
import { Preset } from '../../types';
import { DraggableItem, DEVICE_REGISTRY } from '../devices';
import { PresetDraggable } from '../presets';
import { useDeviceStore } from '../../stores/deviceStore';

interface SidebarProps {
    presets: Preset[];
    isOpen?: boolean;
    onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ presets, isOpen = true, onClose }) => {
    const devices = useDeviceStore((state) => state.devices);

    return (
        <aside className={`
            fixed lg:relative
            inset-y-0 left-0
            z-50 lg:z-auto
            w-80
            transform transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            flex-shrink-0 overflow-y-auto
            border-r border-slate-700 bg-slate-800
            px-4 py-6 md:px-6 md:py-8
            max-h-screen
        `}>
            {/* Close Button - Mobile only */}
            {onClose && (
                <button
                    onClick={onClose}
                    className="lg:hidden mb-4 rounded-lg p-2 hover:bg-slate-700 transition-colors float-right"
                    title="Close sidebar"
                >
                    <X className="h-6 w-6 text-slate-300" />
                </button>
            )}

            {/* Devices Section */}
            <div className="mb-8 clear-right">
                <h2 className="mb-4 text-lg font-semibold text-slate-100">Devices</h2>
                <div className="space-y-3">
                    {devices.map((device) => {
                        // Find component from registry
                        const registryDevice = DEVICE_REGISTRY.find((reg) => reg.id === device.type);
                        if (!registryDevice) return null;

                        return (
                            <DraggableItem key={device.id} deviceType={device.type}>
                                <registryDevice.Item label={device.name} />
                            </DraggableItem>
                        );
                    })}
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
                            <PresetDraggable
                                key={preset.id}
                                preset={preset}
                            />
                        ))}
                    </div>
                )}
            </div>
        </aside>
    );
};
