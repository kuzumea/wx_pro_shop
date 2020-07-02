// pages/goods_detail/index.js
import regeneratorRuntime from '../../lib/runtime/runtime'
import { request } from "../../request/index.js"
Page({

  data: {
    goodsObj:{}
  },
  goodsInfo:{},
 
  onLoad: function (options) {
    // console.log(options)
    const {goods_id} = options
    this.getGoodsDetail(goods_id);
  },
  // 发送请求
  async getGoodsDetail(goods_id){
    const goodsObj = await request({url:"/goods/detail",data:{goods_id}});
    // console.log(goodsObj)
    this.goodsInfo = goodsObj;
    this.setData({
      goodsObj:{
        goods_name:goodsObj.goods_name,
        goods_price:goodsObj.goods_price,
        // iphone部分手机不识别webp图片格式 自己临时改
        goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:goodsObj.pics
      }
    })
  },
  // 图片预览
  handlePreviewImage(e){
    const urls = this.goodsInfo.pics.map(v=>v.pics_mid);
    const current = e.currentTarget.dataset.url;
    // console.log(current)
    wx.previewImage({
      current,
      urls
    });
  },
  // 加入购物车
  handleCardAdd(){
    // 获取缓存中的购物车数组
    let cart = wx.getStorageSync("cart")||[];
    // 判断商品对象是否在数组中，index 返回-1不存在
    let index = cart.findIndex(v=>v.goods_id === this.goodsInfo.goods_id);
    if(index===-1){
      // 不存在
      this.goodsInfo.num = 1;
      this.goodsInfo.checked=true;
      cart.push(this.goodsInfo);
    }else{
      // 存在num++
      cart[index].num++;
    }
    // 重新添加缓存
    wx.setStorageSync("cart", cart);
    // 弹窗
    wx.showToast({
      title: '加入成功',
      icon: 'success',     
      mask: true, 
    });
  }

})