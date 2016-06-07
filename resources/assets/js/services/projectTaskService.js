angular.module('app.module.services')
    .service('ProjectTask', ['$resource', 'appConfig', '$filter', function($resource, appConfig, $filter){

        function transformData(data){
            var o =  angular.copy(data);
            if (angular.isObject(data)){
                if (data.hasOwnProperty('start_date')){
                    o.start_date = $filter('date')(data.start_date, 'yyyy-MM-dd')
                }
                if (data.hasOwnProperty('due_date')){
                    o.due_date = $filter('date')(data.due_date, 'yyyy-MM-dd')
                }
                return appConfig.utils.transformRequest(o);
            }
            return data;
        };

        return $resource(appConfig.baseUrl +  '/project/:id/task/:idTask',
            {
                id: '@id',
                idTask: '@idTask'
            },
            {
                save:{
                    method: 'POST',
                    transformRequest: transformData
                },
                update:{
                    method: 'PUT',
                    transformRequest: transformData
                },
                query:{
                    method: 'GET',
                    isArray: true,
                    transformResponse: function(data, headers) {
                        var o = appConfig.utils.transformResponse(data, headers);
                        if (angular.isObject(o)) {
                            if (o.hasOwnProperty('start_date') && o.start_date) {
                                var arrayDate = o.start_date.split('-'),
                                    month = parseInt(arrayDate[1]) - 1;
                            }
                            if (o.hasOwnProperty('due_date') && o.due_date) {
                                var arrayDate = o.due_date.split('-'),
                                    month = parseInt(arrayDate[1]) - 1;
                            }
                        }
                        return o;
                    }
                }
            });
    }]);