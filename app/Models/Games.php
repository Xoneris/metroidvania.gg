<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Games extends Model {
    protected $table = 'games';
    use HasFactory;

    protected $guarded = ['id'];
    public $timestamps = false;

    public function reports() {
        return $this->hasMany(Reports::class);
    }
}
