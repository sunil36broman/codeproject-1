<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('app');
});

Route::post('oauth/access_token', function() {
    return Response::json(Authorizer::issueAccessToken());
});

Route::group(['middleware' => 'oauth'], function(){

    Route::get('user/authenticated', 'UserController@authenticated');
    Route::resource('client', 'ClientController');
    Route::get('project/{id}', 'ProjectController@show');
    Route::resource('project', 'ProjectController');
    Route::resource('task', 'ProjectTaskController');
    Route::resource('note', 'ProjectNoteController');

    Route::group(['middleware' => 'check.project.permission' ,'prefix' => 'project'], function(){
        Route::get('{id}/note', 'ProjectNoteController@projectNotes');
        Route::post('{id}/note', 'ProjectNoteController@store');
        Route::get('{id}/note/{noteId}', 'ProjectNoteController@show');
        Route::put('{id}/note/{noteId}', 'ProjectNoteController@update');
        Route::delete('{id}/note/{noteId}', 'ProjectNoteController@destroy');

        Route::get('{id}/task', 'ProjectTaskController@projectTasks');
        Route::post('{id}/task', 'ProjectTaskController@store');
        Route::get('{id}/task/{taskId}', 'ProjectTaskController@show');
        Route::put('{id}/task/{taskId}', 'ProjectTaskController@update');
        Route::delete('{id}/task/{taskId}', 'ProjectTaskController@destroy');

        Route::get('{id}/member', 'ProjectController@members');
        Route::post('{id}/member', 'ProjectController@addMember');
        Route::get('{id}/member/{memberId}', 'ProjectController@membersShow');
        Route::delete('{id}/member/{memberId}', 'ProjectController@removeMember');

        Route::get('{id}/file', 'ProjectFileController@index');
        Route::get('{id}/file/{fileId}', 'ProjectFileController@show');
        Route::get('{id}/file/{fileId}/download', 'ProjectFileController@showFile');
        Route::post('{id}/file', 'ProjectFileController@store');
        Route::put('{id}/file/{fileId}', 'ProjectFileController@update');
        Route::delete('{id}/file/{fileId}', 'ProjectFileController@destroy');
    });

});