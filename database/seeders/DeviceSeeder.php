<?php

namespace Database\Seeders;

use App\Models\Device;
use Illuminate\Database\Seeder;

class DeviceSeeder extends Seeder
{
    /**
     * Seed the devices table.
     */
    public function run(): void
    {
        // Light Device
        Device::create([
            'type' => 'light',
            'name' => 'Light',
            'is_active' => true,
            'settings' => [
                'power' => [
                    'type' => 'boolean',
                    'default' => false,
                ],
                'brightness' => [
                    'type' => 'integer',
                    'min' => 0,
                    'max' => 100,
                    'default' => 70,
                ],
                'colorTemp' => [
                    'type' => 'enum',
                    'values' => ['warm', 'neutral', 'cool', 'pink'],
                    'default' => 'warm',
                ],
            ],
        ]);

        // Fan Device
        Device::create([
            'type' => 'fan',
            'name' => 'Fan',
            'is_active' => true,
            'settings' => [
                'power' => [
                    'type' => 'boolean',
                    'default' => false,
                ],
                'speed' => [
                    'type' => 'integer',
                    'min' => 0,
                    'max' => 100,
                    'default' => 50,
                ],
            ],
        ]);
    }
}
