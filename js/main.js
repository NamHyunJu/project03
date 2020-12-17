$(document).ready(function(){
  $('#cnt1 .swiper-container').attr({tabIndex:0});
  
  $('#cnt1 .swiper-container').on('foucs',function(){
    $(this).css({border:'5px solide #000'});
  });

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
        $(this).css('opacity',0).attr({tabIndex:-1}).siblings().css('opacity',1).attr({tabIndex:0}).focus();
        swiper1.autoplay.stop();
        return false;
    });
    //자동실행 클릭
    $('#cnt1 .controller .play').attr({tabIndex:-1});
    $('#cnt1 .controller .play').on('click', function () {
        $(this).css('opacity',0).attr({tabIndex:-1}).siblings().css('opacity',1).attr({tabIndex:0}).focus();
        swiper1.autoplay.start();
        return false;
    });

    if($('body').hasClass('pc')){
      $('#cnt1 .p_img').css('opacity',100);
      $('#cnt1 .m_img').css('opacity',0);
    } else{
      $('#cnt1 .p_img').css('opacity',0);
      $('#cnt1 .m_img').css('opacity',100);
    }

    //본문2 swiper
    if($(window).width()>1023){
        var swiper2 = new Swiper('#cnt2 .swiper-container', {
        slidesPerView: 2,
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
    } else{
      var mswiper2=new Swiper('#cnt2 .swiper-container',{
        slidesPerView:1,
        slidesPerGroup: 1,
      });  
    }
    

    //본문4 li.on
    var _cnt4_li=$('#cnt4 ul li');
    _cnt4_li.attr({tabIndex:0});
    _cnt4_li.on('mouseenter focus',function(){
      $(this).addClass('on').siblings().removeClass('on');
    });
    
});