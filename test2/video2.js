// //创建XMLHttpRequest对象
// var xhr = new XMLHttpRequest();
// //配置请求方式、请求地址以及是否同步
// xhr.open('POST', 'http://localhost:8080/video2/test', true);
// //设置请求结果类型为blob
// xhr.responseType = 'blob';
// //请求成功回调函数
// xhr.onload = function(e) {
//     if (this.status == 200) {//请求成功
//         //获取blob对象
//         var blob = this.response;
//         //获取blob对象地址，并把值赋给容器
//         document.querySelector("#sound").setAttribute("src", URL.createObjectURL(blob));
//     }
// };
// xhr.send();
