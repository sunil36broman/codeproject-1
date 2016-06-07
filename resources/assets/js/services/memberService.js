angular.module('app.module.services')
    .service('Member', ['$resource', 'appConfig', function($resource, appConfig){
        return $resource(appConfig.baseUrl +  '/project/:id/member/:idMember', {id: '@id', idMember: '@idMember'},
            {
                update:{
                    method: 'PUT'
                },
                query:{
                    method: 'GET',
                    isArray: true,
                    transformResponse: function(data, headers){
                        var dataJson = JSON.parse(data);
                        dataJson = dataJson.data;
                        return dataJson;
                    }
                }
            });
    }]);