<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;

class ProjectNote extends Model
{
    protected $table = 'project_notes';

    protected $fillable = [
        'project_id',
        'title',
        'note'
    ];

    public function project(){
        return $this->belongsTo(Project::class);
    }

}
