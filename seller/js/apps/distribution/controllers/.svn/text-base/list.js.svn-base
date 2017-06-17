/**
 * 分销管理
 */
define(["services/distributionService"
], function(){
    return ["$scope", "$rootScope", "$state", "$stateParams", "distributionService",
    function ($scope, $rootScope, $state, $stateParams, distributionService) {    
        $scope.moduleClass = "distribution-wrapper";
        $rootScope.pageTitle = $stateParams.level == 1 ? "一级分销" : "二级分销";
    
        $scope.dataList = [];

        $scope.isLoading = true;//是否加载中

        //加载列表信息
        $scope.pullData = function(){
            $scope.isLoading = true;   
            distributionService.getDistributionList($stateParams.level).then(function(data){
                $scope.isLoading = false;
                if(data.code != 200){
                    new Say(data.message);
                } else{
                    $scope.dataList = data.datas;
                }
                $scope.isLoading = false;
            });
        };
        $scope.pullData();
    }];
});