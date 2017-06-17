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
                $scope.moduleClass = "editStoreIntro-wrapper";
                $scope.pageTitle = "店铺简介";

                vm.desc = $scope.info.description;
                $scope.modifyIntro = function(){
                    $scope.info.description = vm.desc;
                    $state.go("store.index");
                };
    }];
});