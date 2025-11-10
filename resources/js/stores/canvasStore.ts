import { create } from 'zustand';
import { Device, DeviceType, DeviceSettings } from '../types';

interface CanvasState {
    devices: Device[];
    isModified: boolean;

    // Device management
    addDevice: (type: DeviceType) => void;
    removeDevice: (id: string) => void;
    updateDevice: (id: string, settings: DeviceSettings) => void;
    setDevices: (devices: Device[]) => void;

    // Canvas operations
    clear: () => void;
    reset: () => void;
}

// Initial state - empty canvas
const initialDevices: Device[] = [];

export const useCanvasStore = create<CanvasState>((set) => ({
    devices: initialDevices,
    isModified: false,

    addDevice: (type: DeviceType) =>
        set((state) => {
            const newId = `${type}-${Date.now()}`;
            let newDevice: Device;

            if (type === 'light') {
                newDevice = {
                    id: newId,
                    type: 'light',
                    settings: {
                        power: false,
                        brightness: 70,
                        colorTemp: 'warm',
                    } as any,
                };
            } else {
                newDevice = {
                    id: newId,
                    type: 'fan',
                    settings: {
                        power: false,
                        speed: 50,
                    } as any,
                };
            }

            // Replace device (only one device per preset)
            return {
                devices: [newDevice],
                isModified: true,
            };
        }),

    removeDevice: (id: string) =>
        set((state) => ({
            devices: state.devices.filter((d) => d.id !== id),
            isModified: false, // Removing device resets modified state
        })),

    updateDevice: (id: string, settings: DeviceSettings) =>
        set((state) => ({
            devices: state.devices.map((d) =>
                d.id === id ? { ...d, settings } : d
            ),
            isModified: true,
        })),

    setDevices: (devices: Device[]) =>
        set({
            devices,
            isModified: false,
        }),

    clear: () =>
        set({
            devices: initialDevices,
            isModified: false,
        }),

    reset: () =>
        set({
            devices: initialDevices,
            isModified: false,
        }),
}));
