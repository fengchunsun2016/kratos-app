/**
 * Created by feng on 2018/1/8.
 */

$(document).ready(function () {

  const domain = 'https://www.easy-mock.com/mock/5a4340d2a3f8d40b6b2b3a1e/kratos';
  const userId = null;
  let rows = 1;


  $('.return').tap(function (e) {
    history.go(-1);
  })

  getData();
  getData();


  //上拉加载
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

  //下拉刷新
  ;(function () {
    var _start = 0;
    var _end = 0;

    $(window).on('touchstart', touchStart);
    $(window).on('touchmove', touchMove);
    $(window).on('touchend', touchEnd);
    /*window.addEventListener('touchstart', touchStart, false);
    window.addEventListener('touchmove', touchMove, false);
    window.addEventListener('touchend', touchEnd, false);*/

    function touchStart(event) {
      var touch = event.targetTouches[0];
      _start = touch.pageY;
      console.log(_start,'_start');
    }

    function touchMove(event){
      var touch = event.targetTouches[0];
      _end = ( touch.pageY - _start);
      console.log(_end,'_end');

    }

    function touchEnd(event) {
      if(_end > 200){     //200即手机下滑屏幕的距离，超过200则执行刷新动作
        location.reload();
      }
    }
  })();


  //获取人气推荐数据
  function getData() {
    console.log(rows,'rows');
    $.ajax({
      url:domain+'/shop/index/popular',
      method:'GET',
      data:{ userId, rows },
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


          ++rows;

          $('.popular-recommend .list').append(str);

          $('.load-more').css("display",'none');

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





})




