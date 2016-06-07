var app = angular.module('app.module.controllers');

app.controller('homeCtrl', ['$scope', '$cookies', 'Project', '$pusher', '$timeout',
    function($scope, $cookies, Project, $pusher, $timeout){

    $scope.user = $cookies.getObject('user').name;

    $scope.projects = [];
    $scope.tasks = [];

    Project.query({
        orderBy: 'created_at',
        sorteBy: 'desc',
        limit: 8
    }, function(response){
        $scope.projects = response.data;
    });

    var pusher = $pusher(window.client);
    var channel = pusher.subscribe('user.' + $cookies.getObject('user').id);
    channel.bind('App\\Events\\TaskWasIncluded', function (data) {
        if($scope.tasks.length == 6){
            $scope.tasks.splice($scope.tasks.length = -1, 1);
        }
        $timeout(function(){
            $scope.tasks.unshift(data.task);
        }, 300);
    });


}]);