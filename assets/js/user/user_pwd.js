// 入口函数
$(function(){
    let form = layui.form;
    let layer = layui.layer;
    // 给form添加自定义校验规则
    form.verify({
        // 密码的校验   写在2处  原密码 +  新密码
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],

        //   新旧密码不能一样。   把校验规则  放到新密码上
        oldPass: value =>{
            console.log(value); //新密码输入框的值

            // 获取原密码的值
            let oldPwd = $("[name=oldPwd]").val();
            if(value === oldPwd){
                return "新旧密码不能一样";

            }
        },

        // 两次输入的新密码必须相同  newPass写在再次确认密码那边
        newPass: (value) => {
            // 获取到新密码的内容  和 确认密码的value作比较
            let newPwd = $("[name=newPwd]").val();
            if(newPwd !== value){
                return "两次输入的新密码不一样";
            }
        }


    })

    // 发送ajax请求实现密码重置
    $(".layui-form").submit(function(e){
        e.preventDefault();

        let data = $(this).serialize();
        console.log(data);  //  打印出  oldPwd=123456&newPwd=1234567&rePwd=1234567（rePwd这个可有可无 因为接口文档没有提到）   

        $.ajax({
            url: "/my/updatepwd",
            type: "POST",
            data, //忘记写  导致报错
            success:function(res){
                console.log(res);  // {status: 0, message: "更新密码成功！"}
                if(res.status !== 0){
                   return layer.msg("更新密码失败！" + res.message)
                }

                layer.msg("更新密码成功！")

                // 清空
                
                $(".layui-form")[0].reset();

            }

        })

    })



    

})