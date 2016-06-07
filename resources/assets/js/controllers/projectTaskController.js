var app = angular.module('app.module.controllers');

app.controller('projectTaskCtrlListAll', ['$scope', '$http', 'appConfig', function($scope, $http, appConfig){
    $http.get(appConfig.baseUrl + '/task')
        .success(function(response){
            $scope.tasks = [];
            $scope.tasks = response.data;
        })
        .error(function(error){
            console.log(error);
        });
}]);

app.controller('projectTaskCtrlDashboard', ['$scope', 'Project', function($scope, Project){
    $scope.project = {};

    $scope.projects = [];

    Project.query({
        orderBy: 'created_at',
        sorteBy: 'desc',
        limit: 5
    }, function(response){
        $scope.projects = response.data;
    });

    $scope.showTask = function(project){
        $scope.project = project;
    };
}]);

app.controller('projectTaskCtrlList', ['$scope', 'ProjectTask', '$routeParams', 'appConfig',
        function($scope, ProjectTask, $routeParams, appConfig){

    $scope.project = $routeParams.id;

    $scope.projectTask = new ProjectTask();

    $scope.save = function(task){
        if ($scope.form.$valid){
            $scope.projectTask.status = appConfig.project.status[0].value;
            $scope.projectTask.project_id = $routeParams.id;
            $scope.projectTask.$save({id: $routeParams.id}).then(function(){
                $scope.projectTask = new ProjectTask();
                $scope.loadTask();
            });
        }
    }

    $scope.loadTask = function(){
        $scope.tasks = ProjectTask.query({
            id: $routeParams.id,
            orderBy: 'id',
            sorteBy: 'desc'
        });
    }

    $scope.loadTask();

}]);

app.controller('projectTaskCtrlSave', ['$scope', 'ProjectTask', '$location', '$routeParams', 'appConfig',
    function($scope, ProjectTask, $location, $routeParams, appConfig){

        $scope.title = 'Cadastro de Tarefas';
        $scope.action_button = "Salvar"

        $scope.projectTask = new ProjectTask();
        $scope.taskStatus = appConfig.project.status;

        $scope.start_date = {
            status:{
                opened: false
            }
        }

        $scope.due_date = {
            status:{
                opened: false
            }
        }

        $scope.openStart = function($event){
            $scope.start_date.status.opened = true;
        };

        $scope.openDue = function($event){
            $scope.due_date.status.opened = true;
        };

        $scope.save = function(task) {
            if ($scope.form.$valid) {
                $scope.projectTask = new ProjectTask();
                $scope.projectTask.$save(task).then(function () {
                    $location.path('/project/' + $routeParams.id + '/tasks');
                })
            }
        }

    }]);

app.controller('projectTaskCtrlEdit', ['$scope', '$routeParams', 'ProjectTask', '$location', '$http', 'appConfig', 'Project',
        function($scope, $routeParams, ProjectTask, $location, $http, appConfig, Project){

    $scope.title = 'Editar Tarefa';
    $scope.action_button = 'Alterar';

    $scope.taskStatus = appConfig.project.status;

    $scope.task = ProjectTask.get({id: $routeParams.id, idTask: $routeParams.idTask});

    $scope.start_date = {
        status:{
            opened: false
        }
    }

    $scope.due_date = {
        status:{
            opened: false
        }
    }

    $scope.openStart = function($event){
        $scope.start_date.status.opened = true;
    };

    $scope.openDue = function($event){
        $scope.due_date.status.opened = true;
    };

    $scope.save = function(task){
            ProjectTask.update({id: $routeParams.id, idTask: $routeParams.idTask}, task, function(){
                $location.path('/project/' + $routeParams.id + '/tasks');
            });
    }
}]);

app.controller('projectTaskCtrlRemove', ['$scope', '$routeParams', 'ProjectTask', '$location', 'appConfig', '$http',
        function($scope, $routeParams, ProjectTask, $location, appConfig, $http){

    $scope.title = 'Excluir Tarefa';
    $scope.action_button = "Excluir"

    $scope.remove = ProjectTask.get({id: $routeParams.id, idTask: $routeParams.idTask});
    $scope.save = function(remove){
        $scope.remove.$delete({id: $routeParams.id, idTask: $routeParams.idTask}).then(function(){
            $location.path('/project/' + $routeParams.id + '/tasks');
        });
    }

}]);
