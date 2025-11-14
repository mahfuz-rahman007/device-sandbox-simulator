<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Device;
use Exception;

class DeviceController extends Controller
{
    /**
     * Get all active devices
     */
    public function index()
    {
        try {
            $devices = Device::active()->get();

            return response()->json(['data' => $devices]);
        } catch (Exception $e) {
            info($e->getMessage());
            return response()->json(['message' => 'Failed to fetch devices'], 500);
        }
    }
}
