<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Preset extends Model
{
    protected $fillable = ['name', 'device_id', 'configuration'];

    protected $casts = [
        'configuration' => 'json',
    ];

    /**
     * Get the device for this preset.
     */
    public function device(): BelongsTo
    {
        return $this->belongsTo(Device::class);
    }
}
