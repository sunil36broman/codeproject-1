<?php

namespace App\Http\Controllers;

use App\Repositories\ProjectNoteRepository;
use App\Services\ProjectNoteService;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Symfony\Component\VarDumper\Caster\ExceptionCaster;

class ProjectNoteController extends Controller
{

    /**
     * @var ProjectTaskRepository
     */
    private $repository;

    /**
     * @var projectnoteervice
     */
    private $service;
    public function __construct(
            ProjectNoteRepository $projectRepository,
            ProjectNoteService $service)
    {
        $this->repository = $projectRepository;
        $this->service = $service;
    }

    public function index()
    {
        $note = $this->repository->all();
        return response()->json($note);
    }

    public function store(Request $request, $id)
    {
        $data = $request->all();
        $data['project_id'] = $id;
        return $this->service->create($data);
    }

    public function show($id, $noteid)
    {
        $result = $this->repository->findWhere([
            'project_id' => $id,
            'id' => $noteid
        ]);

        if (isset($result['data']) && count($result['data']) == 1) {
            $result = [
                'data' => $result['data'][0]
            ];
        };

        return $result;
    }

    public function edit($id)
    {
        $note = $this->repository->find($id);
        return response()->json($note);
    }

    public function update(Request $request, $id, $idNote)
    {
        $data = $request->all();
        $data['project_id'] = $id;
        return $this->service->update($data, $idNote);
    }

    public function destroy($id, $idNote)
    {
        $this->repository->delete($idNote);
    }

    public function projectNotes($id)
    {
        return $this->repository->findWhere(['project_id' => $id]);
    }

}

