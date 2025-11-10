import { create } from 'zustand';
import { Preset, Device } from '../types';

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
            const response = await fetch('/api/sandbox/presets');
            if (!response.ok) {
                throw new Error('Failed to fetch presets');
            }
            const data = await response.json();
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

            const response = await fetch('/api/sandbox/presets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({
                    name,
                    type: device.type,
                    settings: device.settings,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to save preset');
            }

            // Refetch presets after saving
            const fetchResponse = await fetch('/api/sandbox/presets');
            const fetchData = await fetchResponse.json();
            set({ presets: fetchData.data, loading: false });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Unknown error',
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
                throw new Error('No device to save');
            }

            const response = await fetch(`/api/sandbox/presets/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({
                    name: presetName,
                    type: device.type,
                    settings: device.settings,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update preset');
            }

            // Refetch presets after updating
            const fetchResponse = await fetch('/api/sandbox/presets');
            const fetchData = await fetchResponse.json();
            set({ presets: fetchData.data, loading: false });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Unknown error',
                loading: false,
            });
            throw error;
        }
    },

    deletePreset: async (id: number) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(`/api/sandbox/presets/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete preset');
            }

            // Refetch presets after deletion
            const fetchResponse = await fetch('/api/sandbox/presets');
            const fetchData = await fetchResponse.json();
            set({ presets: fetchData.data, loading: false });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Unknown error',
                loading: false,
            });
            throw error;
        }
    },

    clearError: () => set({ error: null }),
}));
