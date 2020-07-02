// pages/index/index.js
import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图
    swiperList: [],
    catesList:[],
    // 楼层
    floorList:[]
  },
  onLoad: function (options) {
    // // 发送异步请求 es6promise解决回调
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result)=>{
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   }
    // });
   this.getSwiperList();
   this.getCatesList();
   this.getFloorList();
  },
  // 获取轮播图数据
  getSwiperList(){
    request({url: "/home/swiperdata" })
    .then(result => {
      
      result.forEach(v => {
        v.navigator_url = v.navigator_url.replace('main','index')
        // console.log(v.navigator_url)
      });
      this.setData({
        swiperList: result
      })
    })
  },
   // 获取 分类导航数据
   getCatesList(){
    request({ url: "/home/catitems" })
    .then(result => {
      
      this.setData({
        catesList: result
      })
    })
  },
   // 获取 楼层数据
   getFloorList(){
    request({ url: "/home/floordata" })
    .then(result => {
      result.forEach(v => {
        // v.navigator_url = v.navigator_url.replace('main','index')
        v.product_list.forEach(v=>{
          v.navigator_url= v.navigator_url.replace('?','/index?')
        })
      });
      console.log(result)
      this.setData({
        floorList: result
      })
    })
  }
})