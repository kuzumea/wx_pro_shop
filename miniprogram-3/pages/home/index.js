// pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [
      '../images/home/swipBar/1.jpg',
      '../images/home/swipBar/2.jpg',
      '../images/home/swipBar/3.jpg',
      '../images/home/swipBar/4.jpg',
    ],
    tabList:[
      '全部',
      '生活用品',
      '二手书籍',
      '电子产品',
      '跑腿订单',
      '化妆护肤',
      '代课',
      '其他'
    ],
    switchIndex:0
  },
  switchBarClick(e){
    // console.log(e.target);
    const {index} = e.target.dataset
    this.setData({
      switchIndex: index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})