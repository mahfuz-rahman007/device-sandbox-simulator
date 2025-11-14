<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Device extends Model
{
    protected $fillable = ['type', 'name', 'is_active', 'settings'];

    protected $casts = [
        'settings' => 'json',
        'is_active' => 'boolean',
    ];

    /**
     * Get the presets for this device.
     */
    public function presets(): HasMany
    {
        return $this->hasMany(Preset::class);
    }

    /**
     * Scope to get only active devices.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
