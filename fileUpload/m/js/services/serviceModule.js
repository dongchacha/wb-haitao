/**
 * 服务模块应用
 */
define(["angular"], function(angular){
    var serviceModule = angular.module('serviceModule', [], ["$httpProvider", function($httpProvider){
        $httpProvider.defaults.transformRequest = function(data) {
            //把JSON数据转换成字符串形式
            var params = [];
            for (var i in data) {
                var val = data[i];
                if(typeof(val) == "object"){
                    val = JSON.stringify(val);
                }
                params.push(i + '=' + encodeURIComponent(val));
            }
            // console.log(params.join('&'));
            return params.join('&');
        };
        // $httpProvider.defaults.headers.common["Version"] = GConfig.WAP_VERSION;
        $httpProvider.defaults.headers.common["content-type"] = 'application/x-www-form-urlencoded; charset=utf-8';    //application/json; charset=UTF-8       
    }]);

    serviceModule.config(['$provide', function($provide){
        //暴露相应的注册方法出来
        serviceModule.factory    = $provide.factory;
        serviceModule.service    = $provide.service;
    }]);

    //拦截http请求
    serviceModule.factory('$globalInjector', ["$rootScope", "$q", function($rootScope, $q) {
        var oTimeout = {};//超时定时器
        var injector = {
            request: function(config){
                var deferred = $q.defer();
                if(config.method.toLowerCase() == "post"){
                    // Loading.show();//显示加载中效果 
                }

                if(config.testUrl && (sessionStorage.isTest || GConfig.isTest)){//测试
                    if(config.testUrl.substr(0,1) =='/') {
                        config.testUrl = config.testUrl.substr(1, config.testUrl.length - 1);
                    }
                    config.url = config.testUrl;
                    config.method = "get";
                }

                if(config.method.toLowerCase() === "get" && !config.params){
                    config.params = config.data;
                    delete config.data;
                }

                if(config.data){
                    angular.forEach(config.data, function(val, key){
                        if(config.data[key] === null){
                            delete config.data[key];
                        }
                    });
                }

                config.dataType = "json";

                //接口
                if(config.url.indexOf("/webapi/") > -1){
                    config.url = GConfig.API_PREV + config.url;//加前缀

                    if(config.url.indexOf("bust=") === -1){//加时间戳
                        if(config.url.indexOf("?") == -1){
                            config.url += "?";
                        } else{
                            config.url += "&";
                        }
                        config.url += "bust=" + new Date().getTime();
                    }
                }

                delete config.testUrl;

                // console.log(config);
                // if(!oTimeout[config.url]){
                //     //请求超时
                //     oTimeout[config.url] = setTimeout(function(){
                //         new Say(config.url + "请求超时");
                //     }, 10000);//
                // }
                // if(config.url.indexOf){

                // }
                deferred.resolve(config);//成功

                return deferred.promise;
            },
            response: function(response) {
                var deferred = $q.defer();
                // Loading.hide();

                // clearTimer(response.config.url);//清除超时定时器

                if(typeof(response.data) === "object"){
                    if(response.data.code == 1000){//未登录
                        // clearTimer();//清除超时定时器
                        new Say({title: "请先登录", onhide: function(){
                            $rootScope.logout && $rootScope.logout();
                        }});
                        deferred.reject();
                    } else{
                        if(response.data.code != 200 && response.data.datas){
                            response.data.message = response.data.datas.error || "网络超时";
                        }
                        deferred.resolve(response);
                    } 
                } else{
                    deferred.resolve(response);
                }
                return deferred.promise;
            },
            responseError: function(response) {
                var deferred = $q.defer();
                // Loading.hide();
                // if(response.status == 404){

                // }
                if(response.status == 1000){//登录超时
                    var scope = $injector.get('$scope');
                    scope.logout();
                    // clearTimer();//清除超时定时器

                    new Say({title: "登录超时，请重新登录", onhide: function(){
                        $rootScope.logout && $rootScope.logout();
                    }});
                } else{
                    // clearTimer(response.config.url);//清除超时定时器

                    new Say("网络异常");
                }
                deferred.reject();
                return deferred.promise;
                // return response;
            }
        };

        /**
         * 清除超时定时器
         * @param  {String} keyStr 定时器关键词，如果不传为清除所有
         * @return {coid}
         */
        function clearTimer(keyStr){
            if(keyStr){
                if(oTimeout[keyStr]){
                    clearTimeout(oTimeout[keyStr]);
                    delete oTimeout[keyStr];
                }
            } else{
                angular.forEach(oTimeout, function(val, key){
                    if(oTimeout[key] === null){
                        clearTimeout(oTimeout[key]);
                        delete oTimeout[key];
                    }
                });
            }
        }
        return injector;
    }]);

    serviceModule.config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('$globalInjector');
    }]);

    //上传接口
    serviceModule.factory("uploadService", ["$q", "$http", function($q, $http) {
        var services = {
            upload: function(base64Str, fileName){
                var deferred = $q.defer(),
                    // URL = "/webapi/index.php?cls=member_returnindex.php?fun=image_upload&upload_type=uploadedfile",
                    URL = "/upload.ashx",
                    TEST_URL = "json/fileUpload.txt"
                ;
                if(window.atob && window.Blob){
                    var asFileArr = base64Str.split(','),
                        // fileName = asFileArr[0],
                        data = asFileArr[1]
                    ;   
                    data = window.atob(data);   
                    var ia = new Uint8Array(data.length);   
                    for (var i = 0; i < data.length; i++) {   
                        ia[i] = data.charCodeAt(i);   
                    }; 

                    var blob = new Blob([ia], {   
                        type: "image/jpeg"   
                    });  

                    var fd = new FormData();   
                    fd.append('file_name', fileName);
                    fd.append('img_content', blob);   
                    var xhr = new XMLHttpRequest();   
                    // xhr.addEventListener("load", function(data){
                    //     // alert("载入成功");
                    //     // deferred.resolve(data);//成功
                    // }, false);   
                    // xhr.addEventListener("error", function(){
                    //     alert(3333);
                    //     deferred.reject();
                    // }, false); 
                    xhr.onreadystatechange = function(){
                        if(xhr.readyState == 4){
                            if (xhr.status == 200 && xhr.responseText){
                                var data = xhr.responseText;
                                alert(data);
                                if(typeof data == "string"){
                                    try{
                                        data = JSON.parse(data);
                                    } catch(ex){
                                    }
                                }
                                // data = {
                                //     url: "http://img10.360buyimg.com/n7/jfs/t2980/224/1098086213/458686/99785fc3/5774efa2N720255ad.jpg!q70.jpg"
                                // };
                                deferred.resolve(data);//成功
                            } else {
                                new Say({
                                    title: "上传失败",
                                    onhide: function(){
                                        deferred.reject();
                                    }
                                });                                
                            }
                        }
                    };     
                    xhr.open("POST", URL); 
                    // xhr.responseType = "blob"; 
                    xhr.send(fd); 
                } else{
                    $http({
                        method: "post",
                        testUrl: TEST_URL, 
                        url: URL,
                        data: {
                            img_content: base64Str
                        }
                    }).success(function(data){
                        deferred.resolve(data);//成功
                    }).error(function(){
                        deferred.reject();
                    });
                }

                return deferred.promise;   
            }
        };
        return services;
    }]);
    return serviceModule;
});