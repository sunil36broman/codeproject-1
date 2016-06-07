<?php

namespace App\Repositories;

use App\Entities\ProjectMembers;
use App\Presenters\ProjectMemberPresenter;
use App\User;
use Prettus\Repository\Eloquent\BaseRepository;

class UserRepositoryEloquent extends BaseRepository implements ProjectMemberRepository
{

    public function boot()
    {
        $this->pushCriteria(app('Prettus\Repository\Criteria\RequestCriteria'));
    }

    public function Model(){
        return User::class;
    }

}
