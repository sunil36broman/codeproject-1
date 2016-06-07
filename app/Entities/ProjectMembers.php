<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Traits\TransformableTrait;

class ProjectMembers extends Model
{

    use TransformableTrait;

    protected $table = 'projects_members';

    protected $fillable = [
        'project_id',
        'user_id'
    ];

    public $timestamps = false;

    public function project(){
        return $this->belongsTo(Project::class);
    }

    public function member(){
        return $this->belongsTo(User::class);
    }

}
