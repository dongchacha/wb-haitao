/**
 * 物流服务
 */
define(["serviceModule"], function(app) {
    app.factory("deliveryService", ["$q", "$http", function($q, $http) {
        var services = {
            /**
             * 获取物流信息
             */
            getDeliveryInfo: function(orderId){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=member_order&fun=search_deliver",   //正式接口地址
                    TEST_URL = "json/delivery/getDeliveryInfo.txt"   //测试接口地址
                ;

                $http({
                    method: "get",
                    testUrl: TEST_URL, 
                    url: URL,
                    data: {order_id: orderId}
                }).success(function(data){
                    deferred.resolve(data);//成功
                });

                return deferred.promise;
            }
        };
        return services;
    }]);
});