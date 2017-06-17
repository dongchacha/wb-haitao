/**
 * 模块路由
 */
define([], function()
{
    var ABSTRACT_HTML = '<div ui-view ng-class="moduleClass"></div>';
    return {
        defaultRoutePath: "/home",
        routes: {
            //首页
            "home": {
                url: "/home",
                templateUrl: "apps/home/views/home.html",
                controllerUrl: "apps/home/controllers/home"
            },

            //登录
            "login": {
                url: "/login?prevUrl",
                templateUrl: "apps/user/views/login.html",
                controllerUrl: "apps/user/controllers/login"
            },

            //登录
            "mobileLogin": {
                url: "/mobileLogin?prevUrl",
                templateUrl: "apps/user/views/mobileLogin.html",
                controllerUrl: "apps/user/controllers/mobileLogin"
            },

            //注册
            "reg": {
                url: "/reg?prevUrl",
                templateUrl: "apps/user/views/reg.html",
                controllerUrl: "apps/user/controllers/reg"
            },

            //完善密码
            "perfectPwd": {
                url: "/perfectPwd",
                templateUrl: "apps/user/views/perfectPwd.html",
                controllerUrl: "apps/user/controllers/perfectPwd"
            },

            //找回密码
            "findPwd": {
                url: "/reg",
                templateUrl: "apps/user/views/findPwd.html",
                controllerUrl: "apps/user/controllers/findPwd"
            },

            //品牌活动
            "brand": {
                url: "/brand/:brandId",
                templateUrl: "apps/product/views/brand.html",
                controllerUrl: "apps/product/controllers/brand"
            }, 

            //活动
            "activity": {
                url: "/activity/:activityId",
                templateUrl: "apps/product/views/activity.html",
                controllerUrl: "apps/product/controllers/activity"
            }, 

            // //分类
            // "category": {
            //     url: "/activity/:categoryId",
            //     templateUrl: "apps/product/views/activity.html",
            //     controllerUrl: "apps/product/controllers/activity"
            // },

            //商品
            "product": {
                url: "/product",
                abstract: true,
                template: ABSTRACT_HTML
            },   

            //商品列表
            "product.list": {
                url: "/list?queryKey&sortRule&brand&country&priceMin&priceMax&category&curpage",
                templateUrl: "apps/product/views/list.html",
                controllerUrl: "apps/product/controllers/list"
            },   

            //商品详情
            "product.detail": {
                url: "/detail/:id",
                templateUrl: "apps/product/views/detail.html",
                controllerUrl: "apps/product/controllers/detail"
            }, 

            //评价
            "product.detail.evaluate": {
                url: "/evaluate",
                templateUrl: "apps/evaluate/views/list.html",
                controllerUrl: "apps/evaluate/controllers/list"
            },

            //购物车
            "cart": {
                url: "/cart",
                abstract: true,
                template: ABSTRACT_HTML
            },          

            //购物车列表 
            "cart.list": {
                url: "/list?curpage",
                templateUrl: "apps/cart/views/list.html",
                controllerUrl: "apps/cart/controllers/list"
            },


            //我的
            "mine": {
                url: "/mine",
                abstract: true,
                template: ABSTRACT_HTML
            },                          

            //我的个人中心 
            "mine.index": {
                url: "/index",
                templateUrl: "apps/user/views/mine.html",
                controllerUrl: "apps/user/controllers/mine"
            },   

            //订单
            "order": {
                url: "/order",
                abstract: true,
                template: ABSTRACT_HTML
            }, 

            //我的订单    
            "order.orderList": {
                url: "/orderList/:type?curpage",
                templateUrl: "apps/order/views/orderList.html",
                controllerUrl: "apps/order/controllers/orderList"
            },  

            //订单详情
            "order.orderDetail": {
                url: "/orderDetail/:orderId",
                templateUrl: "apps/order/views/orderDetail.html",
                controllerUrl: "apps/order/controllers/orderDetail"
            },

            //订单确认
            "order.confirm": {
                url: "/confirm",
                templateUrl: "apps/order/views/orderConfirm.html",
                controllerUrl: "apps/order/controllers/orderConfirm"
            },

            //选择收货地址
            "order.confirm.chooseAddress": {
                url: "/chooseAddress",
                templateUrl: "apps/address/views/chooseAddress.html",
                controllerUrl: "apps/address/controllers/chooseAddress"
            }, 
            "order.confirm.addAddress": {
                url: "/addAddress",
                templateUrl: "apps/address/views/edit.html",
                controllerUrl: "apps/address/controllers/edit"
            }, 

            //我的售后订单    
            "order.saledOrderList": {
                url: "/refundOrderList",
                templateUrl: "apps/order/views/saledOrderList.html",
                controllerUrl: "apps/order/controllers/saledOrderList"
            }, 

            //售后订单详情    
            "order.saledOrderDetail": {
                url: "/refundOrderDetail/:refundId",
                templateUrl: "apps/order/views/saledOrderDetail.html",
                controllerUrl: "apps/order/controllers/saledOrderDetail"
            }, 

            //申请售后
            "order.saledAplay": {
                url: "/saledAplay?params",
                templateUrl: "apps/order/views/saledAplay.html",
                controllerUrl: "apps/order/controllers/saledAplay"
            },

            //售后进展查询
            "order.saledQuery":{
                url: "/saledQuery/:refundId",
                templateUrl: "apps/order/views/saledQuery.html",
                controllerUrl: "apps/order/controllers/saledQuery"
            }, 

            //买家发货
            "order.buyerSendGoods":{
                url: "/buyerSendGoods/:refundId",
                templateUrl: "apps/order/views/buyerSendGoods.html",
                controllerUrl: "apps/order/controllers/buyerSendGoods"
            },
 
            //添加评价
            "order.addEveluate": {
                url: "/addEveluate/:orderId",
                templateUrl: "apps/evaluate/views/add.html",
                controllerUrl: "apps/evaluate/controllers/add"
            },  

            //追加评价
            "order.addEveluateAgain": {
                url: "/addEveluateAgain/:orderId",
                templateUrl: "apps/evaluate/views/add.html",
                controllerUrl: "apps/evaluate/controllers/additional"
            },  

            //物流
            "delivery": {
                url: "/delivery",
                abstract: true,
                template: ABSTRACT_HTML
            },  

            //查看物流
            "delivery.list": {
                url: "/list/:orderId",
                templateUrl: "apps/delivery/views/list.html",
                controllerUrl: "apps/delivery/controllers/list"
            },      
            // //我的收藏 
            // "mine.collection": {
            //     url: "/collection",
            //     templateUrl: "apps/collection/views/list.html",
            //     controllerUrl: "apps/collection/controllers/list"
            // },           

            //收货地址
            "address": {
                url: "/address",
                abstract: true,
                template: ABSTRACT_HTML
            }, 
            //我的收货地址 
            "address.myAddressList": {
                url: "/myAddressList",
                templateUrl: "apps/address/views/myAddress.html",
                controllerUrl: "apps/address/controllers/myAddress"
            }, 

            //添加收货地址
            "address.add": {
                url: "/address/add",
                templateUrl: "apps/address/views/edit.html",
                controllerUrl: "apps/address/controllers/edit"
            }, 
            //编辑收货地址
            "address.edit": {
                url: "/address/edit/:id",
                templateUrl: "apps/address/views/edit.html",
                controllerUrl: "apps/address/controllers/edit"
            }, 
        }
    };
});