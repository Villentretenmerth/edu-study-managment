'use strict';

angular.module('Edu')

.controller('FramesController', ['$rootScope', '$scope', '$http', '$state', 'authentication', 'modules', '$timeout',
    function($rootScope, $scope, $http, $state, authentication, modules, $timeout) {
      
        $scope.authentication = authentication;
        $scope.newYear = '';
        $scope.years = [];
        $scope.pickedYear = {};
        $scope.picked_modules_list = [];
        $scope.pickedModulesInYear = [];

        $scope.colorModules = [
        { id: 1, name: 'Czerwony'}, 
        { id: 2, name: 'Zielony'}, 
        { id: 3, name: 'Niebieski'} ];

        $scope.semestersList = [
        { id: 1, name: 'Semestr 1'},
        { id: 2, name: 'Semestr 2'},
        { id: 3, name: 'Semestr 3'},
        { id: 4, name: 'Semestr 4'},
        { id: 5, name: 'Semestr 5'},
        { id: 6, name: 'Semestr 6'},
        { id: 7, name: 'Semestr 7'}, ];


        $scope.getYears = function() {

			$http.post('/get_years').then(function successCallback(response) {

				$scope.years = response.data;

			});	

        }; $scope.getYears();


        $scope.getPickedModulesList = function() {

            $http.post('/get_picked_modules_list').then(function successCallback(response) {
                
                $scope.picked_modules_list = response.data;

            }); 

        }; $scope.getPickedModulesList();

    
        $scope.getModules = function() {

            $http.post('/get_modules').then(function successCallback(response) {
                
                $scope.allModules = response.data;

            });

        }; $scope.getModules();


        $scope.showYear = function(year) {

        	$scope.pickedYear = year;
            $scope.pickedModulesInYear = [];

            $scope.picked_modules_list.forEach(function(x) {

                if(x.lista_rocznikow_id == year.id) {

                    $scope.pickedModulesInYear.push(x);
                }

            });

        };


        $scope.pickedModuleAndShowYear = function(year) {

            $http.post('/get_picked_modules_list').then(function successCallback(response) {
                
                $scope.picked_modules_list = response.data;
                $scope.showYear(year);
            });
        };

 
        $scope.sendNewYear = function() {

			if($scope.newYear != '') {

				$http.post('/add_new_year', {'name': $scope.newYear } ).then(function successCallback(response) {
	        	
	        		$scope.getYears();

				});
	        	
	        	$scope.newYear = '';
        	}
        };

        $scope.send_module = function() {

            var flag = 1;

            $scope.pickedModulesInYear.forEach(function(x) {
                if( x.lista_semestrow_id == $scope.semester.id && x.kolory_modulow_id == $scope.color.id ) {
                        flag = flag + 1;
                }
            });
                
            if (flag <= 2) {

                var data = {'year': $scope.pickedYear.id, 'color': $scope.color.id, 'semester': $scope.semester.id, 'module': $scope.selectedDevice.id };

                $http.post('/send_modules', data ).then(function successCallback(response) {
                    
                    $scope.pickedModuleAndShowYear($scope.pickedYear);
                    
                });


            } else {

                alert('nie mozna dodać więcej niż dwóch modułów o tym samym kolorze do wybranego semestru');
            
            }



        };

        
}]);