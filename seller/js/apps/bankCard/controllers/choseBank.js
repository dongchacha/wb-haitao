/**
 * 选择支持的银行
 */
define(["services/bankCardService"
], function(){
    return ["$scope", "$rootScope", "$state", "$stateParams", "bankCardService",
    function ($scope, $rootScope, $state, $stateParams, bankCardService) {    
        $scope.moduleClass = "choseBank-wrapper";
        $scope.pageTitle = "选择银行";

        $scope.dataList = [];

        $scope.isLoading = true;//是否加载中

        //加载列表信息
        $scope.pullData = function(){
            $scope.isLoading = true;   
            bankCardService.getSupportBankList().then(function(data){
                $scope.isLoading = false;
                if(data.code != 200){
                    new Say(data.message);
                } else{
                    $scope.dataList = data.datas.bank_list;
                }
                $scope.isLoading = false;
            });
        };
        $scope.pullData();
    }];
});