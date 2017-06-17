/**
 * 商品列表
 */
define(["services/productService", "services/orderService"
], function(){
    return ["$scope", "$rootScope", "$state", "$stateParams", "productService", "orderService",
    function ($scope, $rootScope, $state, $stateParams, productService, orderService) {    
        $scope.moduleClass = "proList-wrapper";
        $rootScope.pageTitle = "商品列表";
       
        //列表请求查询条件
        $scope.pagerParams = {
            queryKey: $stateParams.queryKey || "",
            sortRule: $stateParams.sortRule || "",    //排序规则（综合排序：0,人气：1,销量：2,价格低到高：3,价格高到低：4）

            brand: $stateParams.brand || "",
            country: $stateParams.country || "",
            priceMin: $stateParams.priceMin || "",
            priceMax: $stateParams.priceMax || "",
            category: $stateParams.category || "",

            curpage: $stateParams.curpage || 1, //当前页
            page: 20
        };
        $scope.cloneParams = angular.copy($scope.pagerParams);//克隆一下参数，筛选窗口用

        $scope.state = "product.list";
        $scope.dataList = [];

        $scope.isLoading = true;//是否加载中

        $scope.pageCount = 0;   //分页总数

        //加载列表信息
        $scope.pullData = function(){
            $scope.isLoading = true;   
            productService.getProductList($scope.pagerParams).then(function(data){
               
                $scope.isLoading = false;
                if(data.code != 200){
                    new Say(data.message);
                } else{
                    if($scope.pagerParams.curpage == 1){
                        $scope.dataList = data.datas.goods_list;
                    } else{
                        if(data.datas.goods_list.length > 0){
                            angular.forEach(data.datas.goods_list, function(store, index){
                                $scope.dataList.push(store);
                            });
                        } else{
                            $scope.pagerParams.curpage--;
                        }
                    }
                    
                    if(data.datas.goods_list.length < $scope.pagerParams.page){//没有下一页了
                        $scope.pageCount = $scope.pagerParams.curpage;
                    } else{
                        $scope.pageCount = $scope.pagerParams.curpage + 1;
                    }
                }
                $scope.isLoading = false;
            });
        };

        //删除关键词
        $scope.clearKeySearch = function(){
            $scope.pagerParams.queryKey = "";
            $state.go($scope.state, $scope.pagerParams); 
        };

        //改变排序
        $scope.changeSort = function(sort){
            if($scope.pagerParams.sortRule != sort){
                $scope.pagerParams.sortRule = sort;
                $scope.pagerParams.curpage = 1;
                // $scope.pullData();
            }
            $state.go($scope.state, $scope.pagerParams); 
        };

        require([
            "text!apps/product/views/searchMultiple.html",
            "text!apps/product/views/searchKey.html",
            "apps/product/controllers/searchMultiple",
            "apps/product/controllers/searchKey"
        ], function(
            searchMultipleTmpUrl, searchKeyTmpUrl,
            searchMultipleCtrl, searchKeyCtrl)
        {
            $scope.searchRoute = {
                multiple: {//综合筛选
                    showState: 0,
                    tmpUrl: require.toUrl("apps/product/views/searchMultiple.html"),//searchMultipleTmpUrl,
                    controller: searchMultipleCtrl
                },
                key: {//关键词
                    showState: 0,
                    tmpUrl: require.toUrl("apps/product/views/searchKey.html"),//searchKeyTmpUrl,
                    controller: searchKeyCtrl
                }
            };

            /**
             * 点击搜索
             * @param  {String}  type           打开类型
             * @param  {Boolean} isCloseCurr    是否关闭当前筛选狂
             * @return {void}
             */
            $scope.openSearch = function(type, isCloseCurr){
                if(isCloseCurr == undefined){
                    isCloseCurr = true;
                }

                var bIsChosedYet = false;//是否已经打开其它需要关闭的窗口
                
                if(isCloseCurr){
                    angular.forEach($scope.searchRoute, function(item, key){
                        if(key !== type && item.showState == 1){//已选中其它项
                            item.showState = 2;
                            item.isDeley = false;
                            bIsChosedYet = true;
                        }
                    });
                }

                if(type){
                    var oRoute = $scope.searchRoute[type];
                    if(oRoute.showState == 1){//已打开
                        oRoute.isDeley = false;
                        oRoute.showState = 2;
                    } else if(bIsChosedYet){//已打开其它项，加个延时
                        oRoute.showState = 1;
                        oRoute.isDeley = true;
                    } else{
                        oRoute.showState = 1;
                        oRoute.isDeley = false;
                    }
                }
            };

            //关闭搜索
            $scope.closeSearch = function(type){
                $scope.searchRoute[type].isDeley = false;
                $scope.searchRoute[type].showState = 2;
            };

            // //广播参数值
            // $scope.$broadcast('params', $scope.pagerParams);

            //得到搜索条件
            $scope.$on('getSearch', function(event, type, data) {
                // if(type == "city"){
                //     $scope.$broadcast('getCity', data);
                // } else if(type == "brand"){
                //     data.brandName = data.styleName || data.modelName || data.brandName || null;
                //     $state.go($scope.state, data);
                // } else{
                    $state.go($scope.state, data); 
                // }
                $scope.closeSearch(type);
            });

            //取消搜索
            $scope.$on('cancelSearch', function(event, type) {
                $scope.closeSearch(type);
            });
        });
    }];
});