/**
 * 评价
 */
define(["services/evaluateService"
], function(){
    return ["$scope", "$rootScope", "$state", "$stateParams", "$timeout", "evaluateService",
    function ($scope, $rootScope, $state, $stateParams, $timeout, evaluateService) {  
    	$scope.moduleClass = "evaluateList-wrapper";
        $scope.pageTitle = "小伙伴们说";

        evaluateService.getEvaluateStat($stateParams.id).then(function(data){
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
            evaluateService.getEvaluate($stateParams.id, $scope.pagerParams).then(function(data){
                if(data.code != 200){
                    new Say(data.message);
                } else{
                    if($scope.pagerParams.curpage == 1){
                        $scope.dataList = data.datas.goodsevallist;
                    } else{
                        if(data.datas.goodsevallist.length > 0){
                            angular.forEach(data.datas.goodsevallist, function(item, index){
                                $scope.dataList.push(item);
                            });
                        } else{
                            $scope.pagerParams.curpage--;
                        }
                    }
                    
                    if(data.datas.goodsevallist.length < $scope.pagerParams.page){//没有下一页了
                        $scope.pageCount = $scope.pagerParams.curpage;
                    } else{
                        $scope.pageCount = $scope.pagerParams.curpage + 1;
                    }
                }
                $scope.isLoading = false;
            });
        }

        $scope.getAgainDay = function(evalDate, againDate){
            var str = "当天追加评价",
                nDay = (againDate - evalDate) / 60 / 60 / 24
            ;
            if(nDay > 0){
                str = parseInt(nDay) + "天后追加评价";
            }

            return str;
        };
	}];
});