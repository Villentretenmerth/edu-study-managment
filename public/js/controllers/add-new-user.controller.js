'use strict';

angular.module('Edu')

.controller('AddNewUserController', ['$rootScope', '$scope', '$http', '$state', 'authentication', 
    function($rootScope, $scope, $http, $state, authentication) {

    $scope.authentication = authentication;

    if ($scope.authentication.permission == 3) {
 
        $scope.permission = [ {id: 1, name: 'Prowadzący'},
                              {id: 2, name: 'Dziekanat'},
                              {id: 3, name: 'Admin'} ];   
    } else if($scope.authentication.permission == 2){
 
        $scope.permission = [ {id: 1, name: 'Prowadzący'},
                              {id: 2, name: 'Dziekanat'}];
    }else {
        $scope.permission =[]
    }
 



    	$scope.AddNewUser = function() {
    			
    			$http.post('/add_new_user', {'user_name': $scope.userName, 'name': $scope.name, 'surname': $scope.surname, 'email': $scope.email, 'permission': $scope.selectedPermission.id} )
    			.then(function successCallback(response) {
        			alert('uzytkownik zostal dodany');
        		});
    	}

    }]);