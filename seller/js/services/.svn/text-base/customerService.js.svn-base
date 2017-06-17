/**
 * 客户服务
 */
define(["serviceModule"], function(app) {
    app.factory("customerService", ["$q", "$http", function($q, $http) {
        var services = {
            /**
             * 获取客户列表
             */
            getCustomerList: function(params){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=seller_client&fun=client_list",
                    TEST_URL = "json/customer/getCustomerList.json"
                ;

                $http({
                    method: "get",
                    testUrl: TEST_URL, 
                    url: URL,
                    data: $.extend({
                        page: 20 //分页20条
                    }, params)
                }).success(function(data){
                    deferred.resolve(data);//成功
                });

                return deferred.promise;
            }
        };
        return services;
    }]);
});