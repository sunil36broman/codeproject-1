angular.module('app.module.services')
    .service('oAuthFix', ['$q', '$rootScope', 'OAuthToken',
        function oauthInterceptor($q, $rootScope, OAuthToken) {
            return {
                request: function(config) {
                    config.headers = config.headers || {};

                    // Inject `Authorization` header.
                    if (!config.headers.hasOwnProperty('Authorization') && OAuthToken.getAuthorizationHeader()) {
                        config.headers.Authorization = OAuthToken.getAuthorizationHeader();
                    }

                    return config;
                },
                responseError: function(rejection) {
                    var deferred = $q.defer();
                    // Catch `invalid_request` and `invalid_grant` errors and ensure that the `token` is removed.
                    if (400 === rejection.status && rejection.data &&
                        ('invalid_request' === rejection.data.error || 'invalid_grant' === rejection.data.error)
                    ) {
                        OAuthToken.removeToken();

                        //$rootScope.$emit('oauth:error', rejection);
                        $rootScope.$emit("oauth:error", { rejection: rejection, deferred: deferred});
                    }

                    // Catch `invalid_token` and `unauthorized` errors.
                    // The token isn't removed here so it can be refreshed when the `invalid_token` error occurs.
                    if (401 === rejection.status &&
                        //(rejection.data && 'access_denied' === rejection.data.error) ||
                        (rejection.data && 'access_denied' === rejection.data.error) ||
                        (rejection.headers('www-authenticate') && 0 === rejection.headers('www-authenticate').indexOf('Bearer'))
                    ) {
                        //$rootScope.$emit('oauth:error', rejection);
                        $rootScope.$emit("oauth:error", { rejection: rejection, deferred: deferred});
                        return deferred.promisse;

                    }
                    return $q.reject(rejection);
                }
            };
        }]);