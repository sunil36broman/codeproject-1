<?php

use Illuminate\Database\Seeder;

class ProjectNotesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(\App\Entities\ProjectNote::class, 150)->create();
    }
}
