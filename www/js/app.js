angular.module('assetList', ['ngCordova', 'ionic', 'assetList.controllers'])

.run(function($ionicPlatform, $rootScope, $window, $ionicLoading, $state) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }

        $rootScope.show = function(text) {
            $rootScope.loading = $ionicLoading.show({
                content: text ? text : 'Loading..',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
        };

        $rootScope.hide = function() {
            $ionicLoading.hide();
        };

        $rootScope.notify = function(text) {
            $rootScope.show(text);
            $window.setTimeout(function() {
                $rootScope.hide();
            }, 1999);
        };

        $rootScope.state = $state;
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('signin', {
            url: '/sign-in',
            templateUrl: 'templates/sign-in.html',
            controller: 'SignInCtrl'
        })
        .state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "templates/menu.html"
        })
        .state('app.sites', {
            url: "/sites",
            views: {
                'mainContent': {
                    templateUrl: "templates/sites.html",
                    controller: "SitesCtrl"
                }
            }
        })
        .state('app.help', {
            url: "/help",
            views: {
                'mainContent': {
                    templateUrl: "templates/help.html"
                }
            }
        })
        .state('app.assets', {
            url: "/assets/:site_id",
            views: {
                'mainContent': {
                    templateUrl: "templates/assets.html",
                    controller: "AssetsCtrl"
                }
            }
        })
        .state('app.asset', {
            url: "/asset/:asset_id",
            views: {
                'mainContent': {
                    templateUrl: "templates/asset.html",
                    controller: 'AssetCtrl'
                }
            }
        })
        /*.state('app.asset.location', {
            url: "/location",
            views: {
                'asset-location': {
                    templateUrl: "templates/asset-location.html"
                }
            }
        })
        .state('app.asset.client', {
            url: "/client",
            views: {
                'asset-client': {
                    templateUrl: "templates/asset-client.html"
                }
            }
        })
        .state('app.asset.information', {
            url: "/information",
            views: {
                'asset-information': {
                    templateUrl: "templates/asset-information.html"
                }
            }
        })
        .state('app.asset.inspection', {
            url: "/inspection",
            views: {
                'asset-inspection': {
                    templateUrl: "templates/asset-inspection.html"
                }
            }
        })*/
        /*.state('auth', {
            url: "/auth",
            abstract: true,
            templateUrl: "templates/auth.html"
        })
        .state('auth.signin', {
            url: '/signin',
            views: {
                'auth-signin': {
                    templateUrl: 'templates/auth-signin.html',
                    controller: 'SignInCtrl'
                }
            }
        })
        .state('auth.signup', {
            url: '/signup',
            views: {
                'auth-signup': {
                    templateUrl: 'templates/auth-signup.html',
                    controller: 'SignUpCtrl'
                }
            }
        })
        .state('asset', {
            url: "/asset",
            abstract: true,
            templateUrl: "templates/asset.html"
        })
        .state('asset.list', {
            url: '/list',
            views: {
                'asset-list': {
                    templateUrl: 'templates/asset-list.html',
                    controller: 'myListCtrl'
                }
            }
        })
        .state('asset.completed', {
            url: '/completed',
            views: {
                'asset-completed': {
                    templateUrl: 'templates/asset-completed.html',
                    controller: 'completedCtrl'
                }
            }
        })
        .state('asset.synchronize', {
            url: '/synchronize',
            views: {
                'asset-synchronize': {
                    templateUrl: 'templates/asset-synchronize.html',
                    controller: 'completedCtrl'
                }
            }
        })*/
    $urlRouterProvider.otherwise('/sign-in');
});
