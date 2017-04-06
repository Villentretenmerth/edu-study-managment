'use strict';

angular.module('Edu')

.factory('authentication', ['$rootScope', '$http', '$state', '$filter',
    function($rootScope, $http, $state, $filter) {

    var factory = {};

    factory.username = '';
    factory.password = '';
    var message = '';

    factory.login = function() {
        // parameters.showLoginBox = false;

        var data = JSON.stringify({'username' : factory.username, 'password' : factory.password});

        $http.post('/login', data).then(function successCallback(response) {
            console.log(response);
            if (response.data) {
                
                $rootScope.authenticated = true;

                factory.permission = response.data.permission;
                
                var style = '';
                var type = '';

                if (response.data.modules != null) {                  
                
                }

                else {  

                }
                
                console.log('zalogowany');
                    //tutaj zalogowany

                    $state.go('home');
                    
                    // database.getModuleData();
                    // menu.getMainMenu();
                    // settings.getAccountInformation();

            }

            else {

                if (response.data.active == false) {

                  // konto nieaktywne
                }
                else {

                    //nieprawidłowe dane

                }

                factory.username = '';
                factory.password = '';
            }
        });

    };

    factory.logout = function() {

        factory.username = '';
        factory.password = '';

        database.tiles = {};
        database.zones = {};

        // menu.downloaded = false;

        $http.post('/logout').then(function successCallback(response) {

            if (response.data.logged_out) {

                $rootScope.authenticated = false;
                // menu.showInputPassword(false);
                // update.lastUpdate = null;
                // update.stopInterval();

                // var style = response.data.style;

                // $http.get('css/style/' + style + '.css').then(function successCallback() {

                    // document.getElementById('style').href = 'css/style/' + style + '.css';
                    $state.go('login');
                // });
            }
        });
    };

    return factory;

}]);