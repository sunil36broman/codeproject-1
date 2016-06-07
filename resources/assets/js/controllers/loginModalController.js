var app = angular.module('app.module.controllers');

app.controller('loginModelCtrl', ['$scope', 'OAuth', '$location', 'User', '$cookies', 'authService', '$modalInstance', '$rootScope',
        function($scope, OAuth, $location, User, $cookies, authService, $modalInstance, $rootScope){

    $scope.user = {
        username: '',
        password: ''
    };

    $scope.error = {
        error: false,
        message:''
    };

    $scope.$on('event:auth-loginConfirmed', function(){
        $rootScope.loginModelOpened = false;
        $modalInstance.close();
    });

    $scope.$on('$routeChangeStart', function(){
        $rootScope.loginModelOpened = false;
        $modalInstance.dismiss('cancel');
    });

    $scope.login = function(authentication){
        if ($scope.form.$valid){
            OAuth.getAccessToken(authentication).then(function(){
                User.authenticated({}, {}, function(data){
                    $cookies.putObject('user', data);
                    authService.loginConfirmed();
                });
            }, function(data){
                $scope.error.error = true;
                $scope.error.message = data.data.error_description;
            });
        }
    };

    $scope.cancel = function(){
        authService.loginCancelled();
        $modalInstance.close();
        $location.path('/login');
    }

}]);