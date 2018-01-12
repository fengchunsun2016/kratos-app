/**
 * Created by feng on 2017/12/27.
 */

$(document).ready(function () {

  const domain = 'https://www.easy-mock.com/mock/5a4340d2a3f8d40b6b2b3a1e/kratos';
  const userId = null;
  const goodsId = null;

  getOrder();//获取订单页信息
  getPhone();//获取电话


  /*获取确认订单页信息*/
  function getOrder() {
    $.ajax(
      {
        url:domain + "/order",
        method:'GET',
        dataType:"json",
        data:{userId,goodsId},
        success:function (data) {
          if(data.code=='success'){
            data = data.data;
            //console.log(data);
            $('.pic img').attr('src',data.imgUrl);
            $(".info-text .tittle").html(data.goodsName);
            $('.info .money .num').html(data.amtPrice);
            $('.go-pay .num').html(data.amtPrice);

          }
        },
        err:function (err) {
          console.log(err);
        }
      }
    )
  }

  /*获取个人信息中的手机号*/
  function getPhone() {
    $.ajax(
      {
        url : domain + "/user/info",
        method : 'GET',
        dataType : "json",
        data : { userId },
        success : function (data) {
          if (data.code == 'success') {
            data = data.data;
            //console.log(data);
            var phone = data.phone.substr(0,3)+'****'+data.phone.substr(7,4);
            $('.send-address .phone-num').html(phone);

          }
        },
        err : function (err) {
          console.log(err);
        }
      }
    )
  }

  $('.header .tittle .icon-back').tap(function (e) {
    history.go(-1);
  })

  $('.go-pay .go').tap(function () {
    console.log('改去付钱了。。');
    payClick.getPay('987654321');
  })


})








