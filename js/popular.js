/**
 * Created by feng on 2018/1/8.
 */

$(document).ready(function () {

  const domain = 'https://www.easy-mock.com/mock/5a4340d2a3f8d40b6b2b3a1e/kratos';

  $('.return').tap(function (e) {
    history.go(-1);
  })


  getData();
  getData();
  // getData();



  // console.log(innerHeight,'innerHeight');
  // console.log($(document.documentElement).height(),'document.documentElement.offsetHeight');
  // console.log(document.documentElement.scrollHeight(),'document.documentElement.scrollHeight');

  ;(function () {
    var timer=null;
    $(window).on('scroll',function () {
      var scrollH = document.documentElement.scrollHeight || document.body.scrollHeight;
      var innerH = window.innerHeight;
      var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
      if(innerH + scrollT >= scrollH){
        $('.load-more').css('display','block');
        clearInterval(timer);
        timer = setTimeout(function () {
          getData();
        },100);
      }
    })

  })();
  
  ;(function () {
    var _start = 0;
    var _end = 0;

    window.addEventListener('touchstart', touchStart, false);
    window.addEventListener('touchmove', touchMove, false);
    window.addEventListener('touchend', touchEnd, false);

    function touchStart(event) {
      var touch = event.targetTouches[0];
      _start = touch.pageY;
    }

    function touchMove(event){
      var touch = event.targetTouches[0];
      _end = ( touch.pageY - _start);
//下滑才执行操作

    }

    function touchEnd(event) {
      if(_end > 200){     //200即手机下滑屏幕的距离，超过200则执行刷新动作
        location.reload();
      }
    }
  })()










//获取人气推荐数据
  function getData() {
    $.ajax({
      url:domain+'/shop/index/popular',
      method:'GET',
      data:{},
      success:function (data) {
        // console.log(data,'popular');
        if(data.code=='SUCCESS'){
          var $viewList = $('.popular-recommend .list .item');
          var list = data.list;

          //绑定数据
          var str = ``;
          for(var i=0;i<list.length;i++){
            var listItem = list[i];
            //console.log(listItem,'item');

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

            /*$viewList.each(function (index,item) {
             if(i==index){
             /!*$(item).attr({'goods-id':listItem.goodsId,'redirect-url':listItem.redirectUrl});
             $(item).find('.pic img').attr({'src':listItem.imgUrl});
             $(item).find('.info .name').html(listItem.goodsName);
             $(item).find('.info .money .num').html(listItem.pointPrice);*!/

             }
             })*/
          }


          $('.popular-recommend .list').append(str);

          $('.load-more').css("display",'none');

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
      }
    })
  }



})




