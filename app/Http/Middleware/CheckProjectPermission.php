<?php

namespace App\Http\Middleware;

use App\Services\ProjectService;
use Closure;

class CheckProjectPermission
{

    private $service;

    public function __construct(ProjectService $service)
    {
        $this->service = $service;
    }

    public function handle($request, Closure $next)
    {
        $projectId = $request->route('id');
        if($this->service->checkProjectPermissions($projectId) == false){
            return ['error' => 'You haven\'t permission to access project'];
        }
        return $next($request);
    }
}
