/**
 * 品牌活动
 */
define(["services/productService"
], function(){
    return ["$scope", "$rootScope", "$state", "$stateParams", "productService",
    function ($scope, $rootScope, $state, $stateParams, productService) {    
        $scope.moduleClass = "brand-wrapper";
        $rootScope.pageTitle = "品牌活动";
       
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
            productService.getBrandGoods($scope.pagerParams).then(function(data){
                $scope.isLoading = false;
                if(data.code != 200){
                    new Say(data.message);
                } else{
                    $scope.activityInfo = data.datas;
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
                        $("#pullUp").hide();
                    } else{
                        $scope.pageCount = $scope.pagerParams.curpage + 1;
                        $("#pullUp").show();
                    }
                }
                $scope.isLoading = false;
            });
        };

        $scope.pullData();

        //滚动加载更多
        function scrollHandler(e){
            var jPullUpIcon = $(".pullUpIcon"),
                hasMore = $scope.pageCount > $scope.pagerParams.curpage,
                isInView = jPullUpIcon.offset().top - $(window).scrollTop() < $(window).height() - 20
            ;

            if(isInView && hasMore && !$scope.isLoading){     
                $scope.pagerParams.curpage++;
                $scope.pullData();
            }
        }

        $(window).on("scroll", scrollHandler);
        $scope.$on('$stateChangeStart', function(){
            $(window).off("scroll", scrollHandler);
        });
    }];
});