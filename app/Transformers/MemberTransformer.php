<?php

namespace App\Transformers;

use App\Entities\User;
use League\Fractal\TransformerAbstract;

class MemberTransformer extends TransformerAbstract
{

    public function transform(User $member)
    {
        return [
            'id'            => $member->id,
            'name'          => $member->name,
            'email'         => $member->email,
        ];
    }

}
