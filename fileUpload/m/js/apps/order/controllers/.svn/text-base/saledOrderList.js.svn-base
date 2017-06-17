/**
 * 售后订单列表
 */
define([
    "services/orderService"
], function() {
    return ["$scope", "$rootScope", "$state", "$stateParams", "$location", "orderService",
    function($scope, $rootScope, $state, $stateParams, $location, orderService) {
        $scope.moduleClass = "refundOrderList-wrapper";        
        $rootScope.pageTitle = "售后订单";

        //列表请求查询条件
        $scope.pagerParams = {
            curpage: $stateParams.curpage || 1, //当前页
            page: 20
        };
        
        $scope.dataList = [];

        $scope.isLoading = true;//是否加载中

        $scope.pageCount = 0;   //分页总数

        //加载列表信息
        $scope.pullData = function(){
            $scope.isLoading = true;   
            orderService.getSaledOrderList($scope.pagerParams).then(function(data){
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

        //买家发货
        $scope.sendGoods = function(event, refund_id){
            event.stopPropagation();
            $state.go("order.buyerSendGoods", {refundId: refund_id});
        }
    }];
});
