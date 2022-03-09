$(function () {
    // 点击 "去注册账号" 的链接
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 点击 "去登录" 的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    var form = layui.form
    var layer = layui.layer

    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],

        repass: function (newpwd) {
            var oldpwd = $('.reg-box [name=password]').val()

            if (newpwd != oldpwd) {
                return '两次密码不一致'
            }
        }
    })

    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.post('/api/reguser', { username: $('#form_reg [name="username"]').val(), password: $('#form_reg [name="password"]').val() }, function (res) {
            if (res.status !== 0) return layer.msg(res.message);
            layer.msg('注册成功,请登录');
            $('#link_login').click()
        })
    })

})

$('#form-login').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
        url: '/api/login',
        type: 'POST',
        data: $(this).serialize(),
        success: function (res) {
            // console.log(res.status);
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('登录成功')
            localStorage.setItem('token', res.token)
            location.href = './index.html'
        }
    })
})