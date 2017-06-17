/**
 * 首页相关服务
 */
define(["serviceModule"], function(app) {
    app.factory("homeService", ["$q", "$http", function($q, $http) {
        var services = {
            /**
             * 获取商品分类和热门品牌
             */
            getHomeInfo: function(){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=main&fun=index",   //正式接口地址
                    TEST_URL = "json/home/getCategoryAndBrand.txt"   //测试接口地址
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
             * 获取主题活动广告
             */
            getThemeActivities: function(){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=main&fun=getmaininfo",   //正式接口地址
                    TEST_URL = "json/home/getThemeActivities.txt"   //测试接口地址
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
            }
        };
        return services;
    }]);
});