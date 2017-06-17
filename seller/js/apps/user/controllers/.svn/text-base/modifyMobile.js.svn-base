/**
 * 更改手机
 */
define([
    "services/userService"
], function(){
    return ["$scope", "$rootScope", "$state", "$stateParams", "$timeout", "userService",
    function ($scope, $rootScope, $state, $stateParams, $timeout, userService) {  
        $scope.moduleClass = "reg-wrapper perfectPwd-wrapper";
        $rootScope.pageTitle = "更改手机";

        $scope.secCount = 0;//倒计时
        $scope.getCodeName = "获取验证码";
        $scope.model={
            user_name:'',
            password:'',
            password_confirm:'',
            mobile:'',
            verifycode:''
        };
        
        
        //获取验证码
        $scope.getCode = function(){
            if($scope.secCount > 0){
                return;
            } else if(!$scope.model.mobile){
                new Say("请输入您的手机号");
                return false;
            } else if(!Util.REGEXP.PHONE.test($scope.model.mobile)){
                new Say("请输入正确的手机号码");
            } else{
                userService.getModifyMobileValidCode($scope.model.mobile).then(function(){
                    $scope.secCount = 60;
                    $scope.getCodeName = $scope.secCount + "后重新获取";
                    setTimer();

                    function setTimer(){
                        $timeout(function(){
                            $scope.secCount--;
                            if($scope.secCount > 0){
                                $scope.getCodeName = $scope.secCount + "后重新获取";
                                setTimer();
                            } else{
                                $scope.getCodeName = "获取验证码";
                            }
                        }, 1000);
                    }
                });
            }
        };

        /*
         * 以字母开头，4~8长度
          * */
        var pawdReg = /^[a-zA-Z]{1}[0-9 | A-Z | a-z]{3,7}/;
        //下一步
        $scope.submit = function(){
            if(!$scope.model.password){
                new Say("请输入密码");
                return false;
            } else if(!$scope.model.mobile){
                new Say("请输入您的手机号");
                return false;
            } else if(!Util.REGEXP.PHONE.test($scope.model.mobile)){
                new Say("请输入正确的手机号");
                return false;
            } else if(!$scope.model.verifycode){
                new Say("请输入验证码");
                return false;
            } else{
                Loading.show();
                var model = angular.copy($scope.model);
                userService.modifyMobile(model).then(function(){  
                    Loading.hide();
                    new Say({
                        title: "提交成功",
                        onhide: function(){
                            $state.go("seller.center");
                        }
                    }); 
                });
            }
        };
    }];
});
