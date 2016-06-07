var app = angular.module('app.module.controllers');

app.controller('projectCtrlDashboard', ['$scope', 'Project', function($scope, Project){

    $scope.project = {};

    $scope.projects = [];

    Project.query({
        orderBy: 'created_at',
        sorteBy: 'desc',
        limit: 8
    }, function(response){
        $scope.projects = response.data;
    });

    $scope.showProject = function(project){
        $scope.project = project;
    };

}]);

app.controller('projectCtrlList', ['$scope', 'Project', function($scope, Project){

    $scope.projects = [];
    $scope.totalProjects = 0;
    $scope.projectsPerPage = 15;
    getResultsPage(1);

    $scope.pagination = {
        current: 1
    };

    $scope.pageChanged = function(newPage) {
        getResultsPage(newPage);
    };

    function getResultsPage(pageNumber) {
        Project.query({
            page: pageNumber,
            limit: $scope.projectsPerPage
        }, function(resp){
            $scope.projects = resp.data;
            $scope.totalProjects = resp.meta.pagination.total;
        });
    }


}]);

app.controller('projectCtrlSave', ['$scope', '$location', '$cookies', 'Project', 'Client', 'appConfig', '$q',
        function($scope, $location, $cookies, Project, Client, appConfig, $q){
    $scope.action_button = "Salvar";
    $scope.clients = Client.query();
    $scope.status = appConfig.project.status;
    $scope.save = function(project){
        if ($scope.form.$valid){
            $scope.project.owner_id = $cookies.getObject('user').id;
            $scope.project = new Project();
            $scope.project.$save(project).then(function(){
                $location.path('/project');
            })
        }
    }

    $scope.formatName = function(id){
        if (id){
            for(var i in $scope.clients){
                if($scope.clients[i].id == id){
                    return $scope.clients[i].name;
                }
            }
        }
        return '';
    };

    $scope.due_date = {
        status:{
            opened: false
        }
    };

    $scope.open = function($event){
        $scope.due_date.status.opened = true;
    };

    $scope.getClients = function(name){
        var deffered = $q.defer();
        Client.query({
            search: name,
            searchFields: 'name:like'
        }, function(response){
            deffered.resolve(response.data);
        }, function(error){
            deffered.reject(error);
        });
        return deffered.promise;
    };

}]);

app.controller('projectCtrlEdit', ['$scope', '$routeParams', 'Client', '$location', 'Project', '$cookies', 'appConfig', '$q',
        function($scope, $routeParams, Client, $location, Project, $cookies, appConfig, $q){
    $scope.title = 'Editar Projeto';
    $scope.action_button = "Alterar"
    Client.query({
        orderBy: 'created_at',
        sorteBy: 'desc',
        limit: 8
    }, function(response){
        $scope.clients = response.data;
    });
    $scope.status = appConfig.project.status;

    Project.get({id: $routeParams.id}, function(response){
        $scope.project = response;
        $scope.clientSelected = response.client.data;
    });

    $scope.save = function(project){
        if ($scope.form.$valid){
            Project.update({id:project.id}, project, function(data){
                $location.path('/project');
            });
        }
    }

    $scope.due_date = {
        status:{
            opened: false
        }
    };

    $scope.open = function($event){
        $scope.due_date.status.opened= true;
    };

    $scope.formatName = function(id){
        if (id){
            for(var i in $scope.clients){
                if($scope.clients[i].id == id){
                    console.log($scope.clients[i]);
                    return $scope.clients[i].name;
                }
            }
        }
        return '';
    };

    $scope.getClients = function(name){
        var deffered = $q.defer();
        Client.query({
            search: name,
            searchFields: 'name:like'
        }, function(response){
            deffered.resolve(response.data);
        }, function(error){
            deffered.reject(error);
        });
        return deffered.promise;
    };

}]);

app.controller('projectCtrlRemove', ['$scope', '$routeParams', 'Project', '$location',
        function($scope, $routeParams, Project, $location){
    $scope.title = 'Excluir Projeto';
    $scope.action_button = "Excluir"
    $scope.remove = Project.get({id: $routeParams.id});
    $scope.save = function(remove){
        $scope.remove.$delete().then(function(){
            $location.path('/project');
        });
    }
}]);