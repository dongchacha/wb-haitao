/**
 * 买家发货
 */
define([
    "services/buyerSendGoodsService",
], function(provinceData){
    return ["$scope", "$rootScope", "$state", "$stateParams", "$timeout", "buyerSendGoodsService",
        function ($scope, $rootScope, $state, $stateParams, $timeout, buyerSendGoodsService,addressService) {
            $scope.moduleClass = "addressEdit-wrapper";
            $rootScope.pageTitle = "买家发货";

            $scope.model = {
                return_id: $stateParams.refundId,
                express_id:'',
                invoice_no:''   //快递单号
            };
            //debugger;

            /*加载快递公司列表*/
            buyerSendGoodsService.getExpressList().then(function(data){
                $scope.expresses = data.datas.expresses;
                if(data.expresses && $scope.expresses.length > 0){
                    var express = $scope.expresses[0];
                    $scope.model.express_id = express.id;
                    $scope.model.e_name = express.e_name;
                }
            });

            $scope.flags = {
                showExpressName: false
            };
            
            $scope.expressChange = function(){
                var express = _.find($scope.expresses, function(e){
                    return e.id == $scope.model.express_id;
                });
                $scope.model.e_name = express.e_name;
                if($scope.model.e_name == '其它'){
                    $scope.model.expressName = "";
                    $scope.flags.showExpressName = true;
                }
            }

            //提交
            $scope.submit = function(){
                if($scope.J_Form.$invalid){
                    return false;
                }
                //验证
                if(!$scope.model.express_id)
                {
                    new Say("请选择快递公司!");
                    return false;
                } else if($scope.model.invoice_no == ""){
                    new Say("请填写快递单号!");
                    return false;
                }
                //  else if($scope.model.e_name == "其它" && $scope.model.expressName == ""){
                //     new Say("请填写快递公司名称!");
                //     return false;
                // }

                // var dto=angular.copy($scope.model);

                buyerSendGoodsService.submit($scope.model).then(function(){
                    new Say({
                        title: "提交成功",
                        onhide: function(){
                            $state.go("order.saledOrderList");
                        }
                    });
                });
            };
        }];
});