$(document).ready(function(){
    //본문1 swiper
    var swiper1 = new Swiper('#cnt1 .swiper-container', {
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        loop:true,
        autoplay:{
            delay:2500,
        },
        a11y: {
            prevSlideMessage: '이전 슬라이드 보기',
            nextSlideMessage: '다음 슬라이드 보기',
            firstSlideMessage: '첫번째 슬라이드',
            lastSlideMessage: '마지막 슬라이드',
        },

    });
    //일시정지 클릭
    $('#cnt1 .controller .stop').on('click', function () {
        $(this).css('opacity',0).siblings().css('opacity',1);
        swiper1.autoplay.stop();
        return false;
    });
    //자동실행 클릭
    $('#cnt1 .controller .play').on('click', function () {
        $(this).css('opacity',0).siblings().css('opacity',1);
        swiper1.autoplay.start();
        return false;
    });

    //본문2 swiper
    var swiper2 = new Swiper('#cnt2 .swiper-container', {
      slidesPerView: 2,
      /* spaceBetween: 38, */
      slidesPerGroup: 2,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      a11y:{
        prevSlideMessage: '이전 슬라이드 보기',
        nextSlideMessage: '다음 슬라이드 보기',

      }
    });

    //본문4 li.on
    var _cnt4_li=$('#cnt4 ul li');
    _cnt4_li.attr({tabIndex:0});
    _cnt4_li.on('mouseenter focus',function(){
      $(this).addClass('on').siblings().removeClass('on');
    });


    




    /* 
    Y축 방향으로 스크롤바 이동거리 크로스 브라우징
    function getScrollTop()
{
    if(window.pageYOffset !== undefined)
    {
        return window.pageYOffset;
    } else {
        return document.documentElement.scrollTop || document.body.scrollTop;
    }
}

function getScrollLeft()
{
    if(window.pageXOffset !== undefined)
    {
        return window.pageXOffset;
    } else {
        return document.documentElement.scrollLeft || document.body.scrollLeft;
    }
}
    */
    
});