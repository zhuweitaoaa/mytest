var app = getApp()
var utils = require('../../utils/util.js')
Page({
  data:{
    list: [],
    duration: 2000,
    autoplay: true,
    interval: 3000,
    loading: false,
    plain: false
  },
  onLoad: function () {
    var that = this
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/latest',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // console.log(res)
        that.setData({
          banner: res.data.top_stories,
          list: [{ header: '今日热闻' }].concat(res.data.stories)
        })
      }
    })
    this.index = 1
  },
  loadMore:function(){
    var date = this.getNextDate()
    var that = this
    this.setData({ loading:true})
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/before/' + (Number(utils.formatDate(date)) + 1),
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // console.log('http://news-at.zhihu.com/api/4/news/before/'+(Number(utils.formatDate(date)) + 1))
        // http://news-at.zhihu.com/api/4/news/before/20180628
        that.setData({
          loading:false,
          list: that.data.list.concat([{ header: utils.formatDate(date, '-') }]).concat(res.data.stories)
        })
      }
    })
  },
  getNextDate: function () {
    var now = new Date()
    now.setDate(now.getDate() - this.index++)
    console.log(now)
    return now
  },
})