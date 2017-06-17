/**
 * 分销服务
 */
define(["serviceModule", "md5"], function(app) {
    app.factory("tradeService", ["$q", "$http", function($q, $http) {
        var services = {
            /**
             * 交易列表
             */
            getTradeList: function(params){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=predeposit&fun=pd_list",
                    TEST_URL = "json/trade/getTradeList.json"
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
             * 待收收益
             */
            getProfitList: function(params){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=predeposit&fun=incoming_list",
                    TEST_URL = "json/trade/getProfitList.json"
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

            //获取总收益
            getTotalProfit: function(){
                var deferred = $q.defer(),
                    URL = "/webapi/store/index.php?cls=commission&fun=all",
                    TEST_URL = "json/trade/getTotalProfit.json"
                ;

                $http({
                    method: "get",
                    testUrl: TEST_URL, 
                    url: URL,
                    data: null
                }).success(function(data){
                    deferred.resolve(data);//成功
                });

                return deferred.promise;
            },

            /**
             * 获取支持的银行
             */
            getBankCardList: function(){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=predeposit&fun=bank_list",
                    TEST_URL = "json/bankCard/getMyBankCardList.json"
                ;

                $http({
                    method: "get",
                    testUrl: TEST_URL, 
                    url: URL,
                    data: null
                }).success(function(data){
                    deferred.resolve(data);//成功
                });

                return deferred.promise;                
            },

            //申请提现
            applyWithdrawCash: function(params){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=predeposit&fun=pd_cash",
                    TEST_URL = "json/success.txt"
                ;

                params.pwd = $.md5(params.pwd);
                
                $http({
                    method: "post",
                    testUrl: TEST_URL, 
                    url: URL,
                    data: params
                }).success(function(data){
                    deferred.resolve(data);//成功
                });

                return deferred.promise;                
            },

            //申请提现--获取验证码
            getCheckCode: function(){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=predeposit&fun=send_auth_code",
                    TEST_URL = "json/success.txt"
                ;

                $http({
                    method: "post",
                    testUrl: TEST_URL, 
                    url: URL,
                    data: {
                        type: "mobile"
                    }
                }).success(function(data){
                    deferred.resolve(data);//成功
                });

                return deferred.promise;   

            }

            
            // ,

            // //交易详情
            // getTradeDetail: function(id){
            //     var deferred = $q.defer(),
            //         URL = "/webapi/index.php?cls=predeposit&fun=pd_list",
            //         TEST_URL = "json/trade/getTradeDetail.json"
            //     ;

            //     $http({
            //         method: "get",
            //         testUrl: TEST_URL, 
            //         url: URL,
            //         data: {id: id}
            //     }).success(function(data){
            //         deferred.resolve(data);//成功
            //     });

            //     return deferred.promise;
            // }
        };
        return services;
    }]);
});