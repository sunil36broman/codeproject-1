<?php

namespace App\Validator;

use Prettus\Validator\LaravelValidator;

class ProjectValidator extends LaravelValidator
{

    protected $rules = [
        'name' => 'max:55',
        'description' => 'max:255',
    ];


}