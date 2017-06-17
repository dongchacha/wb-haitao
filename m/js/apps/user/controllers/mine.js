/**
 * 我的个人中心
 */
define([
    "services/userService"
], function(){
    return ["$scope", "$rootScope", "$state", "$stateParams", "$timeout", "userService",
    function ($scope, $rootScope, $state, $stateParams, $timeout, userService) {  
        $scope.moduleClass = "mine-index-wrapper";
        $rootScope.pageTitle = "我的";

        $rootScope.getUserInfo();

        $scope.gotoLogin = function(){
            $state.go("login", {prevUrl: Util.encodeUri(location.href)});
        };
        // userService.getLoginUser().then(function(data){
        // 	$scope.userInfo = data;
        // 	// console.log(data);
        // });
    }];
});
