/**
 * 模块路由
 */
define([], function()
{
    var ABSTRACT_HTML = '<div ui-view ng-class="moduleClass"></div>';
    return {
        defaultRoutePath: "/seller/index",
        routes: {
            //首页
            "home": {
                url: "/home",
                templateUrl: "apps/home/views/home.html",
                controllerUrl: "apps/home/controllers/home"
            },

            // //登录
            // "login": {
            //     url: "/login?prevUrl",
            //     templateUrl: "apps/user/views/login.html",
            //     controllerUrl: "apps/user/controllers/login"
            // },

            // //登录
            // "mobileLogin": {
            //     url: "/mobileLogin?prevUrl",
            //     templateUrl: "apps/user/views/mobileLogin.html",
            //     controllerUrl: "apps/user/controllers/mobileLogin"
            // },

            // //注册
            // "reg": {
            //     url: "/reg?prevUrl",
            //     templateUrl: "apps/user/views/reg.html",
            //     controllerUrl: "apps/user/controllers/reg"
            // },

            // //完善密码
            // "perfectPwd": {
            //     url: "/perfectPwd",
            //     templateUrl: "apps/user/views/perfectPwd.html",
            //     controllerUrl: "apps/user/controllers/perfectPwd"
            // },

            // //找回密码
            // "findPwd": {
            //     url: "/reg",
            //     templateUrl: "apps/user/views/findPwd.html",
            //     controllerUrl: "apps/user/controllers/findPwd"
            // },
            "user": {
                url: "/user",
                abstract: true,
                template: ABSTRACT_HTML,
                subStates: {
                    //账号设置
                    "setAccount": {
                        url: "/setAccount",
                        templateUrl: "apps/user/views/setAccount.html",
                        controllerUrl: "apps/user/controllers/setAccount"
                    },
                    //更改手机
                    "modifyMobile": {
                        url: "/modifyMobile",
                        templateUrl: "apps/user/views/modifyMobile.html",
                        controllerUrl: "apps/user/controllers/modifyMobile"
                    }
                }
            },

            //卖家
            "seller": {
                url: "/seller",
                abstract: true,
                template: ABSTRACT_HTML,
                subStates: {
                    //卖家中心
                    "center": {
                        url: "/center",
                        templateUrl: "apps/seller/views/center.html",
                        controllerUrl: "apps/seller/controllers/center"
                    },
                    //卖家首页
                    "index": {
                        url: "/index",
                        templateUrl: "apps/seller/views/index.html",
                        controllerUrl: "apps/seller/controllers/index"
                    },
                    //我的收益
                    "profit": {
                        url: "/profit",
                        templateUrl: "apps/seller/views/profit.html",
                        controllerUrl: "apps/seller/controllers/profit"
                    }
                }
            },

            //交易
            "trade": {
                url: "/trade",
                abstract: true,
                template: ABSTRACT_HTML,
                subStates: {
                    //历史交易
                    "history": {
                        url: "/history?type",
                        templateUrl: "apps/trade/views/history.html",
                        controllerUrl: "apps/trade/controllers/history"
                    },
                    //收益列表
                    "profitList": {
                        url: "/profitList?type",
                        templateUrl: "apps/trade/views/profitList.html",
                        controllerUrl: "apps/trade/controllers/profitList"
                    },
                    //交易详情
                    "detail": {
                        url: "/detail?model",
                        templateUrl: "apps/trade/views/detail.html",
                        controllerUrl: "apps/trade/controllers/detail"
                    },
                    //申请提现
                    "applyWithdrawCash": {
                        url: "/withdrawCash",
                        templateUrl: "apps/trade/views/applyWithdrawCash.html",
                        controllerUrl: "apps/trade/controllers/applyWithdrawCash",
                        subStates: {
                            "choseAccount": {
                                url: "/choseAccount",
                                templateUrl: "apps/trade/views/choseAccount.html",
                                controllerUrl: "apps/trade/controllers/choseAccount",
                            }
                        }
                    }
                }
            },

            //银行卡
            "bankCard": {
                url: "/bankCard",
                abstract: true,
                template: ABSTRACT_HTML,
                subStates: {
                    //我的银行卡列表
                    list: {
                        url: "/list",
                        templateUrl: "apps/bankCard/views/list.html",
                        controllerUrl: "apps/bankCard/controllers/list"
                    },
                    //银行卡详情
                    detail: {
                        url: "/detail/:id",
                        templateUrl: "apps/bankCard/views/detail.html",
                        controllerUrl: "apps/bankCard/controllers/detail"
                    },                    
                    //添加银行卡
                    add: {
                        url: "/add?prevUrl",
                        templateUrl: "apps/bankCard/views/add.html",
                        controllerUrl: "apps/bankCard/controllers/add",
                        subStates: {
                            //选择银行
                            choseBank: {
                                url: "/choseBank",
                                templateUrl: "apps/bankCard/views/choseBank.html",
                                controllerUrl: "apps/bankCard/controllers/choseBank",
                            }
                        }
                    },
                    //修改银行卡
                    edit: {
                        url: "/edit/:id",
                        templateUrl: "apps/bankCard/views/add.html",
                        controllerUrl: "apps/bankCard/controllers/add",
                        subStates: {
                            //选择银行
                            choseBank: {
                                url: "/choseBank",
                                templateUrl: "apps/bankCard/views/choseBank.html",
                                controllerUrl: "apps/bankCard/controllers/choseBank",
                            }
                        }
                    }
                }
            },

            //分销
            "distribution": {
                url: "/distribution",
                abstract: true,
                template: ABSTRACT_HTML,
                subStates: {
                    //分销列表
                    "list": {
                        url: "/list/:level",
                        templateUrl: "apps/distribution/views/list.html",
                        controllerUrl: "apps/distribution/controllers/list"
                    }
                }
            },

            //客户
            "customer": {
                url: "/customer",
                abstract: true,
                template: ABSTRACT_HTML,
                subStates: {
                    //客户列表
                    "list": {
                        url: "/list",
                        templateUrl: "apps/customer/views/list.html",
                        controllerUrl: "apps/customer/controllers/list"
                    }
                }
            },

            //店铺管理
            "store": {
                url: "/store",
                abstract: true,
                template: ABSTRACT_HTML,
                subStates: {
                    //店铺管理
                    "index": {
                        url: "/index",
                        templateUrl: "apps/store/views/index.html",
                        controllerUrl: "apps/store/controllers/index"
                    },
                    //编辑店铺地址
                    "index.editAddress": {
                        url: "/editAddress",
                        templateUrl: "apps/store/views/editAddress.html",
                        controllerUrl: "apps/store/controllers/editAddress"
                    },
                    //编辑店铺简介
                    "index.editIntro": {
                        url: "/editIntro",
                        templateUrl: "apps/store/views/editIntro.html",
                        controllerUrl: "apps/store/controllers/editIntro"
                    }
                }
            },

            //商品
            "goods": {
                url: "/goods",
                abstract: true,
                template: ABSTRACT_HTML,
                subStates: {
                    //商品列表
                    "list": {
                        url: "/list/:type",
                        templateUrl: "apps/goods/views/list.html",
                        controllerUrl: "apps/goods/controllers/list"
                    },
                    //商品详情
                    "detail": {
                        url: "/detail",
                        templateUrl: "apps/goods/views/detail.html",
                        controllerUrl: "apps/goods/controllers/detail"
                    },
                    //我的上架商品
                    "mine": {
                        url: "/mine",
                        templateUrl: "apps/goods/views/mine.html",
                        controllerUrl: "apps/goods/controllers/mine"
                    }
                }
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
 
            // //添加评价
            // "order.addEveluate": {
            //     url: "/addEveluate/:orderId",
            //     templateUrl: "apps/evaluate/views/add.html",
            //     controllerUrl: "apps/evaluate/controllers/add"
            // },  

            // //追加评价
            // "order.addEveluateAgain": {
            //     url: "/addEveluateAgain/:orderId",
            //     templateUrl: "apps/evaluate/views/add.html",
            //     controllerUrl: "apps/evaluate/controllers/additional"
            // },  

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
            }
        }
    };
});