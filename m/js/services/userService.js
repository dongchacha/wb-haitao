/**
 * 当前用户服务
 */
define(["serviceModule", "md5"], function(app) {
    app.factory("userService", ["$q", "$http", "$state", function($q, $http, $state) {
        var USER_STORAGE_KEY = "currUserInfo"
        ;
        var services = {
            /**
             * 获取当前用户信息
             * @return {Object}
             */
            getLoginUser: function(){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=profile",
                    TEST_URL = "json/user/getUserInfo.txt",
                    userInfo
                ;
                
                // userInfo = Util.getSessionData(USER_STORAGE_KEY);
                // if(userInfo){
                //     deferred.resolve(userInfo);
                // } else{
                    $http({
                        method: "get",
                        testUrl: TEST_URL, 
                        url: URL,
                        data: {}
                    }).success(function(data){
                        if(data.code == 200){
                            deferred.resolve(data.datas.member_info);
                            services.setCurrUser(data.datas.member_info);
                        } else{
                            deferred.reject();
                        }
                    });
                // }

                return deferred.promise;
            },


            /**
             * 设置当前用户信息
             * @param {Object} userInfo 用户信息
             */
            setCurrUser: function(userInfo){
                if(!userInfo){
                    return;
                }

                Util.setSessionData(USER_STORAGE_KEY, userInfo);
            },

            /**
             * 清除当前用户信息
             * @return {}
             */
            clearCurrUser: function(){
                Util.removeSessionData(USER_STORAGE_KEY);
            },

            /**
             * 普通登录
             * @param  {String} user_name 用户名
             * @param  {String} password    密码
             * @return {Object} promise
             */
            login: function(user_name, pwd){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=login",   //正式接口地址
                    TEST_URL = "json/user/getUserInfo.txt"   //测试接口地址
                ;

                $http({
                    method: "post",
                    testUrl: TEST_URL, 
                    url: URL,
                    data: {
                        user_name: user_name,
                        password: $.md5(pwd),
                        client: "wap"
                    }
                }).success(function(data){
                    if(data.code != 200){
                        new Say(data.message);
                        deferred.reject();
                    } else{
                        services.setCurrUser(data.datas);
                        deferred.resolve(data);
                    }
                });

                return deferred.promise;
            },

            //手机号登录
            loginByMobile: function(mobile, pwd){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=login&fun=mobilelogin",   //正式接口地址
                    TEST_URL = "json/user/getUserInfo.txt"   //测试接口地址
                ;

                $http({
                    method: "post",
                    testUrl: TEST_URL, 
                    url: URL,
                    data: {
                        mobile: mobile,
                        verifycode: $.md5(pwd),
                        client: "wap"
                    }
                }).success(function(data){
                    if(data.code != 200){
                        new Say(data.message);
                        deferred.reject();
                    } else{
                        services.setCurrUser(data.datas);
                        deferred.resolve(data);
                    }
                });

                return deferred.promise;
            },

            /**
             * 退出登录
             * @return {void}
             */
            logout: function(){
                // var deferred = $q.defer(),
                //     URL = "/webapi/api/user/logout",   //正式接口地址
                //     TEST_URL = "json/success.txt"   //测试接口地址
                // ;

                // $http({
                //     method: "get",
                //     testUrl: TEST_URL, 
                //     url: URL,
                //     data: {}
                // }).success(function(data){
                //     services.clearCurrUser();
                //     $state.go("login", {prevUrl: Util.encodeUri(location.href)});
                // });

                // return deferred.promise;
            },

            /**
             * 注册
             */
            register: function(model){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=login&fun=register",   //正式接口地址
                    TEST_URL = "json/user/getUserInfo.txt"   //测试接口地址
                ;

                $http({
                    method: "post",
                    testUrl: TEST_URL, 
                    url: URL,
                    data: {
                        user_name: model.user_name,
                        password: $.md5(model.password),
                        password_confirm: $.md5(model.password_confirm),
                        email: "",
                        mobile: model.mobile,
                        verifycode: model.verifycode,
                        client: "wap"
                    }
                }).success(function(data){
                    if(data.code != 200){
                        new Say(data.message);
                        deferred.reject();
                    } else{
                        services.setCurrUser(data.datas);
                        deferred.resolve(data);
                    }
                });

                return deferred.promise;
            },

            /**
             * 获取验证码
             * @param  {String} mobile 手机号
             * @return {Object} promise
             */
            getValidCode: function(mobile){
                var deferred = $q.defer(),
                    URL = "/webapi/index.php?cls=login&fun=getregisterverifycode",   //正式接口地址
                    TEST_URL = "json/user/getUserInfo.txt"   //测试接口地址
                ;

                $http({
                    method: "post",
                    testUrl: TEST_URL, 
                    url: URL,
                    data: {
                        mobile: mobile
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
            // ,

            // /**
            //  * 设置登录密码
            //  * @return {Object} promise
            //  */
            // setPwd: function(pwd1, pwd2){
            //     var deferred = $q.defer(),
            //         URL = "/webapi/api/user/login",   //正式接口地址
            //         TEST_URL = "json/success.txt"   //测试接口地址
            //     ;

            //     $http({
            //         method: "post",
            //         testUrl: TEST_URL, 
            //         url: URL,
            //         data: {
            //             pwd1: pwd1,
            //             pwd2: pwd2
            //         }
            //     }).success(function(data){
            //         if(data.code != 200){
            //             new Say(data.message);
            //             deferred.reject();
            //         } else{
            //             deferred.resolve(data);
            //         }
            //     });

            //     return deferred.promise;
            // }//,

            // /**
            //  * 我的页面的读取统计信息
            //  * @return {void}
            //  */
            // getMyOrderStat: function(){
            //     var deferred = $q.defer(),
            //         URL = "/webapi/mobile/index.php?cls=member_cart&fun=cart_edit_quantity",   //正式接口地址
            //         TEST_URL = "json/mine/getUserInfo.txt"   //测试接口地址
            //     ;

            //     $http({
            //         method: "get",
            //         testUrl: TEST_URL, 
            //         url: URL,
            //         data: {
            //             cart_id: cartId,
            //             quantity: count
            //         }
            //     }).success(function(data){
            //         if(data.code != 200){
            //             new Say(data.message);
            //             deferred.reject();
            //         } else{
            //             deferred.resolve(data);
            //         }
            //     });

            //     return deferred.promise;
            // }
        }
        return services;
    }]);
});
