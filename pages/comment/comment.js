//index.js
//获取应用实例
var app = getApp()
Page({
    data: {

        order_id: 0,// 默认订单编号
        score: 9, //默认评分
        radioItems: [
            { name: '好评', value: '9' },
            { name: ' 中评', value: '6' },
            { name: ' 差评', value: '3' },
        ]

    },



    //监听单选按钮值改变事件
    radioChange: function (e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value);

        var radioItems = this.data.radioItems;
        for (var i = 0, len = radioItems.length; i < len; ++i) {

            if (radioItems[i].value == e.detail.value) {
                //给对应的选中的选项打上钩
                radioItems[i].checked = true;
                //给data对象的score评分赋值
                this.data.score = radioItems[i].value;
            } else {

                radioItems[i].checked = false;
            }
        }

        //重新设置data对象
        this.setData({
            radioItems: radioItems
        });
    },


    //进来页面获取订单主键
    onLoad: function (e) {
        console.info(e)
        //this.data.order_id = e.order_id;
        //临时数据
        this.data.order_id = 66;
    },

    //评论事件处理函数
    formSubmit: function (e) {
       
         console.log('form发生了submit事件，携带数据为：', e.detail.value)
        //组装参数和值    
        let param = e.detail.value;
        param.order_id = this.data.order_id;
        param.score = this.data.score;
        console.info(param)

        //获取登录的token
        param.token = wx.getStorageSync('token') || "";

        //发送网络请求，获取数据
        var that = this
        wx.request({
            url: app.globalData.backend_url + '/comment/add',
            data: e.detail.value,
            method: 'POST',
            success: function (res) {
                console.info(res)

                //评论成功提示
                if (res.data.errno == 0) {
                    wx.showToast({
                        title: '评论成功',
                        icon: 'success',
                        duration: 2000
                    })
                } else {
                    //评论失败提示
                    wx.showToast({
                        title: '评论失败',
                        icon: 'loading',
                        duration: 1000
                    })

                };
                
            }
            


        })

    }

});