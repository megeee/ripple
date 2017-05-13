# Ripple.js
鼠标点击水波纹插件

### 用法
1、引入js

```html
<script src="ripple.js"></script>
```
2、调用
```html
<script type="text/javascript">
    new Ripple()
</script>
```
3、在需要添加效果的元素上加上： data-ripple="ripple"
```html
<div data-ripple="ripple">
    div标签
</div>
```
4、配置项

|  参数 | 数据类型 | 缺省值 | 说明 |
|:------------:|:----------:|:----------:|:-------:| 
| opacity |  number | 0.5  | 水波纹透明度 0.1 - 1 |
| speed |  number | 0.6  | 水波纹扩散速度 单位为秒 |
| bgColor |  string | #ffffff  | 水波纹颜色|
| cursor |  boolean | true  | 是否显示手指鼠标指针 |

```javascript
new Ripple({
    opacity : 0.6,  //水波纹透明度
    speed : 1,      //水波纹扩散速度
    bgColor : "#ffffff", //水波纹颜色
    cursor : false  //是否显示手型指针
})
```
5、兼容性

不支持IE9及下版本

### Demo


[https://megeee.github.io/ripple/](https://megeee.github.io/ripple/)