angular.module('app.module.services')
    .service('ProjectNote', ['$resource', 'appConfig', function($resource, appConfig){
        return $resource(appConfig.baseUrl +  '/project/:id/note/:idNote', {id: '@id', idNote: '@idNote'},
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