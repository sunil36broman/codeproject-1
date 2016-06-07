<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use LucaDegasperi\OAuth2Server\Facades\Authorizer;

class UserController extends Controller
{

    public function authenticated(){
        $idUser = Authorizer::getResourceOwnerId();
        return \App\Entities\User::find($idUser);
    }

}
