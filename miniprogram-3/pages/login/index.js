// pages/login/index.js
Page({

 
  data: {

  },

  onLoad: function (options) {

  },

  handleGetUserInfo(e){
    const {userInfo} =e.detail;
    wx.setStorageSync("userinfo", userInfo);
    wx.navigateBack({
      delta: 1
    });
  }
})