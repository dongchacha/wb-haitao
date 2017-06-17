/**
 * 登录
 */
define([
    "services/userService"
], function(){
    return ["$scope", "$rootScope", "$state", "$stateParams", "$timeout", "userService",
    function ($scope, $rootScope, $state, $stateParams, $timeout, userService) {  
        $scope.moduleClass = "login-wrapper";
        $rootScope.pageTitle = "登录";

        $scope.prevUrl = $stateParams.prevUrl;

        $scope.login = function(){
            if($scope.J_Form.$invalid){
                return false;
            }
            if(!$scope.mobile){
                new Say("请输入您的用户名");
            } else if(!$scope.pwd){
                new Say("请输入登录密码");
            } else{
                Loading.show();
                userService.login($scope.mobile, $scope.pwd).then(function(data){
                    Loading.hide();

                    if(data.code != 200){
                        new Say(data.message);
                    } else{
                        var prevUrl = Util.decodeUri($scope.prevUrl);
                        if(data.datas && data.datas.seller == "1"){//卖家
                            if(prevUrl && prevUrl.indexOf("/seller/") > -1){
                                location.href = prevUrl;
                            } else{
                                location.href = "../seller/index.html";
                            }
                        } else{//买家
                            if(prevUrl && prevUrl.indexOf("/m/") > -1){
                                location.href = prevUrl;
                            } else{
                                $state.go("mine.index");
                            }
                        }
                    }
                });
            }
        };
    }];
});
