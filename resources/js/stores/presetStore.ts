import { create } from 'zustand';
import { Preset, Device } from '../types';
import { useDeviceStore } from './deviceStore';
import axiosInstance from '../config/axios';

interface PresetState {
    presets: Preset[];
    loading: boolean;
    error: string | null;

    // Fetch all presets
    fetchPresets: () => Promise<void>;

    // Save current devices as preset
    savePreset: (name: string, devices: Device[]) => Promise<void>;

    // Update existing preset
    updatePreset: (id: number, devices: Device[], presetName: string) => Promise<void>;

    // Delete preset
    deletePreset: (id: number) => Promise<void>;

    // Clear error
    clearError: () => void;
}

export const usePresetStore = create<PresetState>((set) => ({
    presets: [],
    loading: false,
    error: null,

    fetchPresets: async () => {
        set({ loading: true, error: null });
        try {
            const { data } = await axiosInstance.get('/sandbox/presets');
            set({ presets: data.data, loading: false });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Unknown error',
                loading: false,
            });
        }
    },

    savePreset: async (name: string, devices: Device[]) => {
        set({ loading: true, error: null });
        try {
            // Get the first (and only) device
            const device = devices[0];
            if (!device) {
                throw new Error('No device to save');
            }

            // Get device_id from deviceStore
            const deviceModel = useDeviceStore.getState().getDeviceByType(device.type);
            if (!deviceModel) {
                throw new Error(`Device type '${device.type}' not found`);
            }

            await axiosInstance.post('/sandbox/presets', {
                name,
                device_id: deviceModel.id,
                settings: device.settings,
            });

            // Refetch presets after saving
            const { data } = await axiosInstance.get('/sandbox/presets');
            set({ presets: data.data, loading: false });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to save preset';
            set({
                error: errorMessage,
                loading: false,
            });
            throw error;
        }
    },

    updatePreset: async (id: number, devices: Device[], presetName: string) => {
        set({ loading: true, error: null });
        try {
            // Get the first (and only) device
            const device = devices[0];
            if (!device) {
                throw new Error('No device to update');
            }

            // Get device_id from deviceStore
            const deviceModel = useDeviceStore.getState().getDeviceByType(device.type);
            if (!deviceModel) {
                throw new Error(`Device type '${device.type}' not found`);
            }

            await axiosInstance.put(`/sandbox/presets/${id}`, {
                name: presetName,
                device_id: deviceModel.id,
                settings: device.settings,
            });

            // Refetch presets after updating
            const { data } = await axiosInstance.get('/sandbox/presets');
            set({ presets: data.data, loading: false });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to update preset';
            set({
                error: errorMessage,
                loading: false,
            });
            throw error;
        }
    },

    deletePreset: async (id: number) => {
        set({ loading: true, error: null });
        try {
            await axiosInstance.delete(`/sandbox/presets/${id}`);

            // Refetch presets after deletion
            const { data } = await axiosInstance.get('/sandbox/presets');
            set({ presets: data.data, loading: false });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to delete preset';
            set({
                error: errorMessage,
                loading: false,
            });
            throw error;
        }
    },

    clearError: () => set({ error: null }),
}));
