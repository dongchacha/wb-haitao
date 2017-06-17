/**
 * 店铺服务
 */
define(["serviceModule"], function(app) {
    app.factory("storeService", ["$q", "$http", function($q, $http) {
        var services = {
            /**
             * 获取店铺信息
             */
            getStoreInfo: function(){
                var deferred = $q.defer(),
                    URL = "/store/index.php?cls=store&fun=info",
                    TEST_URL = "json/store/getStoreInfo.json"
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
             * 获取店铺收益概况
             */
            getBriefIncome: function(){
                var deferred = $q.defer(),
                    URL = "/store/index.php?cls=store&fun=briefIncome",
                    TEST_URL = "json/store/getBriefIncome.json"
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
             * 保存店铺信息
             */
            saveStoreInfo: function(model){
                var deferred = $q.defer(),
                    URL = "/store/index.php?cls=store&fun=edit_info",
                    TEST_URL = "json/success.txt"
                ;

                $http({
                    method: "get",
                    testUrl: TEST_URL, 
                    url: URL,
                    data: model
                }).success(function(data){
                    deferred.resolve(data);//成功
                });

                return deferred.promise;
            },

            /**
             * 获取邀请码
             */
            getInviteCode: function(){
                var deferred = $q.defer(),
                    URL = "/store/index.php?cls=store&fun=invitecode",   //正式接口地址
                    TEST_URL = "json/store/getInviteCode.json"   //测试接口地址
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
            }
        };
        return services;
    }]);
});