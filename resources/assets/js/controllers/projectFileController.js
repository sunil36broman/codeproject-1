var app = angular.module('app.module.controllers');

app.controller('projectFileCtrlList', ['$scope', 'ProjectFile', '$routeParams',
    function($scope, ProjectFile, $routeParams){
        $scope.projectFiles = [];
        $scope.projectFiles = ProjectFile.query({id: $routeParams.id});
        $scope.project = $routeParams.id;
}]);

app.controller('projectFileCtrlDown', ['$scope', 'ProjectFile', '$routeParams',
    function($scope, ProjectFile, $routeParams){
        $scope.projectFiles = [];
        $scope.projectFiles = ProjectFile.query({id: $routeParams.id});
        $scope.project = $routeParams.id;
}]);

app.controller('projectFileCtrlEdit', ['$scope', '$routeParams', 'ProjectFile', '$location', '$http', 'appConfig',
    function($scope, $routeParams, ProjectFile, $location, $http, appConfig){

        $scope.title = 'Editar File';
        $scope.action_button = 'Alterar';

        $scope.projectFile = ProjectFile.get({id:$routeParams.id, idFile: $routeParams.idFile});


        $scope.save = function(projectFile){
            if ($scope.form.$valid){
                ProjectFile.update({id: $routeParams.id, idFile: $routeParams.idFile}, projectFile, function(){
                    $location.path('/project/' + $routeParams.id + '/file');
                });
            }
        }

    }]);
app.controller('projectFileCtrlSave', ['$scope', '$location', '$routeParams','Upload', 'Url', 'appConfig',
    function($scope, $location, $routeParams, Upload, Url, appConfig){

	    $scope.title = 'Cadastro de imagens do projeto';
	    $scope.action_button = "Salvar";

        $scope.save = function(){
            if($scope.form.$valid){
                var url = appConfig.baseUrl + Url.getUrlFromUrlSymbol(appConfig.urls.projectFile, {
                        id: $routeParams.id,
                        idFile: ''
                    });
                Upload.upload({
                    url: url,
                    data: {
                        name: $scope.projectFile.name,
                        description: $scope.projectFile.description,
                        file: $scope.projectFile.file,
                        project_id: $routeParams.id
                    }
                }).success(function(){
                    $location.path('/project');
                });
            }

        };
}]);

app.controller('projectFileCtrlRemove', ['$scope', '$routeParams', 'ProjectFile', '$location',
    function($scope, $routeParams, ProjectFile, $location){

        $scope.title = 'Excluir Files';
        $scope.action_button = "Excluir"

        $scope.remove = ProjectFile.get({id: $routeParams.id, idFile: $routeParams.id});
        $scope.save = function(remove){
            $scope.remove.$delete({id: $routeParams.id, idFile: remove.id}).then(function(){
                $location.path('/project');
            });
        }
    }]);
