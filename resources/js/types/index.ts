// Device Types
export type DeviceType = 'light' | 'fan';
export type ColorTemperature = 'warm' | 'neutral' | 'cool' | 'pink';

// Light Device Settings
export interface LightSettings {
    power: boolean;
    brightness: number; // 0-100
    colorTemp: ColorTemperature;
}

// Fan Device Settings
export interface FanSettings {
    power: boolean;
    speed: number; // 0-100
}

// Union type for device settings
export type DeviceSettings = LightSettings | FanSettings;

// Device Instance
export interface Device {
    id: string;
    type: DeviceType;
    settings: DeviceSettings;
}

// Preset Configuration - stores a single device
export interface PresetConfiguration {
    type: DeviceType;
    settings: DeviceSettings;
}

// Preset Model
export interface Preset {
    id: number;
    name: string;
    configuration: PresetConfiguration;
    created_at: string;
    updated_at: string;
}

// API Response types
export interface ApiResponse<T> {
    data: T;
    message?: string;
}

export interface ApiListResponse<T> {
    data: T[];
}
