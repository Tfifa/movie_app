//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    movie_detail:{},//声明电影对象
    actor_names:"", // 声明演员名称
    comment_list:[] //声明评论列表
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  //获取当前电影id
  onLoad: function (e) {
    console.log('onLoad')
    console.info(e)

    var that = this
    var movie_id=1;
      wx.request({
            url: app.globalData.backend_url + '/movie/query',
            data: {
                movie_id: movie_id
            },
            success: function (res) {
                //获取响应结果
                var result = res.data.data;
                console.info(result)
                var movie_detail = result.movie_detail;
                var actor_list = result.actor_list;
                var comment_list = result.comment_list;
                var actor_names = "";  
                //处理演员名称
                    for (var i = 0; i < actor_list.length; i++) {

                        if(i<3){
                           console.info(actor_list[i].name)
                          actor_names += actor_list[i].name+"/"
                        }

                    }

                //设置数据仓库    
                that.setData({
                    movie_detail:movie_detail,
                    actor_list:actor_list,
                    comment_list:comment_list,
                    actor_names:actor_names
                });
                
            }
        })



  }








})
