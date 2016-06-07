<?php

namespace App\Repositories;

use \App\Entities\ProjectTask;
use App\Presenters\ProjectTaskPresenter;
use Prettus\Repository\Eloquent\BaseRepository;

class ProjectTaskRepositoryEloquent extends BaseRepository implements ProjectTaskRepository
{

    public function boot()
    {
        $this->pushCriteria(app('Prettus\Repository\Criteria\RequestCriteria'));
    }

    public function Model(){
        return ProjectTask::class;
    }

    public function hasMember($projectId, $memberId)
    {
        $project = $this->find($projectId);
        foreach($project->members as $member)
        {
            if ($member->id == $memberId)
            {
                return true;
            }
            return false;
        }
    }

    public function presenter()
    {
        return ProjectTaskPresenter::class;
    }

}