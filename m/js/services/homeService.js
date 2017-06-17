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
            },

            /**
             * 获取更多分类商品信息
             * @param  {Integer} cls_id 分类ID
             * @param  {Integer} page   当前第几页
             * @param  {Integer} page   每页多少条
             */
            getClassifyProList: function(cls_id, curpage, page){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=main&fun=getmorepropose",   //正式接口地址
                    TEST_URL = "json/home/getClassifyProList.json"   //测试接口地址
                ;

                $http({
                    method: "get",
                    testUrl: TEST_URL, 
                    url: URL,
                    data: {
                        cls_id: cls_id,
                        curpage: curpage,
                        page: page
                    }
                }).success(function(data){
                    deferred.resolve(data);//成功
                });

                return deferred.promise;
            }
        };
        return services;
    }]);
});