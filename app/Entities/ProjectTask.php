<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;

class ProjectTask extends Model
{

    protected $table = 'projects_task';

    protected $fillable = [
        'name',
        'start_date',
        'due_date',
        'project_id',
        'status'
    ];

    public $timestamps = true;

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

}
