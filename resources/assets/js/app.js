var app = angular.module('app', ['ngRoute', 'app.module.controllers', 'app.module.services', 'app.module.directive', 'app.module.filters', 'app.route',
                                 'angular-oauth2', 'ngResource', 'ngAnimate', 'ui.bootstrap.typeahead', 'ui.bootstrap.tpls',
                                 'ui.bootstrap.datepicker', 'ui.bootstrap.modal','ngFileUpload', 'http-auth-interceptor',
                                 'angularUtils.directives.dirPagination', 'mgcrea.ngStrap.navbar', 'pusher-angular', 'ui-notification']);

app.provider('appConfig', ['$httpParamSerializerProvider', function($httpParamSerializerProvider){
    var config = {
      //baseUrl: 'http://localhost:8000',
      baseUrl: 'http://localhost/codeproject/public',
      pusherKey:'eedbfc12fe872cb65c1a',
      project: {
            status:[
                {value: 1, label: 'Não Iniciado'},
                {value: 2, label: 'Iniciado'},
                {value: 3, label: 'Concluído'}
            ]
      },
      urls:{
          projectFile: '/project/{{id}}/file/{{idFile}}'
      },
      utils:{
          transformResponse: function(data, headers) {
              var headersGetter = headers();
              if (headersGetter['content-type'] == 'application/json' ||
                  headersGetter['content-type'] == 'text/json') {
                  var dataJson = JSON.parse(data);
                  if (dataJson.hasOwnProperty('data') && Object.keys(dataJson).length == 1) {
                      dataJson = dataJson.data
                  }
                  return dataJson;
              }
              return data;
          },
          transformRequest: function(data){
              if(angular.isObject(data)){
                return $httpParamSerializerProvider.$get()(data);
              }
              return data;
          }
      }
    };

    return {
       config: config,
       $get: function(){
           return config;
       }
    };

}]);

app.config(['$httpProvider','$locationProvider', 'OAuthProvider', 'OAuthTokenProvider', 'appConfigProvider', '$navbarProvider',
    function ($httpProvider, $locationProvider, OAuthProvider, OAuthTokenProvider, appConfigProvider, $navbarProvider) {

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';

        $httpProvider.defaults.transformResponse = appConfigProvider.config.utils.transformResponse;
        $httpProvider.defaults.transformRequest = appConfigProvider.config.utils.transformRequest;

        $httpProvider.interceptors.splice(0, 1);
        $httpProvider.interceptors.push('oAuthFix');

    OAuthTokenProvider.configure({
        name: 'token',
        options:{
            secure: false
        }
    });

    OAuthProvider.configure({
        baseUrl: appConfigProvider.config.baseUrl,
        clientId: '1',
        clientSecret: 'secret',
        grantPath: 'oauth/access_token'
    });

    angular.extend($navbarProvider.defaults, {
        activeClass: 'actived'
    });

}]);

app.run(['$rootScope', '$window', 'OAuth', '$location', '$http', '$modal', 'httpBuffer', '$cookies', '$pusher', 'Notification', 'appConfig',
        function($rootScope, $window, OAuth, $location, $http, $modal, httpBuffer, $cookies, $pusher, Notification, appConfig) {

    $rootScope.$on('pushed-build', function(event, data) {

        window.client = new Pusher(appConfig.pusherKey);
        var pusher = $pusher(window.client);
        var channel = pusher.subscribe('user.' + $cookies.getObject('user').id);
        channel.bind('App\\Events\\TaskWasIncluded', function (data) {
            var name = data.task.name;
            Notification.success('Tarefa ' + name + ' foi incluída!');
        });

        //if(data.next.$$route != undefined) {
        //    if (data.next.$$route.originalPath != '/login') {
        //        if (!OAuth.isAuthenticated()) {
        //            if (!window.client) {
        //                window.client = new Pusher(appConfig.pusherKey);
        //                var pusher = $pusher(window.client);
        //                var channel = pusher.subscribe('user.' + $cookies.getObject('user').id);
        //                channel.bind('App\\Events\\TaskWasIncluded', function (data) {
        //                    var name = data.task.name;
        //                    Notification.success('Tarefa ' + name + ' foi incluída!');
        //                });
        //            }
        //        }
        //    }
        //}

    });

    $rootScope.$on('pushed-destroy', function(event, data){
        if(data.next.$$route != undefined) {
            if (data.next.$$route.originalPath != '/login') {
                if (!window.client) {
                    window.client.disconnect();
                    window.client = null;
                }
            }
        }
    });

    $rootScope.$on('$routeChangeStart', function(event, next, current){
        if(next.$$route != undefined){
            if(next.$$route.originalPath != '/login'){
                if(!OAuth.isAuthenticated()){
                    $location.path('/login');
                }
            }
        }
        $rootScope.$emit('pushed-build', {next: next});
        //$rootScope.$emit('pushed-destroy', {next: next});

    });

    $rootScope.$on('$routeChangeSuccess', function(event, next, current){
        //if(next.$$route != undefined) {
        //    $rootScope.pageTitle = current.$$route.title;
        //}
    });

    $rootScope.$on('oauth:error', function(event, data) {
        // Ignore `invalid_grant` error - should be catched on `LoginController`.
        if ('invalid_grant' === data.rejection.data.error) {
            return;
        }

        if ('access_denied' === data.rejection.data.error) {
            httpBuffer.append(data.rejection.config, data.deferred);
            if(!$rootScope.loginModelOpened){
                var modalInstance = $modal.open({
                    templateUrl: 'build/view/template/loginModal.html',
                    controller: 'loginModelCtrl'
                });
                $rootScope.loginModelOpened = true;
            }
            return;
        }

        return $location.path('/login');
    });
}]);
