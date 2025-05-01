<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubmitGames extends Model {
    protected $table = 'submit_games';
    use HasFactory;

    protected $guarded = ['id'];
    public $timestamps = false;
}
