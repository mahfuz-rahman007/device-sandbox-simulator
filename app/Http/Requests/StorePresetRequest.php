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
}
