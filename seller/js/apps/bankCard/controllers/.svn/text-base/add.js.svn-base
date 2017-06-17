/**
 * 添加银行卡
 */
define(["services/bankCardService"
], function(){
    return ["$scope", "$rootScope", "$state", "$stateParams", "bankCardService",
    function ($scope, $rootScope, $state, $stateParams, bankCardService) {    
        $scope.moduleClass = "addBankCard-wrapper";
        $rootScope.pageTitle = "添加银行卡";
    
        $scope.model = {};

        $scope.chosedBank = null;

        $scope.chooseBank = function(bankModel){
            $scope.chosedBank = bankModel;
            $scope.model.bank_id = bankModel.bank_id;
            $scope.model.bank_name = bankModel.bank_name;
            history.back();
        }

        $scope.submit = function(){
            if($scope.J_Form.$invalid){
                return false;
            }
            if(!$scope.model.bank_user){
                new Say("请填写您本人的真实姓名");
            } else if(!$scope.model.bank_id){
                new Say("请选择银行");
            } else if(!$scope.model.card_num){
                new Say("请填写您本人的银行卡信息");
            } else{
                Loading.show();
                bankCardService.addBankCard($scope.model).then(function(){
                    Loading.hide();
                    if($stateParams.prevUrl){
                        location.href = Util.decodeUri($stateParams.prevUrl);
                    } else{
                        $state.go("bankCard.list");
                    }
                });
            }
        }
    }];
});