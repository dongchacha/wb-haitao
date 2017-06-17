/**
 * 我的收藏
 */
define([
    "services/collectService"
], function(){
    return ["$scope", "$rootScope", "$state", "$stateParams", "$timeout", "collectService",
    function ($scope, $rootScope, $state, $stateParams, $timeout, collectService) {  
        $scope.moduleClass = "collectionList-wrapper";
        $rootScope.pageTitle = "我的收藏";

        $scope.dataList = [];

        $scope.isLoading = false;//是否加载中

        //加载列表信息
        $scope.pullData = function(){
            $scope.isLoading = true;   
            collectService.getMyCollectionList().then(function(data){
         
                    console.log(data);       $scope.isLoading = false;
                if(data.code == 0){
                    new Say(data.message);
                } else{
                    console.log(data.datas);
                    $scope.dataList = data.datas;
                }
            });
        }

        //删除
        $scope.delCollection = function(index){
        	new Confirm({
        		desc: "是否删除该商品？",
        		onok: function(){
		    		collectService.delCollection(id).then(function(){

		    		});
        		}
        	});
        };        
    }];
});