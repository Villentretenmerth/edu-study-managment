'use strict';

angular.module('Edu')

.controller('TopMenuController', ['$scope', '$state', '$location', '$http', '$timeout', 'authentication',
    function($scope, $state, $location, $http, $timeout, authentication) {

    $scope.authentication = authentication;

            // $http.post('/permission').then(function successCallback(response) { 
            //     $scope.permission = response.data.permission;
            // });


    	$scope.goHome = function() {
			$state.go('home');
    	};

        $scope.goFrames = function() {
			$state.go('frames');
        };

        
        $scope.goCorrection = function() {
        	 $state.go('correction');
        };

        
        $scope.goSettings = function() {
        	 $state.go('settings');
        };

        $scope.goMyPrograms = function() {
             $state.go('myPrograms');
        };

        $scope.logout = function() {

            $http.post('/logout').then(function successCallback(response) { 
                $state.go('login');
            });

        };
 
}]);