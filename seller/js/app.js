/**
 * 模块入口
 * 
 * @author dongxiaochai @163.com
 * @since 2015-11-13
 */
require.config(GConfig.requireConfig); 
require(["angular", "route", "say",
    "global", "ui-router", "angular-animate", "serviceModule", "directiveModule"
], function(angular, routeConfig, Say){
    // console.log("第一次渲染初始化所用时间：" + (+new Date() - nTimePick)); 
    var index = angular.module("index", ['global', 'ui.router', 'ngAnimate', "serviceModule", "directiveModule"]);

    index.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $locationProvider){
        //暴露相应的注册方法出来
        index.controller = $controllerProvider.register;
        index.directive  = $compileProvider.directive;
        index.filter     = $filterProvider.register;
        index.factory    = $provide.factory;
        index.service    = $provide.service;

        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|javascript):/);

        
        //配置路由
        if(routeConfig.routes !== undefined){
            angular.forEach(routeConfig.routes, function(route, state){
                $stateProvider.state(state, getRouteConfig(route, state));
            });
            
        }
        // console.log(tmp);
        if(routeConfig.defaultRoutePath !== undefined){
            $urlRouterProvider
              // 错误的路由重定向
              // .when('/c?id', '/contacts/:id')
              // .when('/user/:id', '/contacts/:id')
              .otherwise(routeConfig.defaultRoutePath);
        }
        
        if(GConfig.html5Model){//开始html5模式
            $locationProvider.html5Mode(true);
        }

        /**
         * 动态配置template和controller
         * @param  {Object} option 
         * @return {Object}                路由配置对象
         */
        function getRouteConfig(option, stateName){
            var templateUrl = option.templateUrl,
                controllerUrl = option.controllerUrl,
                dependencies = option.dependencies,
                routeDefinie = {}
            ;
            routeDefinie = angular.extend({}, option, {
                controllerAs: "vm",
                resolve: option.resolve || {},
                template: option.template,
                abstract: option.abstract
            });
           
            if(option.templateUrl){
                routeDefinie.templateUrl = require.toUrl(templateUrl);
            }

            routeDefinie.controller = controllerUrl;
            routeDefinie.controllerAs = "vm";
            routeDefinie.resolve = {
                delay: ["$q", "$rootScope", function($q, $rootScope) {            
                    var defer = $q.defer(),
                        dependencies = [controllerUrl]
                    ;

                    require(dependencies, function() {
                    // console.log("控制器初始化所用时间：" + (+new Date() - nTimePick)); 
                        var controller = arguments[0];
                        $controllerProvider.register(controllerUrl, controller);
                        defer.resolve();
                        // $rootScope.$apply();
                        // alert("controller:"+controller);
                    })
                    
                    return defer.promise;
                }]
            }

            if(option.views){
                var oViews = {};
                angular.forEach(option.views, function(obj, key){
                    oViews[key] = getRouteConfig(obj, true);
                });
                routeDefinie.views = oViews;
            }

            if(option.subStates){
                var oViews = {};
                angular.forEach(option.subStates, function(obj, key){
                    key = stateName + "." + key;
                    $stateProvider.state(key, getRouteConfig(obj, key));
                });
                // routeDefinie.subStates = oViews;
            }
            // if(routeDefinie.name.indexOf("wallet"))
            // console.log(routeDefinie);

            return routeDefinie;
        }
    }]);

    index.run(["$rootScope", "$state", function($rootScope, $state){
        $rootScope.registerController = index.controller;//注册控制器
        $rootScope.$state = $state;
    }]);

       
    angular.bootstrap(document.getElementById('ng-app'), ['index']);

    return index;
});