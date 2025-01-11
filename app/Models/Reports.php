<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reports extends Model
{
    protected $fillable = ['game_name', 'report', 'status'];
    use HasFactory;
}
