//创建XMLHttpRequest对象
let xhr = new XMLHttpRequest();
//配置请求方式、请求地址以及是否同步
xhr.open('GET', 'http://localhost:8080/blob/test', true);
//设置请求结果类型为blob
xhr.responseType = 'blob';
//请求成功回调函数
xhr.onload = function(e) {
    if (this.status == 200) {//请求成功
        //获取blob对象
        let blob = this.response;
        //获取blob对象地址，并把值赋给容器
        document.getElementById("sound").setAttribute("src", URL.createObjectURL(blob));
    }
};
xhr.send();

