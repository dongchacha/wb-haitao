/**
 * 物流信息列表
 */
define(["services/deliveryService"
], function(){
    return ["$scope", "$rootScope", "$state", "$stateParams", "$timeout", "deliveryService",
    function ($scope, $rootScope, $state, $stateParams, $timeout, deliveryService) {  
    	$scope.moduleClass = "delivery-wrapper";
        $rootScope.pageTitle = "物流信息";

        //列表请求查询条件
        $scope.pagerParams = {
            curpage: $stateParams.curpage || 1, //当前页
            page: 20
        };
        $scope.dataList = [];

        $scope.isLoading = true;//是否加载中

        $scope.pageCount = 0;   //分页总数

        $scope.allChecked = false;

        $scope.totalSum = 0;//选择的商品总额
        $scope.chosedCount = 0;//选择的商品数量

        //加载列表信息
        $scope.pullData = function(){
            $scope.isLoading = true;   
            deliveryService.getDeliveryInfo().then(function(data){
                if(data.code != 200){
                    new Say(data.message);
                } else{
                    if($scope.pagerParams.curpage == 1){
                        $scope.dataList = data.datas.store_list;
                    } else{
                        angular.forEach(data.datas.store_list, function(store, index){
                            $scope.dataList.push(store);
                        });
                    }
                }
                $scope.isLoading = false;
            });
        }
	}];
});