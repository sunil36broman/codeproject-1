<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\ProjectFileRepository;
use App\Services\ProjectFileService;

class ProjectFileController extends Controller
{

    private $repository;
    private $service;

    public function __construct(ProjectFileRepository $repository, ProjectFileService $service)
    {
        $this->repository = $repository;
        $this->service = $service;
    }

    public function index($id)
    {
        return $this->repository->findWhere(['project_id' => $id]);
    }

    public function store(Request $request, $id)
    {
        $file = $request->file('file');
        $extension = $file->getClientOriginalExtension();

        $data['file'] = $file;
        $data['extension'] = $extension;
        $data['name'] = $request->name;
        $data['project_id'] = $id;
        $data['description'] = $request->description;

        return $this->service->createFile($data);
    }

    public function showFile($id)
    {
        $filePath = $this->service->getFilePath($id);
        $fileContent = file_get_contents($filePath);
        $file64 = base64_encode($fileContent);

        return [
            'file'=> $file64,
            'size'=> filesize($filePath),
            'name'=> $this->service->getFileName($id)
        ];
    }

    public function show($id, $idFile)
    {
        return $this->repository->find($idFile);
    }

    public function update($id, $idFile, Request $request)
    {
        return $this->service->update($request->all(), $idFile);
    }

    public function destroy($id)
    {
        return $this->service->delete($id);
    }
}