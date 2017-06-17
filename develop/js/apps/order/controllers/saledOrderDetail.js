/**
 * 订单详情
 */
define(["services/orderService"
], function(){
    return ["$scope", "$rootScope", "$state", "$stateParams", "$timeout", "orderService",
    function ($scope, $rootScope, $state, $stateParams, $timeout, orderService) {  
    	$scope.moduleClass = "orderDetail-wrapper saledOrderDetail-wrapper";
        $rootScope.pageTitle = "进展详情";

        $scope.order = {};

        //加载列表信息
        $scope.pullData = function(){
            Loading.show();
            orderService.getSaledOrderDetail($stateParams.refundId).then(function(data){
                Loading.hide();
                if(data.code != 200){
                    new Say(data.message);
                } else{
                    $scope.order = data.datas;
                    $scope.pro = $scope.order;
                }
            });

            orderService.getSaledProgress($stateParams.refundId).then(function(data){
                if(data.code != 200){
                    new Say(data.message);
                } else{
                    $scope.progressList = data.datas.info;
                }
            });
        }
        
        $scope.pullData();

        // //申请退货退款
        // $scope.applySaled = function(event, orderId, proId){
        //     event.stopPropagation();
        //     $state.go("order.saledAplay",{orderId: orderId, proId: proId});
        // };
	}];
});