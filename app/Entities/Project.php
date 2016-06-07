<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $table = 'projects';

    protected $fillable = [
        'owner_id',
        'client_id',
        'name',
        'description',
        'status',
        'due_date',
        'progress',
    ];

    public $timestamps = true;

    public function user()
    {
        return $this->belongsTo(User::class, 'owner_id', 'id');
    }

    public function client()
    {
        return $this->belongsTo(Client::class, 'client_id', 'id');
    }

    public function notes()
    {
        return $this->hasMany(ProjectNote::class, 'project_id', 'id');
    }

    public function tasks()
    {
        return $this->hasMany(ProjectTask::class, 'project_id', 'id');
    }

    public function members(){
        return $this->belongsToMany(User::class,'projects_members', 'project_id', 'user_id');
    }

    public function files(){
        return $this->hasMany(ProjectFile::class, 'project_id', 'id');
    }


}

