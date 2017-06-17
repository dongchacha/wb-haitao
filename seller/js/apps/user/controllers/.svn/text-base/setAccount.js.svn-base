/**
 * 账号设置
 */
define([
    "services/userService"
], function(){
    return ["$scope", "$rootScope", "$state", "$stateParams", "$timeout", "userService",
    function ($scope, $rootScope, $state, $stateParams, $timeout, userService) {  
        $scope.moduleClass = "perfectPwd-wrapper";
        $rootScope.pageTitle = "账号设置";

        $scope.submit = function(){
            if(!$scope.pwd1){
                new Say("请输入您的登录密码");
            } else if($scope.pwd1.length < 6 || $scope.pwd1.length > 20){
                new Say("请输入6~20位的登录密码");
            } else if(!$scope.pwd2){
                new Say("请再输入一遍");
            } else if($scope.pwd1 != $scope.pwd2){
                new Say("您两次输入的密码不一致");
            } else{
                Loading.show();
                userService.setPwd($scope.pwd1, $scope.pwd2).then(function(){
                    Loading.hide();
                    if($scope.prevUrl){
                        location.href = Util.decodeUri($scope.prevUrl);
                    } else{
                        new Say({
                            title: "提交成功",
                            onhide: function(){
                                $state.go("seller.center");
                            }
                        });                        
                    }
                });
            }
        };
    }];
});
