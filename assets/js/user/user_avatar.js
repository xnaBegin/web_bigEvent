$(function () {
    var layer = layui.layer

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image');
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1 / 1,
        // 指定预览区域
        preview: '.img-preview'
    };

    // 1.3 创建裁剪区域
    $image.cropper(options);

    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })

    // 为文件选择框绑定 change 事件
    $('#file').on('change', function (e) {
        var filelist = e.target.files
        console.log(filelist.length);
        if (filelist.length === 0)
            return layer.msg('请选择照片！')
        // 1.拿到用户选择的文件
        var file = e.target.files[0]
        // 2.将文件转化为路径
        var newImagURL = URL.createObjectURL(file)
        // 重新初始化裁剪区域
        $image
            .cropper('destroy') //销毁旧的裁剪区域
            .attr('src', newImagURL) //重新设置图片的路径
            .cropper(options) //重新初始化裁剪区域
        $('#btnUpload').on('click', function () {
            // 拿到用户裁剪后的头像
            var dataURL = $image
                .cropper('getCroppedCanvas', {
                    width: 100,
                    height: 100
                })
                .toDataURL('image/png')
            // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
            // 调用接口，把头像上传到服务器
            $.ajax({
                method: 'post',
                url: '/my/update/avatar',
                data: {
                    avatar: dataURL
                },
                success: function (res) {
                    if (res.status !== 0) return layer.msg('更换头像失败！')
                    layer.msg('更换头像成功！')
                    window.parent.getUserInfo()
                }
            })
        })
    })
})