;!(function(win,doc){  
    "use strict";

    if (typeof Ripple === "undefined" || !Ripple) {
        var Ripple = function(config){
            this.init();                     
        };
    }

    Ripple.prototype = {

        //创建标签
        createEle : function(tag){
            return doc.createElement(tag);
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

                this.elements[i].addEventListener("mousedown",function(e){
                    e.stopPropagation();
                    var position = _this.getPosition.call(this,e)
                    , span = doc.createElement("span");
                    span.className = 'ripple';
                    span.style.top = position.y+"px";
                    span.style.left = position.x+"px";
                    span.style.width = position.range+"px";
                    span.style.height = position.range+"px";

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