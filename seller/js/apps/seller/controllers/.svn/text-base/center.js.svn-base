/**
 * 卖家中心
 */
define(["services/storeService"], function(){
    return ["$scope", "$rootScope", "$state", "$stateParams", "$timeout", "storeService",
    function ($scope, $rootScope, $state, $stateParams, $timeout, storeService) {  
        $scope.moduleClass = "seller-center-wrapper";
        $rootScope.pageTitle = "卖家中心";

        //邀请
        $scope.invite = function(){
            Loading.show();
            storeService.getInviteCode().then(function(data){
                Loading.hide();
                if(data.code != 200){
                    new Say(data.message);
                } else{
                	new Confirm({
                		desc: '您的邀请码为：<span class="copyTxt">' + data.datas.code + '</span>',
                		cancelText: ""
                	});
                }
            });
        };
    }];
});