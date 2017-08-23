//大转盘抽奖
$(function(){

    var prizelist = [

        {
            "id": "1",
            "awardtype": "1",
            "awardgrade": "1",
            "awardlabel": "\u4e00\u7b49\u5956",
            "awardtitle": "48\u82f1\u5bf8\u5c0f\u7c73\u7535\u89c63S",
            "awardpic": ".\/Uploads\/image\/20170714\/596827bfa7019.png"
        },
        {
            "id": "3",
            "awardtype": "1",
            "awardgrade": "2",
            "awardlabel": "\u4e8c\u7b49\u5956",
            "awardtitle": "\u7f8e\u7684\u8c46\u6d46\u673a",
            "awardpic": ".\/Uploads\/image\/20170714\/59682b733c735.png"
        },
        {
            "id": "4",
            "awardtype": "1",
            "awardgrade": "3",
            "awardlabel": "\u4e09\u7b49\u5956",
            "awardtitle": "\u52a0\u6e7f\u5668",
            "awardpic": ".\/Uploads\/image\/20170714\/59682b927484c.png"
        },
        {
            "id": "5",
            "awardtype": "2",
            "awardgrade": "4",
            "awardlabel": "\u56db\u7b49\u5956",
            "awardtitle": "100\u5f69\u8c46",
            "awardpic": ".\/Uploads\/image\/20170714\/59682bb46a42c.png"
        },
        {
            "id": "6",
            "awardtype": "2",
            "awardgrade": "5",
            "awardlabel": "\u4e94\u7b49\u5956",
            "awardtitle": "50\u5f69\u8c46",
            "awardpic": ".\/Uploads\/image\/20170714\/59682c9c140a0.png"
        },
        {
            "id": "7",
            "awardtype": "2",
            "awardgrade": "6",
            "awardlabel": "\u516d\u7b49\u5956",
            "awardtitle": "10\u5f69\u8c46",
            "awardpic": ".\/Uploads\/image\/20170714\/59682ccc56fcf.png"
        }
    ]

    var myScroll;
    var state;

    //单页面跳转
    function pushHistory(page) {  
        state = {  
            title: page,  
            url: './index.html/'+page
        };
        window.history.pushState(state, page, './index.html/'+page);
        console.log(state);
    }  

    window.addEventListener("popstate", function(e) {
        if(state.title === 'rule'){
            $('.page.rule').fadeOut(400);
        }
        if(state.title === 'bean-record'){
            $('.page.bean-record').fadeOut(400);
        }
        if(state.title === 'award'){
            $('.page.award').fadeOut(400);
        }

    }, false); 

    // 查看规则
    $('.top-header .guize').click(function(){
        $('.page.rule').fadeIn(400);
        pushHistory('rule');
    })

    //查看彩豆
    $('.top-header .bean').click(function(){
        $('.page.bean-record').fadeIn(400);
        pushHistory('bean-record');
    })


    //查看游戏规则
    $('.game-guize').click(function(){
        $('.mask').fadeIn(400);
        $('.game-rule').fadeIn(400).siblings().hide();
    })

    //关闭按钮
    $('.mask .close').click(function(){
        $(this).parents('.mask').fadeOut(400);
    })

    //中奖记录
    $('.award-record').click(function(){
        $('.page.award').fadeIn(400);
        pushHistory('award');
    })

    //大转盘抽奖函数
    function lottery(index){
        var num = prizelist[index-1]['awardgrade'];
        var ro_deg = { 0:false,1:0,2:6,3:4,4:2,5:7,6:[1,3,5] }
        if(num == 0){
            return false;
        }else if(num == 6){
            var ram = parseInt(Math.random() * 3);
            ro_deg[parseInt(num)] = ro_deg[parseInt(num)][ram];
            console.log(num,ro_deg[parseInt(num)])
        }
        ro_deg[parseInt(num)] += 24;
        $('.turn-table').removeClass('transform').css({'transform':'rotate(0deg)','-webkit-transform':'rotate(0deg)'});
        // 加一个100秒的间隔防止设备性能过低，DOM反应不过来。
        setTimeout(function(){
            $('.turn-table').addClass('transform').css({'transform':'rotate('+ ((ro_deg[parseInt(num)] * 45) + 22.5) +'deg)','-webkit-transform':'rotate('+ ((ro_deg[parseInt(num)] * 45) + 22.5) +'deg)'});
         },100);
        setTimeout(function(){
            $(".lottery-btn").attr('click',0);
            $(".award-text .grade").text(prizelist[index-1]['awardlabel']);
            if(prizelist[index-1]['awardtype'] == 2){
                var str = prizelist[index-1]['awardtitle'];
                var str_bean = str.replace(/[^0-9]/ig,""); 

                $(".award-title .grade-num").text(str_bean);
            }else{
                $(".award-title").html(prizelist[index-1]['awardtitle']);
            }
            
            $(".mask").show();
            $(".mask .dialog").removeClass("fadeInDown").siblings().hide();
            $(".mask .dialog").addClass("fadeInDown");
        },2000);
    }
    $('.lottery-btn').on('click',function(){
        if ($(this).attr("click") == 1) {
            return false;
        };
        $(this).attr('click',1);

        if(prizelist){
            lottery(6);
        }
        
    })

    //九宫格抽奖函数
    var msg = 0;
    function jiugongge(num){
        $('.jiugonggeMain ul li').eq(0).addClass('active');
        var lucky = 0;
        var luckyNum = [0,1,2,5,8,7,6,3];
        var times = 50*(num+48);
        function animate(){
            if(lucky < 7){
                lucky++;
            }else{
                lucky = 0;
            }
            $('.lottery-jiugongge ul li').eq(luckyNum[lucky]).addClass('active').siblings().removeClass('active');
        }
        var t = setInterval(animate,50);
        function stop(){
            clearInterval(t);
        }
        setTimeout(stop,times);
        setTimeout(function(){
            $('.btn').attr('click',0);
            var gradeNum = [3,1,4,2,3,1,4,2];
            var index = prizelist[parseInt(gradeNum[num]-1)]['awardgrade'];
            var luckyGrade = prizelist[parseInt(gradeNum[num]-1)]['awardlabel'];
            var luckyTitle = prizelist[parseInt(gradeNum[num]-1)]['awardtitle'];
            $(".award-text .grade").text(luckyGrade);
            $(".award-title .grade-num").text(luckyTitle);
            $(".mask").show();
            $(".mask .dialog").removeClass("fadeInDown").siblings().hide();
            $(".mask .dialog").addClass("fadeInDown");
        },times+200);
    }
    $('.btn').on('click',function(){
        if ($(this).attr("click") == 1) {
            return false;
        };
        $(this).attr('click',1);
         msg = parseInt(Math.round((Math.random() * (9 - 1) + 1) * 10) / 10);
         console.log(msg);
         jiugongge(msg);
    })

    //无限滚动
    function winTransition(){
        var time = 1;
        var translateY = 0;
        var liNum = $('.win ul li').length;
        // console.log(liNum);
        $('.win ul').attr('circle',0);
        setInterval(function(){
            time++;
            translateY += 0.4
            // console.log(time,translateY);
            $('.win ul').animate({
                'top':'-'+translateY+'rem'
            },1000)

            if(liNum == 1){
                var firstLi = $('.win ul li').eq(0).clone();
                if($('.win ul').attr('circle') == 0){
                    $('.win ul').append(firstLi);
                }
                $('.win ul').attr('circle',1);
            }else{
                if(time == liNum){
                    var firstLi = $('.win ul li').eq(0).clone();
                    if($('.win ul').attr('circle') == 0){
                        $('.win ul').append(firstLi);
                    }
                    $('.win ul').attr('circle',1);
                }
            }
            

            if(time == liNum+1){
                time = 1;
                translateY = 0;
                setTimeout(function(){
                    $('.win ul').stop();
                    $('.win ul').css({
                        'top':'0'
                    });
                }, 1000)

            }
        }, 2000)

    };
    winTransition();

    //中奖填写基本信息
    $('.fill-info').click(function(){
        $(this).parents('.dialog').hide().siblings('.infomation').fadeIn(400);
    })

    //确认填写基本信息
    $('.infomation .sure').click(function(){
        $(this).parent('.infomation').fadeOut(400).parents('.mask').fadeOut(400);
    })

    var length = $('.rank').length;

    for(var j=0;j<prizelist.length;j++){
        var name = prizelist[j]['awardlabel'];
        var img = prizelist[j]['awardpic'];
        $('.p'+(j+1)).text(name);
        // $('.i'+(j+1)).attr('src',img);
    }

})