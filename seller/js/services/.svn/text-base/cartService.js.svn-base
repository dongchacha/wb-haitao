/**
 * 购物车服务
 */
define(["serviceModule"], function(app) {
    app.factory("cartService", ["$q", "$http", function($q, $http) {
        var services = {
            getCartCount: function(){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=cart&fun=count",   //正式接口地址
                    TEST_URL = "json/cart/getCartCount.txt"   //测试接口地址
                ;

                $http({
                    method: "post",
                    testUrl: TEST_URL, 
                    url: URL,
                    data: {}
                }).success(function(data){
                    deferred.resolve(data);//成功
                });

                return deferred.promise;                
            },

            /**
             * 获取购物车物品列表
             * @return {Object} promise
             */
            getCartProList: function(params){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=cart&fun=list&page=10",   //正式接口地址
                    TEST_URL = "json/cart/getProlist.txt"   //测试接口地址
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
             * 添加产品到购物车
             * @param {Integer} proId 产品ID
             */
            addProToCart: function(proId, quantity){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=cart&fun=add",   //正式接口地址
                    TEST_URL = "json/success.txt"   //测试接口地址
                ;

                $http({
                    method: "post",
                    testUrl: TEST_URL, 
                    url: URL,
                    data: {
                        good_id: proId,
                        quantity: quantity
                    }
                }).success(function(data){
                    deferred.resolve(data);//成功
                });

                return deferred.promise;
            },

            /**
             * 编辑产品数量
             * 
             * @param  {Integer} cartId 购物车商品ID
             * @param  {Integer} count 数量
             */
            modifyProCount: function(cartId, count){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=cart&fun=edit_quantity",   //正式接口地址
                    TEST_URL = "json/success.txt"   //测试接口地址
                ;

                $http({
                    method: "post",
                    testUrl: TEST_URL, 
                    url: URL,
                    data: {
                        cart_id: cartId,
                        quantity: count
                    }
                }).success(function(data){
                    if(data.code != 200){
                        new Say(data.message);
                        deferred.reject();
                    } else{
                        deferred.resolve(data);
                    }
                });

                return deferred.promise;
            },

            /**
             * 删除产品
             * 
             * @param  {Integer} cartId 购物车商品ID
             */
            delProToCart: function(cartId){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=cart&fun=del",   //正式接口地址
                    TEST_URL = "json/success.txt"   //测试接口地址
                ;

                $http({
                    method: "post",
                    testUrl: TEST_URL, 
                    url: URL,
                    data: {
                        cart_id: cartId
                    }
                }).success(function(data){
                    deferred.resolve(data);
                });

                return deferred.promise;
            }
        };
        return services;
    }]);
});