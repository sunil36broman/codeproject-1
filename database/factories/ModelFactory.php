<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

/**
 * Factory
 */

$factory->define(App\Entities\User::class, function ($faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->email,
        'password' => bcrypt(str_random(10)),
        'remember_token' => str_random(10),
    ];
});

$factory->define(App\Entities\Client::class, function ($faker) {
    return [
        'name'          => $faker->name,
        'responsabible' => $faker->name,
        'phone'         => $faker->phoneNumber,
        'email'         => $faker->email,
        'address'       => $faker->address,
        'obs'           => $faker->sentence
    ];
});


$factory->define(App\Entities\Project::class, function ($faker) {
    return [
        'owner_id'    => rand(1,5),
        'client_id'   => rand(1,5),
        'name'        => $faker->name,
        'description' => $faker->paragraph,
        'progress'    => rand(1,10),
        'status'      => rand(1,3),
        'due_date'    => $faker->date($format = 'Y-m-d', $max = 'now')
    ];
});

$factory->define(App\Entities\ProjectTask::class, function ($faker) {
    return [
        'name'        => $faker->name,
        'project_id'  => rand(1,10),
        'start_date'  => $faker->dateTime($max = 'now'),
        'due_date'    => $faker->dateTime($max = 'now'),
        'status'      => 1,
    ];
});

$factory->define(App\Entities\ProjectNote::class, function ($faker) {
    return [
        'project_id'  => rand(1,10),
        'title'       => $faker->word,
        'note'        => $faker->paragraph,
    ];
});

$factory->define(App\Entities\ProjectMembers::class, function ($faker) {
    return [
        'project_id' => rand(1,30),
        'user_id'    => rand(1,20),
    ];
});