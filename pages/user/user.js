//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {}
  },
  //事件处理函数
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
      let param = e.detail.value;
      param.token = wx.getStorageSync('token') || "";
      //吐司弹窗提示
       wx.showToast({
      title: '修改中',
      icon: 'loading',
      duration: 2000 })

        //发送网络请求，获取数据
        var that = this
        //更新用户信息
        wx.request({
            url: app.globalData.backend_url + '/user/bindinfo',
            data: e.detail.value,
            method:'POST',
            success: function (res) {
              console.info(res)
               wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 2000 })

            }
        })

  },





  onLoad: function(){
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
