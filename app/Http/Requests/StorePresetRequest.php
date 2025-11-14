<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePresetRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'device_id' => 'required|exists:devices,id',
            'settings' => 'required|array',
            'settings.power' => 'required|boolean',

            // Light specific settings
            'settings.brightness' => 'integer|min:0|max:100',
            'settings.colorTemp' => 'in:warm,neutral,cool,pink',

            // Fan specific settings
            'settings.speed' => 'integer|min:0|max:100',
        ];
    }

    /**
     * Get custom messages for validation errors
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Preset name is required',
            'name.max' => 'Preset name must not exceed 255 characters',
            'device_id.required' => 'Device is required',
            'device_id.exists' => 'Selected device does not exist',
            'settings.required' => 'Device settings are required',
            'settings.power.required' => 'Power setting is required',
            'settings.power.boolean' => 'Power setting must be a boolean value',
            'settings.brightness.integer' => 'Brightness must be a number',
            'settings.brightness.min' => 'Brightness must be at least 0',
            'settings.brightness.max' => 'Brightness must not exceed 100',
            'settings.colorTemp.in' => 'Invalid color temperature selected',
            'settings.speed.integer' => 'Fan speed must be a number',
            'settings.speed.min' => 'Fan speed must be at least 0',
            'settings.speed.max' => 'Fan speed must not exceed 100',
        ];
    }
}
