//[------》02 ]
//ajax的配置 ====》优化根路径
$.ajaxPrefilter(function(options){
    // console.log("我是根路径的优化");
    // console.log(options);
    options.url = "http://ajax.frontend.itheima.net" + options.url;
    // console.log(options);

    //-----》03
    options.headers = {
        // token的值存储在本地存储中，需要从本地存储中来获取
        // Authorization 这个不是随便写的，后端定义要求的
        "Authorization": localStorage.getItem("token"),
    };

})