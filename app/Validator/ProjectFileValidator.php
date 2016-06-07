<?php

namespace App\Validator;

use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\LaravelValidator;

class ProjectFileValidator extends LaravelValidator
{

    protected $rules = [
        ValidatorInterface::RULE_CREATE => [
            'name'        => 'required|max:255',
            'file'        => 'required|mimes:jpeg,png,jpg,gif,pdf,zip',
            'description' => 'required|max:255'
        ],
        ValidatorInterface::RULE_UPDATE => [
            'name'        => 'required|max:255',
            'description' => 'required|max:255'
        ],
    ];


}