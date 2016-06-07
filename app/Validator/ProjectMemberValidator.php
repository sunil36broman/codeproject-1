<?php

namespace App\Validator;

use Prettus\Validator\LaravelValidator;

class ProjectMemberValidator extends LaravelValidator
{

    protected $rules = [
        'user_id' => 'required',
    ];


}