<?php

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = [
            'name' => 'Alexandre',
            'email' => 'alexandre.campagnaro@gmail.com',
            'password' => bcrypt('123456'),
            'remember_token' => str_random(10),
        ];
        \App\Entities\User::create($user);

        factory(\App\Entities\User::class, 20)->create();
    }
}
