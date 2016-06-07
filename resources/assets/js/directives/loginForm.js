var app = angular.module('app.module.directive');

app.directive('loginForm',['appConfig', function(appConfig){
    return {
        restrict: 'E',
        templateUrl: appConfig.baseUrl + '/build/view/template/form-login.html',
        scope: false
    };
}]);