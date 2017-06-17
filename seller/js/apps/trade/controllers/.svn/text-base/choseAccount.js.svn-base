/**
 * 提现账号
 */
define(["services/tradeService"
], function(){
    return ["$scope", "$rootScope", "$state", "$stateParams", "tradeService",
    function ($scope, $rootScope, $state, $stateParams, tradeService) {    
        $scope.moduleClass = "bankCard-wrapper choseAccount-wrapper";
        $scope.pageTitle = "提现账户";

        tradeService.getBankCardList().then(function(data){
        	$scope.dataList = data.datas.bank_list;
        });
    }];
});