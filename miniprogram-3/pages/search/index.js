// pages/search/index.js
import regeneratorRuntime from '../../lib/runtime/runtime'
import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    isFocous:false
  },
  TimeId :-1,
  handleInput(e){
    const {value} = e.detail;
    if(!value.trim()){
      this.setData({
        isFocous:false,
        goods:[],
        inputValue:""

      })
      return;
    }
    this.setData({
      isFocous :true
    })
    clearTimeout(this.TimeId);
    this.TimeId =setTimeout(() => {
      this.query(value)
    }, 1000);
  },
  async query(query){
    const goods = await request({url:"/goods/qsearch",data:{query}});
    this.setData({
      goods
    })
  },
  handleCancel(){
    this.setData({
      isFocous :false,
      goods:[],
      inputValue:""

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