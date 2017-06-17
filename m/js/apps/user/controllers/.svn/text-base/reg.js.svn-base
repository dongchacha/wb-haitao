/**
 * 注册
 */
define([
    "services/userService"
], function(){
    return ["$scope", "$rootScope", "$state", "$stateParams", "$timeout", "userService",
    function ($scope, $rootScope, $state, $stateParams, $timeout, userService) {  
        $scope.moduleClass = "reg-wrapper";
        $rootScope.pageTitle = "注册";

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
                userService.getValidCode($scope.model.mobile).then(function(){
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
            if(!$scope.model.user_name){
                new Say("请输入您的用户名");
                return false;
            } else if(!$scope.model.password){
                new Say("请输入密码");
                return false;
            } else if($scope.model.password.length < 6 || $scope.model.password.length > 20){
                new Say("密码请输入6~20位");
                return false;
            } else if(!$scope.model.password_confirm){
                new Say("请输入确认密码");
                return false;
            } else if($scope.model.password_confirm != $scope.model.password){
                new Say("确认密码与密码不一致");
                return false;
            } else if(!$scope.model.mobile){
                new Say("请输入您的手机号");
                return false;
            } else if(!Util.REGEXP.PHONE.test($scope.model.mobile)){
                new Say("请输入正确的手机号");
                return false;
            } else if(!$scope.model.verifycode){
                new Say("请输入验证码");return false;
            } else{
                Loading.show();
                var model = angular.copy($scope.model);
                userService.register(model).then(function(){    
                    Loading.hide();               
                    $state.go("mine.index", {prevUrl: $stateParams.prevUrl});
                });
            }
        };
    }];
});
