/**
 * Created by feng on 2017/12/28.
 */

$(document).ready(function () {

  const domain = 'https://www.easy-mock.com/mock/5a4340d2a3f8d40b6b2b3a1e/kratos';
  const userId = null;

  /*整体布局*/
  layout();


  /*整体布局*/
  function layout() {
    $.ajax({
      url:domain + '/shop/index/layout',
      method:'GET',
      data:{userId},
      success:function (data) {
        if(data && data.code == 'SUCCESS'){
          //console.log(data,'layout');

          data.banner == '1'?swiper():$('.header').remove();//轮播图
          data.brand == '1'?selectGifts():$('.selected-gifts').remove();//精选礼券
          data.goods == '1'?popularRecommend():$('.popular-recommend').remove();//人气推荐

        }
      }
    })
  }



  /*头部轮播图*/
  function swiper() {

    //获取轮播图数据
    $.ajax({
      url:domain + '/shop/index/banner',
      type:'POST',
      dataType:'json',
      data:{userId},
      success:function (data) {
        if(data.code=='SUCCESS'){
          var list = data.list;
          var $imgs = $('.swiper-wrapper img');
          for(var i=0; i<list.length; i++){
            var listItem = list[i];
            $imgs.each(function (index,item) {
              if(index == i){
                $(item).attr({src:listItem.imgUrl,"goods-id":listItem.id,'redirect-url':listItem.redirectUrl});
                return;
              }

            });
          }

          //初始化轮播图
          mySwiper();

          //点击图片跳转详情页
          $imgs.tap(function () {
            var redirectUrl = $(this).attr('redirect-url');
            var id = $(this).attr("goods-id");
            sessionStorage.setItem("GOODSID",id);
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
      data:{userId},
      success:function (data) {
        //console.log(data,'data');
        var list = data.list;
        for(var i=0;i<list.length;i++){
          var listItem = list[i];
          if(listItem.position==1){
            $('.selected-gifts .left img').attr({'src':listItem.imgUrl,'goods-id':listItem.goodsId,'redirect-url':listItem.redirectUrl})
          }else if(listItem.position==2){
            $('.selected-gifts .right-top img').attr({'src':listItem.imgUrl,'goods-id':listItem.goodsId,'redirect-url':listItem.redirectUrl})
          }else if(listItem.position==3){
            $('.selected-gifts .right-bottom img').attr({'src':listItem.imgUrl,'goods-id':listItem.goodsId,'redirect-url':listItem.redirectUrl})
          }
        }

        //点击图片跳转详情页
        var $imgs = $('.selected-gifts img');
        $imgs.tap(function () {
          var redirectUrl = $(this).attr('redirect-url');
          var id = $(this).attr("goods-id");
          sessionStorage.setItem("GOODSID",id);
          window.location.href = redirectUrl;

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
  /*function popularRecommend() {

    //点击更多时跳转到人气推荐页
    $('.popular-recommend .tittle .more').tap(function () {
      window.location.href = './popular.html';
    })


    //获取人气推荐数据
    $.ajax({
      url:domain+'/shop/index/popular',
      method:'GET',
      data:{userId},
      success:function (data) {
        console.log(data,'popular');
        if(data.code=='SUCCESS'){
          var $viewList = $('.popular-recommend .list .item');
          var list = data.list;

          //绑定数据
          var str = ``;
          for(var i=0;i<list.length;i++){
            var listItem = list[i];
            console.log(listItem,'item');

            str += `<li class="item">
      <div class="pic"><img src=${listItem.imgUrl} "goods-id":${listItem.id} "redirect-url":${listItem.redirectUrl} alt=""></div>

      <div class="info">
        <div class="name">${listItem.goodsName}</div>
        <div class="marks">`;

            if(listItem.tags && listItem.tags.length){
              for(var j = 0; j<listItem.tags.length; j++){
                var tagItem = listItem.tags[j];
                str += `<span>${tagItem.content}</span>`
              }
            }

            str += `</div>
        <div class="bottom">
          <div class="money">
            <span>￥</span>
            <span class="num">100</span>
          </div>
          <div class="more"><i class="iconfont icon-more"></i></div>
        </div>
      </div>

    </li>`;
            
            /!*$viewList.each(function (index,item) {
              if(i==index){
                /!*$(item).attr({'goods-id':listItem.goodsId,'redirect-url':listItem.redirectUrl});
                $(item).find('.pic img').attr({'src':listItem.imgUrl});
                $(item).find('.info .name').html(listItem.goodsName);
                $(item).find('.info .money .num').html(listItem.pointPrice);*!/

              }
            })*!/
          }


          $('.popular-recommend .list').html(str);

          //点击列表跳转详情
          $viewList.tap(function () {
            var redirectUrl = $(this).attr('redirect-url');
            var goodsId = $(this).attr('goods-id');
            sessionStorage.setItem('GOODSID',goodsId);
            window.location.href = redirectUrl;

          })

        }
      },
      error:function (err) {
        console.log(err);
      },
      complete:function (com) {

      }
    })
  }*/

  function popularRecommend() {

    $.ajax({
      url:domain+'/shop/index/popular',
      method:'GET',
      data:{ userId },
      success:function (data) {
        // console.log(data,'popular');
        if(data.code=='SUCCESS'){
          var list = data.list;

          //绑定数据
          var str = ``;
          for(var i=0;i<list.length;i++){
            var listItem = list[i];
            //console.log(listItem,'listItem');

            str += `<li class="item" goods-id=${listItem.goodsId} redirect-url=${listItem.redirectUrl}>
                      <div class="pic"><img src=${listItem.imgUrl} alt=${listItem.goodsName}></div>
                
                      <div class="info">
                        <div class="name">${listItem.goodsName}</div>
                        <div class="marks">`;

            if(listItem.tags && listItem.tags.length){
              for(var j = 0; j<listItem.tags.length; j++){
                var tagItem = listItem.tags[j];
                str += `<span>${tagItem.content}</span>`
              }
            }

            str += `</div>
                        <div class="bottom">
                          <div class="money">
                            <span>￥</span>
                            <span class="num">100</span>
                          </div>
                          <div class="more"><i class="iconfont icon-more"></i></div>
                        </div>
                      </div>
                
                    </li>`;
          }




          $('.popular-recommend .list').append(str);



          //点击列表跳转详情
          var $viewList = $('.popular-recommend .list .item');
          $viewList.off('tap');
          $viewList.on('tap',function () {
            var redirectUrl = $(this).attr('redirect-url');
            var goodsId = $(this).attr('goods-id');
            sessionStorage.setItem('GOODSID',goodsId);
            window.location.href = redirectUrl;
          })

        }
      },
      error:function (err) {
        console.log(err);
      }
    })
  }



});










