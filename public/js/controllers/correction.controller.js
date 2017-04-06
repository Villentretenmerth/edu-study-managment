'use strict';

angular.module('Edu')

.controller('CorrectionController', ['$rootScope', '$scope', '$http', '$state', 'authentication', 
    function($rootScope, $scope, $http, $state, authentication) {
      
        $scope.authentication = authentication;
        $scope.leader = {};
        
        $scope.getPickedModulesList = function() {

            $http.post('/get_picked_modules_list2').then(function successCallback(response) {
                console.log(response.data);
                $scope.allModules = response.data;

            }); 

        }; $scope.getPickedModulesList();


        $scope.get_all_users = function() {

	        $http.post('/get_all_users').then(function successCallback(response) {
	               $scope.allUsers = response.data;
	            });

        }; $scope.get_all_users();


        $scope.goToModule = function(module) {

        	$scope.module = module;
        };

        $scope.saveUser = function() {

            $http.post('/save_user', {'user_id': $scope.leader.id, 'module_id': $scope.module.id } ).then(function successCallback(response) {
                $scope.getPickedModulesList();
                alert('Prowadzący został dopisany');
        	});

        };


        
}]);