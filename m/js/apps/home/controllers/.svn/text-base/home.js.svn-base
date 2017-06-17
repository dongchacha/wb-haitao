/**
 * 首页控制器
 */
define(["services/homeService"
], function(){
    return ["$scope", "$rootScope", "$state", "$timeout", "homeService",
    function ($scope, $rootScope, $state, $timeout, homeService) {    
        $scope.moduleClass = "home-wrapper";

        //图片初始化
        $scope.initScroll = function(isLast){
            $scope.isPicInit = isLast;
        }
        $scope.advShowIndex = 0;

        //品牌和分类的一些数据
        homeService.getHomeInfo().then(function(data){
            $rootScope.pageTitle = data.datas.store_name;
            $scope.advList = data.datas.top;//广告
            $scope.categoryList = data.datas.top_cls;//分类
            $scope.hotBrand = data.datas.top_brand;//热门品牌
        });

        $scope.currClsId = 0;
        //获取活动和人气推荐
        $scope.getActivity = function(){
            homeService.getThemeActivities().then(function(data){
                $scope.activitiesList = data.datas.top_activity;//精彩活动
                $scope.store_propose = data.datas.store_propose;//店家推荐

                if($scope.store_propose && $scope.store_propose.good_cls_id){
                    $scope.getClassifyProList($scope.store_propose.good_cls_id);
                }
            });
        };

        $scope.classifyProPagerObj = {
            dataList: [],
            isLoading: true,
            pageCount: 0,
            curpage: 1,
            page: 10,
            isValid: false,
            pullData: function(){
                var _this = this;

                _this.isLoading = true;

                homeService.getClassifyProList($scope.currClsId, _this.curpage, _this.page).then(function(data) {
                    _this.isLoading = false;
                    if(data.code != 200){
                        new Say(data.message);
                    } else{
                        if(_this.curpage == 1){
                            _this.dataList = [];
                        }
                        if(data.datas.store_propose.prop_goods && data.datas.store_propose.prop_goods.length > 0){
                            angular.forEach(data.datas.store_propose.prop_goods, function(store, index){
                                _this.dataList.push(store);
                            });
                        } 
                        // else{
                        //     _this.curpage--;
                        // }
                        
                        _this.pageCount = data.datas.store_propose.page_num;
                    }
                    _this.isLoading = false;
                    _this.isValid = true;
                });
            }
        };

        //获取推荐商品信息
        $scope.getClassifyProList = function(cls_id){
            if($scope.currClsId == cls_id){
                return;
            }
            $scope.currClsId = cls_id;

            angular.forEach($scope.store_propose.good_cls_list, function(item){
                item.isActived = item.cls_id == cls_id;
            });

            $scope.classifyProPagerObj.curpage = 1;
            $scope.classifyProPagerObj.isValid = false;
            $scope.classifyProPagerObj.pullData();
        };

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

            $scope.getWidth = function(isLast){
                if(isLast){
                    var nWidth = 0,
                        jRecomNav = $(".recommeds > nav div")
                    ;

                    $timeout(function(){
                        jRecomNav.find("a").each(function(){
                            nWidth += $(this).outerWidth();
                        });

                        jRecomNav.width(nWidth);
                    }, 0, false);
                }
            };
        });
    }];
});