/**
 * 我的收货地址
 */
define([
    "services/addressService"
], function(){
    return ["$scope", "$rootScope", "$state", "$stateParams", "$timeout", "addressService",
    function ($scope, $rootScope, $state, $stateParams, $timeout, addressService) {  
        $scope.moduleClass = "addressList-wrapper";
        $rootScope.pageTitle = "我的收货地址";

        $scope.dataList = [];

        $scope.isLoading = false;//是否加载中

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

        //删除地址
        $scope.delAddress = function(id){
        	new Confirm({
        		desc: "是否删除该地址？",
        		onok: function(){
		    		addressService.delAddress(id).then(function(){
                        new Say("删除成功!");
                        $scope.pullData();
		    		});
        		}
        	});
        };

        //设置默认地址
        $scope.setDefault=function(address){
            if(address.is_default=="1")
            {
                new Say("该地址已经是默认地址!");
                return false;
            }
            addressService.defaultAddress(address.address_id).then(function(){
                new Say("设置成功!");
                $scope.pullData();
            });
        };

        $scope.pullData();
    }];
});