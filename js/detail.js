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

  $('.button-buy').tap(function (e) {
    window.location.href = './order.html';

  })



  //解析url
  function request(paras) {
    var url = location.href;
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {}
    for (i = 0; j = paraString[i]; i++) {
      paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof(returnValue) == "undefined") {
      return "";
    } else {
      return returnValue;
    }
  }

});

