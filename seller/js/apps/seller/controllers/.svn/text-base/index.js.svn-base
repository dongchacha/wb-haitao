/**
 * 卖家首页
 */
define(["services/storeService"], function(){
    return ["$scope", "$rootScope", "$state", "$stateParams", "$timeout", "storeService",
    function ($scope, $rootScope, $state, $stateParams, $timeout, storeService) {  
        $scope.moduleClass = "seller-index-wrapper";

        $scope.info = {};

        storeService.getStoreInfo().then(function(data){
        	angular.extend($scope.info, data.datas.store_info);
            $rootScope.pageTitle = $scope.info.name;
        });

        storeService.getBriefIncome().then(function(data){
        	$scope.info = angular.extend($scope.info, data.datas);
        });
    }];
});