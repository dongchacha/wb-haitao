/**
 * 添加或编辑收货地址
    */
    define([
        "provinceData",
        "services/addressService"
    ], function(provinceData){
        return ["$scope", "$rootScope", "$state", "$stateParams", "$timeout", "addressService",
            function ($scope, $rootScope, $state, $stateParams, $timeout, addressService) {
                var vm = this;
                $scope.moduleClass = "addressEdit-wrapper";
                $scope.pageTitle = "地址";

                $scope.provinces=provinceData.provList;
                $scope.cities=provinceData.cityList;
                $scope.areaes=provinceData.distinctList;
                $scope.provinceCities=[];
                $scope.cityAreaes=[];
                $scope.selectProvinceShow = true;
                $scope.model = {
                    address_id: $stateParams.id,
                    provinceName:'',
                    cityName:'',
                    areaName:'',
                    area_info: '',
                    province_id: 0,
                    city_id: 0,
                    area_id: 0
                };
               
                if($scope.info){
                    $scope.model.province_id = $scope.info.address.province;
                    $scope.model.city_id = $scope.info.address.city;
                    $scope.model.area_id = $scope.info.address.district;
                    $scope.model.address = $scope.info.address.detail;
                }

                //提交地址
                $scope.submitAddress = function(){
                    if(!$scope.model.area_id) {
                        new Say("请选择所在省市区!");
                        return false;
                    } else if(!$scope.model.address) {
                        new Say("请填写详细地址!");
                        return false;
                    }
                    $scope.info.address.province = $scope.model.province_id;
                    $scope.info.address.city = $scope.model.city_id;
                    $scope.info.address.district = $scope.model.area_id;
                    $scope.info.address.detail = $scope.model.address;
                    $state.go("store.index");
                };

                /**
                 * 省份改变
                 * */
                $scope.provinceChange = function() {
                    $scope.model.provinceName = "";
                    $scope.model.city_id = '';
                    $scope.model.area_id = '';
                    $scope.model.cityName = "";
                    $scope.model.areaName = "";
                    $scope.model.area_info = "";
                    $scope.provinceCities=_.filter($scope.cities,function(e){
                        return e[1]==$scope.model.province_id;
                    });
                    if($scope.model.province_id){
                        // $scope.model.city_id = $scope.provinceCities.length == 0 ? "" : $scope.provinceCities[0][0];
                        var name= _.find($scope.provinces, function(e){ return e[0]==$scope.model.province_id; });
                        $scope.model.provinceName = name[2];
                    }
                    $scope.model.area_info = $scope.model.provinceName;
                }

                /**
                 * 城市变化
                 * */
                $scope.cityChange = function(){
                    $scope.model.area_id = '';
                    $scope.model.areaName = "";
                    $scope.model.cityName = "";
                    $scope.cityAreaes = _.filter($scope.areaes,function(e){
                        return e[1] == $scope.model.city_id;
                    });
                    // $scope.model.area_id= $scope.cityAreaes.length == 0 ? "" : $scope.cityAreaes[0][0];
                    if($scope.model.city_id){
                        var name =  _.find($scope.cities, function(e){ return e[0]==$scope.model.city_id; });
                        $scope.model.cityName = name[2];
                    }
                    $scope.model.area_info = $scope.model.provinceName+" "+$scope.model.cityName;
                };

                $scope.areaChange = function(){
                    $scope.model.areaName = "";
                    //$scope.selectProvinceShow=false;
                    if($scope.model.area_id){
                        var name = _.find($scope.areaes, function(e){ return e[0] == $scope.model.area_id; });
                        $scope.model.areaName = name[2];
                    }
                    $scope.model.area_info = $scope.model.provinceName+" "+$scope.model.cityName+" "+$scope.model.areaName;
                }

                $scope.provinceChange();
                $scope.cityChange();
                $scope.areaChange();
                /**
                 * 点击选择省市,
                 * */
                $scope.selectProvince = function(){
                    /*if($scope.selectProvinceShow)
                        $scope.selectProvinceShow=false;
                    else
                        $scope.selectProvinceShow=true;*/
                }
            }];
});