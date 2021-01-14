$(function () {

    // 点击注册按钮 显示注册页面  自己隐藏
    $("#link_reg").on("click", function () {
        $(".login-box").hide();
        $(".reg-box").show();
    });

    // 点击登录按钮 显示显示登录页面
    $("#link_login").on("click", function () {
        $(".login-box").show();
        $(".reg-box").hide();
    });


    // 从Layui中获取from对象
    var form = layui.form;
    var layer = layui.layer;
    // 通过form.verify() 函数自定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            var pwd = $(".reg-box [name=password]").val();
            if (pwd != value) {
                return '两次输入的密码不一致！'
            }
        }
    });

    // 监听注册表单的提交事件
    $("#form_reg").on("submit", function (e) {
        e.preventDefault();
        var data = {
            username: $("#form_reg [name=username]").val(),
            password: $("#form_reg [name=password]").val()
        }
        $.post("/api/reguser", data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg("注册成功 请登录!");
            $("#link_login").click();
        })
    });

    // 监听登录表单的提交事件
    $("#form_login").submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("登录失败！")
                }
                layer.msg('登录成功！');
                // 将登录成功得到的 token字符串 ，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                location.href = '/index.html';
            }

        })
    });



})