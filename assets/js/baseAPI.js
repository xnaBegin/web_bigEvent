// 每次调用 $.get() 或者 $.post() 或 $.ajax() 的时候
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给 ajax 提供的配置对象
$.ajaxPrefilter(function (options) {
    // 在发起真正的 ajax 请求之前， 同一拼接请求的根路径
    options.url = 'http://127.0.0.1:3007' + options.url

    // 统一为有权限的接口，设置 headers 请求头
    if (options.url.indexOf('/my/' !== -1)) {
        options.headers = {
            // 没有键取空字符串
            Authorization: localStorage.getItem('token') || '',
        }
    }

    // 全局统一挂载 complete 回调函数
    options.complete = function (res) {
        // 不论成功还是失败，最终都会调用 complete 回调函数
        // console.log('执行了complete');
        // 在 complete 回调函数中,可以使用 res. responseJSON拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token')
            // 2. 重新跳转到登录页面
            location.href = '/login.html'

        }
    }
})