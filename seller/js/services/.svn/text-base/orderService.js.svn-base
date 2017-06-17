/**
 * 订单服务
 */
define(["serviceModule"], function(app) {
    app.factory("orderService", ["$q", "$http", function($q, $http) {
        var CONFIRM_DATA_KEY = "confirmOrderData";
        var services = {
            /**
             * 获取订单列表
             */
            getOrderList: function(params){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=seller_order&fun=order_list",   //正式接口地址
                    TEST_URL = "json/order/orderList.txt"   //测试接口地址
                ;

                $http({
                    method: "get",
                    testUrl: TEST_URL, 
                    url: URL,
                    data: $.extend({
                        page: 20 //分页20条
                    }, params)
                }).success(function(data){
                    if(data.datas && data.datas.order_list.length > 0){
                        angular.forEach(data.datas.order_list, function(order){
                            var nGoodsNum = 0;
                            angular.forEach(order.extend_order_goods, function(pro){
                                nGoodsNum += pro.goods_num;
                            });
                            order.goods_num = nGoodsNum;
                        });
                    }
                    deferred.resolve(data);//成功
                });

                return deferred.promise;
            },

            /**
             * 读取订单详情
             */
            getOrderDetail: function(orderId){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=member_order&fun=show_order_detail",   //正式接口地址
                    TEST_URL = "json/order/orderDetail.txt"   //测试接口地址
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
            },

            /**
             * 取消订单
             */
            cancelOrder: function(orderId){
                return services.delOrder(orderId);
            },

            /**
             * 删除订单
             */
            delOrder: function(orderId){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=member_order&fun=cancel&order_id=" + orderId,   //正式接口地址
                    TEST_URL = "json/success.txt"   //测试接口地址
                ;

                $http({
                    method: "post",
                    testUrl: TEST_URL, 
                    url: URL,
                    data: null//{order_id: orderId}
                }).success(function(data){
                    deferred.resolve(data);//成功
                });

                return deferred.promise;
            },

            /**
             * 确认收货
             */
            confirmReceive: function(orderId){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=member_order&fun=order_receive&order_id=" + orderId,   //正式接口地址
                    TEST_URL = "json/success.txt"   //测试接口地址
                ;

                $http({
                    method: "post",
                    testUrl: TEST_URL, 
                    url: URL,
                    data: {order_id: orderId}
                }).success(function(data){
                    deferred.resolve(data);//成功
                });

                return deferred.promise;
            },

            /**
             * 延迟收货
             */
            delayReceive: function(orderId){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=goods_deliver&fun=delay_receive&order_id=" + orderId,   //正式接口地址
                    TEST_URL = "json/success.txt"   //测试接口地址
                ;

                $http({
                    method: "post",
                    testUrl: TEST_URL, 
                    url: URL,
                    data: {order_id: orderId}
                }).success(function(data){
                    deferred.resolve(data);//成功
                });

                return deferred.promise;                
            },

            /**
             * 订单结算，跳转三方支付
             */
            createOrder: function(goods_list, address_id, extra_msg){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=member_buy&fun=buy_step2",   //正式接口地址
                    TEST_URL = "json/success.txt"   //测试接口地址
                ;

                $http({
                    method: "post",
                    testUrl: TEST_URL, 
                    url: URL,
                    data: {
                        goods_list: goods_list,
                        address_id: address_id,
                        pay_name: "online",
                        extra_msg: extra_msg || ""
                    }
                }).success(function(data){
                    deferred.resolve(data);//成功
                });

                return deferred.promise;  
            },

            /**
             * 获取售后订单列表
             */
            getSaledOrderList: function(params){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=member_refund&fun=index",
                    TEST_URL = "json/order/saledOrderList.txt"
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
            },

            /**
             * 读取售后订单详情
             */
            getSaledOrderDetail: function(refundId){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=member_refund&fun=view",   //正式接口地址
                    TEST_URL = "json/order/saledOrderDetail.txt"   //测试接口地址
                ;

                $http({
                    method: "get",
                    testUrl: TEST_URL, 
                    url: URL,
                    data: {refund_id: refundId}
                }).success(function(data){
                    deferred.resolve(data);//成功
                });

                return deferred.promise;
            },

            /**
             * 获取售后订单流程信息
             */
            getSaledProgress: function(refundId){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=store_deliver&fun=search_deliverInfoOp",   //正式接口地址
                    TEST_URL = "json/order/saledProgress.txt"   //测试接口地址
                ;

                $http({
                    method: "get",
                    testUrl: TEST_URL, 
                    url: URL,
                    data: {refund_id: refundId}
                }).success(function(data){
                    deferred.resolve(data);//成功
                });

                return deferred.promise;
            },

            /**
             * 申请售后
             */
            applyRefund: function(order_id, goods_id, model){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=member_refund&fun=add_refund_all&order_id="+ order_id +"&goods_id="+ goods_id +"&inajax=1",
                    TEST_URL = "json/success.txt"
                ;

                $http({
                    method: "get",
                    testUrl: TEST_URL, 
                    url: URL,
                    data: $.extend({form_submit: "ok"}, model)
                }).success(function(data){
                    deferred.resolve(data);//成功
                });

                return deferred.promise;                
            },

            /**
             * 取消退款申请
             */
            cancelRefundApply: function(refund_id){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=member_refund&fun=refund_cancel",
                    TEST_URL = "json/success.txt"
                ;

                $http({
                    method: "get",
                    testUrl: TEST_URL, 
                    url: URL,
                    data: {refund_id: refund_id}
                }).success(function(data){
                    deferred.resolve(data);//成功
                });

                return deferred.promise;                
            },

            /**
             * 取消退货申请
             */
            cancelRefundApply: function(return_id){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=member_return&fun=return_cancel",
                    TEST_URL = "json/success.txt"
                ;

                $http({
                    method: "get",
                    testUrl: TEST_URL, 
                    url: URL,
                    data: {return_id: return_id}
                }).success(function(data){
                    deferred.resolve(data);//成功
                });

                return deferred.promise;                
            },

            //设置本地确认订单数据
            setConfirmOrderData: function(data){
                Util.setLocalData(CONFIRM_DATA_KEY, data);
            },

            //获取本地确认订单数据
            getConfirmOrderData: function(){
                return Util.getLocalData(CONFIRM_DATA_KEY, 10);
            },

            //删除确认订单数据
            delConfirmOrderData: function(){
                Util.removeLocalData(CONFIRM_DATA_KEY);
            },

            //生成订单step1
            createOrderStep1: function(){

            },

            //生成订单step2
            createOrderStep2: function(){

            }
        };
        return services;
    }]);
});