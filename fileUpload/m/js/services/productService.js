/**
 * 商品服务
 */
define(["serviceModule"], function(app) {
    app.factory("productService", ["$q", "$http", function($q, $http) {
        var _keyHistory = null,
            SEARCH_STORAGE_KEY = "searchKey"
        ;
        var services = {
            /**
             * 获取商品列表
             */
            getProductList: function(params){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=goods&fun=list",   //正式接口地址
                    TEST_URL = "json/product/productList.txt"   //测试接口地址
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
             * 读取商品详情
             */
            getProductDetail: function(id){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=goods&fun=goods_detail&goods_id=" + id,   //正式接口地址
                    TEST_URL = "json/product/productDetail.txt"   //测试接口地址
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
             * 读取商品介绍
             */
            getProductDesc: function(id){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=goods&fun=goods_body&goods_id=" + id,   //正式接口地址
                    TEST_URL = "json/product/productIntro.txt"   //测试接口地址
                ;

                $http({
                    method: "get",
                    testUrl: TEST_URL, 
                    url: URL,
                    data: {

                    }
                }).success(function(data){
                    deferred.resolve(data);//成功
                });

                return deferred.promise;
            },

            /**
             * 获取搜索关键词
             * @return {Array}
             */
            getKeyHistory: function(){
                if(!_keyHistory){
                    var sHistory = localStorage.getItem(SEARCH_STORAGE_KEY);
                    if(sHistory){
                        try{
                            _keyHistory = JSON.parse(sHistory);
                        } catch(ex){

                        }
                    }
                }
                if(!_keyHistory){
                    _keyHistory = [];
                }
                return _keyHistory;
            },

            /**
             * 设置搜索关键词
             * @param {String} key 关键词
             */
            setKeyHistory: function(key){
                var nMaxCount = 10;

                _keyHistory = _keyHistory || [];
                if(!key){
                    return;
                }
                key = $.trim(key);

                if(("," + _keyHistory.join(",") + ",").indexOf("," + key + ",") === -1){
                    
                    _keyHistory.splice(0, 0, key);
                    if(_keyHistory.length > nMaxCount){
                        _keyHistory.splice(nMaxCount, _keyHistory.length - nMaxCount);
                    }
                }
                localStorage.setItem(SEARCH_STORAGE_KEY, JSON.stringify(_keyHistory));
            },     

            /**
             * 清除搜索关键词记录
             * @return {}
             */
            clearKeyHistory: function(){
                localStorage.removeItem(SEARCH_STORAGE_KEY);
                _keyHistory = [];
            },

            /**
             * 获取品牌活动数据
             */
            getBrandGoods: function(params){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=goods&fun=goods_list",   //正式接口地址
                    TEST_URL = "json/product/brandGoods.txt"   //测试接口地址
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
             * 获取活动分类数据
             */
            geActivityGoods: function(params){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=main&fun=getdetailactinfo",   //正式接口地址
                    TEST_URL = "json/product/acivityGoods.txt"   //测试接口地址
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

            //品牌分类
            getBrandCategory: function(){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=brand&fun=list",   //正式接口地址
                    TEST_URL = "json/product/brandCategory.txt"   //测试接口地址
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

            //返回国家
            getCountryCategory: function(){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=goods_class&fun=list_root",   //正式接口地址
                    TEST_URL = "json/product/country.txt"   //测试接口地址
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