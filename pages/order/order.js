//index.js
var util = require('../../utils/util.js')

//获取应用实例
var app = getApp()
Page({

  data: {
    list: []
  },
  //页面加载的时候自动调用
  onLoad: function () {
    console.log('onLoad')
    this.getOrderList();
  },

  //网络请求数据
  getOrderList: function () {
        let param = {};
        //获取登录的token
        param.token = wx.getStorageSync('token') || "";
        console.info(param);
    var that = this
    //调用方法获取电影列表
    wx.request({
      url: app.globalData.backend_url + '/order/list',
      data: param,
      success: function (res) {
        let resp = res.data.data;
       
        console.info(resp)
        that.setData({
                   list:resp.pageData
                });

      }
    })
  },
  //跳转到评论界面
  toComment:function(e){
    console.info("订单编号:"+e.target.id)
    wx.navigateTo({
        url: '../comment/comment?order_id='+e.target.id
      })
  }

  
})
