/**
 * 微信服务
 */
define(["serviceModule", "wx"], function(app, wx) {
    app.factory("evaluateService", ["$q", "$http", function($q, $http) {
        var services = {
        	//获取微信配置信息
            getConfigInfo: function(){

            }
        };
    	wx.config(GConfig.wxConfig);//微信配置
        return services;
    }]);
});