<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Models\Preset;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Requests\StorePresetRequest;

class PresetController extends Controller
{
    /**
     * Get all presets
     */
    public function index()
    {
        try {
            return response()->json(['data' => Preset::with('device')->latest()->get()]);
        } catch (Exception $e) {
            info($e->getMessage());
            return response()->json(['message' => 'Failed to fetch presets'], 500);
        }
    }

    /**
     * Save current canvas device as a preset
     */
    public function store(StorePresetRequest $request)
    {
        try {
            $validated = $request->validated();

            DB::beginTransaction();
            $preset = Preset::create([
                'name' => $validated['name'],
                'device_id' => $validated['device_id'],
                'configuration' => $validated['settings'],
            ]);
            DB::commit();

            return response()->json(['data' => $preset->load('device')], 201);

        } catch (Exception $e) {
            DB::rollBack();
            info($e->getMessage());
            return response()->json(['message' => 'Failed to save preset'], 500);
        }
    }

    /**
     * Update a preset
     */
    public function update(Preset $preset, StorePresetRequest $request)
    {
        try {
            $validated = $request->validated();

            DB::beginTransaction();
            $preset->update([
                'name' => $validated['name'],
                'device_id' => $validated['device_id'],
                'configuration' => $validated['settings'],
            ]);
            DB::commit();

            return response()->json(['data' => $preset->load('device')]);
        } catch (Exception $e) {
            DB::rollBack();
            info($e->getMessage());
            return response()->json(['message' => 'Failed to update preset'], 500);
        }
    }

    /**
     * Delete a preset
     */
    public function destroy(Preset $preset)
    {
        try {
            DB::beginTransaction();
            $preset->delete();
            DB::commit();

            return response()->json(['message' => 'Preset deleted successfully']);

        } catch (Exception $e) {
            DB::rollBack();
            info($e->getMessage());
            return response()->json(['message' => 'Failed to delete preset'], 500);
        }
    }
}
