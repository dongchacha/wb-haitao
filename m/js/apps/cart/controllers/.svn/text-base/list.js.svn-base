/**
 * 购物车列表
 */
define(["services/cartService", "services/orderService"
], function(){
    return ["$scope", "$rootScope", "$state", "$stateParams", "$timeout", "cartService", "orderService",
    function ($scope, $rootScope, $state, $stateParams, $timeout, cartService, orderService) {  
    	$scope.moduleClass = "cart-wrapper";
        $rootScope.pageTitle = "购物车";

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
            cartService.getCartProList($scope.pagerParams).then(function(data){
                if(data.code != 200){
                    new Say(data.message);
                } else{
                    var nCartLength = 0;
                    if($scope.pagerParams.curpage == 1){
                        $scope.dataList = data.datas.store_list;
                        if(data.datas.store_list.length > 0){
                            angular.forEach(data.datas.store_list, function(store, index){
                                nCartLength += store.cart_list.length;
                            });
                        }
                    } else{
                        if(data.datas.store_list.length > 0){
                            angular.forEach(data.datas.store_list, function(store, index){
                                nCartLength += store.cart_list.length;
                                //当前店铺跟上一页的最后一家是同一家店铺
                                if(index == 0 && store.cart_list[0].store_id == $scope.dataList[$scope.dataList.length - 1].cart_list[0].store_id){
                                    angular.forEach(store.cart_list, function(cart, j){
                                        $scope.dataList[$scope.dataList.length - 1].cart_list.push(cart);
                                    });
                                } else{
                                    $scope.dataList.push(store);
                                }
                            });
                        } else{
                            $scope.pagerParams.curpage--;
                        }
                    }
                    
                    if(nCartLength < $scope.pagerParams.page){//没有下一页了
                        $scope.pageCount = $scope.pagerParams.curpage;
                    } else{
                        $scope.pageCount = $scope.pagerParams.curpage + 1;
                    }
                }
                $scope.isLoading = false;
            });
        }

        //删除商品
        $scope.delPro = function(event, storeIndex, singleIndex){
            event.stopPropagation();
        	new Confirm({
        		desc: "是否删除该商品？",
        		onok: function(){
                    var oCart = $scope.dataList[storeIndex].cart_list[singleIndex];
                    cartService.delProToCart(oCart.cart_id).then(function(data){
                        if(data.code != 200){
                            new Say(data.message);
                        } else{
                            $scope.pagerParams.curpage = 1;
                            $scope.pullData();
                            // $scope.dataList[storeIndex].cart_list.splice(singleIndex, 1);
                            // if($scope.dataList[storeIndex].cart_list.length == 0){
                            //     $scope.dataList.splice(storeIndex, 1);
                            // }
                        }
                    });
        		}
        	});
        };

        //修改购物车数量
        $scope.modifyCartCount = function(event, storeIndex, singleIndex, num){
            event.stopPropagation();
            var oCart = $scope.dataList[storeIndex].cart_list[singleIndex];
            if(num > oCart.goods_storage){
                new Say("亲，该宝贝不能购买更多哦");
            } else if(num <= 0){
                $scope.delPro(event, storeIndex, singleIndex);
            } else{
                cartService.modifyProCount(oCart.cart_id, num).then(function(data){
                    if(data.code != 200){
                        new Say(data.message);
                    } else{
                        oCart.goods_num = num;       
                    }
                });
            }
        };

        //选择一项
        $scope.checkSingle = function(event, storeIndex, singleIndex){
            event.stopPropagation();
            var bChecked = !$scope.dataList[storeIndex].cart_list[singleIndex].checked;

            $scope.dataList[storeIndex].cart_list[singleIndex].checked = bChecked;

            if(!bChecked){
                $scope.allChecked = false;
                $scope.dataList[storeIndex].checked = false;
            } else{
                var bShopChecked = true;
                angular.forEach($scope.dataList[storeIndex].cart_list, function(item, index){
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
            angular.forEach($scope.dataList[storeIndex].cart_list, function(item, index){
                item.checked = bChecked;
            });
        };

        //全选
        $scope.checkAll = function(){
            $scope.allChecked = !$scope.allChecked;
            angular.forEach($scope.dataList, function(item, index){
                item.checked = $scope.allChecked;
                angular.forEach(item.cart_list, function(cart, index){
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
                angular.forEach(store.cart_list, function(cart, index){
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
                angular.forEach(store.cart_list, function(cart, index){
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