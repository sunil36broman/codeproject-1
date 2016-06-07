var app = angular.module('app.module.filters');

app.filter('statusProject',['appConfig', function(appConfig){
    return function(input){
        switch (input){
            case 1:
                return appConfig.project.status[0].label;
                break;
            case 2:
                return appConfig.project.status[1].label;
                break;
            case 3:
                return appConfig.project.status[2].label;
                break;
        }
    };
}]);