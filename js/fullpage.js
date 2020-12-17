$(document).ready(function(){
    //1024부터 fullpage 호출
    var timer=0;
    $(window).on('resize',function(){
        clearTimeout(timer);
        timer=setTimeout(function(){
            if($(window).width()>=1024) creatFullpage();
            else fullpage_api.destroy('all'); 
        },50);
    });
    $(window).trigger('resize');
    function creatFullpage(){
        $('#fullpage').fullpage({      
            autoScrolling:true,
            scrollBar: true,
            scrollOverflow : true , 
            navigation: true,
            navigationTooltips: ['재능교육의 가치관', '추천 상품', '연령별 상품 소개', '이벤트 및 혜택', '자주찾는 질문', '모바일 앱 다운'],
            afterRender:function(){
                $('#fp-nav .fp.fp-tooltip').attr('aria-hidden',true);
            }
        });   
    };
});