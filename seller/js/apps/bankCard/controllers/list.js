/**
 * 我的银行卡
 */
define(["services/bankCardService"
], function(){
    return ["$scope", "$rootScope", "$state", "$stateParams", "bankCardService",
    function ($scope, $rootScope, $state, $stateParams, bankCardService) {    
        $scope.moduleClass = "bankCard-wrapper";
        $rootScope.pageTitle = "我的银行卡";
    // $scope.itemStyle = {
    //     color: "red"
    // };
        $scope.dataList = [];

        $scope.isLoading = true;//是否加载中

        //加载列表信息
        $scope.pullData = function(){
            $scope.isLoading = true;   
            bankCardService.getMyBankCardList().then(function(data){
                $scope.isLoading = false;
                if(data.code != 200){
                    new Say(data.message);
                } else{
                    $scope.dataList = data.datas.bank_list;
                    if($scope.dataList && $scope.dataList.length > 0){
                        angular.forEach($scope.dataList, function(item){
                            item.style = getItemStyle(item.bg_color);
                        });
                    }
                }
                $scope.isLoading = false;
            });
        };
        $scope.pullData();

        function getItemStyle(bg_color){
            var obj = {};
            if(!bg_color){
                // obj.color = "#333";
            } else{
                obj.backgroundColor = bg_color;
            }
            return obj;
        }

        //删除银行卡
        $scope.delBankCard = function(id){
            new Confirm({
                desc: "是否删除该银行卡？",
                onok: function(){
                    Loading.show();
                    bankCardService.delBankCard(id).then(function(){
                        Loading.hide();
                        new Say("删除成功");
                        $scope.pullData();
                    });
                }
            });
        };
    }];
});