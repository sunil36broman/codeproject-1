var app = angular.module('app.module.directive');

app.directive('projectFileDownload',['$timeout', 'appConfig', 'ProjectFile', function($timeout, appConfig, ProjectFile){
    return {
        restrict: 'E',
        templateUrl: appConfig.baseUrl + '/build/view/template/projectFileDownload.html',
        link: function (scope, element) {
            var anchor = element.children()[0];
            scope.$on('save-file', function(event, data){
                $(anchor).removeClass('disabled');
                $(anchor).text('Download');
                $(anchor).attr({
                    href: 'data:application-octet-stream;base64,' + data.file,
                    download: data.name
                });

                $timeout(function(){
                    scope.downloadFile=function(){

                    };
                    $(anchor)[0].click();
                });
            });
        },
        controller: ['$scope', '$element', '$attrs',  function($scope, $element, $attrs){
            $scope.downloadFile = function(){
                var anchor = $element.children()[0];
                $(anchor).addClass('disabled');
                $(anchor).text('loading...');
                ProjectFile.download({
                    id:null,
                    idFile: $attrs.idFile
                }, function(data){
                    $scope.$emit('save-file', data);
                });
            }
        }]
    };
}]);