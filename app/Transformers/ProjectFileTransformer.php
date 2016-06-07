<?php

namespace App\Transformers;

use App\Entities\ProjectFile;
use League\Fractal\TransformerAbstract;

class ProjectFileTransformer extends TransformerAbstract
{
    public function transform(ProjectFile $model)
    {
        return [
            'id'          => $model->id,
            'name'        => $model->name,
            'extension'   => $model->extension,
            'description' => $model->description,
            'project_id'  => $model->project_id,
        ];
    }

}