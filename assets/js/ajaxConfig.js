//[------》02 ]
//ajax的配置 ====》优化根路径
$.ajaxPrefilter(function(options){
    // console.log("我是根路径的优化");
    // console.log(options);
    options.url = "http://ajax.frontend.itheima.net" + options.url;
     console.log(options);

})