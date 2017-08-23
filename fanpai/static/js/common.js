//移动端rem布局
$(document).ready(function(){
    //监听窗口大小更改html的字体大小
    function responsive(){
        var width=document.body.clientWidth;
        document.getElementsByTagName('html')[0].style.fontSize=(width/20)+"px";
    };
    responsive();
    //窗口改变的时候依然执行
    window.onresize=function(){
        responsive();
    };
});
//弹出框
function showDialog(myText){
    layer.alert(myText, {
        icon: 2,
        skin: 'layer-ext-moon'
    });
}
function showDialogsuc(myText){
    layer.alert(myText, {
        icon: 1,
        skin: 'layer-ext-moon'
    });
}
function showDialogsucurl(message,url){
    layer.open({
        content:message,
        icon:1,
        yes:function(){
            location.href = url;
        },
        end:function(){
            location.href = url;
        }
    })
}
//短信验证码
var countdown=60;
function daojishi(obj){
    if(countdown == 0){
        obj.attr('disabled',false); 
        obj.text("重新获取"); 
        countdown = 60; 
        return;
    }else { 
        obj.attr("disabled", true); 
        obj.text("重新发送("+ countdown + "s)"); 
        countdown--; 
    }
    setTimeout(function(){ 
        daojishi(obj)},1000); 
};
/*fastclick_iphone手机专用*/
window.addEventListener('load', function() {
    FastClick.attach(document.body);
}, false);