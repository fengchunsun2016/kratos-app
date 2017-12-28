/**
 * Created by feng on 2017/12/27.
 */

$(document).ready(function () {

  getOrder();//获取订单页信息
  getPhone();//获取电话


  /*获取确认订单页信息*/
  function getOrder() {
    $.ajax(
      {
        url:"https://www.easy-mock.com/mock/5a4340d2a3f8d40b6b2b3a1e/kratos/order",
        method:'GET',
        dataType:"json",
        data:{userId:"110"},
        success:function (data) {
          if(data.code=='success'){
            data = data.data;
            console.log(data);
            $('.pic img').attr('src',data.imgUrl);
            $(".info-text .tittle").html(data.goodsName);
            $('.info .money .num').html(data.amtPrice);
            $('.go-pay .num').html(data.amtPrice);

          }
        },
        err:function (err) {
          console.log(err);
        },
        complete:function () {

        }
      }
    )
  }

  /*获取个人信息中的手机号*/
  function getPhone() {
    $.ajax(
      {
        url : "https://www.easy-mock.com/mock/5a4340d2a3f8d40b6b2b3a1e/kratos/user/info",
        method : 'GET',
        dataType : "json",
        data : { userId : "110" },
        success : function (data) {
          if (data.code == 'success') {
            data = data.data;
            console.log(data);
            var phone = data.phone.substr(0,3)+'****'+data.phone.substr(7,4);
            $('.send-address .phone-num').html(phone);

          }
        },
        err : function (err) {
          console.log(err);
        },
        complete : function () {

        }
      }
    )
  }




})





