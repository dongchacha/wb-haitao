/**
 * 收货地址服务
 */
define(["serviceModule"], function(app) {
    app.factory("buyerSendGoodsService", ["$q", "$http", function($q, $http) {
        var services = {
            /**
             * 获取快递公司列表
             * @return {Object} promise
             */
            getExpressList: function(){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=express&fun=get_all",   //正式接口地址
                    TEST_URL ="json/order/expressList.txt"   //测试接口地址
                ;

                $http({
                    method: "get",
                    testUrl: TEST_URL, 
                    url: URL,
                    data: {}
                }).success(function(data){
                    deferred.resolve(data);//成功
                });

                return deferred.promise;
            },

            /**
             * 提交发货信息
             */
            submit: function(model){
    			var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=member_return&fun=ship&return_id=" + model.return_id,   //正式接口地址
                    TEST_URL = "json/success.txt"   //测试接口地址
                ;

                $http({
                    method: "post",
                    testUrl: TEST_URL, 
                    url: URL,
                    data: {
                        express_id: model.express_id,
                        invoice_no: model.invoice_no
                    }
                }).success(function(data){
                    deferred.resolve(data);//成功
                });

                return deferred.promise;
            },

          

         

            /**
             * 默认地址
             * @param  {Integer} id 地址ID
             */
            defaultAddress: function(id){
                var deferred = $q.defer(),
                    URL = "/webapi/mobile/index.php?cls=member_address&fun=address_default",   //正式接口地址
                    TEST_URL = "json/success.txt"   //测试接口地址
                    ;

                $http({
                    method: "post",
                    testUrl: TEST_URL,
                    url: URL,
                    data: {
                        address_id: id
                    }
                }).success(function(data){
                    deferred.resolve(data);//成功
                });

                return deferred.promise;
            },
        }
        return services;
    }]);
});