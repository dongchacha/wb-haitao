/**
 * 综合搜索
 * 
 * @author dongxiaochai@163.com
 * @since 2016-05-23
 */
define([
    "say", 
    "services/productService"
], function(Say){
    return ["$scope", "$state", "$stateParams", "$timeout", "productService",
    function ($scope, $state, $stateParams, $timeout, productService) {
        var vm = this;
        vm.pagerParams = $scope.pagerParams;
        vm.choseType = 0;

        //品牌
        productService.getBrandCategory().then(function(data){
            if(data.code != 200){
                new Say(data.message);
            } else{
                vm.brandList = data.datas.brand_list;
            }
        });

        //国家
        productService.getCountryCategory().then(function(data){
            if(data.code != 200){
                new Say(data.message);
            } else{
                vm.countryList = data.datas.class_list;
            }
        });

        //价格
        vm.priceList = [
            {
                id: "",
                name: "全部",
                priceMin: "",
                priceMax: ""
            },
            {
                id: 1,
                name: "0-69",
                priceMin: 0,
                priceMax: 69
            },
            {
                id: 2,
                name: "70-99",
                priceMin: 70,
                priceMax: 99
            },
            {
                id: 3,
                name: "100-199",
                priceMin: 100,
                priceMax: 199
            }
        ];
        //自定义价格
        vm.price = {
            priceMin: "",
            priceMax: ""
        };
        if(vm.pagerParams.priceMin || vm.pagerParams.priceMax){
            if(vm.pagerParams.priceMin < 0){
                vm.pagerParams.priceMin = "";
            }
            if(vm.pagerParams.priceMax < 0){
                vm.pagerParams.priceMax = "";
            }
            var isDefined = true;
            for(var i = 0; i < vm.priceList.length; i++){
                if(vm.pagerParams.priceMin == vm.priceList[i].priceMin && vm.pagerParams.priceMax == vm.priceList[i].priceMax){
                    isDefined = false; 
                }
            }
            if(isDefined){
                vm.price = {
                    priceMin: vm.pagerParams.priceMin >> 0,
                    priceMax: vm.pagerParams.priceMax >> 0
                };
            }
        }

        //选择
        vm.chosePrice = function(priceMin, priceMax){
            vm.price = {
                priceMin: "",
                priceMax: ""
            };
            vm.pagerParams.priceMin = priceMin;
            vm.pagerParams.priceMax = priceMax;
        };

        var watcher = $scope.$watch("vm.price", function(newData, oldData){
            if(vm.price.priceMin || vm.price.priceMax){
                vm.pagerParams.priceMin = -1;
                vm.pagerParams.priceMax = 0;
            }
        }, true);

        //分类
        vm.categoryList = [
            {
                id: "",
                name: "全部"
            },
            {
                id: 1,
                name: "化妆棉"
            },
            {
                id: 2,
                name: "洁面"
            },
            {
                id: 3,
                name: "面部精华"
            },
            {
                id: 4,
                name: "面霜"
            },
            {
                id: 5,
                name: "男士面膜"
            },
            {
                id: 6,
                name: "眼膜"
            }
        ];

        //选择多选选项
        vm.choseMultiple = function(dataList, dataParam, index, item){
            var anList = [];

            if(index == 0){//不限
                dataList[0].isChosed = true;
                for(var i = 1; i < dataList.length; i++){
                    dataList[i].isChosed = false;
                }
                // vm.pagerParams.carColorId = [];
            } else{
                dataList[0].isChosed = false;
                dataList[index].isChosed = !dataList[index].isChosed;
                angular.forEach(dataList, function(item, index){           
                    if(item.isChosed){
                        anList.push(item.val);
                    }
                });
            }

            vm.pagerParams[dataParam] = anList;
        };

        //提交搜索
        vm.submitSearch = function(val){
            if(vm.price.priceMin || vm.price.priceMax){
                vm.pagerParams.priceMin = vm.price.priceMin;
                vm.pagerParams.priceMax = vm.price.priceMax;
            }
            $scope.$emit('getSearch', "multiple", vm.pagerParams);
        };

        //重置搜索
        vm.resetSearch = function(){
            vm.pagerParams.brand = "";
            vm.pagerParams.country = "";            
            vm.pagerParams.priceMin = "";
            vm.pagerParams.priceMax = "";
            vm.pagerParams.category = "";
            $scope.$emit('getSearch', "multiple", vm.pagerParams);
        };
    }];
});