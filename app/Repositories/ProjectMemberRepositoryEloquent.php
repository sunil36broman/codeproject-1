<?php

namespace App\Repositories;

use App\Entities\ProjectMembers;
use App\Presenters\ProjectMemberPresenter;
use Prettus\Repository\Eloquent\BaseRepository;

class ProjectMemberRepositoryEloquent extends BaseRepository implements ProjectMemberRepository
{

    public function boot()
    {
        $this->pushCriteria(app('Prettus\Repository\Criteria\RequestCriteria'));
    }

    public function Model(){
        return ProjectMembers::class;
    }

    public function presenter(){
        return ProjectMemberPresenter::class;
    }

}
