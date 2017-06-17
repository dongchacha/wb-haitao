/**
 * 商品详情控制器
 */
define(["services/productService", "services/cartService", "services/orderService"
], function(){
    return ["$scope", "$rootScope", "$state", "$stateParams", "productService", "cartService", "orderService",
    function ($scope, $rootScope, $state, $stateParams, productService, cartService, orderService) {    
        $scope.moduleClass = "proDetail-wrapper";
        $rootScope.pageTitle = "商品详情";

        $scope.picShowIndex = 0;
        $scope.contentShowIndex = 0;


        //轮播图初始化
        $scope.initImgScroll = function(isLast) {
            if (isLast) {
                $scope.isPicInit = isLast;
            }
        };

        productService.getProductDetail($stateParams.id).then(function(data){
            if(data.code != 200){
                new Say({
                    title: data.message,
                    onhide: function(){
                        $state.go("product.list");
                    }
                });
            } else{
                $scope.pro = data.datas;
                $scope.store_info = data.datas.store_info;

                angular.forEach($scope.pro.spec_info.data, function(item){
                    if($scope.pro.spec_info.spec_id == item.id){
                        $scope.pro.spec_info.img = item.img;
                    }
                });

                $scope.pro.goods_info.goods_num = 1;
            }
        });

        productService.getProductDesc($stateParams.id).then(function(data){
            $scope.proDesc = data;
        });

        //显示弹层
        $scope.showOverlay = function(index){
            $scope.showTarget = index;
        };

        //关闭弹层
        $scope.closeOverlay = function(){
            $scope.showTarget = 0;
        };

        //修改商品数量
        $scope.modifyGoodsNum = function(num){
            event.stopPropagation();
            if(num > $scope.pro.goods_info.goods_storage){
                new Say("亲，该宝贝不能购买更多哦");
            } else if(num <= 0){
                return;
            } else{
                $scope.pro.goods_info.goods_num = num;
            }
        };

        //添加到购物车
        $scope.addToCart = function(){
            cartService.addProToCart($scope.pro.goods_info.goods_id, $scope.pro.goods_info.goods_num).then(function(){
                new Say("添加成功");
                $scope.getCartCount();
                $scope.closeOverlay();
            });
        };

        //立即购买
        $scope.bug = function(){
            var proModel = angular.extend(angular.copy($scope.pro.goods_info), $scope.store);
            /*proModel.goods_image_url = $scope.pro.goods_info.goods_img[0];

            for(var i = 0; i < $scope.pro.spec_info.data.length; i++){
                if($scope.pro.spec_info.data[i].id == $scope.pro.spec_info.spec_id){
                    proModel.goods_spec = $scope.pro.spec_info.spec_name + ":" + $scope.pro.spec_info.data[i].spec_value
                    break;
                }
            }*/

            orderService.setConfirmOrderData({
                goodsData: [proModel]
            });
            $state.go("order.confirm");
        };
    }];
});