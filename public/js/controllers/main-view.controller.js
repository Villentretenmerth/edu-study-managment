'use strict';

angular.module('Edu')

.controller('MainViewController', ['$rootScope', '$scope', '$http', '$state', 'authentication', 
    function($rootScope, $scope, $http, $state, authentication) {
      
        $scope.authentication = authentication;

        
        $scope.goFrames = function() {
			$state.go('frames');
        };

        
        $scope.goCorrection = function() {
        	 $state.go('correction');
        };

        
        $scope.goSettings = function() {
        	 $state.go('settings');
        };
        
}]);