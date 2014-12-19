angular.module('starter.controllers', [])

.controller('ApplicationController', function ($scope,
                                                USER_ROLES,
                                                AuthService) {
    $scope.currentUser = null;
    $scope.userRoles = USER_ROLES;
    $scope.isAuthorized = AuthService.isAuthorized;

    $scope.setCurrentUser = function (user) {
        $scope.currentUser = user;
    };
})

.controller('LoginController', function($scope, $ionicModal, $rootScope, AUTH_EVENTS, AuthService) {

    // Form data for the login modal
    $scope.credentials = {
        username: '',
        password: ''
    };

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function (credentials) {
        AuthService.login(credentials).then(function (user) {
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            $scope.setCurrentUser(user);
        }, function () {
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        });
    };
})

.controller('ProductCtrl', function($scope, $stateParams) {
})

.controller('ProductsCtrl',['$scope','listProductFactory', function ($scope,listProductFactory){
    $scope.loading = true;
    listProductFactory.query(function(data) {
        $scope.products = data.results;
        $scope.loading = false;
    });
}])


.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
})

.constant('USER_ROLES', {
    admin: 'admin',
    user: 'user'
});
