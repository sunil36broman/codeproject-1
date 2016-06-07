<?php

namespace App\Services;

use App\Entities\ProjectFile;
use App\Repositories\ProjectMemberRepository;
use App\Repositories\ProjectRepository;
use App\Validator\ProjectMemberValidator;
use App\Validator\ProjectValidator;
use LucaDegasperi\OAuth2Server\Facades\Authorizer;
use Mockery\CountValidator\Exception;
use Prettus\Validator\Exceptions\ValidatorException;

use \Illuminate\Filesystem\Filesystem;
use \Illuminate\Contracts\Filesystem\Factory as Storage;

class ProjectService
{
    /**
     * @var ClientRepository
     */
    protected $repository;

    /**
     * @var ProjectValidator
     */
    protected $projectValidator;

    /**
     * @var ProjectMemberRepository
     */
    protected $repositoryMember;

    /**]
     * @var $projectMemberValidator
     */
    protected $projectMemberValidator;

    /**
     * @var ProjectFile
     */
    protected $projectFile;

    public function __construct(ProjectRepository $repository,
                                ProjectValidator $projectValidator,
                                ProjectMemberRepository $repositoryMember,
                                ProjectMemberValidator $projectMemberValidator,
                                Filesystem $filesystem,
                                Storage $storage,
                                ProjectFile $projectFile ){
        $this->repository = $repository;
        $this->validator = $projectValidator;
        $this->repositoryMember = $repositoryMember;
        $this->memberValidator = $projectMemberValidator;
        $this->filesystem = $filesystem;
        $this->storage = $storage;
        $this->projectFile = $projectFile;
    }

    public function create(array $data){

        try{
            $this->validator->with($data)->passesOrFail();
            return $this->repository->create($data);
        } catch (ValidatorException $e){
            return [
                'error' => true,
                'message' => $e->getMessageBag()
            ];
        }

    }

    public function update(array $data, $id){
        try{
            $this->validator->with($data)->passesOrFail();
            return $this->repository->update($data, $id);
        } catch(ValidatorException $e){
            return [
                'error' => true,
                'message' => $e->getMessageBag()
            ];
        }

    }

    public function addMember(array $data)
    {
        try{
            $this->memberValidator->with($data)->passesOrFail();
            return $this->repositoryMember->create($data);
        } catch (ValidatorException $e){
            return [
                'error' => true,
                'message' => $e->getMessageBag()
            ];
        }
    }

    public function removeMember($projectId, $memberId)
    {

        try{
            $member = $this->repositoryMember->findWhere(['project_id' => $projectId, 'user_id' => $memberId])->first();
            return $member->delete();
        }catch (Exception $e){
            return ['error' => $e->errorInfo];
        }
    }

    public function membersShow($projectId, $memberId)
    {
        try{
            return \App\Entities\ProjectMembers::all();
        }catch (Exception $e){
            return ['error' => $e->errorInfo];
        }
    }

    public function isMember($projectId)
    {
        $member = $project = $this->repository->skipPresenter()->find($projectId);
        return response()->json(['data' => $member->members]);
    }

    public function checkProjectOwner($projectId){
        $userId = Authorizer::getResourceOwnerId();
        return $this->repository->isOwner($projectId, $userId);
    }

    public function checkProjectMember($projectId){
        $userId = Authorizer::getResourceOwnerId();
        return $this->repository->hasMember($projectId, $userId);
    }

    public function checkProjectPermissions($projectId)
    {
        if($this->checkProjectOwner($projectId) or $this->checkProjectMember($projectId)){
            return true;
        }
        return false;
    }

}