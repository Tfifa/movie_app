//index.js
var util = require('../../utils/util.js')

//获取应用实例
var app = getApp()
Page({

  data: {
    list: [],
    hidden: false,
    imgUrls: [],


    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000
  },

  onLoad: function () {
    console.log('onLoad')
    this.getMovieList(0, 5);
  },

  /**
   * 网络请求数据
   */
  getMovieList: function () {

    var that = this
    //调用方法获取电影列表
    wx.request({
      url: app.globalData.backend_url + '/movie/page',
      data: {
        page: that.data.page + 1,
        size: that.data.size
      },
      success: function (res) {
        let resp = res.data.data;
        // console.log(resp)

        var result = res.data.data.data;
        var arr = [];
        var imgs = [];


        //合并之前的数据
     
        for (var i = 0; i < result.length; i++) {
          imgs.push(result[i].img);

          arr.push({
            movie_id: result[i].id, img: result[i].img,
            title: result[i].title, summary: result[i].summary,
            show_time: util.formatTime(new Date(result[i].show_time)),
            score: result[i].score,
            watch_count: result[i].watch_count
          })
        }


        that.setData({
          list: arr,
          hidden: true,
          imgUrls: imgs,
        })
      }
    })

  }

})
