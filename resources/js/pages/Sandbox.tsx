import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
    DndContext,
    DragEndEvent,
    DragStartEvent,
    DragOverlay,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { Sidebar } from '../components/common/Sidebar';
import { Canvas } from '../components/common/Canvas';
import { DragPreview } from '../components/common/DragPreview';
import { Button } from '../components/ui';
import { SavePresetDialog, ConfirmAddDeviceDialog, DeletePresetConfirmDialog } from '../components/dialogs';
import { useCanvasStore } from '../stores/canvasStore';
import { usePresetStore } from '../stores/presetStore';
import { useDeviceStore } from '../stores/deviceStore';
import { DeviceType } from '../types';

export default function Sandbox() {
    const [showSaveDialog, setShowSaveDialog] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [confirmDialogType, setConfirmDialogType] = useState<'add-device' | 'remove-device'>('add-device');
    const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState(false);
    const [presetName, setPresetName] = useState('');
    const [pendingDeviceType, setPendingDeviceType] = useState<DeviceType | null>(null);
    const [pendingDeletePresetId, setPendingDeletePresetId] = useState<number | null>(null);
    const [pendingRemoveDeviceId, setPendingRemoveDeviceId] = useState<string | null>(null);
    const [loadedPresetId, setLoadedPresetId] = useState<number | null>(null);
    const [activeItem, setActiveItem] = useState<any>(null);

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

    // Device store
    const fetchDevices = useDeviceStore((state) => state.fetchDevices);

    // Drag sensors
    const sensors = useSensors(
        useSensor(PointerSensor)
    );

    // Fetch devices and presets on mount
    useEffect(() => {
        fetchDevices();
        fetchPresets();
    }, []);

    // Handle drag start
    const handleDragStart = (event: DragStartEvent) => {
        setActiveItem(event.active);
    };

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
                    id: `${data.preset.device.type}-preset-${data.presetId}`,
                    type: data.preset.device.type,
                    settings: data.preset.configuration,
                };
                setDevices([presetDevice]);
                // Store the loaded preset ID for updates
                setLoadedPresetId(data.presetId);
            }
        }

        // Clear active item
        setActiveItem(null);
    };

    // Handle confirm dialog (add device or remove device)
    const handleConfirmAddDevice = () => {
        if (confirmDialogType === 'add-device') {
            if (pendingDeviceType) {
                addDevice(pendingDeviceType);
                setPendingDeviceType(null);
                setShowConfirmDialog(false);
                setConfirmDialogType('add-device');
            }
        } else if (confirmDialogType === 'remove-device') {
            if (pendingRemoveDeviceId) {
                removeDevice(pendingRemoveDeviceId);
                setShowConfirmDialog(false);
                setPendingRemoveDeviceId(null);
                setConfirmDialogType('add-device');
            }
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

    const handleRemoveDeviceWithConfirm = (deviceId: string) => {
        setPendingRemoveDeviceId(deviceId);
        setConfirmDialogType('remove-device');
        setShowConfirmDialog(true);
    };

    const handleConfirmDeletePreset = async () => {
        if (pendingDeletePresetId === null) return;

        try {
            await deletePreset(pendingDeletePresetId);
            toast.success('Preset deleted successfully!');
            setShowDeleteConfirmDialog(false);
            setPendingDeletePresetId(null);
            // Clear canvas and reset preset if the deleted preset was loaded
            if (loadedPresetId === pendingDeletePresetId) {
                clear();
                setLoadedPresetId(null);
            }
        } catch (error) {
            toast.error('Failed to delete preset');
        }
    };

    return (
        <div className="flex h-screen w-screen flex-col bg-slate-900 text-slate-100">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-700 bg-slate-800 px-8 py-4">
                <div>
                    <h1 className="text-3xl font-bold">Device Sandbox Simulator</h1>
                    <p className="mt-1 text-sm text-slate-400">Drag and drop devices to configure your setup</p>
                </div>
                <div className="flex gap-3">
                    {/* Show buttons only if devices exist */}
                    {devices.length > 0 && (
                        <>
                            {/* Clear Button - Always shown when devices exist */}
                            <Button
                                type="info"
                                onClick={() => {
                                    clear();
                                    setLoadedPresetId(null);
                                }}
                            >
                                Clear
                            </Button>

                            {/* Preset-specific buttons */}
                            {loadedPresetId ? (
                                <>
                                    {/* Update Preset Button */}
                                    <Button
                                        type="success"
                                        disabled={!isModified}
                                        onClick={handleUpdatePreset}
                                    >
                                        Update Preset
                                    </Button>
                                    {/* Delete Preset Button */}
                                    <Button
                                        type="danger"
                                        onClick={() => handleDeletePreset(loadedPresetId)}
                                    >
                                        Delete Preset
                                    </Button>
                                </>
                            ) : (
                                <>
                                    {/* Save Preset Button - only when no preset is loaded */}
                                    <Button
                                        type="primary"
                                        disabled={!isModified}
                                        onClick={() => setShowSaveDialog(true)}
                                    >
                                        Save Preset
                                    </Button>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Main content */}
            <div className="flex flex-1 overflow-hidden">
                <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                    {/* Sidebar */}
                    <Sidebar presets={presets} />

                    {/* Canvas */}
                    <Canvas
                        devices={devices}
                        isModified={isModified}
                        onAddDevice={addDevice}
                        onSettingsChange={updateDevice}
                        onRemoveDevice={removeDevice}
                        onRemoveDeviceWithConfirm={handleRemoveDeviceWithConfirm}
                    />

                    {/* Drag overlay - shows what's being dragged */}
                    <DragOverlay>
                        {activeItem &&
                            (() => {
                                const data = activeItem.data?.current;

                                if (!data) return null;

                                switch (data.type) {
                                    case 'device':
                                        return <DragPreview type="device" deviceType={data.deviceType} />;
                                    case 'preset':
                                        return <DragPreview type="preset" preset={data.preset} />;
                                    default:
                                        return null;
                                }
                            })()}
                    </DragOverlay>
                </DndContext>
            </div>

            {/* Save Preset Dialog */}
            <SavePresetDialog
                open={showSaveDialog}
                presetName={presetName}
                onPresetNameChange={setPresetName}
                onSave={handleSavePreset}
                onCancel={() => {
                    setShowSaveDialog(false);
                    setPresetName('');
                }}
            />

            {/* Confirm Dialog (Add Device or Remove Device) */}
            <ConfirmAddDeviceDialog
                open={showConfirmDialog}
                onConfirm={handleConfirmAddDevice}
                onCancel={() => {
                    setShowConfirmDialog(false);
                    setPendingDeviceType(null);
                    setPendingRemoveDeviceId(null);
                    setConfirmDialogType('add-device');
                }}
            />

            {/* Delete Preset Confirmation Dialog */}
            <DeletePresetConfirmDialog
                open={showDeleteConfirmDialog}
                onConfirm={handleConfirmDeletePreset}
                onCancel={() => {
                    setShowDeleteConfirmDialog(false);
                    setPendingDeletePresetId(null);
                }}
            />
        </div>
    );
}
