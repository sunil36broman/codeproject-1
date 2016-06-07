var app = angular.module('app.module.controllers');

app.controller('loginCtrl', ['$scope', 'OAuth', '$location', 'User', '$cookies',
        function($scope, OAuth, $location, User, $cookies){

    $scope.user = {
        username: '',
        password: ''
    };

    $scope.error = {
        error: false,
        message:''
    };

    $scope.login = function(authentication){
        if ($scope.form.$valid){
            OAuth.getAccessToken(authentication).then(function(){
                User.authenticated({}, {}, function(data){
                    $cookies.putObject('user', data);
                    $location.path('home');
                });
            }, function(data){
                $scope.error.error = true;
                $scope.error.message = data.data.error_description;
            });
        }
    };

}]);