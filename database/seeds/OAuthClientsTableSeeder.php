<?php

use Illuminate\Database\Seeder;

class OAuthClientsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $oauthClient = [
            'id' => '1',
            'secret' => 'secret',
            'name' => 'App',
        ];
        \App\Entities\OAuthClient::create($oauthClient);

    }
}
