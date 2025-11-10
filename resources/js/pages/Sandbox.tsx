import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { Sidebar } from '../components/common/Sidebar';
import { Canvas } from '../components/common/Canvas';
import { useCanvasStore } from '../stores/canvasStore';
import { usePresetStore } from '../stores/presetStore';
import { DeviceType } from '../types';

export default function Sandbox() {
    const [showSaveDialog, setShowSaveDialog] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState(false);
    const [presetName, setPresetName] = useState('');
    const [pendingDeviceType, setPendingDeviceType] = useState<DeviceType | null>(null);
    const [pendingDeletePresetId, setPendingDeletePresetId] = useState<number | null>(null);
    const [loadedPresetId, setLoadedPresetId] = useState<number | null>(null);

    // Canvas store
    const devices = useCanvasStore((state) => state.devices);
    const isModified = useCanvasStore((state) => state.isModified);
    const addDevice = useCanvasStore((state) => state.addDevice);
    const updateDevice = useCanvasStore((state) => state.updateDevice);
    const removeDevice = useCanvasStore((state) => state.removeDevice);
    const setDevices = useCanvasStore((state) => state.setDevices);
    const clear = useCanvasStore((state) => state.clear);

    // Preset store
    const presets = usePresetStore((state) => state.presets);
    const fetchPresets = usePresetStore((state) => state.fetchPresets);
    const savePreset = usePresetStore((state) => state.savePreset);
    const updatePreset = usePresetStore((state) => state.updatePreset);
    const deletePreset = usePresetStore((state) => state.deletePreset);

    // Drag sensors
    const sensors = useSensors(
        useSensor(PointerSensor, {
            distance: 8,
        })
    );

    // Fetch presets on mount
    useEffect(() => {
        fetchPresets();
    }, []);

    // Handle drag end
    const handleDragEnd = async (event: DragEndEvent) => {
        const { active } = event;

        if (!active.data?.current) return;

        const data = active.data.current as any;

        if (data.type === 'device') {
            // If a preset is loaded, clear it first
            if (loadedPresetId) {
                setLoadedPresetId(null);
                addDevice(data.deviceType as DeviceType);
            } else if (devices.length > 0 && isModified) {
                // Check if there's already a device with modifications
                setPendingDeviceType(data.deviceType as DeviceType);
                setShowConfirmDialog(true);
            } else {
                // Add device directly
                addDevice(data.deviceType as DeviceType);
            }
        } else if (data.type === 'preset') {
            // Load preset to canvas
            if (data.preset) {
                // Create device from preset configuration
                const presetDevice = {
                    id: `${data.preset.configuration.type}-preset-${data.presetId}`,
                    type: data.preset.configuration.type,
                    settings: data.preset.configuration.settings,
                };
                setDevices([presetDevice]);
                // Store the loaded preset ID for updates
                setLoadedPresetId(data.presetId);
            }
        }
    };

    // Handle confirm adding new device (discard current changes)
    const handleConfirmAddDevice = () => {
        if (pendingDeviceType) {
            addDevice(pendingDeviceType);
            setPendingDeviceType(null);
            setShowConfirmDialog(false);
        }
    };

    // Handle update preset (direct update without dialog)
    const handleUpdatePreset = async () => {
        try {
            // Find the preset name from the loaded preset ID
            const loadedPreset = presets.find((p) => p.id === loadedPresetId);
            const presetName = loadedPreset?.name || '';

            await updatePreset(loadedPresetId!, devices, presetName);
            // Keep loadedPresetId set so button stays as "Update Preset"
            // Show success toast
            toast.success(`Preset "${presetName}" updated successfully!`);
            // Refetch presets will happen automatically in the store
        } catch (error) {
            toast.error('Failed to update preset');
        }
    };

    // Handle save preset (with dialog)
    const handleSavePreset = async () => {
        if (!presetName.trim()) {
            toast.error('Please enter a preset name');
            return;
        }

        try {
            await savePreset(presetName, devices);
            setPresetName('');
            setShowSaveDialog(false);
            // Clear canvas after successful save
            clear();
            // Show success toast
            toast.success(`Preset "${presetName}" saved successfully!`);
            // Refetch presets will happen automatically in the store
        } catch (error) {
            toast.error('Failed to save preset');
        }
    };

    const handleDeletePreset = (id: number) => {
        setPendingDeletePresetId(id);
        setShowDeleteConfirmDialog(true);
    };

    const handleConfirmDeletePreset = async () => {
        if (pendingDeletePresetId === null) return;

        try {
            await deletePreset(pendingDeletePresetId);
            toast.success('Preset deleted successfully!');
            setShowDeleteConfirmDialog(false);
            setPendingDeletePresetId(null);
        } catch (error) {
            toast.error('Failed to delete preset');
        }
    };

    return (
        <div className="flex h-screen w-screen flex-col bg-slate-900 text-slate-100">
            {/* Header */}
            <div className="border-b border-slate-700 bg-slate-800 px-8 py-4 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Device Sandbox Simulator</h1>
                    <p className="mt-1 text-sm text-slate-400">
                        Drag and drop devices to configure your setup
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => {
                            clear();
                            setLoadedPresetId(null);
                        }}
                        disabled={!isModified}
                        className={`rounded-lg px-6 py-2 font-medium transition-all duration-200 ${
                            !isModified
                                ? 'bg-slate-700 text-slate-500 cursor-not-allowed opacity-50'
                                : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                        }`}
                    >
                        Clear
                    </button>
                    {loadedPresetId ? (
                        <button
                            onClick={handleUpdatePreset}
                            disabled={!isModified}
                            className={`rounded-lg px-6 py-2 font-medium text-white transition-all duration-200 ${
                                !isModified
                                    ? 'bg-green-700 cursor-not-allowed opacity-50'
                                    : 'bg-green-600 hover:bg-green-700'
                            }`}
                        >
                            Update Preset
                        </button>
                    ) : (
                        <button
                            onClick={() => setShowSaveDialog(true)}
                            disabled={!isModified}
                            className={`rounded-lg px-6 py-2 font-medium text-white transition-all duration-200 ${
                                !isModified
                                    ? 'bg-blue-700 cursor-not-allowed opacity-50'
                                    : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                        >
                            Save Preset
                        </button>
                    )}
                </div>
            </div>

            {/* Main content */}
            <div className="flex flex-1 overflow-hidden">
                <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                    {/* Sidebar */}
                    <Sidebar presets={presets} onDeletePreset={handleDeletePreset} />

                    {/* Canvas */}
                    <Canvas
                        devices={devices}
                        onAddDevice={addDevice}
                        onSettingsChange={updateDevice}
                        onRemoveDevice={removeDevice}
                    />

                    {/* Drag overlay - shows what's being dragged */}
                    <DragOverlay>
                        {/* Optional: Add custom drag preview here */}
                    </DragOverlay>
                </DndContext>
            </div>

            {/* Save Preset Dialog */}
            {showSaveDialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
                    <div className="rounded-lg border border-slate-600 bg-slate-800 p-6 shadow-lg max-w-md w-full mx-4">
                        <h2 className="text-xl font-semibold text-slate-100 mb-4">
                            Save Preset Configuration
                        </h2>

                        <input
                            type="text"
                            placeholder="Enter preset name..."
                            value={presetName}
                            onChange={(e) => setPresetName(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleSavePreset();
                                }
                            }}
                            autoFocus
                            className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-2 text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none mb-6"
                        />

                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => {
                                    setShowSaveDialog(false);
                                    setPresetName('');
                                }}
                                className="rounded-lg border border-slate-600 px-4 py-2 text-slate-200 hover:bg-slate-700 transition-colors duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSavePreset}
                                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors duration-200"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirm Add Device Dialog */}
            {showConfirmDialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
                    <div className="rounded-lg border border-slate-600 bg-slate-800 p-6 shadow-lg max-w-md w-full mx-4">
                        <h2 className="text-xl font-semibold text-slate-100 mb-4">
                            ⚠️ Discard Changes?
                        </h2>

                        <p className="text-slate-300 mb-6">
                            You will lose your current device configuration and all unsaved changes if you proceed without saving as a preset first.
                        </p>

                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => {
                                    setShowConfirmDialog(false);
                                    setPendingDeviceType(null);
                                }}
                                className="rounded-lg border border-slate-600 px-4 py-2 text-slate-200 hover:bg-slate-700 transition-colors duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmAddDevice}
                                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition-colors duration-200"
                            >
                                Discard & Continue
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Preset Confirmation Dialog */}
            {showDeleteConfirmDialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
                    <div className="rounded-lg border border-slate-600 bg-slate-800 p-6 shadow-lg max-w-md w-full mx-4">
                        <h2 className="text-xl font-semibold text-slate-100 mb-4">
                            Delete Preset?
                        </h2>

                        <p className="text-slate-300 mb-6">
                            This action cannot be undone. Are you sure you want to delete this preset?
                        </p>

                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => {
                                    setShowDeleteConfirmDialog(false);
                                    setPendingDeletePresetId(null);
                                }}
                                className="rounded-lg border border-slate-600 px-4 py-2 text-slate-200 hover:bg-slate-700 transition-colors duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDeletePreset}
                                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition-colors duration-200"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
