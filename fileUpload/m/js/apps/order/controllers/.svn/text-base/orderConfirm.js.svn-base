/**
 * 订单确认
 */
define(["services/orderService", "services/cartService",  "services/addressService"
], function(){
    return ["$scope", "$rootScope", "$state", "$stateParams", "$timeout", "orderService", "cartService", "addressService",
    function ($scope, $rootScope, $state, $stateParams, $timeout, orderService, cartService, addressService) {  
        $scope.moduleClass = "orderConfirm-wrapper";
        $rootScope.pageTitle = "确认订单";
        $scope.$on('$stateChangeStart', function(){
            $rootScope.pageTitle = "确认订单";
        })

        $scope.goods_num = 0;
        $scope.total_amount = 0;//总价

        $scope.info = {
            goods_list: [], 
            address_id: 0,
            desc: "",
            pay_code: "wxpay_jsapi"//wxpay_jsapi微信，alipay支付宝
        };

        $scope.orderModel = orderService.getConfirmOrderData();
        if($scope.orderModel == null){
        	new Say({
        		title: "操作超时",
        		onhide: function(){
        			$state.go("home");
        		}
        	});
        	return;
        }
        $scope.proList = $scope.orderModel.goodsData;

        $scope.storeList = [];//店铺
        angular.forEach($scope.proList, function(pro){
        	if($scope.storeList.length == 0 || $scope.storeList[$scope.storeList.length - 1].store_id != pro.store_id){
        		$scope.storeList.push({
        			store_id: pro.store_id,
        			store_name: pro.store_name,
        			pro_list: [],
        			total_amount: 0,
        			goods_num: 0
        		});

                $scope.info.goods_list.push({
                    id: pro.goods_id,
                    num: pro.goods_num
                });
        	}

        	var oLastStore = $scope.storeList[$scope.storeList.length - 1];
        	oLastStore.pro_list.push(pro);
        	oLastStore.total_amount += pro.goods_price * pro.goods_num;
        	oLastStore.goods_num += pro.goods_num;

        	$scope.total_amount += pro.goods_price * pro.goods_num;
        	$scope.goods_num += pro.goods_num;
        });

        $scope.chosedAddress = {};
        //选择的地址，初始读默认地址
        addressService.getDefaultAddress().then(function(data){
            $scope.chosedAddress = data.datas.address_list || {};
            $scope.info.address_id = $scope.chosedAddress.address_id;
        });

        //修改选择的地址
        $scope.changeChosedAddress = function(address){
            $scope.chosedAddress = address;
        };

        //立即支付
        $scope.pay = function(){
            if($scope.info.address_id <= 0){
                new Say("请添加选择收获地址");
                return;
            }
            $scope.showTarget = 1;
        };

        //确认支付
        $scope.confirmPay = function(){
            Loading.show();
            orderService.createOrder($scope.info.goods_list, $scope.info.address_id, $scope.info.desc).then(function(data){
                orderService.delConfirmOrderData();

                $scope.getCartCount();
                
                Loading.hide();

                //没接口，我也懒，就一条一条删吧不管了。
                angular.forEach($scope.proList, function(pro){
                    if(pro.cart_id){
                        cartService.delProToCart(pro.cart_id);
                    }
                });

                // data.datas.pay_sn//支付号

                //显示支付弹窗
                // data.datas.pay_info = {
                //     "pay_amount": 100,
                //     "paypwd": true,
                //     "pay_id": "1231234324324",
                //     "payed_amount": 12,
                //     "pay_ways": [{
                //         name: "微信"
                //     }]
                // };
                
                var str = "&pay_sn=" + data.datas.pay_sn;
                str += "&pay_code=wxpay_jsapi";

                location.href = "http://taoyoudao.net/shop/webapi/index.php?cls=member_payment&fun=order_pay"+str;
            });
        };

        $scope.closeOverlay = function(){
            $scope.showTarget = 0;
        };
    }];
});