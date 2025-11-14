<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Device;

class DeviceController extends Controller
{
    /**
     * Get all active devices
     */
    public function index()
    {
        $devices = Device::active()->get();

        return response()->json([
            'data' => $devices,
        ]);
    }
}
