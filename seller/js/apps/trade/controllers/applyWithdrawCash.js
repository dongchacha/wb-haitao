/**
 * 交易详情
 */
define(["services/tradeService"
], function(){
    return ["$scope", "$rootScope", "$state", "$stateParams", "$timeout", "tradeService",
    function ($scope, $rootScope, $state, $stateParams, $timeout, tradeService) {    
        $scope.moduleClass = "applyWithdrawCash-wrapper";
        $rootScope.pageTitle = "申请提现";

        $scope.info = {
        	amount: "",
        	bank_id: "",
            pwd: ""
        };
        $scope.getCodeName = "获取验证码";
        //获取验证码
        $scope.getCode = function(){
            if($scope.secCount > 0){
                return;
            } else{
                tradeService.getCheckCode().then(function(){
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

        $scope.total = 502.02;
        $scope.chosedBankAccount;

        $scope.prevUrl = Util.encodeUri(location.href);

        //全部提取
        $scope.withdrawAll = function(){
        	$scope.info.amount = $scope.total;
        };

        tradeService.getBankCardList().then(function(data){
        	if(data.datas && data.datas.bank_list && data.datas.bank_list.length){
	        	$scope.bankAccountList = data.datas.bank_list;
	        	$scope.chosedBankAccount = $scope.bankAccountList[0];
        	}
        });

        //选择账号
        $scope.choseAccount = function(index){
        	$scope.chosedBankAccount = $scope.bankAccountList[index];
        	history.back();
        };

        //显示弹层
        $scope.showOverlay = function(index){
            $scope.showTarget = index;
        };

        //关闭弹层
        $scope.closeOverlay = function(){
            $scope.showTarget = 0;
        };

        $scope.submit = function(){
            if($scope.J_Form.$invalid){
                return false;
            }
            if(!$scope.chosedBankAccount){
                new Say("请选择提现账号");
            	return;
            }
            $scope.info.bank_id = $scope.chosedBankAccount.id;
            
            if($scope.info.amount > $scope.total){
                new Say("金额超出最大可提取金额");
            } else if(!$scope.info.auth_code){
                new Say("请输入验证码");
            } else{
                // $scope.info.pwd = "";
                // $scope.showOverlay(1);
                Loading.show();
                tradeService.applyWithdrawCash($scope.info).then(function(){
                    Loading.hide();
                    new Say({
                        title: "提现成功",
                        onhide: function(){
                            $state.go("seller.profit");
                        }
                    });                    
                });
            }
        };

        //点击数字
        $scope.addPwd = function(word){
            $scope.info.pwd = $scope.info.pwd + word.toString();
            if($scope.info.pwd.length === 6){
                $scope.closeOverlay();
                Loading.show();
                tradeService.applyWithdrawCash($scope.info).then(function(){
                    Loading.hide();
                    new Say({
                        title: "提现成功",
                        onhide: function(){
                            $state.go("seller.profit");
                        }
                    });                    
                });
            }
        }

        //删除输入
        $scope.removePwd = function(){
            if($scope.info.pwd.length > 0){
                $scope.info.pwd = $scope.info.pwd.substring(0, $scope.info.pwd.length - 1);
            }
        };
    }];
});