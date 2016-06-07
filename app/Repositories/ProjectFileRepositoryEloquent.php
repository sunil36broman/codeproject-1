<?php

namespace App\Repositories;

use \App\Entities\ProjectFile;
use App\Presenters\ProjectFilePresenter;
use Prettus\Repository\Eloquent\BaseRepository;

class ProjectFileRepositoryEloquent extends BaseRepository implements ProjectFileRepository
{
    public function Model(){
        return ProjectFile::class;
    }

    public function presenter()
    {
        return ProjectFilePresenter::class;
    }

}