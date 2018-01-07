/**
 * Created by feng on 2017/12/28.
 */

$(document).ready(function () {

  const domain = 'https://www.easy-mock.com/mock/5a4340d2a3f8d40b6b2b3a1e/kratos';

  /*轮播图*/
  swiper();

  /*精选礼券*/
  selectGifts();

  /*人气推荐*/
  popularRecommend();


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

          //点击图片跳转详情页
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
        var list = data.list;
        for(var i=0;i<list.length;i++){
          var listItem = list[i];
          if(listItem.position==1){
            $('.selected-gifts .left img').attr({'src':listItem.imgUrl,'data-id':listItem.goodsId,'data-url':listItem.redirectUrl})
          }else if(listItem.position==2){
            $('.selected-gifts .right-top img').attr({'src':listItem.imgUrl,'data-id':listItem.goodsId,'data-url':listItem.redirectUrl})
          }else if(listItem.position==3){
            $('.selected-gifts .right-bottom img').attr({'src':listItem.imgUrl,'data-id':listItem.goodsId,'data-url':listItem.redirectUrl})
          }
        }

        //点击图片跳转详情页
        var $imgs = $('.selected-gifts img');
        $imgs.tap(function () {

          var id = $(this).attr("data-id");
          sessionStorage.setItem("GOODSID",id);
          window.location.href = './detail.html';

        })


      },
      error:function (err) {
        console.log(err,'err');
      },
      complete:function (com) {
        //console.log(com);
      }
    })
  }


  /*人气推荐*/
  function popularRecommend() {
    $.ajax({
      url:domain+'/shop/index/popular',
      method:'GET',
      data:{},
      success:function (data) {
        console.log(data,'popular');
        if(data.code=='SUCCESS'){
          var $viewList = $('.popular-recommend .list .item');
          var list = data.list;
          for(var i=0;i<list.length;i++){
            var listItem = list[i];
            $viewList.each(function (index,item) {
              if(i==index){

              }
            })
          }


        }
      },
      error:function (err) {
        console.log(err);
      },
      complete:function (com) {

      }
    })
  }



});










