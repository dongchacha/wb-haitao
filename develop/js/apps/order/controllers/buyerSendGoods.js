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
                refundId: $stateParams.refundId,
                e_name:'',
                addressee:'',
                phone:'',
                expressNumber:''
            };
            //debugger;

            /*加载快递公司列表*/
            buyerSendGoodsService.getExpressList().then(function(data){
                $scope.expresses=data.expresses;
                if(data.expresses&&data.expresses.length>0)
                {
                    var express=data.expresses[0];
                    $scope.model.e_id=express.e_id;
                    $scope.model.e_name=express.e_name;
                }
            });

            $scope.flags={
                showExpressName:false
            };

            
            $scope.expressChange=function(){
                var express=_.find($scope.expresses,function(e){
                    return e.e_id==$scope.model.e_id;
                });
                $scope.model.e_name=express.e_name;
                if($scope.model.e_name=='其它')
                {
                    $scope.model.expressName="";
                    $scope.flags.showExpressName=true;
                }

                
            }
            /*if($scope.model.id){//

            }*/

            //提交
            $scope.submit = function(){
                //验证
                if(!$scope.model.e_id)
                {
                    new Say("请填写快递公司!");
                    return false;
                }
                else if($scope.model.expressNumber=="")
                {
                    new Say("请填写快递单号!");
                    return false;
                }
                else if($scope.model.e_name=="其它"&&$scope.model.expressName=="")
                {
                    new Say("请填写快递公司名称!");
                    return false;
                }

                var dto=angular.copy($scope.model);

                buyerSendGoodsService.submit(dto).then(function(){
                    new Say({
                        title: "提交成功",
                        onhide: function(){
                            $state.go("order.saledQuery");
                        }
                    });
                });
            };


        }];
});