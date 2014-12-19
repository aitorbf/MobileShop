angular.module('starter.services', [])


.factory('AuthService', function ($resource, Session, PARSE_CREDENTIALS) {
    var authService = {};

    authService.login = function (credentials) {

        var User = $resource('https://api.parse.com/1/login', {username:'credentials.username', password:'credentials.password'},
                             { 
            'get':  {
                method:'GET', 
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                }

            }
        });

        User.get({username:'credentials.username', password:'credentials.password'}).$promise.then(function (res) {
            Session.create(res.sessionToken, res.objectId,
                           res.username, res.username);
            return res;
        });
    };


    authService.isAuthenticated = function () {
        return !!Session.userId;
    };

    authService.isAuthorized = function (authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
        }
        return (authService.isAuthenticated() &&
                authorizedRoles.indexOf(Session.userRole) !== -1);
    };

    return authService;
})

.service('Session', function () {
    this.create = function (sessionId, userId, userRole, userName) {
        this.id = sessionId;
        this.userId = userId;
        this.userRole = userRole;
        this.userName = userName;
    };
    this.destroy = function () {
        this.id = null;
        this.userId = null;
        this.userRole = null;
        this.username = null;
    };
    return this;
})

.value('PARSE_CREDENTIALS',{
    APP_ID: 'IOzyklVXHyXdDRTIptfWhbgiwJgkLCyw7CJlAFzf',
    REST_API_KEY:'HOAtISRRXm2yBFz6gykMw9qAvC33RdUt4CXMiuAP'
});
