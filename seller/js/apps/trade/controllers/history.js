/**
 * 交易管理
 */
define(["services/tradeService"
], function(){
    return ["$scope", "$rootScope", "$state", "$stateParams", "tradeService",
    function ($scope, $rootScope, $state, $stateParams, tradeService) {    
        $scope.moduleClass = "tradeList-wrapper";
        $rootScope.pageTitle = $stateParams.type == 1? "历史提现" : "历史交易";
       
        //列表请求查询条件
        $scope.pagerParams = {
            curpage: $stateParams.curpage || 1, //当前页
            page: 20,
            type: $stateParams.type == 1 ? "pd_cash" : null
        };

        $scope.dataList = [];

        $scope.isLoading = true;//是否加载中

        $scope.pageCount = 0;   //分页总数

        //加载列表信息
        $scope.pullData = function(){
            $scope.isLoading = true;   
            tradeService.getTradeList($scope.pagerParams).then(function(data){
                $scope.isLoading = false;
                if(data.code != 200){
                    new Say(data.message);
                } else{
                    if($scope.pagerParams.curpage == 1){
                        $scope.dataList = data.datas;
                    } else{
                        if(data.datas.length > 0){
                            angular.forEach(data.datas, function(store, index){
                                $scope.dataList.push(store);
                            });
                        } else{
                            $scope.pagerParams.curpage--;
                        }
                    }
                    
                    if(data.datas.length < $scope.pagerParams.page){//没有下一页了
                        $scope.pageCount = $scope.pagerParams.curpage;
                    } else{
                        $scope.pageCount = $scope.pagerParams.curpage + 1;
                    }
                }
                $scope.isLoading = false;
            });
        };

        $scope.encodeModel = function(model){
            return JSON.stringify(model);
        }
    }];
});