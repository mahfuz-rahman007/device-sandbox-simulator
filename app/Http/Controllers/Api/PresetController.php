<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Preset;
use App\Http\Requests\StorePresetRequest;

class PresetController extends Controller
{
    /**
     * Get all presets
     */
    public function index()
    {
        return response()->json([
            'data' => Preset::with('device')->get(),
        ]);
    }

    /**
     * Save current canvas device as a preset
     */
    public function store(StorePresetRequest $request)
    {
        $validated = $request->validated();

        $preset = Preset::create([
            'name' => $validated['name'],
            'device_id' => $validated['device_id'],
            'configuration' => $validated['settings'],
        ]);

        return response()->json([
            'data' => $preset->load('device'),
        ], 201);
    }

    /**
     * Update a preset
     */
    public function update(Preset $preset, StorePresetRequest $request)
    {
        $validated = $request->validated();

        $preset->update([
            'name' => $validated['name'],
            'device_id' => $validated['device_id'],
            'configuration' => $validated['settings'],
        ]);

        return response()->json([
            'data' => $preset->load('device'),
        ]);
    }

    /**
     * Delete a preset
     */
    public function destroy(Preset $preset)
    {
        $preset->delete();

        return response()->json([
            'message' => 'Preset deleted successfully',
        ]);
    }
}
