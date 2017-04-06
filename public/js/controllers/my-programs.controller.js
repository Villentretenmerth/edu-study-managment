'use strict';

angular.module('Edu')

.controller('MyProgramsController', ['$rootScope', '$scope', '$http', '$state', 'authentication', 'modules',
    function($rootScope, $scope, $http, $state, authentication, modules) {

    	$scope.getAllMyPrograms = function() {

	        $http.post('/get_all_my_programs2').then(function successCallback(response) {
	               $scope.allMyPrograms = response.data;
	               console.log($scope.allMyPrograms);
	            });

        }; $scope.getAllMyPrograms();


        $scope.pickProgram = function(program) {
        	$scope.pickedProgram = program;
        };


        $scope.sendProgramHours = function() {
			
			$http.post('/send_program_hours', {'module_id': $scope.pickedProgram.id, 
										 'count_lecture': $scope.pickedProgram.count_lecture,  
										 'count_exercise': $scope.pickedProgram.count_exercise, 
										 'count_consultation': $scope.pickedProgram.count_consultation} ).then(function successCallback(response) {
    			
    										alert('Zmieniono liczę godzin');

	        });

		};

    }]);