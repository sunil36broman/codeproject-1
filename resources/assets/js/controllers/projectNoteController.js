var app = angular.module('app.module.controllers');

app.controller('projectNoteCtrlListAll', ['$scope', '$http', 'appConfig', function($scope, $http, appConfig){
    $http.get(appConfig.baseUrl + '/note')
        .success(function(data){
            $scope.notes = [];
            $scope.notes = data;
        })
        .error(function(data){
            console.log(data);
        });
}]);

app.controller('projectNoteCtrlList', ['$scope', 'ProjectNote', '$routeParams',
        function($scope, ProjectNote, $routeParams){
    $scope.notes = [];
    $scope.notes = ProjectNote.query({id: $routeParams.id});
    $scope.project = $routeParams.id;
}]);

app.controller('projectNoteCtrlSave', ['$scope', 'ProjectNote', '$location', 'Project', '$http', 'appConfig', '$routeParams',
    function($scope, ProjectNote, $location, Project, $http, appConfig, $routeParams){

        $scope.title = 'Cadastro de Notas';
        $scope.action_button = "Salvar"

        $scope.projects = [];
        $scope.projects = Project.query();

        $scope.save = function(note){
            if ($scope.form.$valid){
                $http.post(appConfig.baseUrl + '/project/' + note.project_id + '/note', note)
                    .success(function(data){
                        console.log(data);
                        $location.path('/project/' + $routeParams.id + '/notes');
                    })
                    .error(function(data){
                        console.log(data);
                    });
            }
        };

    }]);

app.controller('projectNoteCtrlEdit', ['$scope', '$routeParams', 'ProjectNote', '$location', '$http', 'appConfig', 'Project',
        function($scope, $routeParams, ProjectNote, $location, $http, appConfig, Project){

    $scope.title = 'Editar Nota';
    $scope.action_button = 'Alterar';

    $scope.projects = [];
    $scope.projects = Project.query();

    $scope.note = ProjectNote.get({id: $routeParams.id, idNote: $routeParams.idNote});

    $scope.save = function(note){
        if ($scope.form.$valid){
            ProjectNote.update({id: $routeParams.id, idNote: $routeParams.idNote}, note, function(){
                $location.path('/project/' + $routeParams.id + '/notes');
            });
        }
    }

}]);

app.controller('projectNoteCtrlRemove', ['$scope', '$routeParams', 'ProjectNote', '$location', 'appConfig', '$http',
        function($scope, $routeParams, ProjectNote, $location, appConfig, $http){

    $scope.title = 'Excluir Nota';
    $scope.action_button = "Excluir"

    $scope.remove = ProjectNote.get({id: $routeParams.id, idNote: $routeParams.idNote});
    $scope.save = function(remove){
        $scope.remove.$delete({id: $routeParams.id, idNote: $routeParams.idNote}).then(function(){
            $location.path('/project/' + $routeParams.id + '/notes');
        });
    }
}]);
