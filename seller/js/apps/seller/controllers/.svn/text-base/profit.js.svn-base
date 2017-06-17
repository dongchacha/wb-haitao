/**
 * 卖家首页
 */
define(["services/storeService"], function(){
    return ["$scope", "$rootScope", "$state", "$stateParams", "$timeout", "storeService",
    function ($scope, $rootScope, $state, $stateParams, $timeout, storeService) {  
        $scope.moduleClass = "seller-center-wrapper seller-index-wrapper seller-profit-wrapper";
        $rootScope.pageTitle = "我的收益";

        storeService.getBriefIncome().then(function(data){
        	$scope.info = data.datas;
        });
    }];
});