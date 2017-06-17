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
                        if(data.datas && data.datas.seller == "1"){//卖家
                            location.href = "../seller/index.html";
                        } else{//买家
                            if($scope.prevUrl){
                                location.href = Util.decodeUri($scope.prevUrl);
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
