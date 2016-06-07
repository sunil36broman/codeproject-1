<?php

namespace App\Repositories;

use \App\Entities\Project;
use Prettus\Repository\Eloquent\BaseRepository;
use App\Presenters\ProjectPresenter;

class ProjectRepositoryEloquent extends BaseRepository implements ProjectRepository
{

    public function boot()
    {
        $this->pushCriteria(app('Prettus\Repository\Criteria\RequestCriteria'));
    }

    public function Model(){
        return Project::class;
    }

    public function presenter()
    {
        return ProjectPresenter::class;
    }


    public function isOwner($projectId, $userId){
        if(count($this->skipPresenter()->findWhere(['id' => $projectId, 'owner_id' => $userId]))){
            return true;
        }
        return false;
    }

    public function hasMember($projectId, $memberId){
        $project = $this->skipPresenter()->find($projectId);
        foreach($project->members as $member){
            if($member->id == $memberId){
                return true;
            }
        }
        return false;
    }

    public function findOwner($userId, $limit = null, $columns = array()){
        return $this->scopeQuery(function($query) use ($userId){
            return $query->select('projects.*')->where('projects.owner_id', '=', $userId);
        })->paginate($limit, $columns);
    }

//    public function findWithOwnerAndMember($userId){
//        return $this->scopeQuery(function($query) use ($userId){
//            $query
//                ->leftJoin('project_members', 'project_members.project_id', '=', 'projects.id')
//                ->where('project_members.member_id', '=', $userId)
//                ->union($this->model->query()->getQuery()->where('owner_id', '=', $userId));
//        })->all();
//    }

}