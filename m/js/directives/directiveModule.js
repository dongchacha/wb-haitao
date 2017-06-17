/**
 * 指令模块应用
 */
define(["angular", "serviceModule"], function(angular){
    var directiveModule = angular.module('directiveModule', ['serviceModule']);
    directiveModule.config(['$compileProvider', function($compileProvider){
        //暴露相应的注册方法出来
        directiveModule.directive  = $compileProvider.directive;
    }]);

	/*
	 * 获取移动坐标信息
	 */
	function fnGetTouchPosition(e) {
	    var touches = e.changedTouches || e.originalEvent.changedTouches,
	        oMove = {
	            x: e.pageX,
	            y: e.pageY
	        }
	    ;
	    if(e.type.indexOf("touch") > -1){
	        oMove.x = touches[touches.length - 1].pageX;
	        oMove.y = touches[touches.length - 1].pageY;
	    }

	    return oMove;
	}

    /**
     * 跳转native或者网页
     */
    function bindUrlHandler($scope, element, attrs, $state, $stateParams){
        _bindTapHandler(element, function(){
            function parseStateRef(ref, current) {
                if(!ref){
                    return {};
                }
                var preparsed = ref.match(/^\s*({[^}]*})\s*$/), parsed, oParams;
                if (preparsed){
                    ref = current + '(' + preparsed[1] + ')';
                }
                parsed = ref.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/);
                if (!parsed || parsed.length !== 4){
                    throw new Error("Invalid state ref '" + ref + "'");
                }

                oParams = $scope.$eval(parsed[3]);

                return {
                    stateName: parsed[1], 
                    stateParams: oParams || null,
                    url: $state.href(parsed[1], oParams)
                };
            }

            var nativeUrl = attrs.btNativeSref || "",//对应的native地址
                openType = attrs.openType || 0,//在native中的打开方式，默认为直接打开
                title = attrs.title || "",  //打开页面的标题（一般用于外部访问页面）
                url = attrs.btSref || "",      //url地址
                oState = parseStateRef(attrs.btSref, $state.current.name)
            ;

            if(oState.url){
                url = oState.url;
            }

            //调用webview接口
            if(window.wv && wv.getBridgeListenState() != 2){
                if(nativeUrl){
                    wv.openPage(nativeUrl, openType);
                } else if(url){
                    wv.openWebPage(url, openType, title);
                }
            } else{
                if(oState.stateName){
                    $state.go(oState.stateName, $.extend({}, $stateParams, oState.stateParams));
                } else{
                    if(url.indexOf("/") == 0){
                        url = "#" + url;
                    }
                    location.href = url;
                }
            }
        });
    }


    //替代点击事件
    directiveModule.directive('tapHandler', [function() {
        return {
            restrict: "A",  //一共四种，分别是AECM
            link: function(scope, element, attr) {
                var startX = 0, startY = 0, isMove = false; 
                // element.on('mouseup', function(e) {
                //     alert("mouseup");
                //     doFn();
                // });

                var doFn = function(e){
                    scope.$apply(function() { 
                        scope.$event = e;
                        scope.$eval(attr["tapHandler"]); 
                    });
                }

                _bindTapHandler(element, doFn);
            }
        };
    }]);
    
    /**
     * 头像图片如果加载失败的话加载默认图片
     */
    directiveModule.directive('headErrSrc', [function() {
        return {
            restrict:"A",
            link: function (scope, element, attrs) {
                element.bind('error',function(){
                    if (attrs.src != attrs["headErrSrc"]) {
                        attrs.$set('src', attrs["headErrSrc"]);
                    }
                })
            }
        }
    }]);
    /**
     * ng-repeat渲染完成后执行回调
     * 指令的地方，必须标明callbacfn  回调函数名字
     */
    directiveModule.directive('onFinishRenderFilters', ["$timeout", function($timeout) {
        return {
            restrict:"A",
            scope: {callbackfn:'&'},
            link: function (scope, element, attrs) {
                if(scope.$parent.$last == true){
                    $timeout(function () {
                        scope.callbackfn();
                    });
                }
            }
        }
    }]);

    /**
     * 公有图片地址载入
     * @param  {[type]} ) {                       return {                restrict:"A",                link: function (scope, element, attrs) {                    element.bind('error',function(){                        if (attrs.src ! [description]
     * @return {[type]}   [description]
     */
    directiveModule.directive('btPic', ["$timeout", function($timeout) {        
        return {
            restrict:"AC",
            require: "ngModel",
            scope: {
                heightFixed: "@"   //是否宽度撑满高度适配
            },
            link: function ($scope, element, attrs, ngModel) {
                //是否需要尺寸重计算，如果父级是轮播图，就不要重新计算了
                var isNeedResize = element.parents("[img-scroll],.img-scroll").size() == 0;

                ngModel.$render = function(){
                    var sSrc = ngModel.$viewValue || "",
                        nSize = attrs.size,//显示的图片尺寸(100,300,700)
                        isHeightFixed = $scope.heightFixed != undefined || false //是否高度固定
                    ;

                    if(sSrc.toUpperCase().indexOf("/PUBLIC") === 0){
                        if(nSize){
                            var asSrc = sSrc.split(".");
                            asSrc[0] = asSrc[0] + "-" + nSize;
                            sSrc = asSrc.join(".");
                        }

                        sSrc = GConfig.PUBLIC_PIC_HOST + sSrc;
                    }

                    //居中已由图片滚动实现，这里不要重复执行
                    if(!isNeedResize){
                        element.attr("src", sSrc);
                        return;
                    }

                    //图片尺寸定位计算
                    function resizePic(){
                        if(element.attr("src") != sSrc){
                            element.css({
                                "opacity": "0"
                            });
                        }

                        var img = new Image();
                        img.src = sSrc;

                        if(img.complete) {// 如果图片已经存在于浏览器缓存，直接调用回调函数
                            $timeout(fnCallback, 0, false);
                            return; // 直接返回，不用再处理onload事件
                        }

                        img.onload = function(){
                            $timeout(fnCallback, 0, false);
                        }

                        function fnCallback(){                        
                            nMaxWidth = element.parent().innerWidth();
                            nMaxHeight = element.parent().innerHeight();

                            if(img.width > nMaxWidth || img.height > nMaxHeight){//宽度或者高度有超出的情况
                                if(img.width / img.height >= nMaxWidth / nMaxHeight){//宽高比例偏大
                                    if(img.height > nMaxHeight){
                                        img.width = img.width * (nMaxHeight / img.height);
                                        img.height = nMaxHeight;
                                    }
                                } else{//高宽比例偏大
                                    if(img.width > nMaxWidth || isHeightFixed){
                                        // console.log(nMaxHeight,element.parent().html());
                                        img.height = img.height * (nMaxWidth / img.width);
                                        img.width = nMaxWidth;
                                    }
                                }
                            }

                            element.css({
                                    display: "block",
                                    position: "relative",
                                    "transition": ".2s linear opacity",
                                    "webkitTransition": ".2s linear opacity",
                                    opacity: "1",
                                    maxWidth: "none",
                                    maxHeight: "none",
                                    width: img.width + "px",
                                    height: img.height + "px",
                                    left: ((nMaxWidth - img.width) / 2) + "px",
                                    top: ((nMaxHeight - img.height) / 2) + "px"
                                })
                                .attr("src", sSrc)
                                .parent().css("overflow", "hidden")
                            ;

                            img.onload = null;
                            img = null;
                        }
                    }

                    resizePic();
                    $(window).on("resize", resizePic);
                };
            }
        }
    }]);
    
    /**
     * 滚动盒子
     */
    directiveModule.directive('myScroll', ["$timeout", function($timeout) {
        var DEFAULT_CONFIG = {
                useTransition: false,
                topOffset: 0,
                hideScrollbar: true
                // ,
                // vScrollbar: false
            }
        ;
        return {
            restrict:"AC",
            scope: {
                loadMark: "=",              //必需，加载标示计数，用来识别加载结束事件（请动态加1）
                onScrolling: "&"            //滚动中事件
            },
            link: function ($scope, element, attrs) {
                $scope.loadMark = $scope.loadMark || 0;

                var jWrapper = element,
                    jScrollBody = jWrapper.find(">*:first").css("minHeight", "100%"),
                    jMainBody = jWrapper.find(">*:first")
                ;

                require(["iscroll"], function(iScroll){
                    var myScroll,
                        config = {
                        onScrolling: $scope.onScrolling,
                        // onScrolling: function(){console.log(5464);},
                        onRefresh: function () {
                            $scope.onRefresh && $scope.onRefresh();
                        },
                        onScrollMove: function () {
                            // var _this = this,
                            //     moveY = _this.y + config.topOffset
                            // ;
                        },
                        onScrollEnd: function () {
                            // var _this = this,
                            //     moveY = _this.y + config.topOffset
                            // ;
                            $scope.onScrolling && $scope.onScrolling();
                        }
                    };

                    /**
                     * 刷新
                     * @return {void}
                     */
                    function _refresh(){
                        $timeout(function(){
                            myScroll && myScroll.refresh();
                        }, 200);  
                    }

                    /**
                     * 初始化
                     */
                    function _init(){
                        myScroll = new iScroll(jWrapper.get(0), $.extend({}, DEFAULT_CONFIG, config));

                        $scope.$watch("loadMark", function(newData, oldData){     
                            if($scope.loadMark > 0){
                               _refresh();
                            }
                        }, true);
                    }

                    _init();
                });
            }
        }
    }]);
    

    /**
     * 滚动分页加载
     */
    directiveModule.directive('myScrollPager', ["$timeout", function($timeout) {
        var LOADING_TOP_HTML = 
                '<div id="pullDown" class="flip loading">'+
                    '<span class="pullDownIcon"></span><span class="pullDownLabel">加载中...</span>'+
                '</div>',
            LOADING_BOTTOM_HTML = 
                '<div id="pullUp" class="loading">'+
                    '<span class="pullUpIcon"></span><span class="pullUpLabel"></span>'+
                '</div>',
            DEFAULT_CONFIG = {
                useTransition: false,
                topOffset: 0,
                hideScrollbar: true
                // ,
                // vScrollbar: false
            }
        ;
        return {
            restrict:"AC",
            require: "ngModel", //当前分页
            scope: {
                isFixed: "@",               //容器是否固定的(非固定容器，暂时是不支持下拉刷新~~)
                getDataFn: "&",             //必需，数据初始化回调
                loadMark: "=",              //必需，加载标示计数，用来识别加载结束事件（请动态加1）
                canPullUp: "=",             //非必需，是否支持上拉加载更多
                canPullDown: "=",           //非必需，是否支持下拉刷新（默认支持）（非固定模式默认是可以下拉的）
                targetElement: "@",         //非必需，目标元素（用来存放上下加载拉节点的）
                pageCount: "=",             //必需，总页数
                onScrolling: "&",           //非必需，滚动中事件
                isValid: "=",             //非必需，是否无效，默认有效
                beginPage: "@"              //非必需，第一页是从几开始，默认0是第一页
            },
            link: function ($scope, element, attrs, ngModel) {
                ngModel.$render = function(){
                    $scope.getDataFn = $scope.getDataFn || function(){};
                    var sTargetElement = $scope.targetElement || ">*:first";

                    /**
                     * 分页类
                     */
                    function MyPager(){
                        this.beginPage = $scope.beginPage || 1 >> 0;//第一页开始页号
                        this.pageIndex = ngModel.$viewValue - this.beginPage + 1;//真实分页号（第一页为1）
                    }
                    MyPager.prototype = {
                        resetPage: function(){
                            var _this = this;

                            ngModel.$setViewValue(_this.beginPage);
                            this.pageIndex = ngModel.$viewValue - _this.beginPage + 1;
                            $scope.getDataFn && $scope.getDataFn();
                        },
                        getNextPage: function(){
                            var _this = this;
                            console.log("next");
                                // //防止第一页重复请求
                                // // console.log(myPager.pageIndex, myPager.beginPage);
                                // if($scope.isValid && myPager.pageIndex == myPager.beginPage){
                                //     // return;
                                // }
                            ngModel.$setViewValue(ngModel.$viewValue + 1);
                            this.pageIndex = ngModel.$viewValue - _this.beginPage + 1;
                            $scope.getDataFn && $scope.getDataFn();
                        }
                    };
                    var myPager = new MyPager();

                    // $scope.loadMark = $scope.loadMark || 0;

                    var jWrapper = element,
                        jScrollBody = jWrapper.find(">*:first").css("minHeight", "100%"),
                        jMainBody = jWrapper.find(sTargetElement),
                        isFixed = $scope.isFixed || true,
                        sTopHtml = LOADING_TOP_HTML,
                        sBottomHtml = LOADING_BOTTOM_HTML,
                        jTop,
                        jBottom,
                        isLoading = false,
                        hasNextPage = false
                    ;

                    if(!isFixed || isFixed == "false"){//先用简单jquery实现不用iscroll
                        function _bindScrollHandler(){
                            //滚动加载更多
                            function fnScrollHandler(e){                      
                                if(jBottom == null || $scope.isValid === false){
                                    return;
                                }
                                var jPullUpIcon = jBottom.find(".pullUpIcon"),
                                    hasMore = $scope.pageCount > myPager.pageIndex,
                                    isInView
                                ;

                                isInView = jPullUpIcon.offset().top - $(window).scrollTop() < $(window).height() + 20;
                                if(isInView && hasMore && !isLoading){    
                                    isLoading = true;
                                    myPager.getNextPage();
                                }
                            }

                            // fnScrollHandler();

                            $(window).on("scroll", fnScrollHandler);
                        }

                        $scope.$watch("loadMark", function(newData, oldData){   
                            if(oldData && !newData){//从加载中变成加载完成
                                hasNextPage = false;
                                isLoading = false;

                                if($scope.canPullUp !== false){
                                    //底部的判断
                                    if($scope.pageCount === 0){//无数据
                                        jBottom && jBottom.remove();
                                    } else{//有数据
                                        if(!jBottom){
                                            jBottom = $(sBottomHtml).appendTo(jMainBody);
                                            _bindScrollHandler();
                                        }

                                        if(myPager.pageIndex >= $scope.pageCount){//已经到底
                                            jBottom.find(".pullUpIcon").hide().end().find(".pullUpLabel").html("没有更多了..");
                                        } else{
                                            jBottom.find(".pullUpIcon").show().end().find(".pullUpLabel").html("");
                                            hasNextPage = true;
                                        }
                                    }
                                }
                            } else{
                                jBottom && jBottom.remove();
                                jBottom = null;
                            }
                        }, true);

                        if($scope.isValid !== false){
                            $scope.getDataFn && $scope.getDataFn();
                        }
                    } else{
                        require(["iscroll"], function(iScroll){
                            var myScroll,
                                config = {
                                onScrolling: $scope.onScrolling,
                                // onScrolling: function(){console.log(5464);},
                                onRefresh: function () {
                                    if (jTop && jTop.is('.loading')) {
                                        jTop.removeClass("flip").removeClass("loading").find(".pullDownLabel").html("下拉刷新");
                                    } else if(jBottom){
                                         jBottom.removeClass("flip");
                                    }
                                    $scope.onRefresh && $scope.onRefresh();
                                },
                                onScrollMove: function () {
                                    var _this = this,
                                        moveY = _this.y + config.topOffset
                                    ;
                                    if(isLoading){
                                        return;
                                    }

                                    if (jTop && moveY > 5 && !jTop.is('.flip')) {
                                        jTop.addClass("flip").find(".pullDownLabel").html("释放刷新");
                                        this.minScrollY = 0;                                        
                                    } else if(jBottom && hasNextPage && moveY < 0 && !jBottom.is(".flip")){                 
                                        if (moveY < this.maxScrollY + config.topOffset + jBottom.outerHeight()) {
                                            this.maxScrollY = config.topOffset;
                                            jBottom.addClass("flip");
                                        }
                                    }
                                },
                                onScrollEnd: function () {
                                    var _this = this,
                                        moveY = _this.y + config.topOffset
                                    ;
                                    if(isLoading){
                                        return;
                                    } 
                                    $scope.onScrolling && $scope.onScrolling();  
                                    
                                    if (jTop && jTop.is('.flip')) {
                                        isLoading = true;
                                        jTop.addClass("loading").find('.pullDownLabel').html("加载中...");

                                        myPager.resetPage();
                                    } else if(jBottom && hasNextPage){
                                        if ((moveY < 0 && moveY < this.maxScrollY + config.topOffset + jBottom.outerHeight()) || jBottom.is(".flip")) {
                                            isLoading = true;
                                            jBottom.addClass("loading");//.find('.text').html("加载中"); 

                                            myPager.getNextPage();
                                        }
                                    }
                                }
                            };

                            /**
                             * 刷新
                             * @return {void}
                             */
                            function _refresh(){
                                $timeout(function(){
                                    isLoading = false;
                                    myScroll && myScroll.refresh();
                                }, 200);  
                            }

                            /**
                             * 销毁
                             * @return {[type]} [description]
                             */
                            function _destroy(){
                                // console.log("destory");
                                jTop && jTop.remove();
                                jBottom && jBottom.remove();
                                jTop = null;
                                jBottom = null;
                                myScroll && myScroll.destroy();
                            }

                            /**
                             * 初始化
                             */
                            function _init(){
                                if(jWrapper.is("ul")){
                                    sTopHtml = sTopHtml.replace(/div/ig, "li");
                                    sBottomHtml = sBottomHtml.replace(/div/ig, "li");
                                }

                                if($scope.canPullDown !== false){
                                    jTop = $(sTopHtml).prependTo(jScrollBody);

                                    config.topOffset = jTop.outerHeight();
                                }

                                myScroll = new iScroll(jWrapper.get(0), $.extend({}, DEFAULT_CONFIG, config));
                                
                                $scope.getDataFn && $scope.getDataFn();

                                $scope.$watch("loadMark", function(newData, oldData){     
                                    if(oldData && !newData){//从加载中变成加载完成
                                        hasNextPage = false;
                                
                                        if($scope.canPullUp !== false){
                                            //底部的判断
                                            if($scope.pageCount === 0){//无数据
                                                jBottom && jBottom.remove();
                                                // _destroy();
                                            } else{//有数据
                                                if(!jBottom){
                                                    jBottom = $(sBottomHtml).appendTo(jMainBody);
                                                }

                                                if(myPager.pageIndex >= $scope.pageCount){//已经到底
                                                    jBottom.find(".pullUpIcon").hide().end().find(".pullUpLabel").html("没有更多了..");
                                                } else{
                                                    jBottom.find(".pullUpIcon").show().end().find(".pullUpLabel").html("");
                                                    hasNextPage = true;
                                                }
                                            }
                                        }
                                    } else{
                                        jBottom && jBottom.remove();
                                        jBottom = null;
                                    }

                                   _refresh();
                                }, true);
                            }

                            _init();
                        });
                    }
                };
            }
        }
    }]);

    /**
     * 轮播图指令
     */
    directiveModule.directive('imgScroll', ["$timeout", function($timeout) {
        return {
            restrict:"AC",
            scope: {
                isInit: "=",    //是否已初始化，如果不设置这个值，默认初始化
                flexable: "@",    //是否弹性适配高度
                index: "=",         //当前播放索引（0开始）
                fixedWidth: "@",    //固定宽度
                fixedHeight: "@",   //固定高度，以375的宽度为基准，会因屏幕宽度调整而适配
                loop: "@",          //是否循环滚动
                auto: "@",          //是否自动播放
                preview: "@",       //是否可预览
                onSwitch: "&",      //切换回调
                isScale: "@",       //是否缩放切换
                onResize: "&"       //窗口大小改变触发回调
            },
            priority: 2,
            link: function ($scope, element, attrs) {
                require(["imgScroll"], function(ImgScroll){
                    function fnOnSwitch(index){
                        $timeout(function(){
                            $scope.index = index;
                            $scope.onSwitch && $scope.onSwitch();
                        }, 0);
                    }

                    var oConfig = {
                        slideWrapper: $(element),
                        isFlexable: $scope.flexable != undefined ? true : false,
                        fixedWidth: $scope.fixedWidth || 0,//$(element).parent().width() || 0,
                        fixedHeight: $scope.fixedHeight || 0,
                        isLoop: $scope.loop != undefined ? $scope.loop : true,
                        isAuto: $scope.auto != undefined ? $scope.auto : true,
                        isScale: $scope.isScale != undefined ? $scope.isScale : false,
                        canPreview: $scope.preview != undefined ? true : false,
                        showIndex: $scope.index != undefined ? $scope.index : 0,
                        changeCallback: fnOnSwitch,
                        onResize: $scope.onResize || null
                    };

                    $timeout(function(){
                        var imgScroll = new ImgScroll(oConfig);

                        if(element.is('[is-init]') && $scope.isInit != true){
                            var watch = $scope.$watch("isInit", function(newData, oldData){
                                if(newData == true){
                                    imgScroll.init();
                                    watch();
                                };
                            }); 
                        } else{
                            imgScroll.init();
                        }
                    }, 0, false);
                });
            }
        }
    }]);

    /**
     * 图片预览
     */
    directiveModule.directive('picPreview', ["$timeout", function($timeout) {
        return {
            restrict:"A",
            scope: {
                targets: "@"
            },
            link: function ($scope, element, attrs) {
                require(["photoSwipe"], function(PhotoSwipe){
                    var targets = $scope.targets || "img";
                    element.find(targets).on("click", function(){
                        new PhotoSwipe({
                            targetImgs : element.find("img"),
                            currentIndex: $(this).index()
                        });
                    });
                });
            }
        };
    }]);

    /**
     * 图片预览
     */
    directiveModule.directive('btLazyload', ["$timeout", function($timeout) {
        return {
            restrict:"A",
            scope: {
                btLazyload: "&"
            },
            link: function ($scope, element, attrs) {
                require(["lazyload"], function(){
                    $(element).lazyload({
                        lazyFn: $scope.btLazyload
                    });
                });
            }
        };
    }]);
    

    // /**
    //  * 图片上传指令
    //  */
    // directiveModule.directive('fileUpload', ["$timeout", function($timeout) {
    //     /**
    //      * 根据图片地址得到base64编码
    //      * @param  {String}   url          图片地址
    //      * @param  {Function} callback     回调函数
    //      * @return {void}
    //      */
    //     function _convertImgToBase64(url, callback){ 
    //         var DEFAULT_CONFIG = {
    //                 maxWidth: 800,
    //                 maxHeight: 800,
    //                 quality: 16
    //             },
    //             config
    //         ;
    //         if(typeof(url) === "object"){//url, callback, maxWidth, maxHeight, quality
    //             config = url;
    //         } else{
    //             config = {
    //                 url: url,
    //                 callback: callback
    //             }
    //         }
    //         config = $.extend({}, DEFAULT_CONFIG, config);

    //         var dataURL,
    //             img = new Image(),
    //             nMaxWidth = config.maxWidth,    //等比压缩最大宽度
    //             nMaxHeight = config.maxHeight    //等比压缩最大高度
    //         ;
    //         // img.width = 100;
    //         // img.height=100;

    //         //                                 alert( config.url);
    //         // img.crossOrigin = 'Anonymous'; 
    //         img.onload = function(){ 
    //             var nCanvasWidth = img.width,
    //                 nCanvasHeight = img.height
    //             ;
    //             //尺寸控制
    //             if(img.width > nMaxWidth || img.height > nMaxHeight){//宽度或者高度有超出的情况
    //                 if(img.width / img.height >= nMaxWidth / nMaxHeight){//宽高比例偏大
    //                     nCanvasHeight = img.height * (nMaxWidth / img.width);
    //                     nCanvasWidth = nMaxWidth;
    //                 } else{//高宽比例偏大
    //                     nCanvasWidth = img.width * (nMaxHeight / img.height);
    //                     nCanvasHeight = nMaxHeight;
    //                 }
    //             }

    //             var canvas = document.createElement('canvas'),
    //                 ctx = canvas.getContext('2d')
    //             ;
                
    //             canvas.width = nCanvasWidth; 
    //             canvas.height = nCanvasHeight; 
    //             ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, nCanvasWidth, nCanvasHeight);

    //             dataURL = canvas.toDataURL('image/jpeg', config.quality); 

    //             config.callback.call(this, dataURL); 
    //             // Clean up 
    //             canvas = null; 
    //             img.onload = null;
    //             img = null;
    //         }; 

    //         img.onerror = function(ex){
    //             // var str = "{";
    //             // for(var i in ex){
    //             //     str += i + ":" + ex[i] + ", ";
    //             // }
    //             // str += "}";
    //             // alert(str);
    //             new Say("无法访问到该图片");
    //         }
    //         img.src = config.url; 
    //     }
    //     return {
    //         restrict:"AC",
    //         require: "ngModel",
    //         scope: {
    //             limit: "@"         //限制最多选多少条
    //         },
    //         template: 
    //             '<a class="pic-item" ng-repeat="src in uploadImgs track by $index" href="javascript:void(0);">' +
    //                 '<span><img class="bt-pic" ng-model="src" ng-click="previewPic($index)"/></span><i class="iconfont icon-shanchu ks-cPrimary" ng-click="del($index)"></i>' +
    //             '</a>' +
    //             '<a ng-if="showAdd" class="add iconfont icon-addn" href="javascript:void(0);">' +
    //                 '<input type="file" accept="image/*" ng-if="!isMultiple" />' +
    //                 '<input type="file" accept="image/*" ng-if="isMultiple" multiple />' +
    //             '</a>',
    //         link: function ($scope, element, attrs, ngModel) {
    //             var limit = $scope.limit || 1;
    //             ngModel.$render = function(){
    //                 $scope.uploadImgs = ngModel.$viewValue;
    //                 $scope.isMultiple = limit > 1;
    //                 $scope.showAdd = true;
    //                 var nPrevLength, nChosedLength;

    //                 //是否上传完毕
    //                 function getIsEnd(){
    //                     if($scope.uploadImgs.length >= limit || $scope.uploadImgs.length - nPrevLength == nChosedLength){
    //                         Loading.hide();
    //                     }
    //                     $scope.showAdd = false;
    //                     $timeout(function(){
    //                         $scope.showAdd = $scope.uploadImgs.length < limit;
    //                         if($scope.showAdd){
    //                             bindChangeHandler();
    //                         }
    //                     }, 0);
    //                 }

    //                 //选择图片事件处理函数
    //                 function bindChangeHandler(){
    //                     $timeout(function(){
    //                         var jInput = element.find("input[type=file]");

    //                         jInput.off().on("change", function(e){
    //                             var aFiles = e.target.files;
    //                             nPrevLength = $scope.uploadImgs.length;
    //                             nChosedLength = e.target.files.length;

    //                             Loading.show();
    //                             for (var i = 0, file; file = aFiles[i]; i++) {
    //                                 if($scope.uploadImgs.length >= limit || limit - nPrevLength < i + 1){
    //                                     break;
    //                                 }
    //                                 if (!file.type.match('image.*')) {
    //                                     continue;
    //                                 }
    //                                 var reader = new FileReader();
    //                                 reader.onload = function(e) {
    //                                     _convertImgToBase64(e.target.result, function(base64Str){
    //                                         if(base64Str){
    //                                             $timeout(function(){
    //                                                 if($scope.uploadImgs.length < limit){
    //                                                     $scope.uploadImgs.push(base64Str);
    //                                                 }
    //                                                 getIsEnd();
    //                                             }, 0);
    //                                         }
    //                                     });
    //                                 };

    //                                 reader.readAsDataURL(file);
    //                             }
    //                             getIsEnd();
    //                         });
    //                     }, 10);                                
    //                 }

    //                 bindChangeHandler();

    //                 //删除
    //                 $scope.del = function(index){
    //                     $scope.uploadImgs.splice(index, 1);
    //                     getIsEnd();
    //                 };

    //                 $scope.previewPic = function(index){
    //                     require(["photoSwipe"], function(PhotoSwipe){
    //                         new PhotoSwipe({
    //                             targetImgs : element.find(".bt-pic"),
    //                             currentIndex: index
    //                         });
    //                     });
    //                 };
    //             };
    //         }
    //     }
    // }]);


    // /**
    //  * 
    //  */
    // directiveModule.directive('btSelect', ["$timeout", function($timeout) {    
    //     return {
    //         restrict:"AC",
    //         require: "ngModel",
    //         scope: {
    //         },
    //         link: function ($scope, element, attrs, ngModel) {
    //             ngModel.$render = function(){
    //                 alert(43423);
    //                 var sSrc = ngModel.$viewValue;
    //             };
    //         }
    //     }
    // }]);
    return directiveModule;
});