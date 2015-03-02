angular.module('assetList.controllers', ['ngCordova'])
    .controller('SignInCtrl', [
        '$scope', '$rootScope', '$window', '$state',
        function($scope, $rootScope, $window, $state) {
            // TODO check session
            $scope.user = {
                email: "",
                password: ""
            };
            $scope.validateUser = function() {
                $rootScope.notify('Please wait.. Authenticating');
                $state.go('app.sites');
            }
        }
    ])
    .controller('SignUpCtrl', [
        '$scope', '$rootScope', '$window',
        function($scope, $rootScope, $window) {

        }
    ])
    .controller('SitesCtrl', [
        '$scope', '$rootScope', '$window', '$http', '$state', '$ionicModal', '$cordovaNetwork', '$cordovaFile',

        function($scope, $rootScope, $window, $http, $state, $ionicModal, $cordovaNetwork, $cordovaFile) {

            $scope.error = null;
            $http.get("http://demo6768510.mockable.io/sites").success(function(data) {
                $scope.sites = data;
                $rootScope.sites = data;
                $cordovaFile.writeFile(cordova.file.documentsDirectory, "sites.json", JSON.stringify($scope.sites), true)
                    .then(function(success) {
                        $rootScope.notify("save sites.json success");
                    }, function(error) {
                        $rootScope.notify("save sites.json error");
                        $scope.error = "save " + cordova.file.documentsDirectory + "sites.json error : " + JSON.stringify(error);
                    });
            });
            if ($cordovaNetwork.isOffline()) {
                $cordovaFile.readAsText(cordova.file.documentsDirectory, "sites.json")
                    .then(function(success) {
                        var data = JSON.parse(success);
                        $scope.sites = data;
                        $rootScope.sites = data;
                    }, function(error) {
                        $rootScope.notify("load sites.json error");
                        $scope.error = "load " + cordova.file.documentsDirectory + "sites.json error : " + JSON.stringify(error);
                    });
            }

            $scope.showSiteAssets = function(item) {
                $rootScope.currentSite = item;
                $state.go('app.assets', {
                    site_id: item.id
                });
            };

            $ionicModal.fromTemplateUrl('templates/filter-modal.html', {
                scope: $scope
            }).then(function(modal) {
                $scope.filterModal = modal;
            });

            $scope.showFilterModal = function() {
                $scope.filterModal.show();
            };

            $scope.hideFilterModal = function() {
                $scope.filterModal.hide();
            };
        }
    ])
    .controller('AssetsCtrl', [
        '$scope', '$rootScope', '$window', '$http', '$state', '$stateParams', '$cordovaNetwork', '$cordovaFile',

        function($scope, $rootScope, $window, $http, $state, $stateParams, $cordovaNetwork, $cordovaFile) {
            $scope.error = null;
            $http.get("http://demo6768510.mockable.io/assets").success(function(data) {
                $scope.assets = data;
                $rootScope.assets = data;
                $cordovaFile.writeFile(cordova.file.documentsDirectory, "assets.json", JSON.stringify($scope.assets), true)
                    .then(function(success) {
                        $rootScope.notify("save assets.json success");
                    }, function(error) {
                        $rootScope.notify("save assets.json error");
                        $scope.error = "save " + cordova.file.documentsDirectory + "assets.json error : " + JSON.stringify(error);
                    });
            });
            if ($cordovaNetwork.isOffline()) {
                $cordovaFile.readAsText(cordova.file.documentsDirectory, "assets.json")
                    .then(function(success) {
                        var data = JSON.parse(success);
                        $scope.assets = data;
                        $rootScope.assets = data;
                    }, function(error) {
                        $rootScope.notify("load assets.json error");
                        $scope.error = "load " + cordova.file.documentsDirectory + "assets.json error : " + JSON.stringify(error);
                    });
            }

            $scope.showAssetDetail = function(item) {
                $rootScope.currentAsset = item;
                $state.go('app.asset', {
                    asset_id: item.id
                });
            };
        }
    ])
    .controller('AssetCtrl', [
        '$scope', '$rootScope', '$window', '$http', '$stateParams',
        function($scope, $rootScope, $window, $http, $stateParams) {
            $scope.currentAssetId = $stateParams.asset_id;
            $scope.asset = $rootScope.currentAsset;
            $scope.site = $rootScope.currentSite;
            $scope.selectedTab = 'location';
        }
    ]);


function escapeEmailAddress(email) {
    /*if (!email) return false
        // Replace '.' (not allowed in a Firebase key) with ','
    email = email.toLowerCase();
    email = email.replace(/\./g, ',');
    return email.trim();*/
    return "assetlist";
}
