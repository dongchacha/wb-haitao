/**
 * 评价
 */
define(["photoSwipe", "services/evaluateService"
], function(PhotoSwipe){
    return ["$scope", "$rootScope", "$state", "$stateParams", "$timeout", "evaluateService",
    function ($scope, $rootScope, $state, $stateParams, $timeout, evaluateService) {  
    	$scope.moduleClass = "evaluateList-wrapper";
        $scope.pageTitle = "小伙伴们说";

        evaluateService.getEvaluateStat($stateParams.proId).then(function(data){
            if(data.code != 200){
                new Say(data.message);
            } else{
                $scope.statInfo = data.datas;
            }
        });

        //列表请求查询条件
        $scope.pagerParams = {
            curpage: $stateParams.curpage || 1, //当前页
            page: 20,
            type: 0
        };
        $scope.dataList = [];

        $scope.isLoading = true;//是否加载中
        $scope.pageCount = 0;   //分页总数

        //修改类型
        $scope.changeType = function(type){
            $scope.pagerParams.type = type;
            $scope.pagerParams.curpage = 1;
            $scope.pullData();
        };

        //加载列表信息
        $scope.pullData = function(){  
            $scope.isLoading = true; 
            evaluateService.getEvaluate($stateParams.proId, $scope.pagerParams).then(function(data){
                if(data.code != 200){
                    new Say(data.message);
                } else{
                    if($scope.pagerParams.curpage == 1){
                        $scope.dataList = data.datas.evaluate_list;
                    } else{
                        if(data.datas.evaluate_list.length > 0){
                            angular.forEach(data.datas.evaluate_list, function(item, index){
                                $scope.dataList.push(item);
                            });
                        } else{
                            $scope.pagerParams.curpage--;
                        }
                    }
                    
                    if(data.datas.evaluate_list.length < $scope.pagerParams.page){//没有下一页了
                        $scope.pageCount = $scope.pagerParams.curpage;
                    } else{
                        $scope.pageCount = $scope.pagerParams.curpage + 1;
                    }
                }
                $scope.isLoading = false;
            });
        }

        //查看大图
        $scope.previewPic = function(parentIndex, index){
            new PhotoSwipe({
                targetImgs : $(".data-wrapper .data-item").eq(parentIndex).find(".pics img"),
                currentIndex: index
            });
        };
	}];
});