/**
 * 订单详情
 */
define(["services/orderService"
], function(){
    return ["$scope", "$rootScope", "$state", "$stateParams", "$timeout", "orderService",
    function ($scope, $rootScope, $state, $stateParams, $timeout, orderService) {  
    	$scope.moduleClass = "orderDetail-wrapper";
        $rootScope.pageTitle = "订单详情";

        $scope.order = {};

        //加载列表信息
        $scope.pullData = function(){
            Loading.show();
            orderService.getOrderDetail($stateParams.orderId).then(function(data){
                Loading.hide();
                if(data.code != 200){
                    new Say(data.message);
                } else{
                    $scope.order = data.datas;
                }
            });
        }
        
        $scope.pullData();

        //申请退货退款
        $scope.applySaled = function(event, order, pro){
            event.stopPropagation();
            $state.go("order.saledAplay",{
                params: Util.encodeUri(JSON.stringify({
                    order_id: order.order_id,
                    goods_id: pro.goods_id,
                    goods_image_url: pro.goods_image_url,
                    store_phone: order.store_phone,
                    goods_num: pro.goods_num,
                    goods_price: pro.goods_price,
                    order_state: order.order_state
                }))
            });
        };
	}];
});