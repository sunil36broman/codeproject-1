angular.module('app.module.services')
    .service('ProjectFile', ['$resource', 'appConfig', 'Url',
            function($resource, appConfig, Url){
                var url = appConfig.baseUrl +  Url.getUrlResource(appConfig.urls.projectFile);
                return $resource(url,
                    {
                        id: '@id',
                        idFile: '@idFile'
                    },
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
                },
                download:{
                    url:appConfig.baseUrl +
                        Url.getUrlResource(appConfig.urls.projectFile) + '/download',
                    method: 'GET'
                }
            });
    }]);