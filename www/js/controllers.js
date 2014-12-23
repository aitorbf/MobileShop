angular.module('starter.controllers', [])

.controller('ApplicationController', function ($scope, $ionicModal,$ionicPopup,$ionicLoading,$rootScope, AUTH_EVENTS, USER_ROLES, AuthService, Session) {
    $scope.currentUser = null;
    $scope.userRoles = USER_ROLES;
    $scope.isAuthorized = AuthService.isAuthorized;

    $scope.setCurrentUser = function (user) {
        $scope.currentUser = user;
    };

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
        AuthService.login(credentials)
        .get(
            {
                username:credentials.username,
                password:credentials.password
            }
        )
        .$promise.then(

            function (user) {
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                Session.create(user.sessionToken, user.objectId,
                               user.username, user.username);
                $scope.setCurrentUser(user);
                $scope.closeLogin();
                var alertPopup = $ionicPopup.alert({
                    title: 'Welcome',
                    template: 'You are logged in as ' +  $scope.currentUser.username
                });
            }, function () {
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                var alertPopup = $ionicPopup.alert({
                    title: 'Login',
                    template: 'Invalid username or password' 
                });
            });

    };
})

.controller('ProductCtrl',['$scope','$stateParams','getProductFactory' ,function($scope, $stateParams,getProductFactory) {
    getProductFactory.query({ id:$stateParams.id },function(data) {
        $scope.product = data;
    });
}])

.controller('ProductsCtrl',['$scope','listProductFactory','$ionicLoading', function ($scope,listProductFactory,$ionicLoading){
    showLoadingDialog($ionicLoading);
    listProductFactory.query(function(data) {
        $scope.products = data.results;
        hideLoadingDialog($ionicLoading);
    });
}])

.controller('ProfileCtrl',['$scope', 'Session',function ($scope,Session){
    
  
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


function showLoadingDialog($ionicLoading){
    $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });
}
function hideLoadingDialog($ionicLoading){
    $ionicLoading.hide();
}