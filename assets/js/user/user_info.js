$(function(){
    // form是layui的东西，所以let 
    let form = layui.form;
    let layer = layui.layer;

    // 调用
    getUserInfo();

    // 封装成函数
    function getUserInfo(){
        //发送ajax请求  来获取用户的基本信息
        $.ajax({
            url:"/my/userinfo",
            success:function(res){
                // console.log(res);
    
                console.log(res.data);
                // 给表单赋值    [2]form是layui的东西，所以let   [3]name  一共3处  username  nickname  email
                // 注意：需要按照name名字一一对用 ====》去给表单设置name属性
                form.val("form", res.data);  // [1]form来自于 html文件里 。   lay-filter=""   值 写form   （写别的值也可以）   
            }
        })

    }


    // 实现重置功能
    // reset按钮是可以表单的重置（情况效果）  不是需要的效果
    // 做法：点击重置按钮的时候，重新发送ajax请求来获取到用户的信息填充到form中
    $("#resetBtn").click(function(e){
        e.preventDefault();


        // 重新发送ajax请求来获取用户的信息填充到form中、
        // 之前发过   把它封装成函数
        // 调用
        getUserInfo();
        
    })


    // 实现表单的提交功能
    $(".layui-form").on("submit",function(e){
        e.preventDefault();

        // id   nickname  email   【注意这个id  html当中没有。有套路===》 复制+id】 
        let data = $(this).serialize();
        console.log(data);
        $.ajax({
            url :　"/my/userinfo",
            type: "POST",
            data,
            success: function(res){
                console.log(res);
                if(res.status !== 0){
                    return layer.msg("修改用户信息失败！")
                }
                layer.msg("修改用户信息成功");

                // 更新index页面左侧导航的名字
                // window.parent 来获取到父页面（index页面）
                // 注意点：父页面的getUserInfo函数需要是全局的
                window.parent.getUserInfo();
            }
        })
    })

})