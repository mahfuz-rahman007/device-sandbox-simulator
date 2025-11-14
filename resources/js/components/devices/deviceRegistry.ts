import { LightItem } from './Light/LightItem';
import { FanItem } from './Fan/FanItem';

export interface DeviceConfig {
    id: 'light' | 'fan';
    label: string;
    Item: React.ComponentType<{ label?: string }>;
}

export const DEVICE_REGISTRY: DeviceConfig[] = [
    { id: 'light', label: 'Light', Item: LightItem },
    { id: 'fan', label: 'Fan', Item: FanItem },
];

export const getDeviceConfig = (deviceType: 'light' | 'fan') => {
    return DEVICE_REGISTRY.find((device) => device.id === deviceType);
};
