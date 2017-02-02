var app = getApp()

Page({
    data: {
        inputShowed: false,
        inputVal: ""
    },

    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },

    hideInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false
        });
    },

    clearInput: function () {
        this.setData({
            inputVal: ""
        });
    },

    //输入事件框绑定函数
    inputTyping: function (e) {
        console.info(e.detail.value)
        //发送网络请求，获取数据
        var that = this
        //调用方法获取电影列表
        wx.request({
            url: app.globalData.backend_url + '/movie/search',
            data: {
                title: e.detail.value
            },
            success: function (res) {
                //获取响应结果
                var result = res.data.data;
                console.info(result)
                //声明电影数组列表
                var movie_list = [];
                for (var i = 0; i < result.length; i++) {
                    //获取页面需要看到电影对象
                    movie_list.push({
                        movie_id: result[i].id,
                        title: result[i].title
                    })
                }
                //把处理的数据仓库
                that.setData({
                    inputVal: e.detail.value,
                    list: movie_list
                });
            }
        })
    }


    
});