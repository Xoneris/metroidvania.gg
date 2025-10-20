<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ManagedAds extends Model
{
    protected $fillable = ['name','media','size','status','priority','link','clickedAmount'];
    use HasFactory;
}