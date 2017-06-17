/**
 * 客户管理
 */
define(["services/customerService"
], function(){
    return ["$scope", "$rootScope", "$state", "$stateParams", "customerService",
    function ($scope, $rootScope, $state, $stateParams, customerService) {    
        $scope.moduleClass = "customer-wrapper";
        $rootScope.pageTitle = "客户管理";
       
        //列表请求查询条件
        $scope.pagerParams = {
            curpage: $stateParams.curpage || 1, //当前页
            page: 20
        };

        $scope.dataList = [];

        $scope.isLoading = true;//是否加载中

        $scope.pageCount = 0;   //分页总数

        //加载列表信息
        $scope.pullData = function(){
            $scope.isLoading = true;   
            customerService.getCustomerList($scope.pagerParams).then(function(data){
                $scope.isLoading = false;
                if(data.code != 200){
                    new Say(data.message);
                } else{
                    if($scope.pagerParams.curpage == 1){
                        $scope.dataList = data.datas.client_list;
                    } else{
                        if(data.datas.client_list.length > 0){
                            angular.forEach(data.datas.client_list, function(store, index){
                                $scope.dataList.push(store);
                            });
                        } else{
                            $scope.pagerParams.curpage--;
                        }
                    }
                    
                    if(data.datas.client_list.length < $scope.pagerParams.page){//没有下一页了
                        $scope.pageCount = $scope.pagerParams.curpage;
                    } else{
                        $scope.pageCount = $scope.pagerParams.curpage + 1;
                    }
                }
                $scope.isLoading = false;
            });
        };
    }];
});