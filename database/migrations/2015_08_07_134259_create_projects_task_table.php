<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectsTaskTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects_task', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 255);
            $table->integer('project_id')->unsigned();
            $table->date('start_date')->nullable();
            $table->date('due_date')->nullable();
            $table->smallInteger('status')->unsigned();
            $table->timestamps();

            $table->foreign('project_id')->references('id')->on('projects');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('projects_task');
    }
}
