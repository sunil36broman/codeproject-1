<?php

namespace App\Http\Controllers;

use App\Repositories\ProjectTaskRepository;
use App\Services\ProjectTaskService;
use Illuminate\Http\Request;
use App\Http\Requests;
use Mockery\Exception;

class ProjectTaskController extends Controller
{

    /**
     * @var ProjectTaskRepository
     */
    private $repository;

    /**
     * @var projectTaskService
     */
    private $service;
    public function __construct(
                            ProjectTaskRepository $projectRepository,
                            ProjectTaskService $service

    ){
        $this->repository = $projectRepository;
        $this->service = $service;
    }

    public function index(Request $request)
    {
        return $this->repository->paginate();
    }

    public function store(Request $request, $id)
    {
        $data = $request->all();
        $data['project_id'] = $id;
        return $this->service->create($request->all());
    }

    public function show($id, $taskid)
    {
        $result = $this->repository->findWhere(['project_id' => $id, 'id' => $taskid]);
        if (isset($result['data']) && count($result['data']) == 1) {
            $result = [
                'data' => $result['data'][0]
            ];
        };
        return $result;
    }

    public function edit($id)
    {
        $task = $this->repository->find($id);
        return response()->json($task);
    }

    public function update(Request $request, $id, $idTask)
    {
        $data = $request->all();
        $data['project_id'] = $id;
        return $this->service->update($data, $idTask);
    }

    public function destroy($id, $idTask)
    {
        try{
            $this->repository->delete($idTask);
        }catch (Exception $e){
            return ['error' => $e->errorInfo];
        }
    }

    public function projectTasks($id)
    {
        return $this->repository->findWhere(['project_id' => $id]);
    }
}
