// pages/cart/index
/*
  1哪些人哪些帐号可以实现微信支付
1企业帐号
2企业帐号的小程序后台中必须给开发者添加上白名单
1一个appid 可以同时绑定多个开发者
2这些开发者就可以公用这个appid 和它的开发权限

*/

import { request } from "../../request/index.js"

import regeneratorRuntime from '../../lib/runtime/runtime'
import { openSetting, getSetting, chooseAddress, showModal, showToast } from "../../utils/asyncWx"
Page({

  data: {
    address: {},
    cart: [],

    totalPrice: 0,
    totalNum: 0
  },

  onLoad: function (options) {

  },
  onShow() {
    const address = wx.getStorageSync("address");
    let cart = wx.getStorageSync("cart") || [];
    cart = cart.filter(v => v.checked)
    this.setData({
      address
    })

    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {

      totalNum += v.num;
      totalPrice += v.num * v.goods_price;

    });

    this.setData({
      cart,
      totalPrice, totalNum,
      address
    });

  },
  async handleOrderPay() {
    const token = wx.getStorageSync("token");
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index',
      });
      return;
    }
    //3创建订单
    // 3.1准备请求头参数
    const header = { Authorization: token };
    // 3.2准备请求体参数
    const order_price = this.data.totalPrice;
    const consignee_addr = this.data.address.all;
    const cart = this.data.cart;
    let goods = [];
    cart.forEach(V => goods.push({
      goods_id: v.goods_id,
      goods_number: v.num,
      goods_price: v.goods_price
    }))
    const orderParams = { order_price, consignee_addr, goods };
    // 4准备发送请求创建订单获取订单编号
    const {order_number} = await request({ url: "/my/orders/create", method: "POST", data: orderParams, header: header });

  }


})