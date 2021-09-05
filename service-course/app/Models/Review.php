<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;
    protected $table = 'reviews';
    protected $fillable = [
        'user_id','course_id', 'rating', 'review'
    ];

    public function course()
    {
        return $this->belongsTo('Course');
    }
}
