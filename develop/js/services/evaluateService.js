/**
 * 评价服务
 */
define(["serviceModule"], function(app) {
    app.factory("evaluateService", ["$q", "$http", function($q, $http) {
        var services = {
            /**
             * 评价统计
             */
            getEvaluateStat: function(proId){
                var deferred = $q.defer(),
                    URL = "/webapi/shop/index.php?cls=goods&fun=goods_evaluate_info&goods_id=" + proId,
                    TEST_URL = "json/evaluate/getEvaluateStat.txt"
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
             * 获取评价信息
             */
            getEvaluate: function(proId, params){
                var deferred = $q.defer(),
                    URL = "",
                    TEST_URL = "json/evaluate/getEvaluateList.txt"
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
             * 提交评价
             */
            addEvaluate: function(orderId, evalute_data){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=member_evaluate&fun=add&inajax=1&order_id=" + orderId,
                    TEST_URL = "json/success.txt"
                ;

                // var oo = angular.copy(evalute_data);
                // oo = angular.toJson(oo);
                $http({
                    method: "post",
                    testUrl: TEST_URL, 
                    url: URL,
                    data: {
                        form_submit: "ok",
                        evalute_data: evalute_data
                    }
                }).success(function(data){
                    deferred.resolve(data);
                });

                return deferred.promise;
            },

            /**
             * 追加评价
             */
            addEvaluateAgain: function(orderId, evalute_data){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=member_evaluate&fun=add_again&inajax=1&order_id=" + orderId,   //正式接口地址
                    TEST_URL = "json/success.txt"
                ;

                // var oo = angular.copy(evalute_data);
                // oo = angular.toJson(oo);

                $http({
                    method: "post",
                    testUrl: TEST_URL, 
                    url: URL,
                    data: {
                        form_submit: "ok",
                        evalute_data: evalute_data
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