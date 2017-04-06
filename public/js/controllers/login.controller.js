'use strict';

angular.module('Edu')

.controller('LoginController', ['$rootScope', '$scope', '$http', '$state', 'authentication', 
    function($rootScope, $scope, $http, $state, authentication) {
      
        $scope.authentication = authentication;
        
        $scope.goLogin = function() {
            $state.go('login');
        };

}]);