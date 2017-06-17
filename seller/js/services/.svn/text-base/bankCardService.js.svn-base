/**
 * 银行卡服务
 */
define(["serviceModule"], function(app) {
    app.factory("bankCardService", ["$q", "$http", function($q, $http) {
        var services = {
            /**
             * 获取已经添加的银行卡列表
             */
            getMyBankCardList: function(){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=predeposit&fun=bank_list",
                    TEST_URL = "json/bankCard/getMyBankCardList.json"
                ;

                $http({
                    method: "get",
                    testUrl: TEST_URL, 
                    url: URL,
                    data: null
                }).success(function(data){
                    deferred.resolve(data);//成功
                });

                return deferred.promise;
            },

            /**
             * 获取支持的银行列表
             */
            getSupportBankList: function(){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=predeposit&fun=bank_available_list",
                    TEST_URL = "json/bankCard/getSupportBankList.json"
                ;

                $http({
                    method: "get",
                    testUrl: TEST_URL, 
                    url: URL,
                    data: null
                }).success(function(data){
                    deferred.resolve(data);//成功
                });

                return deferred.promise;
            },

            //添加银行卡
            addBankCard: function(model){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=predeposit&fun=bank&type=add",
                    TEST_URL = "json/success.txt"
                ;

                $http({
                    method: "post",
                    testUrl: TEST_URL, 
                    url: URL,
                    data: model
                }).success(function(data){
                    deferred.resolve(data);//成功
                });

                return deferred.promise;
            },

            //删除银行卡
            delBankCard: function(id){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=predeposit&fun=bank&type=delete",
                    TEST_URL = "json/success.txt"
                ;

                $http({
                    method: "post",
                    testUrl: TEST_URL, 
                    url: URL,
                    data: {id: id}
                }).success(function(data){
                    deferred.resolve(data);//成功
                });

                return deferred.promise;
            }
        };
        return services;
    }]);
});