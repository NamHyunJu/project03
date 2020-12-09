$(document).ready(function(){
    //fullpage
    $('#fullpage').fullpage({      
        autoScrolling:true,
        scrollBar: true,
        scrollHorizontally: true,
        navigation: true,
        navigationTooltips: ['재능교육의 가치관', '추천 상품', '연령별 상품 소개', '이벤트 및 혜택', '자주찾는 질문', '모바일 앱 다운']
	});
	$.fn.fullpage.setAllowScrolling(false);

    //pcGnb
    var _pcGnb = $('#pcGnb > ul');
    _pcGnb.find('> li > ul').hide();
    _pcGnb.find('> li > a').on('mouseenter focus', function () {
        _pcGnb.find('> li.on').removeClass('on').children('ul').hide();
        $(this).next().stop().slideDown().parent().addClass('on');
    });
    _pcGnb.on('mouseleave', function () {
        $(this).find('> li.on').removeClass('on').children('ul').stop().slideUp();
    });
    _pcGnb.find('a:first, a:last').on('blur', function () {
        setTimeout(function () {
        if ( !$('#pcGnb a').is(':focus') ) _pcGnb.trigger('mouseleave');
        }, 10);
    });
});