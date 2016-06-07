<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;

class ProjectFile extends Model
{
    protected $table = 'project_files';

    protected $fillable = [
        'name',
        'project_id',
        'description',
        'extension',
    ];

    public $timestamps = true;

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function getFileName(){
        return $this->id . '.' . $this->extension;
    }

}

