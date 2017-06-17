/**
 * 交易详情
 */
define(["services/tradeService"
], function(){
    return ["$scope", "$rootScope", "$state", "$stateParams", "tradeService",
    function ($scope, $rootScope, $state, $stateParams, tradeService) {    
        $scope.moduleClass = "tradeDetail-wrapper";

        $scope.info = JSON.parse($stateParams.model);
        $rootScope.pageTitle = $scope.info.type == 1? "提现详情" : "交易详情";
    }];
});