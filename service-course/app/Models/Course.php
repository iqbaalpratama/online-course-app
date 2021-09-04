<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;
    protected $table = 'courses';
    protected $fillable = [
        'name', 'certificate', 'thumbnail', 'type', 'status',
        'price', 'level', 'description', 'mentor_id'
    ];

    public function mentor()
    {
        return $this->belongsTo('Mentor');
    }
    public function chapters()
    {
        return $this->hasMany('Chapter')->orderBy('id', 'ASC');
    }
    public function images()
    {
        return $this->hasMany('ImageCourse')->orderBy('id', 'DESC');
    }
}
