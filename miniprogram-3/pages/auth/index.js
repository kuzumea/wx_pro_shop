// pages/auth/index.js
import { request } from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime'
import { login } from "../../utils/asyncWx.js"
Page({

  data: {

  },

  onLoad: function (options) {

  },

  //  获取用户信息
  async handleGetUserInfo(e) {
    // 获取用户操作
    try{
    const { encryptedData, rawData, iv, signature } = e.detail;
    const { code } = await login()
    // console.log(code)
    // 发送请求获取token
    const loginParams = {
      encryptedData, rawData, iv, signature, code
    }
    // 企业账号才能请求成功
    const { token } = await request({ url: "/users/wxlogin", data: loginParams, method: "post" });
    // console.log(res)
    wx.setStorageSync("token", token);
    WX.navigateBack({
      delta: 1
    });
  } catch(error) {
  }

}
})