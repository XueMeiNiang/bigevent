// 调用
getUserInfo();

// 注意!!:  layer   】
let layer = layui.layer;

// 发送ajax的请求来获取用户的基本信息（头像  昵称）
function getUserInfo(){
    // 【看接口文档
    $.ajax({
        //注意：以下写法的前提是在页面中引入ajaxConfig.js文件
        url:"/my/userinfo",
        post:"GET",

        // 03----》 优化请求头  【写在 ajaxConfig.js  文件里边了】 【这边的可以注释掉了  】
        // // 请求头的配置【！！！】
        // headers:{
        //     // token的值存储在本地存储中，需要从本地存储中来获取
        //     // Authorization 这个不是随便写的，后端定义要求的
        //     "Authorization": localStorage.getItem("token"),
        // },

        success: function(res){
            console.log(res);
            // 判断失败  【自己的胡话语：这边的失败和error失败的回调函数是不一样的。
            // =====》这边的失败的状态，其实是后端定义的。  而且这边的判断是写在成功的回调函数里边的。【2个失败不是一个概念】
            // =====》而error回调函数是 执行失败之后 会执行的回调函数】【2个失败不是一个概念】
            if(res.status !== 0){
                // return console.log("获取用户信息失败");
                // 演示进入这边的失败判断：  把header 里的 "Authorization": localStorage.getItem("token"),注释掉
           
           
                // 弹框处理
                // 注意!!:  layer   】
                return layer.msg('获取用户信息失败');
            }



            // 渲染出来头像和昵称
            // 注意点
            // 1. 如果有头像的话，展示头像，没有的话，展示文字头像
            // 2. 如果是nickname，优先展示nickname，否则才展示username
            
            // 优先级 nickname和username
            let name = res.data.nickname || res.data.username;
            console.log(name);

            // 展示名字
            $("#welcome").text("欢迎" + name);

            // 处理2选一： 如果有头像的话，展示头像，没有的话，展示文字头像
            if(res.data.user_pic){
                // if成立  有图片
                // 图片显示  文字头像隐藏
                // $(".layui-nav-img").show();
                // 头像定死的 ====>换
                $(".layui-nav-img").attr("src",res.data.user_pic).show();

                $(".textAvatar").hide();
            }else{
                // 没有图片
                // 展示文字头像（html写span  2处）   name的第一个字 且 大写
                let first =  name[0].toUpperCase();
                $(".textAvatar").show().text(first);
                // 隐藏头像
                $(".layui-nav-img").hide();
             

            }

        },

        // 03----》
        complete : function(res){
            // 请求完成（不论是成功还是 失败）  都会执行的回调函数
            console.log(res);
            if(res.responseJSON.message === "获取用户基本信息成功！" &&  status === 0){
                //表示用户没有权限进入到index页面  需要回到login页面重新登录

                // 跳转到登录的页面
                location.href = "/home/login.html";

                     // 清除token
                     localStorage.removeItem("token");
            }
        }
      
    
    })
    
}

// ----》03
// 退出功能
$("#logoutBtn").click(function(){
    // 弹出询问框
    // layer是layui提供的
    layer.confirm('is not?', {icon: 3, title:'提示'}, function(index){
         //点击确认执行的回调函数
        
        // 清除token
        localStorage.removeItem("token");
        // 跳转页面
        location.href = "/home/login.html";

        layer.close(index); //关闭当前的询问框
      });

    

})