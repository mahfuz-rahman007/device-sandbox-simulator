<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PresetController;
use App\Http\Controllers\Api\DeviceController;


// Sandbox API Routes
Route::prefix('sandbox')->group(function () {
    // Devices
    Route::get('/devices', [DeviceController::class, 'index']);

    // Presets
    Route::get('/presets', [PresetController::class, 'index']);
    Route::post('/presets', [PresetController::class, 'store']);
    Route::put('/presets/{preset}', [PresetController::class, 'update']);
    Route::delete('/presets/{preset}', [PresetController::class, 'destroy']);
});
