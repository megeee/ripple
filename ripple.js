;!(function(win,doc){  
    "use strict";

    if (typeof Ripple === "undefined" || !Ripple) {

        var Ripple = function(option){
            //缺省配置
            var config = {
                opacity : 0.5, //水波纹透明度
                speed : 0.6,   //水波纹扩散速度
                bgColor : "#ffffff",  //水波纹颜色
                cursor : true       //是否显示手型指针
            }
            //扩展配置
            this.option = this.extend(option,config);
            //小于ie9版本不给运行
            if(!this.isltIE9())  this.init();

        };
    }

    Ripple.prototype = {

        //创建标签
        createEle : function(tag){
            return doc.createElement(tag);
        },

        //扩展配置
        extend : function(obj,config){
            var newobj = JSON.parse(JSON.stringify(config));
            for(var i in obj){
              newobj[i] = obj[i];
            }
            return newobj;
        }, 
        //判断是否ie9及以下版本
        isltIE9 : function(){
            var iev = navigator.userAgent.split(";")[1].replace(/[ ]/g,"");
            if(/MSIE6.0|MSIE7.0|MSIE8.0|MSIE9.0/i.test(iev)){
                return true
            } else {
                return false
            }       
        },

        //获取当前点对象的位置等信息
        getPosition : function(e) {
            var pos = this.getBoundingClientRect()
            , range = Math.max(pos.width, pos.height);
            return {
                range: range,
                x: e.clientX - pos.left - range / 2,
                y: e.clientY - pos.top - range / 2                
            }
        },
        //载入样式
        loadCss : function(){
            //获取当前脚本的路径
            var jss = doc.scripts
            , jsPath = jss[jss.length - 1].src
            , path = jsPath.substring(0, jsPath.lastIndexOf("/") + 1);
            //载入CSS
            doc.head.appendChild(function(){
                var link = doc.createElement('link');
                link.href = path + 'need/ripple.css';
                link.type = 'text/css';
                link.rel = 'styleSheet'
                link.id = 'ripplecss';
                return link;
            }());
        },
        //添加事件
        addEvent : function(){

            var _this =  this;
            //添加事件
            for(var i = 0; i < this.elements.length; i++){

                if(typeof _this.option.cursor === "boolean"){
                    if(_this.option.cursor){
                        this.elements[i].style.cursor = "pointer";  
                    }
                }         

                this.elements[i].addEventListener("mousedown",function(e){       
                             
                    e.stopPropagation();

                    var position = _this.getPosition.call(this,e)
                    , span = doc.createElement("span");
                    span.className = 'ripple';
                    span.style.top = position.y+"px";
                    span.style.left = position.x+"px";
                    span.style.width = position.range+"px";
                    span.style.height = position.range+"px";
                    span.style.animationDuration = _this.option.speed+"s";
                    span.style.background = _this.option.bgColor;
                    span.style.opacity = _this.option.opacity;         

                    //动画完成后删除节点
                    span.addEventListener("animationend",function(){
                        this.parentNode.removeChild(this);
                    },false);
                    //插入水波纹节点
                    this.appendChild(span)

                },false);
            }
        }
    }

    Ripple.prototype.init = function(){
        //载入css
        this.loadCss();
        var _this = this;
        //初始化
        win.onload = function(){
            _this.elements = doc.querySelectorAll('[data-ripple="ripple"]');
            _this.addEvent();
        }              
    }

    win.Ripple = Ripple;

})(window,document)