'use strict';

angular.module('Edu')

.controller('ManageAccounts', ['$rootScope', '$scope', '$http', '$state', 'authentication', 'modules',
    function($rootScope, $scope, $http, $state, authentication, modules) {

    	// var $scope.accountId = null; 
    	// var $scope.accountPassword = null;

    	$scope.get_all_accounts = function() {
			
		$http.post('/all_accounts').then(function successCallback(response) {

				$scope.accounts = response.data;

			});
		}; $scope.get_all_accounts();


		$scope.changePassword = function(accountId, accountPassword){


			$http.post('/change_password_user', {'id': accountId, 'password': accountPassword } ).then(function successCallback(response) {

				alert('hasło zostało zmienione');
			
			});


		};


		$scope.deleteAccount = function(accountId){

console.log(accountId);
			$http.post('/delete_account', {'id': accountId} ).then(function successCallback(response) {

				alert('konto zostało usunięte');
				$scope.get_all_accounts();
			});


		};

}]);