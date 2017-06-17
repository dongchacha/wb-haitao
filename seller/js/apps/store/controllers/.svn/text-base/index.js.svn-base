/**
 * 店铺管理
 */
define(["directives/fileUpload", "services/storeService"], function(){
    return ["$scope", "$rootScope", "$state", "$stateParams", "$timeout", "storeService",
    function ($scope, $rootScope, $state, $stateParams, $timeout, storeService) {  
        $scope.moduleClass = "seller-center-wrapper store-wrapper";
        $rootScope.pageTitle = "店铺管理";

        storeService.getStoreInfo().then(function(data){
        	$scope.info = data.datas.store_info;
        });

        $scope.changeName = function(){
	        new Confirm({
	        	title: "店铺名称",
	        	desc: '<input type="tel" placeholder="请输入店铺名称" id="J_Input" value="'+ $scope.info.name +'"/>',
	        	onok: function(){
	        		$scope.$apply(function(){
	        			$scope.info.name = $("#J_Input").val();
	        		});
	        	}
	        });
	    };

        $scope.changeDesc = function(){
	        new Confirm({
	        	title: "店铺简介",
	        	desc: '<input type="text" placeholder="请输入店铺简介" id="J_Input" value="'+ $scope.info.description +'"/>',
	        	onok: function(){
	        		$scope.$apply(function(){
	        			$scope.info.description = $("#J_Input").val();
	        		});
	        	}
	        });
	    };

        $scope.changeWechat = function(){
	        new Confirm({
	        	title: "微信号",
	        	desc: '<input type="text" placeholder="请输入微信号" id="J_Input" value="'+ $scope.info.weixin +'"/>',
	        	onok: function(){
	        		$scope.$apply(function(){
	        			$scope.info.weixin = $("#J_Input").val();
	        		});
	        	}
	        });
	    };

        $scope.changePhone = function(){
	        new Confirm({
	        	title: "电话",
	        	desc: '<input type="text" placeholder="请输入电话号码" id="J_Input" value="'+ $scope.info.phone +'"/>',
	        	onok: function(){
	        		$scope.$apply(function(){
	        			$scope.info.phone = $("#J_Input").val();
	        		});
	        	}
	        });
	    };

        //保存
        $scope.submit = function(){
        	storeService.saveStoreInfo($scope.info).then(function(data){
        		if(data.code == 200){
        			new Say("保存成功");
        		} else{
        			new Say("保存失败");
        		}
        	});
        };
    }];
});