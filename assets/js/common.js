$(document).ready(function(){
    $(window).on('resize',function(){
        var winWid=$(this).width();
        if(winWid>1023) $('body').removeClass('mobile').addClass('pc')
        else $('body').removeClass('pc').addClass('mobile');
    });
    $(window).trigger('resize');

    var timer=0;
    
    //pcGnb
    var _pcGnb = $('#pcGnb > ul');
    _pcGnb.find('> li > ul').hide();

    _pcGnb.find('> li > a').on('mouseenter focus', function () {
        _pcGnb.find('> li.on').removeClass('on').children('ul').hide();
        $(this).next().stop().slideDown().parent().addClass('on');
    });
    _pcGnb.on('mouseleave', function () {
        _pcGnb.find('> li.on').removeClass('on').children('ul').hide();
    });
    _pcGnb.find('a:first, a:last').on('blur', function () {
        setTimeout(function () {
            if ( !$('#pcGnb a').is(':focus') ) _pcGnb.trigger('mouseleave');
        }, 10);
    });

    //mGnb
    var _mGnb=$('#mHeader #mGnb');
    $('#mHeader .mGnb_open').on('click',function(){
        var _first=_mGnb.find('.first');
        var _last=_mGnb.find('.last');
        var _openBtn=$(this);

        _mGnb.css('display','block').stop().animate({left:0},300,function(){
            _first.focus();

            _first.on('keydown',function(e){
                if(e.shiftKey && e.keyCode===9) {
                    e.preventDefault();
                    _last.focus();
                }
            });
            _last.on('keydown',function(e){
                if(!e.shiftKey&&e.keyCode===9){
                    e.preventDefault();
                    _first.focus();
                }
            });
        });
        _last.on('click',function(){
            _mGnb.stop().animate({left:'-100%'},300,function(){
                $(this).hide().find('ul li.on').removeClass('on').parents('#mGnb').perv().focus();
            });
        });
    });

    var _mGnbUl=$('#mGnb>ul');
    _mGnbUl.find('.dep2,.dep3').hide();
    _mGnbUl.find('>li>a,.dep2>li>a:not(.go)').on('click',function(e){
        e.preventDefault();
        if(!$(this).parent().hasClass('on')){//닫혀있으면 열기
            if($(this).next().hasClass('dep2')){
                _mGnbUl.find('>li.on').removeClass('on').find('ul').stop().slideUp('fast');
                _mGnbUl.find('.dep2>li.on').removeClass('on').find('ul').stop().slideUp('fast');
            } else{
                _mGnbUl.find('.dep2>li.on').removeClass('on').find('ul').stop().slideUp('fast');
            }
            $(this).next().stop().slideDown('fast').parent().addClass('on');
        } else {//열려있으면 닫기
            $(this).next().stop().slideUp('fast').parent().removeClass('on');
        }
    });

    //tab
    $('.tab:first-of-type,.tabpanel:first-of-type').show().addClass('on').attr('tabIndex',0);
    $('.tab').eq(0).attr('aria-selected',true).siblings().attr('aria-selected',false);
    $('.tabpanel').eq(0).show().attr('aria-selected',true).siblings('.tabpanel').hide().attr('aria-selected',false);

    $('.tab').on('click',function(){
        $(this).addClass('on').attr({tabIndex:0,'aria-selected':true}).siblings('.on').removeClass('on').attr({tabIndex:-1,'aria-selected':false});

         var tabNum=$(this).index();
         $('.tabpanel').eq(tabNum).show().addClass('on').attr({tabIndex:0,'aria-hidden':false}).siblings('.tabpanel.on').removeClass('on').hide().attr({tabIndex:-1,'aria-hidden':true});
     });

     $('.tab').on('keydown',function(e){
         var key=e.keyCode;
        //오른쪽(39) 왼쪽(37) home(36) end(35) 엔터(13) 스페이스바(32)
        switch(key){
            case 39:
                $(this).attr({tabIndex:-1});
                if($(this).hasClass('last')) {$(this).siblings('.first').attr('tabIndex',0).focus();} else {$(this).next().attr('tabIndex',0).focus();}
            break;
            case 37:
                $(this).attr({tabIndex:-1});
                if($(this).hasClass('first')) {$(this).siblings('.last').attr({tabIndex:0}).focus();} else{$(this).prev().attr({tabIndex:0}).focus();}
            break;
            case 36:
                e.preventDefault();
                $(this).parent().find('.first').attr({tabIndex:0}).focus();
            break;
            case 35:
                e.preventDefault();
                $(this).parent().find('.last').attr({tabIndex:0}).focus();
            break;
            case 13:
            case 32:
                $(this).trigger('click');
        }
     });
     
     //accordion
     var _acco=$('.accordion');
     _acco.find('.accoheader').attr({'aria-expanded':false});
     _acco.find('.first').attr({'aria-expanded':true}).addClass('active').parent().next().show();

     _acco.find('.accoheader').on('click',function(){
             $(this).attr({'aria-expanded':true,'aria-disabled':true}).parent().addClass('active').siblings('h3.active').removeClass('active').children().attr({'aria-expanded':false,'aria-disabled':false});

             $(this).parent().next().attr({tabIndex:0}).stop().slideDown('fast').siblings('.accopanel').attr({tabIndex:-1}).stop().slideUp('fast');
     });
     _acco.find('.accoheader').on('keydown',function(e){
        var key=e.keyCode;
        switch(key) {//아래 위 홈 엔드
            case 40:
                if($(this).hasClass('last')) {$(this).closest('.accordion').find('.first').focus();}
                else{$(this).parent().next().next().children().focus();}
            break;
            case 38:
                if($(this).hasClass('first')) {$(this).closest('.accordion').find('.last').focus();}
                else{$(this).parent().prev().prev().children().focus();}
            break;
            case 36:
                e.preventDefault();
                $(this).closest('.accordion').find('.first').focus();
            break;
            case 35:
                e.preventDefault();
                $(this).closest('.accordion').find('.last').focus();
            break;
        }
     });

     //modal
     $('.md_open').on('click',function(){
        var _mdOpen=$(this);
        var _mdClose=$('.md_close');
        var _mdCnt=$('#modalCnt');
        var _first=_mdCnt.find('.first');
        var _last=_mdCnt.find('.last');

        _mdCnt.siblings().attr({'aria-hidden':true,inert:true});
        _mdCnt.before('<div id="dim"></div>');
        var _dim=$('#dim');
        _dim.stop().fadeIn('fast').next().css('visibility', 'visible');
        _first.focus();

        _first.on('keydown',function(e){
            if(e.shiftKey&&(e.keyCode===9)){
                e.preventDefault();
                _last.focus();
            }
        });
        _last.on('keydown',function(e){
            if((!e.shiftKey)&&(e.keyCode===9)){
                e.preventDefault();
                _first.focus();
            }
        });
        _mdClose.on('click',function(){
            _dim.stop().fadeOut('fast',function(){
                $(this).remove();
            });
            _mdCnt.css('visibility','hidden').siblings().removeAttr('aria-hidden inert');
            _mdOpen.focus();
        });
        //Esc를 누른경우 닫힌다
        $(window).on('keydown',function(e){
            if(e.keyCode===27) _mdClose.trigger('click');
        });


     });
     //form 유효성체크
     $('#apply').on('submit',function(){
        var _name=$('#name');
        var _age=$('[name="age"]');
        var _tel2=$('#midNum');
        var _tel3=$('#lastNum');
        var _where=$('[name="where"]');
        var _content=$('#content');
        var _agree=$('#agree');

        if(regChk(_name,/^[가-힣]{2,10}$/,'자녀이름은 한글만 2~10로 작성해주세요')===false) return false;
        if(radioChk(_age,'연령은 필수 입력사항 입니다.')===false) return false;
        if(regChk(_tel2,/^[0-9]{3,4}$/,'휴대폰 가운데 자리를 입력해주세요')===false) return false;
        if(regChk(_tel3,/^[0-9]{4}$/,'휴대폰 마지막 자리를 입력해주세요')===false) return false;
        if(radioChk(_where,'학습형태는 필수 입력사항 입니다.')===false) return false;
        if(regChk(_content,/.{10,200}/,'상담내용은 10~200자 까지 입력해 주세요.')===false) return false;
        if(_agree.is(':checked')===false){
            alert('개인정보 수집·이용 및 제공 동의에 동의하지 않았습니다.');
            _agree.focus();
        }
        function regChk(_tg,regExp,msg){
            var result=regExp.test(_tg.val());
            if(result){
                return true;
            }else{
                alert(msg);
                _tg.focus();
                return false;
            }
        }
        function radioChk(_tg,msg){
            var radioVal;
            _tg.each(function(){
                if($(this).is(':checked')) radioVal=$(this).val();
            });
            if(radioVal) return true;
            else{
                alert(msg);
                return false;
            }
        }
     });

     //스크롤바가 제일 하단이면 문의하기 버튼 이동
     $(window).on('scroll',function(){
        clearTimeout(timer);
        timer=setTimeout(function(){
            var scrollY=$(this).scrollTop();
            var scrollBtm=$(document).height() - $(this).height() - $('.footer').outerHeight();
            if(scrollY>=scrollBtm) {$('.md_open').stop().animate({bottom:200});}
            else{$('.md_open').stop().animate({bottom:70});} 

            //fade
            $('.fade').each(function(){
                if(scrollY>$(this).offset().top-650) $(this).addClass('on');
            });
        },50);
     });

     //family site
     var _familyList=$('.foot_right .family>ul');
     var _familyBtn=$('.f_select');

     _familyList.stop().slideUp();
     _familyBtn.on('click',function(){
        $(this).toggleClass('on').next().slideToggle();
     });
});