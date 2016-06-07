<?php

namespace App\Validator;

use Prettus\Validator\LaravelValidator;

class ProjectTaskValidator extends LaravelValidator
{

    protected $rules = [
        'name' => 'required|max:255',
        'project_id' => 'required'
    ];


}