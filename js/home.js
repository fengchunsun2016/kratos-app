/**
 * Created by feng on 2017/12/28.
 */

$(document).ready(function () {

  const domain = 'https://www.easy-mock.com/mock/5a4340d2a3f8d40b6b2b3a1e/kratos';

  /*轮播图*/
  swiper();

  /*精选礼券*/
  //selectGifts();



  /*头部轮播图*/
  function swiper() {

    //获取轮播图数据
    $.ajax({
      url:domain + '/shop/index/banner',
      type:'POST',
      dataType:'json',
      data:{userId:'where are you?'},
      success:function (data) {
        if(data.code=='SUCCESS'){
          var list = data.list;
          var $imgs = $('.swiper-wrapper img');
          for(var i=0; i<list.length; i++){
            var listItem = list[i];
            $imgs.each(function (index,item) {
              if(index == i){
                $(item).attr({src:listItem.imgUrl,"data-id":listItem.id});
                return;
              }

            });
          }

          //初始化轮播图
          mySwiper();

          $imgs.tap(function () {

            var id = $(this).attr("data-id");
            sessionStorage.setItem("ID",id);
            window.location.href = './detail.html';

          })

        }
      },
      error:function (err) {
        console.log(err,'err')
      },
      complete:function (o) {
        //console.log(o,'complete')
      }
    })

    //初始化轮播图
    function mySwiper() {
      new Swiper ('.swiper-container', {
        autoplay:true,
        loop:true,
        pagination: {
          el: '.swiper-pagination',
        },
      });
    }

  }



  /*精选礼券（品牌推荐）*/
  function selectGifts() {
    //获取精选礼券数据
    $.ajax({
      url:domain+'/shop/index/brand',
      dataType:'json',
      data:{},
      success:function (data) {
        //console.log(data,'data');


      },
      error:function (err) {
        console.log(err,'err');
      },
      complete:function (com) {
        console.log(com);
      }
    })
  }





});










