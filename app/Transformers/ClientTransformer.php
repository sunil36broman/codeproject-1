<?php

namespace App\Transformers;

use App\Entities\Client;
use League\Fractal\TransformerAbstract;

class ClientTransformer extends TransformerAbstract
{

    protected $defaultIncludes = ['project'];

    public function transform(Client $client)
    {
        return [
            'id'            => (int)$client->id,
            'name'          => $client->name,
            'responsabible' => $client->responsabible,
            'email'         => $client->email,
            'phone'         => $client->phone,
            'address'       => $client->address,
            'obs'           => $client->obs,
        ];
    }

    public function includeProject(Client $client){
        $transformer = new ProjectTransformer();
        $transformer->setDefaultIncludes([]);
        return $this->collection($client->project, $transformer);
    }

}
