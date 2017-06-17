/**
 * 图片上传指令
 *
 * @author dongxiaochai@163.com
 * @since 2016-08-04
 */
define(['angular','directiveModule'],function(angular, app){
    app.directive('fileUpload', ["$timeout", "uploadService", function($timeout, uploadService) {
        /**
         * 根据图片地址得到base64编码
         * @param  {String}   url          图片地址
         * @param  {Function} callback     回调函数
         * @return {void}
         */
        function _convertImgToBase64(url, callback){ 
            var DEFAULT_CONFIG = {
                    maxWidth: 800,
                    maxHeight: 800,
                    quality: 1//16
                },
                config
            ;
            if(typeof(url) === "object"){//url, callback, maxWidth, maxHeight, quality
                config = url;
            } else{
                config = {
                    url: url,
                    callback: callback
                }
            }
            config = $.extend({}, DEFAULT_CONFIG, config);

            var dataURL,
                img = new Image(),
                nMaxWidth = config.maxWidth,    //等比压缩最大宽度
                nMaxHeight = config.maxHeight    //等比压缩最大高度
            ;
            // img.width = 100;
            // img.height=100;

            //                                 alert( config.url);
            // img.crossOrigin = 'Anonymous'; 
            img.onload = function(){ 
                var nCanvasWidth = img.width,
                    nCanvasHeight = img.height
                ;
                //尺寸控制
                if(img.width > nMaxWidth || img.height > nMaxHeight){//宽度或者高度有超出的情况
                    if(img.width / img.height >= nMaxWidth / nMaxHeight){//宽高比例偏大
                        nCanvasHeight = img.height * (nMaxWidth / img.width);
                        nCanvasWidth = nMaxWidth;
                    } else{//高宽比例偏大
                        nCanvasWidth = img.width * (nMaxHeight / img.height);
                        nCanvasHeight = nMaxHeight;
                    }
                }

                var canvas = document.createElement('canvas'),
                    ctx = canvas.getContext('2d')
                ;
                
                canvas.width = nCanvasWidth; 
                canvas.height = nCanvasHeight; 
                ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, nCanvasWidth, nCanvasHeight);

                dataURL = canvas.toDataURL('image/jpeg', config.quality); 

                config.callback.call(this, dataURL); 
                // Clean up 
                canvas = null; 
                img.onload = null;
                img = null;
            }; 

            img.onerror = function(ex){
                // var str = "{";
                // for(var i in ex){
                //     str += i + ":" + ex[i] + ", ";
                // }
                // str += "}";
                // alert(str);
                new Say("无法访问到该图片");
            }
            img.src = config.url; 
        }
        return {
            restrict:"AC",
            require: "ngModel",
            scope: {
                limit: "@"         //限制最多选多少条
            },
            template: 
                '<a class="pic-item" ng-class="{true: \'single\'}[limit<=1]" ng-repeat="src in uploadImgs track by $index" href="javascript:void(0);">' +
                    '<input type="file" ng-if="limit==1" accept="image/*" ng-if="!isMultiple" />' +
                    '<span><img class="bt-pic" ng-model="src" ng-click="previewPic($index)"/></span><i class="iconfont icon-shanchu ks-cPrimary" ng-click="del($index)"></i>' +
                '</a>' +
                '<a ng-if="showAdd" class="add iconfont icon-addn" href="javascript:void(0);">' +
                    '<input type="file" accept="image/*" ng-if="!isMultiple" />' +
                    '<input type="file" accept="image/*" ng-if="isMultiple" multiple />' +
                '</a>',
            link: function ($scope, element, attrs, ngModel) {
                var limit = $scope.limit || 1;
                ngModel.$render = function(){
                    $scope.uploadImgs = [];
                    if(limit == 1){
                        if(ngModel.$viewValue != undefined){
                            $scope.uploadImgs = [ngModel.$viewValue];
                        }
                    } else if(ngModel.$viewValue.length){
                        $scope.uploadImgs = ngModel.$viewValue;
                    }
                    $scope.isMultiple = false;//是否可选择多张//limit > 1;
                    $scope.showAdd = $scope.uploadImgs.length < limit;//是否显示添加图片按钮
                    var nPrevLength, nChosedLength,
                        isSingle = limit == 1 //是否单张图
                    ;

                    //是否上传完毕
                    function getIsEnd(){
                        Loading.hide();
                        if($scope.uploadImgs.length >= limit || $scope.uploadImgs.length - nPrevLength == nChosedLength){
                            $(".loading-overlay").remove();//手动移除一下
                        }
                        $scope.showAdd = false;
                        $timeout(function(){
                            $scope.showAdd = $scope.uploadImgs.length < limit;
                            if($scope.showAdd){
                                bindChangeHandler();
                            }
                        }, 0);

                        //设置model值
                        if(isSingle){
                            if($scope.uploadImgs.length){
                                ngModel.$setViewValue($scope.uploadImgs[0]);
                            } else{
                                ngModel.$setViewValue(null);
                            }
                        } else{
                            ngModel.$setViewValue($scope.uploadImgs);
                        }
                    }

                    //选择图片事件处理函数
                    function bindChangeHandler(){
                        $timeout(function(){
                            var jInput = element.find("input[type=file]");

                            jInput.off().on("change", function(e){
                                var aFiles = e.target.files;
                                nPrevLength = $scope.uploadImgs.length;
                                nChosedLength = e.target.files.length;

                                Loading.show();
                                for (var i = 0, file; file = aFiles[i]; i++) {
                                    if(!isSingle){//多文件
                                        if($scope.uploadImgs.length >= limit || limit - nPrevLength < i + 1){
                                            break;
                                        }
                                    }

                                    if (!file.type.match('image.*')) {
                                        continue;
                                    }
                                    var fileName = file.name;
                                    var reader = new FileReader();
                                    reader.onload = function(e) {
                                        _convertImgToBase64(e.target.result, function(base64Str){
                                            if(base64Str){
                                                $timeout(function(){
                                                    if(isSingle || $scope.uploadImgs.length < limit){
                                                        uploadService.upload(base64Str, fileName).then(function(data){
                                                            if(data && data.datas && data.datas.url){
                                                                if(isSingle){
                                                                    $scope.uploadImgs[0] = data.datas.url;
                                                                } else{
                                                                    $scope.uploadImgs.push(data.datas.url);    
                                                                }
                                                                
                                                                getIsEnd();
                                                            } else{
                                                                getIsEnd();
                                                            }
                                                        }, function(){
                                                            getIsEnd();
                                                        });
                                                    } else{
                                                        getIsEnd();
                                                    }                                                    
                                                }, 0);
                                            }
                                        });
                                    };

                                    reader.readAsDataURL(file);
                                }
                                getIsEnd();
                            });
                        }, 10);                                
                    }

                    bindChangeHandler();

                    //删除
                    $scope.del = function(index){
                        $scope.uploadImgs.splice(index, 1);
                        getIsEnd();
                    };

                    $scope.previewPic = function(index){
                        require(["photoSwipe"], function(PhotoSwipe){
                            new PhotoSwipe({
                                targetImgs : element.find(".bt-pic"),
                                currentIndex: index
                            });
                        });
                    };
                };
            }
        }
    }]);
});
