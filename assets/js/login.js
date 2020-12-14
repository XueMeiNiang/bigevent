$(function(){
    // 去注册账号
    $("#goToRegi").click(function(){
        //显示注册
        $(".register").show();
        // 隐藏登录
        $(".login").hide();

    })

    // 去登录
    $("#goToLogin").click(function(){
        //隐藏注册
        $(".register").hide();
        //显示登录
        $(".login").show();
    })




    // 【标记-1】 login里边引入  引入layui的js文件  
    // 【标记-2】【注意】 要加这个  不然报错
    let form = layui.form; //从layui中获取form表单相关的功能
    let layer = layui.layer;  // layer --- 弹框的功能！！

    //表单的自定义校验规则
    form.verify({ 
        
        //-----
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        // 【标记-3】【注意】 把pass写到html里边的 lay-verify的属性中
        pass: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ] ,

        //------ 把这个repass  写到 lay-verify="required|pass|repass" 中
        repass:function(value,item){
            // console.log(1);
            // console.log(2);
            // console.log(value,item); value是表单的值  item是表单的dom对象


        //给注册  当中的第一个密码框加个类名  passIpt
        //  console.log($(".passIpt").val());
         if($(".passIpt").val() !== value ){ 
            // 问题
            // 点击 跳转了
            // 一闪而过，缺一个return的操作
            // 解决：  要写return  
            return "两次输入的密码不一致";  
         }

        // // 问题
        // // 点击 跳转了
        // // 一闪而过，缺一个return的操作
        //  // 解决：  要写return  
        //  return "两次输入的密码不一致";


        // 【】位置写错了  不是写在这里边的   写在外边的！！！
        //     //2次密码正确的话，就发送ajax===========
     
        }

    });    
    

    //====== 实现注册功能  ===============
     $("#regiForm").on("submit",function(e){
        // 阻止默认事件
        e.preventDefault();

         //2次密码正确的话，就发送ajax===========
        //看接口文档  注册的
        //在html里边  对应的form中，加name   记得也看接口文档  
        // console.log($("form").serialize());  //title=&title=&username=1&password=123456&title=123456
       
    //------------ []【】 ======    -----------------
        // let data = $("form").serialize();【错误的地方  $("form")】
        let data = $("#regiForm").serialize(); 
        console.log(data);

        
        
        $.ajax({
            // url:"http://ajax.frontend.itheima.net/api/reguser",
            // [02------》 根路径的优化  ajaxConfig.js   和  在login.html 引入]
            url:"/api/reguser",
            type:"POST",
            data,

//------------ []【】 ======    -----------------
            // data:$("form").serialize(),  【错误的地方  $("form")】

            //【！！！！】【【终于知道为什么会在我点击  注册的时候 ，服务器给我返回的是这么奇怪的一个东西
            // 报错的信息：  ER_PARSE_ERROR: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near ' '123456'' at line 1
            // 】】
            //【！！！！】【原因是  我锁获取的form表单的   是错的！！！  没有获取到正确的表单】
         

            success:function(res){
                // console.log(res);  //{status: 1, message: "用户名被占用，请更换其他用户名！"}
    
                if(res.status !== 0){
                    // return alert("注册失败",res.message);
                    return layer.msg(res.message);
                }
                
                // console.log("注册成功");
                //  msg提示  用到的是layui的东西  引入 -1
                //  这个layer  是这么来的   let - 2   
                //一共2处地方要写   layer.msg('只想弱弱提示');
                // layer.msg('只想弱弱提示');
                layer.msg(res.message);

                  
                
                // 注册成功之后，1清空注册里边的内容 
                //【易错点】忘记写#
                $("#regiForm")[0].reset();

                // 2跳转页面 到登录页面【看了：和上边写的  去登录  让他触发一下】
                // location.href("")
                $("#goToLogin").click();
              
            }



        })



     })

     //====== 实现登录功能  ===============
     $("#loginForm").on("submit",function(e){
        e.preventDefault();

        // 获取表单中带有name属性的 
        let data = $(this).serialize();

        $.ajax({
            // [02------》 根路径的优化  ajaxConfig.js   和  在login.html 引入]
            // url:"http://ajax.frontend.itheima.net/api/login",
            url:"/api/login",
            // [02------》]   上传到github

            type: "POST",
            data,
            success:function(res){
                console.log(res); // {status: 0, message: "登录成功！",…}

                if(res.status !== 0 ){
                    //return alert("登录失败")
                    return layer.msg(res.message);
                }

                //[------》day02]  把 token（令牌）存储到本地存储中
                // localStorage.setItem("token",res.token);
                console.log(res.token);
                localStorage.setItem("token",res.token);

                //登录成功 优化
                // layer.msg(res.message);
                // 修改下，这边登录成功之后，立马跳转页面了 

                layer.msg('登录成功，3s后即将跳转', {
                    icon: 1,
                    time: 3000 //2秒关闭（如果不配置，默认是3秒）
                  }, function(){ 
                        //   alert(333);
                        // 跳转页面  +　新建个index.html
                        location.href = "/home/index.html"
                  });   
 
            }

        })


     })
 
    
   


})