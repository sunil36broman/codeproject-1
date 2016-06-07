<?php

namespace App\Http\Controllers;

use App\Repositories\ProjectRepository;
use App\Services\ProjectService;
use App\Services\VerifPermissionService;
use Illuminate\Http\Request;
use App\Http\Requests;
use Mockery\Exception;

class ProjectController extends Controller
{

    /**
     * @var ProjectRepository
     */
    private $repository;

    /**
     * @var ProjectService
     */

    private $service;

    /**
     * @var VerifPermissionService
     */
    private $permissionService;

    public function __construct(ProjectRepository $projectRepository, ProjectService $service){
        $this->repository = $projectRepository;
        $this->service = $service;
        $this->middleware('check.project.owner', ['except' => ['store', 'show', 'index']]);
        $this->middleware('check.project.permission', ['except' => ['index', 'store', 'update', 'destroy']]);
    }

    public function index(Request $request)
    {
        return $this->repository->findOwner(
            \Authorizer::getResourceOwnerId(),
            $request->query->get('limit')
        );
    }

    public function store(Request $request)
    {
        return $this->service->create($request->all());
    }

    public function show($id){
        if ($this->service->checkProjectPermissions($id) == false){
            return response()->json(['error' => 'Access Forbidden']);
        }
        return $this->repository->with(['user', 'client'])->find($id);
    }

    public function update(Request $request, $id)
    {
        if ($this->service->checkProjectPermissions($id) == false){
            return response()->json(['error' => 'Access Forbidden']);
        }

        return $this->service->update($request->all(), $id);
    }

    public function destroy($id)
    {
        if ($this->service->checkProjectPermissions($id) == false){
            return response()->json(['error' => 'Access Forbidden']);
        }

        try{
           $this->repository->delete($id);
        }catch (Exception $e){
            return ['error' => $e->errorInfo];
        }
    }

    public function members($id)
    {
        return $this->service->isMember($id);
    }

    public function addMember(Request $request)
    {
        $this->service->addMember($request->all());
    }

    public function removeMember($projectId, $userId)
    {
        $this->service->removeMember($projectId, $userId);
    }

    public function membersShow($id, $idMember)
    {
        return \App\Entities\ProjectMembers::where('project_id', $id)->where('user_id', $idMember)->first();
    }

    public function membersAll()
    {
        return \App\Entities\ProjectMembers::all();
    }

}
