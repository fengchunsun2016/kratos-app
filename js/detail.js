/**
 * Created by feng on 2017/12/25.
 */

$(document).ready(function () {
  var mySwiper = new Swiper ('.swiper-container', {
    loop:true,
    pagination: {
      el: '.swiper-pagination',
    },
  });

  $('.return').tap(function (e) {
    history.go(-1);
  })


});

