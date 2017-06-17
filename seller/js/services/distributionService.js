/**
 * 分销服务
 */
define(["serviceModule"], function(app) {
    app.factory("distributionService", ["$q", "$http", function($q, $http) {
        var services = {
            /**
             * 分销列表
             */
            getDistributionList: function(level){
                var deferred = $q.defer(),
                    URL = "/store/index.php?cls=distribution&fun=downstream" + level,
                    TEST_URL = "json/distribution/getDistributionList.json"
                ;

                $http({
                    method: "get",
                    testUrl: TEST_URL, 
                    url: URL,
                    data: null
                }).success(function(data){
                    if(data && data.datas){
                        data.datas = data.datas.ds1 || data.datas.ds2 || [];
                    }
                    deferred.resolve(data);//成功
                });

                return deferred.promise;
            }
        };
        return services;
    }]);
});