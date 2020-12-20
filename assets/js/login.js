$(function () { 
    $("#toreg").on('click', function () { 
        $("#toreg").parent().parent().parent().hide().siblings().show();
    })
    $("#tologin").on('click', function () { 
        $("#tologin").parent().parent().parent().hide().siblings().show();
    })
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.regpage [name=password]').val()
            if (pwd !== value) {
              return '两次密码不一致！'
            }
          }
    })
    //注册表单提交
    $("#regform").on('submit', function (e) { 
        e.preventDefault();
        data = {
            username: $("#regform [name=username]").val(),
            password: $("#regform [name=password]").val()
        }
        $.post('/api/reguser', data, function (res) { 
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！')
            $('#tologin').click()
        })
    })
    $("#loginform").on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) { 
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})