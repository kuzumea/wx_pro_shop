// pages/cart/index.js
import regeneratorRuntime from '../../lib/runtime/runtime'
import { openSetting, getSetting, chooseAddress, showModal, showToast } from "../../utils/asyncWx"
Page({

  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },

  onLoad: function (options) {

  },
  onShow() {
    const address = wx.getStorageSync("address");
    const cart = wx.getStorageSync("cart") || [];
    // const allChecked = cart.length ? cart.every(v=>v.checked):false;
    this.setData({
      address
    })
    this.setCart(cart);
  },
  // 点击收获地址
  async handleChooseAddress() {
    // 1获取权限状态
    // wx.getSetting({
    //   success: (result)=>{
    //     const scopeAddress = result.authSetting["scope.address"];
    //     if(scopeAddress==true || scopeAddress === undefined){
    //       wx.chooseAddress({
    //         success: (result)=>{

    //         }       
    //       });
    //     }else{
    //       // 以前拒绝过，诱导用户打开授权页面
    //       wx.openSetting({
    //         success: (result)=>{
    //           // 调用收获地址
    //           wx.chooseAddress({
    //             success: (result)=>{             
    //             }       
    //           });
    //         }
    //       });
    //     }
    //   },
    //   fail: ()=>{},
    //   complete: ()=>{}
    // });
    try {
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      // 判断权限状态
      if (scopeAddress === false) {
        // 调用收货地址api
        await openSetting();
      }
      const address = await chooseAddress();
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      wx.setStorageSync("address", address);
    } catch (error) {
      console.log(error);
    }
  },
  // 商品选中
  handleItemChange(e) {
    const goods_id = e.currentTarget.dataset.id;
    // 获取购物车数组
    let { cart } = this.data;
    // 找到被修改的对象
    let index = cart.findIndex(v => v.goods_id === goods_id);
    cart[index].checked = !cart[index].checked;
    // 重新设置会data和缓存中
    this.setCart(cart);

  },
  // 设置购物车状态同时 重新计算 
  setCart(cart) {
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalNum += v.num;
        totalPrice += v.num * v.goods_price;
      } else {
        allChecked = false;
      }
    });
    allChecked = cart.length != 0 ? allChecked : false;
    this.setData({
      cart,
      totalPrice, totalNum, allChecked
    });
    wx.setStorageSync("cart", cart);
  },
  // 商品全选和反选
  handleItemAllCheck() {
    let { cart, allChecked } = this.data;
    allChecked = !allChecked;
    cart.forEach(v => v.checked = allChecked)
    // 修改后的值填充回data或缓存中
    this.setCart(cart);
  },
  // 商品数量编辑功能
  async handleItemNumEdit(e) {
    // 获取传递过来的参数
    const { operation, id } = e.currentTarget.dataset;
    let { cart } = this.data;
    const index = cart.findIndex(v => v.goods_id === id);
    // 判断是否要执行删除
    if (cart[index].num === 1 && operation === -1) {
      const res = await showModal();
      if (res.confirm) {
        cart.splice(index, 1);
        this.setCart(cart);
      }
    } else {
      cart[index].num += operation;
      this.setCart(cart);
    }
  },
  // 结算
  async handlePay() {
    const { address, totalNum} = this.data;
    if (!address.userName) {
      await showToast({ title: "您还没有选择收货地址" })
      return;
    }
    if (totalNum===0) {
      await showToast({ title: "您还没有选择商品" })
      return
    }
    wx.navigateTo({
      url: '/pages/pay/index',
     
    });
  }
})