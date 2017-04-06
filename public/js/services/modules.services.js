'use strict';

angular.module('Edu')

.factory('modules', ['$rootScope', '$http', '$state', '$filter',
    function($rootScope, $http, $state, $filter) { 
    	
    	var factory = {};
        factory.allModules = [];
 		
        // factory.getModules = function() {

        // 	$http.post('/get_modules').then(function successCallback(response) {
                
        //         console.log(response.data);
        // 		factory.allModules = response.data;
        		
        // 	});
        // };
        
 	
 	return factory;
    
    }]); 	