//index.js
var util = require('../../utils/util.js')

//获取应用实例
var app = getApp()
Page({

  data: {

     inputShowed: false,
      inputVal: "",

    list: [],
    hidden: false,
    imgUrls: [],
     page:0,
     size:5,
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000
  },
  //页面加载的时候自动调用
  onLoad: function () {
    console.log('onLoad')
    this.getMovieList();
  },

  //网络请求数据
  getMovieList: function () {

    var that = this
    //调用方法获取电影列表
    wx.request({
      url: app.globalData.backend_url + '/movie/page',
     data:{
      page:that.data.page+1,
      size:that.data.size
     },
      success: function (res) {
        var resp = res.data.data;
        //获取响应结果
        var result = res.data.data.data;
        //声明电影数组列表
        var movie_list = [];
        var imgs = [];

        if(resp.currentPage >= resp.totalPages){
          console.info("没有更多电影了");
          return;
        }


        Array.prototype.push.apply(movie_list,that.data.list);

        for (var i = 0; i < result.length; i++) {
          imgs.push(result[i].img);

          //获取页面需要看到电影对象
          movie_list.push({
            movie_id: result[i].id, img: result[i].img,
            title: result[i].title, summary: result[i].summary,
            show_time: util.formatTime(new Date(result[i].show_time)),
            score: result[i].score,
            watch_count: result[i].watch_count
          })
        }

        //把处理的数据仓库
        that.setData({
          list: movie_list,
          hidden: true,
          imgUrls: imgs,
          page:res.data.data.currentPage
        })

      }
    })
  },
  load:function(){
    console.info("load more")
    this.getMovieList();
  },
  refresh:function(){
    console.info("refresh more")
  },








 showInput: function () {
    console.info(1111)
    wx.navigateTo({
  url: '../search/search'
})

    }

})
