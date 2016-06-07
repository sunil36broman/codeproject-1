<?php

namespace app\Repositories;

use \App\Entities\Client;
use Prettus\Repository\Eloquent\BaseRepository;
use App\Presenters\ClientPresenter;

class ClientRepositoryEloquent extends BaseRepository implements ClientRepository
{

    protected $fieldSearchable = [
        'name'
    ];

    public function Model(){
        return Client::class;
    }

    public function presenter()
    {
        return ClientPresenter::class;
    }

    public function boot()
    {
        $this->pushCriteria(app('Prettus\Repository\Criteria\RequestCriteria'));
    }

}