/**
 * 首页控制器
 */
define(["services/homeService"
], function(){
    return ["$scope", "$rootScope", "$state", "homeService",
    function ($scope, $rootScope, $state, homeService) {    
        $scope.moduleClass = "home-wrapper";

        //图片初始化
        $scope.initScroll = function(isLast){
            $scope.isPicInit = isLast;
        }
        $scope.advShowIndex = 0;

        homeService.getHomeInfo().then(function(data){
            $rootScope.pageTitle = data.datas.store_name;
            $scope.advList = data.datas.top;
            $scope.categoryList = data.datas.top_cls;
            $scope.hotBrand = data.datas.top_brand;
        });

        homeService.getThemeActivities().then(function(data){
            $scope.activitiesList = data.datas.top_activity;
            $scope.store_propose = data.datas.store_propose;
        });

        require([
            "text!apps/product/views/searchKey.html",
            "apps/product/controllers/searchKey"
        ], function(
            searchKeyTmpUrl,
            searchKeyCtrl)
        {
            $scope.searchRoute = {
                key: {//关键词
                    showState: 0,
                    tmpUrl: require.toUrl("apps/product/views/searchKey.html"),
                    controller: searchKeyCtrl
                }
            };

            //点击搜索
            $scope.openSearch = function(type){
                angular.forEach($scope.searchRoute, function(item, key){
                    if(key === type){
                        item.showState = 1;
                    } else if(item.showState == 1){
                        item.showState = 2;
                    }
                });
            };

            //关闭搜索
            $scope.closeSearch = function(type){
                $scope.searchRoute[type].showState = 2;
            };

            //得到搜索条件
            $scope.$on('getSearch', function(event, type, data) {
                $scope.closeSearch(type);

                if(type == "city"){//选择了城市
                    locationService.setCurrCity(data);
                    $scope.cityArr = data;
                    getCarsList();
                } else if(type == "key"){
                    $state.go("product.list", data);
                }
            });

            //取消搜索
            $scope.$on('cancelSearch', function(event, type) {
                $scope.closeSearch(type);
            });
        });
    }];
});