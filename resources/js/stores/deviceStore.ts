import { create } from 'zustand';
import { DeviceModel, DeviceType } from '../types';

interface DeviceStore {
    devices: DeviceModel[];
    loading: boolean;
    error: string | null;
    fetchDevices: () => Promise<void>;
    getDeviceById: (id: number) => DeviceModel | undefined;
    getDeviceByType: (type: DeviceType) => DeviceModel | undefined;
    clearError: () => void;
}

export const useDeviceStore = create<DeviceStore>((set, get) => ({
    devices: [],
    loading: false,
    error: null,

    fetchDevices: async () => {
        set({ loading: true, error: null });
        try {
            const response = await fetch('/api/sandbox/devices');
            if (!response.ok) {
                throw new Error('Failed to fetch devices');
            }
            const data = await response.json();
            set({ devices: data.data });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            set({ error: message });
        } finally {
            set({ loading: false });
        }
    },

    getDeviceById: (id: number) => {
        return get().devices.find((device) => device.id === id);
    },

    getDeviceByType: (type: DeviceType) => {
        return get().devices.find((device) => device.type === type);
    },

    clearError: () => {
        set({ error: null });
    },
}));
