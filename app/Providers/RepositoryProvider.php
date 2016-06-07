<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RepositoryProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {

    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(
            \App\Repositories\ClientRepository::class,
            \App\Repositories\ClientRepositoryEloquent::class
        );
        $this->app->bind(
            \App\Repositories\ProjectRepository::class,
            \App\Repositories\ProjectRepositoryEloquent::class
        );
        $this->app->bind(
            \App\Repositories\ProjectTaskRepository::class,
            \App\Repositories\ProjectTaskRepositoryEloquent::class
        );
        $this->app->bind(
            \App\Repositories\ProjectNoteRepository::class,
            \App\Repositories\ProjectNoteRepositoryEloquent::class
        );
        $this->app->bind(
            \App\Repositories\ProjectMemberRepository::class,
            \App\Repositories\ProjectMemberRepositoryEloquent::class
        );
        $this->app->bind(
            \App\Repositories\MemberRepository::class,
            \App\Repositories\MemberRepositoryEloquent::class
        );
        $this->app->bind(
            \App\Repositories\ProjectFileRepository::class,
            \App\Repositories\ProjectFileRepositoryEloquent::class
        );

    }
}
