/**
 * 添加评价
 */
define(["directives/fileUpload", "services/orderService", "services/evaluateService"
], function(){
    return ["$scope", "$rootScope", "$state", "$stateParams", "$timeout", "orderService", "evaluateService",
    function ($scope, $rootScope, $state, $stateParams, $timeout, orderService, evaluateService) {  
    	$scope.moduleClass = "evaluate-wrapper";
        $rootScope.pageTitle = "添加评价";

        $scope.order = {};

        $scope.evalute_data = [];

        //加载列表信息
        $scope.pullData = function(){
            Loading.show();
            orderService.getOrderDetail($stateParams.orderId).then(function(data){
                Loading.hide();
                if(data.code != 200){
                    new Say(data.message);
                } else{
                    $scope.order = data.datas;
                    for(var i = 0; i < $scope.order.extend_order_goods.length; i++){
                        var pro = $scope.order.extend_order_goods[i];
                        $scope.evalute_data.push({
                            goods_id: pro.goods_id,
                            goods_image_url: pro.goods_image_url,
                            goods_score: 0,
                            goods_comment: "",
                            goods_image: []
                        });
                    }
                }
            });
        }
        
        $scope.pullData();

        $scope.setScore = function(index, score){
            $scope.evalute_data[index].goods_score = score;
        };

        //提交申请
        $scope.submit = function(){
            var isValid = true;
            for(var i = 0; i < $scope.evalute_data.length; i++){
                var oItem = $scope.evalute_data[i];
                if(oItem.goods_score == 0){
                    new Say("有未完成的评分");
                    isValid = false;
                }
            }

            if(isValid){
                evaluateService.addEvaluate($scope.order.order_id, $scope.evalute_data).then(function(){
                    new Say({
                        title: "发表成功",
                        onhide: function(){
                            $scope.goBack();
                        }
                    });
                });
            }
        };
	}];
});