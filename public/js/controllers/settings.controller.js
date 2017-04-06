'use strict';

angular.module('Edu')

.controller('SettingsController', ['$rootScope', '$scope', '$http', '$state', 'authentication', 
    function($rootScope, $scope, $http, $state, authentication) {
      
        $scope.authentication = authentication;

        $scope.password = '';
        $scope.passwordReType = '';
        $scope.email = '';


        $scope.changeEmail = function () {

        	if($scope.email != '') {

        		$http.post('/change_email', {'email': $scope.email } ).then(function successCallback(response) {
                
                	var data = response.data;
                
                	// if (data.status == '0') {
                	
                		// alert('Błąd, coś poszło nie tak');
                	
                	// } else if(data.status == '1') {
                	$scope.email = '';
                		alert('aktualizacja przebiegła pomyślnie');
                	
                	// }
            	
            	});
        	}
        }

        $scope.changePassword = function() {
        		
			if($scope.password == $scope.passwordReType) {

        		$http.post('/change_password', {'password': $scope.password } ).then(function successCallback(response) {
                
                	var data = response.data;
                
           //      	if( data.status == '0') {

           //      		alert('Błąd, coś poszło nie tak');

        			// } else if (data.status == '1') {
                $scope.password = '';
                $scope.passwordReType = '';
						alert('aktualizacja przebiegła pomyślnie');
        			// }

        		});

    		} else {
    			alert('Hasła się nie zgadzają');
    		}

		}
        

    $scope.menage_modules = function() {
        
        $state.go('addNewModules');
    };

    $scope.menage_users = function() {

      $state.go('addNewUser');  
    
    };

    $scope.menage_accounts = function() {

        $state.go('manageAccounts');  
    
    };

}]);