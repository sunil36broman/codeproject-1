<?php

namespace App\Http\Middleware;

use App\Services\ProjectService;
use Closure;

class CheckProjectOwner
{

    private $service;

    public function __construct(ProjectService $service)
    {
        $this->service = $service;
    }

    public function handle($request, Closure $next)
    {
        $projectId = $request->route('id') ? $request->route('id') : $request->route('project');
        if($this->service->checkProjectOwner($projectId) == false){
            return ['error' => 'Access forbidden'];
        }
        return $next($request);
    }
}
