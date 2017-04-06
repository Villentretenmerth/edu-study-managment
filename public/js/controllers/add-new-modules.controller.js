'use strict';

angular.module('Edu')

.controller('AddNewModulesController', ['$rootScope', '$scope', '$http', '$state', 'authentication', 'modules',
    function($rootScope, $scope, $http, $state, authentication, modules) {
      
        $scope.authentication = authentication;

        $scope.newModuleText = '';
		$scope.newModuleColor = '1';

        $scope.modules = modules;
        

        $scope.sendNewModule = function() {
			
			if($scope.newModuleText != '') {
			
				$http.post('/add_new_module', {'name': $scope.newModuleText, 'color': $scope.newModuleColor } ).then(function successCallback(response) {
			    
			        $scope.newModuleText = '';
					modules.getModules();
				});
        	
        	}

        };
        
        
}]);