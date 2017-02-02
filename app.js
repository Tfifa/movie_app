//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取token数据
    var token = wx.getStorageSync('token') || "";
    console.info("从本地缓存中获取token数据");

    if (token == null || token == "") {
      var that = this;
      console.info("token is null");
      this.login();
    //token不为空，则根据token查询用户信息保存到全局数据里面
    } else {
      console.info("token is not null");
      this.queryUserInfo(token);
    }
  },

  //获取用户信息
  getUserInfo: function (cb) {

    //如果全局用户信息存在，则直接设置数据
    if (this.globalData.userInfo) {
       console.info("全局用户信息存在，则直接设置数据")
       typeof cb == "function" && cb(this.globalData.userInfo)

      //不存在则调用登录接口
    } else {
      console.info("本地全局用户数据不存在，调用登录接口")
      this.login(cb);
    }
  },


  //登录接口,登录成功后设置，全局用户信息
  login: function (cb) {
    var that = this;

    wx.login({
      //获取授权码code
      success: function (e) {
        console.info("授权码code")
        console.info(e.code)
        //获取用户信息接口 
        wx.getUserInfo({
          success: function (res) {
            that.globalData.userInfo = res.userInfo;
            console.info(res.userInfo)
            //调用后端登录接口 
            wx.request({
              url: that.globalData.backend_url + '/user/login',
              data: {
                code: e.code,
                nickname: res.userInfo.nickName,
                head_img: res.userInfo.avatarUrl

              },
              //登录成功，则保存token到本地
              success: function (res) {
                
                if (res.data.errno == 0) {
                  console.info("登录成功，则保存token到本地 ")
                  wx.setStorageSync('token', res.data.data)
                  that.queryUserInfo(res.data.data);

                }
              }
            })

            typeof cb == "function" && cb(that.globalData.userInfo)
          }
        })
      }
    })
  },


  //根据token获取用户信息，token即是登录凭证
  queryUserInfo:function(token){
    var that = this;

     if(token!="" && token!=null){

         wx.request({
              url: that.globalData.backend_url + '/user/query',
              data: { token:token },
              method:'POST',
              //登录成功，则保存token到本地
              success: function (res) {
                
                console.info(res.data.errno)
                if (res.data.errno == 0) {
                  console.info("数据库获取用户信息成功，保存到全局数据 ")
                  var result = res.data.data;
                  var user = {};
                  user.nickName = result.nickname ;
                  user.avatarUrl = result.head_img ;
                  user.age = result.age;
                  user.phone = result.phone; 
                  //设置全局用户数据
                  that.globalData.userInfo = user;  
                }
              }
            })
     }
  },


  //全局数据
  globalData: {
    userInfo: null,
    backend_url: "http://127.0.0.1:8360"
  }
})