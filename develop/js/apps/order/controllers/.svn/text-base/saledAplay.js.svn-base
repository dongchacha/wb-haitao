/**
 * 申请售后
 */
define(["directives/fileUpload", "services/orderService"
], function(){
    return ["$scope", "$rootScope", "$state", "$stateParams", "$timeout", "orderService",
    function ($scope, $rootScope, $state, $stateParams, $timeout, orderService) {  
    	$scope.moduleClass = "saledApply-wrapper";
        $rootScope.pageTitle = "申请售后";

        $scope.pro = JSON.parse(Util.decodeUri($stateParams.params));
        $scope.sumAmount = $scope.pro.goods_price * $scope.pro.goods_num;//总金额

        $scope.applyInfo = {
            refund_type: $scope.pro.order_state == 20 ? 1 : 0,
            reason_id: 0,//原因：0-其他，1-不能按时发货，2-认为是假货，3-保质期不符，4-商品破损，5-效果不好。默认0
            refund_amount: "",//金额
            goods_sum: 1,
            buyer_message: "",
        	refund_pic: []
        };

        $scope.reseanData = {
            1: "不能按时发货",
            2: "认为是假货",
            3: "保质期不符",
            4: "商品破损",
            5: "效果不好",
            0: "其它"
        };

        //修改数量
        $scope.modifyCount = function(num){
        	if(num < 1){
        		new Say("申请数量不能小于1");
        	} else if(num > $scope.pro.goods_num){
        		new Say("申请数量不能大于购买物品总数");
        	} else{
        		$scope.applyInfo.apply_num = num;
        	}
        };

        //提交申请
        $scope.submit = function(){
            if(!$scope.applyInfo.refund_type){
                new Say("请选择服务类型");
                return false;
            } else if(!$scope.applyInfo.refund_amount){
                new Say("请输入申请金额");
                return false;
            } else if($scope.applyInfo.refund_amount > $scope.sumAmount){
                new Say("申请金额不能超过" + Util.toFixed($scope.sumAmount, 2));
                return false;
            } 
            // else if(!$scope.applyInfo.refund_pict || $scope.applyInfo.refund_pict.length == 0){
            //     new Say("请上传图片");
            //     return false;
            // }

            Loading.show();
        	orderService.applyRefund($scope.pro.order_id, $scope.pro.goods_id, $scope.applyInfo).then(function(data){
                Loading.hide();
                history.back();
            });
        };
	}];
});