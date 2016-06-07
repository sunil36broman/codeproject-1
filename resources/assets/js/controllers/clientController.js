var app = angular.module('app.module.controllers');

app.controller('clientCtrlDashboard', ['$scope', 'Client', 'appConfig', function($scope, Client, appConfig){

    $scope.client = {};

    $scope.clients = [];
    Client.query({
        orderBy: 'created_at',
        sorteBy: 'desc',
        limit: 8
    }, function(response){
        $scope.clients = response.data;
    });
    
    $scope.showClient = function(client){
        $scope.client = client;
        $scope.projects = client.project;
    };

}]);

app.controller('clientCtrlList', ['$scope', 'Client', function($scope, Client){
    $scope.clients = [];
    $scope.clients = Client.query();
}]);

app.controller('clientCtrlSave', ['$scope', 'Client', '$location',
    function($scope, Client, $location){

    $scope.title = 'Cadastro de Cliente';
    $scope.action_button = "Salvar"

        $scope.save = function(client){
        if ($scope.form.$valid){
            $scope.client = new Client();
            $scope.client.$save(client).then(function(){
                $location.path('/client');
            })
        }
    };

}]);

app.controller('clientCtrlEdit', ['$scope', '$routeParams', 'Client', '$location', function($scope, $routeParams, Client, $location){
    $scope.title = 'Editar Cliente';
    $scope.action_button = "Alterar"
    $scope.client = Client.get({id: $routeParams.id});
    $scope.save = function(client){
        if ($scope.form.$valid){
            Client.update({id:client.id}, client, function(){
                $location.path('/client');
            });
        }
    }
}]);

app.controller('clientCtrlRemove', ['$scope', '$routeParams', 'Client', '$location', function($scope, $routeParams, Client, $location){
    $scope.title = 'Excluir Cliente';
    $scope.action_button = "Excluir"
    $scope.remove = Client.get({id: $routeParams.id});
    $scope.save = function(remove){
        $scope.remove.$delete().then(function(){
            $location.path('/client');
        });
    }
}]);

