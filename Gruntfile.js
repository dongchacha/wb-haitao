'use strict';

module.exports = function (grunt) {
    /**
     * 配置grunt
     * @return {void}
     */
    function initConfig(buildType){
        var pkg = grunt.file.readJSON('package.json'),
            orignPath = pkg.orignPath,    //原目录
            buildPath = pkg.outPath,      //目标目录
            bIsRelease = buildType === "release"
        ;

        //-------得到当前日期------
        var d = new Date(),
            sDate = ""
        ;
        sDate += d.getFullYear();
        sDate += getFormatInt(d.getMonth()+1);
        sDate += getFormatInt(d.getDate());
        sDate += getFormatInt(d.getHours());
        sDate += getFormatInt(d.getMinutes());
        // sDate += getFormatInt(d.getSeconds());

        function getFormatInt(str){
            str = str.toString();
            if(str.length < 2){
                str = "0" + str;
            }
            return str;
        }
        //-------得到当前日期 END------


        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            /**
             * 自动生成css3前缀写法
             */
            autoprefixer : {
                dist : {
                    files: [{
                        expand: true,
                        cwd: buildPath,
                        src: '**/*.css',
                        dest: buildPath
                    }]
                }
            },
            /**
             * 复制文件或目录
             */
            copy:{
                my_target: {
                    files: [{
                        expand: true,
                        cwd: orignPath,
                        src: '**',
                        dest: buildPath,
                        filter: function(fileName){  //过滤不需要的文件或文件夹                          
                            var bIsCopy = true,
                                asFilterList = [
                                    "/test",
                                    "/demo",
                                    "/aspnet_client",
                                    ".psd",
                                    "desktop.ini",
                                    "thumbs.db",
                                    ".map",
                                    ".less",
                                    ".zip",
                                    "web.config",
                                    "/node_modules",
                                    "npm-debug.log",
                                    "package.json",
                                    "sftp-config.json"
                                    // ,
                                    // "/json(/|$)"
                                ]
                            ;
                            // if(bIsRelease){
                                // asFilterList.push("/json(/|$)");
                            // }

                            fileName = fileName.replace(/\\/g,'/');
                            for(var i = 0; i < asFilterList.length; i++){                                
                                if(new RegExp(asFilterList[i]).test(fileName.toLowerCase())){
                                    // console.log("'" + fileName + "' not copy");
                                    bIsCopy = false;
                                }
                            }
                            return bIsCopy;
                        }
                    }]
                }
            },
            /**
             * 删除文件或目录
             */
            clean: {
                my_target: {
                    src: [buildPath]
                    // src: ['<%=pkg.buildPath%>**/*.txt']
                }
            },
            
            // //压缩文件或目录为zip
            // compress: {
            //     my_target: {
            //         options: {
            //             archive: 'archive.zip'
            //         },
            //         files: [
            //             {src: ['path/*'], dest: 'internal_folder/', filter: 'isFile'}, path下所有的js
            //             {src: ['path/**'], dest: 'internal_folder2/'}, // path下的所有目录和文件
            //         ]
            //     }
            // },

            /**
             * 生成sourcemap文件
             */
            // 'jsmin-sourcemap': {
            //   all: {
            //     src: ['web/app-carseller/js/global.min.js'],
            //     dest: 'web/app-carseller/js/global.jsmin.js',
            //     destMap: 'web/app-carseller/js/global.min.js.map'
            //   }
            // },
            
            // /**
            //  * 创建文件变化监听
            //  */
            // watch : {
            //   styles : {
            //     files : ['css/style.css' ],
            //     tasks : ['autoprefixer' ]
            //   }
            // },
            
            // /**
            //  * 合并文件
            //  */
            // concat: {
            //   options:{
            //     separator:'\n\n\n/************ 我是用来分割文件的 ************/\n\n\n',
            //     banner: '/** \n * 这是合并后的文件 \n *\n * @author dongxiaochai@163.com\n * @since <%=new Date()%> \n */\n\n',
            //     process: function(src, filepath){
            //          return '// Source: ' + filepath + '\n' +
            //              src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
            //     },
            //     footer: '/* this is the footer */'
            //   },
            //   dist:{
            //     src: ['js/node1.js','js/helloworld.js'],
            //     dest: 'build/js/merge.min.js'
            //   }
            // },
            
            /**
             * 用于javascript代码检查（并会给出建议）
             */
            jshint: {
                options: {
                    //浏览器下执行
                    browser: true,
                    //大括号包裹
                    curly: false,
                    //对于简单类型，使用===和!==，而不是==和!=
                    eqeqeq: false,
                    //对于首字母大写的函数（声明的类），强制使用new
                    newcap: false,
                    //禁用arguments.caller和arguments.callee
                    noarg: false,
                    //对于属性使用aaa.bbb而不是aaa['bbb']
                    sub: false,
                    //查找所有未定义变量
                    undef: true,
                    //查找类似与if(a = 0)这样的代码
                    boss: false,
                    devel:true,
                    //指定运行环境为node.js
                    node: false,
                    globals: {
                        jQuery: true,
                        console: true,
                        module: true
                    }
                },
                files: [buildPath +'**js/**.js']
            },
            /**
             * 替换内容
             */
            'string-replace':{
                my_target: {
                    files: [{
                        expand: true,
                        cwd: buildPath,
                        src: ['**/*.html', '**/config.min.js'],
                        dest: buildPath
                    }],
                    options: {
                        replacements: [{
                            pattern: /<script.*?target-script-min\.js.*?<\/script>/ig,
                            replacement: ''
                        }
                        ,{
                            pattern: /192\.168\.100\.117\:8099/ig,//本地引用的路径全部替换成线上的
                            replacement: 'static.btjf.com'
                        }
                        ,{
                            pattern: /bust=[0-9a-zA-Z]+/ig,//请求时间戳
                            replacement: 'bust=' + sDate
                        }
                        ,{
                            pattern: /tag:([^,]*?),?\/\/版本号/ig,//请求时间戳
                            replacement: function(match, $1){
                                return match.replace($1, sDate);
                            }
                        },{
                            pattern: /isTest\: *true/g,//是否测试的配置
                            replacement: 'isTest: ' + false

                        }
                        ]
                    }
                }
            },
            /**
             * 单元测试
             * @type {Object}
             */
            // qunit:{
            //     all: ['**/*.html']
            // },

            /**
             * 压缩js文件夹
             */
            uglify: {
                // options: {
                //     banner: '/*! <%=pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */'
                // },
                // build: {
                //   src: 'js/<%=pkg.jsName %>.js',
                //   dest: 'dest/<%=pkg.file %>.min.js'
                // },
                my_target: {//压缩整个文件夹的js
                    files: [{
                        expand: true,
                        cwd: buildPath,
                        src: '**/lib/*.js ',
                        dest: buildPath
                    }, {
                        expand: true,
                        cwd: buildPath,
                        src: '**/lib/overlay/*.js',
                        dest: buildPath
                    }, {
                        expand: true,
                        cwd: buildPath,
                        src: '**/app.js',
                        dest: buildPath
                    }, {
                        expand: true,
                        cwd: buildPath,
                        src: '**/directives/*',
                        dest: buildPath
                    }]
                }
            },

            /**
             * 压缩css文件
             */
            cssmin:{
                // options: {
                //     banner: '/*! <%=pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */'
                // },
                my_target: {//压缩整个文件夹的css
                    files: [{
                        expand: true,
                        cwd: buildPath,
                        src: '**/*.css',
                        dest: buildPath
                    }]
                }
            },
            /**
             * postcss
             */
            postcss: {
                options: {
                    processors: [
                        require('autoprefixer')({browsers: ['last 2 version']}),    //处理浏览器私有前缀
                        // require('cssnext')(),                                       //使用CSS未来的语法(不要用)
                        require('precss')()                                         //像Sass的函数
                    ]
                },
                my_target: {//压缩整个文件夹的css,
                    files: [{
                        expand: true,
                        cwd: buildPath,
                        src: '**/*.css',
                        dest: buildPath
                    }]
                }
            },

            /**
             * 压缩图片大小
             */
            imagemin: {
                dist: {
                    options: {
                        optimizationLevel: 3 //定义 PNG 图片优化水平
                    },
                    files: [{
                        expand: true,
                        cwd: buildPath,
                        src: ['**/*.{png,jpg,jpeg,gif,webp}'],
                        dest: buildPath, //优化后的图片保存位置，覆盖旧图片，并且不作提示
                        filter: function(fileName){
                            return fileName.indexOf("\\test\\") === -1;
                        }
                    }]
                }
            },

            /**
             * requirejs打包
             */
            requirejs:{
                build: {
                    options: {
                        appDir: 'assets_branchs/ak/app-carseller(2_4_0)',//应用程序的目录，在这个文件夹下的所有文件将被复制到dir参数标注的文件夹下
                        baseUrl: 'js',//相对于appDir，代表查找文件的锚点
                        dir: 'assets_branchs/ak/app-carseller_build',//输出目录，所有应用程序文件将会被复制到该文件夹下
                        paths: {   //模块的相对目录
                            // "jquery" : "empty:",//"../../../jquery/1.8.3/jquery.min",
                            "jquery": "../lib/jquery.min",
                            "global": "../js/global.min",
                            "angular" : "../lib/angular-1.4.7/angular.min",
                            "angular-route" : "../lib/angular-1.4.7/angular-route.min",
                            "angular-animate" : "../lib/angular-1.4.7/angular-animate.min",
                            "angular-myScroll": "../lib/angular-myScroll.min",
                            "text" : "../lib/require/text.min", 
                            "util" : "../lib/util.min",
                            "loading" : "../lib/overlay/loading.min",
                            "iscroll": "../lib/iscroll/iscroll",
                            "myScroll": "../lib/myScroll.min",
                            "say" : "../lib/overlay/say.min",
                            "confirm" : "../lib/overlay/confirm.min",
                            "overlayBase" : "../lib/overlay/base.min",
                            "tip" : "../lib/overlay/tip.min",
                            "webViewBridge": "../js/webViewBridge.min",
                            "dataBase": "../js/dataBase.min",
                            "hammer": "../lib/hammer.min",
                            "serviceModule": "services/serviceModule"
                        },
                        modules: //一个包含多个对象的数组。每个对象代表一个将被优化的模块
                        [
                            {
                                name: 'app'
                            }
                        ],
                        optimizeCss:"standard",//RequireJS Optimizer会自动优化应用程序下的css文件。这个参数控制css最优化设置。允许的值："none"，"standard","standard.keepLines","standard.keepComments","standard.keepComments.keepLines"
                        removeCombined: false, //如果为true，optimizer将从输出目录中删除已合并的文件
                        shim:{}//为那些没有使用define声明依赖关系及设置模块值的模块，配置依赖关系与“浏览器全局”出口的脚本
                    }
                }
            }
        });
    }

    // 加载插件
    // grunt.loadNpmTasks('grunt-jsmin-sourcemap');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    // grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');


    //开发调试版本，用于后台项目的调试，js代码不需要压缩
    grunt.registerTask('debug', "开发调试版本，js不压缩", function(){
        initConfig("debug");
        var tasks = [
            'clean',
            'copy',
            'autoprefixer',   
            'string-replace', 
            'cssmin',  
            // 'jshint',   
            // 'uglify',
            'imagemin'
        ];

        grunt.task.run(tasks);
    });
    
    // 生成正式发布版本
    grunt.registerTask('default', "正式发布版本", function(){
        initConfig("release");
        var tasks = [
            'clean',
            'copy',
            'autoprefixer',   
            'string-replace', 
            'cssmin',   
            'jshint',   
            'uglify',
            'imagemin'
        ];


        grunt.task.run(tasks);
    });
}