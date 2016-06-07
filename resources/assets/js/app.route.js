var app = angular.module('app.route', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/login', {
            templateUrl:'build/view/login.html',
            controller:'loginCtrl'
        })

        .when('/logout', {
            resolve:{
                logout: ['OAuthToken', '$location', function(OAuthToken, $location){
                    OAuthToken.removeToken();
                    $location.path('/#login');
                }]
            }
        })

        .when('/client', {
            templateUrl:'build/view/client/client.html',
            controller:'clientCtrlList',
            title: 'Clients'
        })
        .when('/client/dashboard', {
            templateUrl:'build/view/client/dashboard.html',
            controller:'clientCtrlDashboard',
            title: 'Clients'
        })
        .when('/client/new', {
            templateUrl:'build/view/client/clientForm.html',
            controller:'clientCtrlSave',
            title: 'Clients'
        })
        .when('/client/:id/edit', {
            templateUrl:'build/view/client/clientForm.html',
            controller:'clientCtrlEdit',
            title: 'Clients'
        })
        .when('/client/:id/remove', {
            templateUrl:'build/view/client/clientRemoveForm.html',
            controller:'clientCtrlRemove',
            title: 'Clients'
        })

        .when('/project', {
            templateUrl:'build/view/project/project.html',
            controller:'projectCtrlDashboard',
            title: 'Projects'
        })
        .when('/project/dashboard', {
            templateUrl:'build/view/project/dashboard.html',
            controller:'projectCtrlDashboard',
            title: 'Projects'
        })
        .when('/project/new', {
            templateUrl:'build/view/project/projectForm.html',
            controller:'projectCtrlSave',
            title: 'Projects'
        })
        .when('/project/:id/edit', {
            templateUrl:'build/view/project/projectForm.html',
            controller:'projectCtrlEdit',
            title: 'Projects'
        })
        .when('/project/:id/remove', {
            templateUrl:'build/view/project/projectRemoveForm.html',
            controller:'projectCtrlRemove',
            title: 'Projects'
        })

        .when('/note', {
            templateUrl:'build/view/note/note.html',
            controller:'projectNoteCtrlListAll'
        })
        .when('/note/:id/new', {
            templateUrl:'build/view/note/noteForm.html',
            controller:'projectNoteCtrlSave'
        })
        .when('/project/:id/notes', {
            templateUrl:'build/view/note/note.html',
            controller:'projectNoteCtrlList'
        })
        .when('/project/:id/note/:idNote/edit', {
            templateUrl:'build/view/note/noteForm.html',
            controller:'projectNoteCtrlEdit'
        })
        .when('/project/:id/note/:idNote/remove', {
            templateUrl:'build/view/note/noteRemoveForm.html',
            controller:'projectNoteCtrlRemove'
        })

        .when('/task', {
            templateUrl:'build/view/task/task.html',
            controller:'projectTaskCtrlListAll'
        })
        .when('/task/dashboard', {
            templateUrl:'build/view/task/dashboard.html',
            controller: 'projectTaskCtrlDashboard'
        })
        .when('/task/:id/new', {
            templateUrl:'build/view/task/taskForm.html',
            controller:'projectTaskCtrlSave'
        })
        .when('/project/:id/tasks', {
            templateUrl:'build/view/task/task.html',
            controller:'projectTaskCtrlList'
        })
        .when('/project/:id/task/:idTask/edit', {
            templateUrl:'build/view/task/taskForm.html',
            controller:'projectTaskCtrlEdit'
        })
        .when('/project/:id/task/:idTask/remove', {
            templateUrl:'build/view/task/taskRemoveForm.html',
            controller:'projectTaskCtrlRemove'
        })

        .when('/project/:id/file/new', {
            templateUrl:'build/view/project-file/fileForm.html',
            controller:'projectFileCtrlSave'
        })
        .when('/file/dashboard', {
            templateUrl:'build/view/project-file/dashboard.html'
        })
        .when('/project/:id/file', {
            templateUrl:'build/view/project-file/file.html',
            controller:'projectFileCtrlList'
        })
        .when('/project/:id/file/:idFile/download', {
            controller:'projectFileCtrlDown'
        })
        .when('/project/:id/file/:idFile/edit', {
            templateUrl:'build/view/project-file/fileForm.html',
            controller:'projectFileCtrlEdit'
        })
        .when('//project/:id/file/:idFile/remove', {
            templateUrl:'build/view/project-file/fileRemoveForm.html',
            controller:'projectFileCtrlRemove'
        })


        .when('/members', {
            templateUrl:'build/view/member/member.html',
            controller:'memberCtrlList'
        })
        .when('/project/:id/members', {
            templateUrl:'build/view/member/member.html',
            controller:'memberCtrlList'
        })
        .when('/project/:id/member/new', {
            templateUrl:'build/view/member/memberForm.html',
            controller:'memberCtrlSave'
        })
        .when('/project/:id/member/:idMember/remove', {
            templateUrl:'build/view/member/memberRemoveForm.html',
            controller:'memberCtrlRemove'
        })

        .when('/home', {
            templateUrl:'build/view/home.html',
            controller:'homeCtrl'
        })

        .otherwise('/login');

}]);

