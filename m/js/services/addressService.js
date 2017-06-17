/**
 * 收货地址服务
 */
define(["serviceModule"], function(app) {
    app.factory("addressService", ["$q", "$http", function($q, $http) {
        var services = {
            /**
             * 获取我的收货地址列表
             * @return {Object} promise
             */
            getMyAddressList: function(){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=address&fun=list",   //正式接口地址
                    TEST_URL = "json/address/myAddress.txt"   //测试接口地址
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
             * 读取默认地址
             */
            getDefaultAddress: function(){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=address&fun=list_default",   //正式接口地址
                    TEST_URL = "json/address/defaultAddress.txt"   //测试接口地址
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
                // var deferred = $q.defer();

                // services.getMyAddressList().then(function(data){
                //     var obj = null;
                //     if(data.datas.address_list){
                //         for(var i = 0; i < data.datas.address_list.length; i++){
                //             var item = data.datas.address_list[i];
                //             if(item.is_default == 1){
                //                 obj = item;
                //                 break;
                //             }
                //         }

                //         if(obj === null){
                //             obj = data.datas.address_list[0];
                //         }
                //     }
                //     deferred.resolve(obj || {});//成功
                // });

                // return deferred.promise;
            },

            /**
             * 根据ID获取收货地址
             */
            getAddress: function(id){
    			var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=address&fun=info",   //正式接口地址
                    TEST_URL = "json/address/addressDetail.txt"   //测试接口地址
                ;

                $http({
                    method: "get",
                    testUrl: TEST_URL, 
                    url: URL,
                    data: {id: id}
                }).success(function(data){
                    deferred.resolve(data);//成功
                });

                return deferred.promise;
            },

            /**
             * 添加地址
             * @param {Object} model 地址实例
             */
            addAddress: function(model){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=address&fun=add",   //正式接口地址
                    TEST_URL = "json/success.txt"   //测试接口地址
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

            /**
             * 删除地址
             * @param  {Integer} id 地址ID
             */
            delAddress: function(id){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=address&fun=del",   //正式接口地址
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

            /**
             * 更新地址
             * @param  {Object} model 地址实例
             */
            updateAddress: function(model){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=address&fun=edit",   //正式接口地址
                    TEST_URL = "json/success.txt"   //测试接口地址
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

            /**
             * 默认地址
             * @param  {Integer} id 地址ID
             */
            defaultAddress: function(id){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=address&fun=default",   //正式接口地址
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