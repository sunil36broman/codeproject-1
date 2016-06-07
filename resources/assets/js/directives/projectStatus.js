var app = angular.module('app.module.directive');

app.directive('projectStatus',['appConfig', function(appConfig){
    return {
        templateUrl: appConfig.baseUrl + '/build/view/template/projectStatus.html',
        restrict: "E",
        scope:{
            status: "@"
        },
        link: function (scope, element, attr) {
            $(element).find('.text-info').removeClass('text-info');
            $(element).find('.text-success').removeClass('text-success');
            $(element).find('.text-danger').removeClass('text-danger');
            if(scope.status == 1){
                $(element).find('.status').addClass('text-info');
                scope.description = appConfig.project.status[0].label;
            } else if(scope.status == 2){
                $(element).find('.status').addClass('text-success');
                scope.description = appConfig.project.status[1].label;
            } else if(scope.status == 3){
                $(element).find('.status').addClass('text-danger');
                scope.description = appConfig.project.status[2].label;
            }
        }
    };
}]);