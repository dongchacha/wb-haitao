/**
 * 收藏服务
 */
define(["serviceModule"], function(app) {
    app.factory("collectService", ["$q", "$http", function($q, $http) {
        var services = {
            /**
             * 获取我的收藏列表
             * @return {Object} promise
             */
            getMyCollectionList: function(){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=member_cat&fun=cart_list&page=10&curpage=1",   //正式接口地址
                    TEST_URL = "json/collection/collectionList.txt"   //测试接口地址
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
             * 删除产品收藏
             * 
             * @param  {Integer} id 收藏ID
             */
            delCollection: function(id){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=member_cart&fun=cart_del",   //正式接口地址
                    TEST_URL = "json/cart/success.txt"   //测试接口地址
                ;

                $http({
                    method: "post",
                    testUrl: TEST_URL, 
                    url: URL,
                    data: {
                        id: id
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
            }
        };
        return services;
    }]);
});