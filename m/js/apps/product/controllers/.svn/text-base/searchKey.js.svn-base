/**
 * 关键词搜索
 * 
 * @author dongxiaochai@163.com
 * @since 2016-05-19
 */
define([
    "say", 
    "services/productService"
], function(Say){
    return ["$scope", "$state", "$stateParams", "productService", 
    function ($scope, $state, $stateParams, productService) {
        var vm = this;

        vm.queryKey = $stateParams.queryKey;

        function getHistoryData(){
            vm.historyData = productService.getKeyHistory();
        }
        getHistoryData();

        //提交搜索
        vm.submitSearch = function(queryKey){
            // $scope.pagerParams.queryKey = queryKey;
            productService.setKeyHistory(queryKey);
            // getHistoryData();

            $scope.$emit('getSearch', "key", {
                queryKey: queryKey
            });
        };

        //取消搜索
        vm.cancelSearch = function(){
            $scope.$emit('cancelSearch', 'key');
        };

        //清除历史记录
        vm.clearHistory = function(){
            productService.clearKeyHistory();
            getHistoryData();
        };

        // //滑动关闭
        // vm.bindHandlerLister = function(){
        //     var hammertime = new Hammer(document.querySelector(".search-history"));
        //     hammertime.on('swipe', function(ev) {
        //         if(ev.direction == 4){
        //             vm.cancelSearch(); 
        //             $scope.$apply();  
        //         }
        //     });
        // }
    }];
});