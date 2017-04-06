'use strict';

angular.module('Edu', ['ui.router', 'angular-swipe-element', 'ngSanitize'])

.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.interceptors.push(['$injector', '$q', function ($injector, $q) {
        return {

            'responseError': function (response) {
                
                console.log('reso error');

                if (response.status == 401) {
                    
                    console.log('error 401');
                    window.location = '/login';

                } else if(response.status == 470) {
                    
                    console.log('error 470');
              
                }

                return $q.reject(response);
            }
        };
    }]);

    $httpProvider.defaults.headers.common['Pragma'] = 'no-cache'; // angular IE caching issue

    if (window.history && window.history.pushState) {

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }

    $stateProvider

    .state('login', {
        url: '/login',
        views: {
            headerView: {
                templateUrl: 'views/public/login_header',
                controller: 'TopMenuController'
            },
            mainView: {
                templateUrl: 'views/public/login',
                controller: 'LoginController'
            }
        }
    })

    .state('home', {
        url: '/authenticated',
        views: {
            headerView: {
                templateUrl: 'views/protected/top_menu',
                controller: 'TopMenuController'
            },
            mainView: {
                templateUrl: 'views/protected/home'
            }
        }
    })

    .state('frames', {
        url: '/authenticated',
        views: {
            headerView: {
                templateUrl: 'views/protected/top_menu',
                controller: 'TopMenuController'
            },
            mainView: {
                templateUrl: 'views/protected/frames',
                controller: 'FramesController'
            }
        }
    })

    .state('correction', {
        url: '/authenticated',
        views: {
            headerView: {
                templateUrl: 'views/protected/top_menu',
                controller: 'TopMenuController'
            },
            mainView: {
                templateUrl: 'views/protected/correction',
                controller: 'CorrectionController'
            }
        }
    })

    .state('settings', {
        url: '/authenticated',
        views: {
            headerView: {
                templateUrl: 'views/protected/top_menu',
                controller: 'TopMenuController'
            },
            mainView: {
                templateUrl: 'views/protected/settings',
                controller: 'SettingsController'
            }
        }
    })

    .state('myPrograms', {
        url: '/authenticated',
        views: {
            headerView: {
                templateUrl: 'views/protected/top_menu',
                controller: 'TopMenuController'
            },
            mainView: {
                templateUrl: 'views/protected/my_programs',
                controller: 'MyProgramsController'
            }
        }
    })

    .state('addNewModules', {
        url: '/authenticated',
        views: {
            headerView: {
                templateUrl: 'views/protected/top_menu',
                controller: 'TopMenuController'
            },
            mainView: {
                templateUrl: 'views/protected/add_new_modules',
                controller: 'AddNewModulesController'
            }
        }
    })

     .state('addNewUser', {
        url: '/authenticated',
        views: {
            headerView: {
                templateUrl: 'views/protected/top_menu',
                controller: 'TopMenuController'
            },
            mainView: {
                templateUrl: 'views/protected/add_new_user',
                controller: 'AddNewUserController'
            }
        }
    })

  .state('manageAccounts', {
        url: '/authenticated',
        views: {
            headerView: {
                templateUrl: 'views/protected/top_menu',
                controller: 'TopMenuController'
            },
            mainView: {
                templateUrl: 'views/protected/manage_accounts',
                controller: 'ManageAccounts'
            }
        }
    })

    .state('error_404', {
        url: '/404',
        views: {
            errorView: {
                templateUrl: 'views/public/error_404'
            }
        }
    });

    $urlRouterProvider.otherwise('/404');

}])


.run(['$rootScope', '$state', '$stateParams', '$http', 'modules','authentication',
    function ($rootScope, $state, $stateParams, $http, modules,authentication) {

    $rootScope.state = $state;
    $rootScope.stateParams = $stateParams;
    $rootScope.authenticated = null;

    $rootScope.$on('$locationChangeStart', function (event, newLocation, oldLocation) {

        var newPath = newLocation.split('/').slice(-1)[0];
        var oldPath = oldLocation.split('/').slice(-1)[0];

        if ($rootScope.authenticated == null) {

            $http.post('/is_authenticated').then(function successCallback(response) {
                console.log(response.data);
                $rootScope.authenticated = response.data.authenticated;
                authentication.permission = response.data.permission;
            });
        }
        else {
            if (newPath === 'login' && oldPath === 'authenticated' && $rootScope.authenticated) {

                event.preventDefault();

            }
            else if (newPath === 'authenticated' && oldPath === 'login' && !$rootScope.authenticated) {

                event.preventDefault();
                
            }
        }

    });

}]);

