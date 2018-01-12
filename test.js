/**
 * Created by feng on 2018/1/12.
 */

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
console.log(request('http://localhost:1990/?userId=123'));


