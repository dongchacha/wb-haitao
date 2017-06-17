/**
 * 我的订单列表
 */
define([
    "services/orderService"
], function() {
    return ["$scope", "$rootScope", "$state", "$stateParams", "$location", "orderService",
    function($scope, $rootScope, $state, $stateParams, $location, orderService) {
        $scope.moduleClass = "orderList-wrapper";
        
        var sTypeTitle = "";
        switch($stateParams.type){
            case "1":
                sTypeTitle = "待付款";
                break;
            case "2":
                sTypeTitle = "待发货";
                break;
            case "3":
                sTypeTitle = "待收货";
                break;
            case "4":
                sTypeTitle = "待评价";
                break;
            // case "5":
            //     sTypeTitle = "售后/退款";
            //     break;
            case "0":
            default:
                sTypeTitle = "";
                break;
        }
        $rootScope.pageTitle = "我的订单" + (sTypeTitle ? "-" + sTypeTitle : "");

        //列表请求查询条件
        $scope.pagerParams = {
            state: $stateParams.type,
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
            orderService.getOrderList($scope.pagerParams).then(function(data){
                if(data.code != 200){
                    new Say(data.message);
                } else{
                    if($scope.pagerParams.curpage == 1){
                        $scope.dataList = data.datas.order_list;
                    } else{
                        if(data.datas.order_list.length > 0){
                            angular.forEach(data.datas.order_list, function(store, index){
                                $scope.dataList.push(store);
                            });
                        } else{
                            $scope.pagerParams.curpage--;
                        }
                    }
                    
                    if(data.datas.order_list.length < $scope.pagerParams.page){//没有下一页了
                        $scope.pageCount = $scope.pagerParams.curpage;
                    } else{
                        $scope.pageCount = $scope.pagerParams.curpage + 1;
                    }
                }
                $scope.isLoading = false;
            });
        };

        //取消订单
        $scope.cancelOrder = function(order){
            // if(order.order_state != 10){
            //     new Say("该订单无法取消");
            //     return;
            // }
            new Confirm({
                desc: "是否取消该订单？",
                onok: function(){
                    orderService.cancelOrder(order.order_id).then(function(data){
                        if(data.code == 200){
                            $scope.pagerParams.curpage = 1;
                            $scope.pullData();
                        } else{
                            new Say(data.message);
                        }
                    });
                }
            });
        };

        //删除订单
        $scope.delOrder = function(order){
            new Confirm({
                desc: "是否删除该订单？",
                onok: function(){
                    orderService.delOrder(order.order_id).then(function(data){
                        if(data.code == 200){
                            $scope.pagerParams.curpage = 1;
                            $scope.pullData();
                        } else{
                            new Say(data.message);
                        }
                    });
                }
            });
        };

        //延迟收货
        $scope.delayReceive = function(order){
            // if(!(order.order_state == 30 && order.if_receive == 0)){
            //     new Say("该订单已收货");
            //     return;
            // }
            new Confirm({
                desc: "是否确认延迟收货？",
                onok: function(){
                    orderService.delayReceive(order.order_id).then(function(data){
                        if(data.code == 200){
                            $scope.pagerParams.curpage = 1;
                            $scope.pullData();
                        } else{
                            new Say(data.message);
                        }
                    });
                }
            });
        };

        //确认收货
        $scope.confirmReceive = function(order){
            // if(!(order.order_state == 30 && order.if_receive == 0)){
            //     new Say("该订单已收货");
            //     return;
            // }
            new Confirm({
                desc: "是否确认收货？",
                onok: function(){
                    orderService.confirmReceive(order.order_id).then(function(data){
                        if(data.code == 200){
                            $scope.pagerParams.curpage = 1;
                            $scope.pullData();
                        } else{
                            new Say(data.message);
                        }
                    });
                }
            });
        };

        //申请退货退款
        $scope.applySaled = function(event, order, pro){
            event.stopPropagation();
            $state.go("order.saledAplay",{
                params: Util.encodeUri(JSON.stringify({
                    order_id: order.params,
                    goods_id: pro.goods_id,
                    goods_image_url: pro.goods_image_url,
                    store_phone: order.store_phone,
                    goods_num: pro.goods_num,
                    goods_price: pro.goods_price,
                    order_state: order.order_state
                }))
            });
        };

        //选择一项
        $scope.checkSingle = function(event, storeIndex, singleIndex){
            event.stopPropagation();
            var bChecked = !$scope.dataList[storeIndex].extend_order_goods[singleIndex].checked;

            $scope.dataList[storeIndex].extend_order_goods[singleIndex].checked = bChecked;

            if(!bChecked){
                $scope.allChecked = false;
                $scope.dataList[storeIndex].checked = false;
            } else{
                var bShopChecked = true;
                angular.forEach($scope.dataList[storeIndex].extend_order_goods, function(item, index){
                    if(!item.checked){
                        bShopChecked = false;
                    }
                });
                $scope.dataList[storeIndex].checked = bShopChecked;
            }
        };

        //选择一个店铺
        $scope.checkStore = function(storeIndex){
            var bChecked = !$scope.dataList[storeIndex].checked;
            $scope.dataList[storeIndex].checked = bChecked;
            if(!bChecked){
                $scope.allChecked = false;
            }
            angular.forEach($scope.dataList[storeIndex].extend_order_goods, function(item, index){
                item.checked = bChecked;
            });
        };

        //全选
        $scope.checkAll = function(){
            $scope.allChecked = !$scope.allChecked;
            angular.forEach($scope.dataList, function(item, index){
                item.checked = $scope.allChecked;
                angular.forEach(item.extend_order_goods, function(cart, index){
                    cart.checked = $scope.allChecked;
                });
            });
        };

        //监视器计算价格
        var watcher = $scope.$watch("dataList", function(newData, oldData){
            var fSum = 0,
                nChosedCount = 0
            ;
            angular.forEach($scope.dataList, function(store, index){
                angular.forEach(store.extend_order_goods, function(cart, index){
                    if(cart.checked){
                        cart.goods_sum = cart.goods_price * cart.goods_num;
                        fSum += cart.goods_sum;
                        nChosedCount++;
                    }
                });
            });
            $scope.totalSum = fSum;
            $scope.chosedCount = nChosedCount;
        }, true);

        //结算
        $scope.settlement = function(){
            if($scope.chosedCount == 0){
                return;
            }
            var aoCartList = [];
            angular.forEach($scope.dataList, function(store, index){
                angular.forEach(store.extend_order_goods, function(cart, index){
                    if(cart.checked){
                        aoCartList.push(cart);
                    }
                });
            });

            orderService.setConfirmOrderData({
                goodsData: aoCartList
            });
            $state.go("order.confirm");
        };
    }];
});
