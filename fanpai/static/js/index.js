/* 
* @Author: Marte
* @Date:   2017-08-23 09:23:53
* @Last Modified by:   Marte
* @Last Modified time: 2017-08-23 14:35:59
*/

$(document).ready(function(){
    var arr = [];
    var t;
    var text = Number($('.text-score b').text());
    var text1 = Number($('.text-time b').text());
    $('.indexGame li').click(function(){
        if($(this).hasClass('active')){
            return false;
        }
        if($(this).data('click')==1){
            return false;
        }
        $(this).data('click',1);
        var id = $(this).attr('data-id');
        arr.push(id);
        if(arr.length<2){
            $(this).find('img').eq(1).slideUp(); 
        }else if(arr.length==2){
            $(this).find('img').eq(1).slideUp();
            $('.indexGame li').data('click',0);
            if($('.indexGame li').eq(arr[0]).find('img').eq(0).attr('src') === $('.indexGame li').eq(arr[1]).find('img').eq(0).attr('src')){
                setTimeout(function(){
                    $('.indexGame li').eq(arr[0]).addClass('active').find('img').hide();
                    $('.indexGame li').eq(arr[1]).addClass('active').find('img').hide();
                    $('.text-score b').text(text+=10);
                    arr = [];
                    setTimeout(function(){
                        if($('.indexGame li.active').length===$('.indexGame li').size()){
                            clearInterval(t);
                            alert('恭喜过关,您一共用时'+$('.text-time b').text()+'s');
                        } 
                    },10);            
                },500);
            }else{
                setTimeout(function(){
                    $('.indexGame').find("li[data-id$="+arr[0]+"]").find('img').eq(1).slideDown();
                    $('.indexGame').find("li[data-id$="+arr[1]+"]").find('img').eq(1).slideDown();
                    arr=[];
                },500);
            }
        }
    })
    //计时功能
    t = setInterval(function(){
        $('.text-time b').text(text1+=1);
    },1000);
});