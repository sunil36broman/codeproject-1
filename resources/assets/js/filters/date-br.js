var app = angular.module('app.module.filters');

app.filter('dateBr',['$filter', function($filter){
    return function(input){
        return $filter('date')(input, 'dd/MM/yyyy');
    };
}]);