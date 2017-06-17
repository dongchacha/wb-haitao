/**
 * 选择收货地址
 */
define([
    "services/addressService"
], function(){
    return ["$scope", "$rootScope", "$state", "$stateParams", "$location", "$timeout", "addressService",
    function ($scope, $rootScope, $state, $stateParams, $location, $timeout, addressService) {  
        $scope.moduleClass = "addressList-wrapper chooseAddress-wrapper";
        $rootScope.pageTitle = "我的收货地址";

        $scope.dataList = [];

        $scope.isLoading = false;//是否加载中

        $scope.chosedId = $scope.$parent.chosedAddress.address_id;
        // debugger;

        //加载列表信息
        $scope.pullData = function(){
            $scope.isLoading = true;   
            addressService.getMyAddressList().then(function(data){
                $scope.isLoading = false;
                if(data.code == 0){
                    new Say(data.message);
                } else{
                    $scope.dataList = data.datas.address_list;
                }
            });
        }

        //设置默认地址
        $scope.choose = function(address){
            $scope.changeChosedAddress(address);

            history.back();
        };

        $scope.pullData();
    }];
});