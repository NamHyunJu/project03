$(document).ready(function(){
    var timer=0;

    $('#cnt1').attr({tabIndex:0});

    //fade
    

    //pcGnb
    var _pcGnb = $('#pcGnb > ul');
    _pcGnb.find('> li > ul').hide();

    _pcGnb.find('> li').on('mouseenter', function () {
        _pcGnb.find('> li.on').removeClass('on').children('ul').hide();
        $(this).addClass('on').children('ul').stop().slideDown();
    });
    _pcGnb.find('> li > a').on('focus', function () {
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
             $(this).attr({'aria-expanded':true,'aria-disabled':true}).parent().addClass('active').siblings('h3.active').removeClass('active').children().attr({'aria-expanded':false});

             $(this).parent().next().attr({tabIndex:0}).stop().slideDown('fast').siblings('.accopanel').attr({tabIndex:-1}).stop().slideUp('fast');
     });
     _acco.find('.accoheader').on('keydown',function(e){
        var key=e.keyCode;
        switch(key) {
            case 40:
                if($(this).hasClass('last')) {$(this).closest('.accordion').find('.first').focus();}
                else{$(this).parent().next().next().focus();}
            break;
            case 38:
                if($(this).hasClass('first')) {$(this).closest('.accordion').find('.last').focus();}
                else{$(this).parent().prev().prev().focus();}
            break;
            case 36:
                e.preventDefault();
                $(this).closest('.accordion').find('.first').focus();
            break;
            case 35:
                e.preventDefault();
                $(this).closest('.accordion').find('.last').focus();
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
            _first.focus();
        });
        //Esc를 누른경우 닫힌다
        $(window).on('keydown',function(e){
            if(e.keyCode===27) _mdClose.trigger('click');
        });
     });

     //스크롤바가 제일 하단이면 문의하기 버튼 이동
     $(window).on('scroll',function(){
        clearTimeout(timer);
        timer=setTimeout(function(){
            var scrollY=Math.round($(this).scrollTop()); //스크롤 한 높이->반올림
            var windowY=$(this).height(); //윈도우 높이
            var docY=$(document).height(); //문서전체높이
            console.log(scrollY,':',windowY,':',docY);
            if(scrollY===(windowY-docY)) {$('.md_open').stop().animate({bottom:200});}
            else{$('.md_open').stop().animate({bottom:70});}    
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