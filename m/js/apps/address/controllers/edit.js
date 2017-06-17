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
                $rootScope.pageTitle = $stateParams.id ? "修改收货地址" : "添加收货地址";
               
                $scope.provinces = provinceData.provList;
                $scope.cities = provinceData.cityList;
                $scope.areaes = provinceData.distinctList;
                $scope.provinceCities = [];
                $scope.cityAreaes = [];
                $scope.selectProvinceShow=true;
                $scope.model = {
                    true_name: "",
                    address_id: $stateParams.id,
                    provinceName:'',
                    cityName:'',
                    areaName:'',
                    is_default:0,
                    area_info: '',
                    province_id: 0,
                    city_id: 0,
                    area_id: 0
                };
                // debugger;
                var validDic=[
                    {
                        name:'true_name',
                        msg:'请填写收件人姓名!'
                    },{
                        name:'mob_phone',
                        msg:'请填写收件人手机号码!'
                    },{
                        name:'address',
                        msg:'请填写收件人详细地址!'
                    }
                ];
                //debugger;
                if($scope.model.address_id){
                    addressService.getAddress($scope.model.address_id).then(function(data){
                        if(data.code == 0){
                            new Say(data.message);
                        } else{
                            $scope.model = data.datas;
                            var name= _.find($scope.provinces, function(e){ return e[0]==$scope.model.province_id; });
                            if(name){
                                $scope.model.provinceName=name[2]; 
                            }
                            
                            var name= _.find($scope.cities, function(e){ return e[0]==$scope.model.city_id; });
                            if(name){
                                $scope.model.cityName=name[2];
                            }

                            var name= _.find($scope.areaes, function(e){ return e[0]==$scope.model.area_id; });
                            if(name){
                                $scope.model.areaName=name[2];
                            }
                        }
                    });
                }

                //提交地址
                $scope.submitAddress = function(){
                    //验证
                    if(!$scope.model.true_name) {
                        new Say("请填写收件人姓名!");
                        return false;
                    } else if(!$scope.model.mob_phone) {
                        new Say("请填写收件人手机号码!");
                        return false;
                    } else if(!Util.REGEXP.PHONE.test($scope.model.mob_phone)){
                        new Say("请输入正确的手机号");
                        return false;
                    } else if(!$scope.model.area_id) {
                        new Say("请选择所在省市区!");
                        return false;
                    } else if(!$scope.model.address) {
                        new Say("请填写收件人详细地址!");
                        return false;
                    }
                    var dto = angular.copy($scope.model);
                    $scope.model.area_info = $scope.model.provinceName + $scope.model.cityName + $scope.model.areaName;
                    if($scope.model.address_id)
                    {//编辑
                        addressService.updateAddress(dto).then(function(){
                            new Say({
                                title: "保存成功",
                                onhide: function(){
                                    if($state.includes("order")){
                                        $scope.changeChosedAddress(dto);
                                        history.back();
                                    } else{
                                        $state.go("address.myAddressList");
                                    }
                                }
                            });
                        });
                    } else {
                        addressService.addAddress(dto).then(function(data){
                            new Say({
                                title: "创建成功",
                                onhide: function(){
                                    if($state.includes("order")){
                                        // dto.address_id = data.datas.address_id;
                                        // $scope.changeChosedAddress(dto);
                                        $scope.getDefaultAddress();
                                        history.back();
                                    } else{
                                        $state.go("address.myAddressList");
                                    }
                                }
                            });
                        });
                    }
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
                    $scope.provinceCities =_.filter($scope.cities, function(e){
                        return e[1] == $scope.model.province_id;
                    });
                    if($scope.model.province_id){
                        // $scope.model.city_id = $scope.provinceCities.length == 0 ? "" : $scope.provinceCities[0][0];
                        var name = _.find($scope.provinces, function(e){ return e[0] == $scope.model.province_id; });
                        $scope.model.provinceName = name[2];
                    }
                    $scope.model.area_info = $scope.model.provinceName;
                }

                /**
                 * 城市变化
                 * */
                $scope.cityChange=function(){
                    $scope.model.area_id = '';
                    $scope.model.areaName = "";
                    $scope.model.cityName = "";
                    $scope.cityAreaes = _.filter($scope.areaes,function(e){
                        return e[1] == $scope.model.city_id;
                    });
                    // $scope.model.area_id = $scope.cityAreaes.length == 0 ? "" : $scope.cityAreaes[0][0];
                    
                    if($scope.model.city_id){
                        var name = _.find($scope.cities, function(e){ return e[0]==$scope.model.city_id; });
                        $scope.model.cityName = name[2];
                    }
                    $scope.model.area_info =$scope.model.provinceName+" "+$scope.model.cityName;
                };

                $scope.areaChange=function(){
                    $scope.model.areaName = "";
                    //$scope.selectProvinceShow=false;
                    if($scope.model.area_id){
                        var name = _.find($scope.areaes, function(e){ return e[0] == $scope.model.area_id; });
                        $scope.model.areaName = name[2];
                    }
                    $scope.model.area_info = $scope.model.provinceName+" "+$scope.model.cityName+" "+$scope.model.areaName;
                }

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