/**
 * 售后进展查询
 */
define(["services/orderService"
], function(){
    return ["$scope", "$rootScope", "$state", "$stateParams", "$timeout", "orderService",
    function ($scope, $rootScope, $state, $stateParams, $timeout, orderService) {  
    	$scope.moduleClass = "saledQuery-wrapper";
        $rootScope.pageTitle = "申请售后";

        $scope.order = {};
        $scope.pro = {};

        //加载列表信息
        $scope.pullData = function(){
            Loading.show();
            orderService.getOrderDetail($stateParams.orderId).then(function(data){
                Loading.hide();
                if(data.code != 200){
                    new Say(data.message);
                } else{
                    $scope.order = data.datas;
                    for(var i = 0; i < $scope.order.extend_order_goods.length; i++){
                    	if($scope.order.extend_order_goods[i].goods_id == $stateParams.proId){
                    		$scope.pro = $scope.order.extend_order_goods[i];
                    		break;
                    	}
                    }
                }
            });
        }
        $scope.pullData();
	}];
});