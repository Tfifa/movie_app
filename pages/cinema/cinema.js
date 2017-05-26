var util = require('../../utils/util.js')

//获取应用实例
var app = getApp()

Page({
    data: {

        movie_id : "",
        cinema_list:[]
       
    },


    //进来页面获取电影主键
    onLoad: function (e) {
        console.info(e)
        //临时数据
        this.data.movie_id = e.id;
        //获取影院信息
        this.queryCinemaInfo(e);  
       
    },


    //查询电影信息
    queryCinemaInfo:function(e){
    var that = this;

    wx.request({
            url: app.globalData.backend_url + '/cinema/query',
            data: {
                movie_id: e.id
            },
            success: function (res) {
                //获取响应结果
                var result = res.data.data;
                console.info(result);

                //设置数据仓库    
                 that.setData({
                    cinema_list: result
                 });
                
            }
        })


    },




    bindPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
         
        this.setData({
            index: e.detail.value
         
        })
    }
});