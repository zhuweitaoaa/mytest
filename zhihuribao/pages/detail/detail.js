// pages/detail/detail.js
var WxParse = require('../../wxParse/wxParse.js')
Page({
  data: {
    art:{}
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '详情页面'
    })
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/' + options.id,
      success:function(res){
        that.setData({
            art:res.data
        })
        // console.log(res)
        var article = that.data.art.body;
        WxParse.wxParse('article', 'html', article, that); 
      }
    })
  },
})