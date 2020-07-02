// pages/goods_list/index.js
// 触底发起请求，下拉刷新页面
import regeneratorRuntime from '../../lib/runtime/runtime'
import { request } from "../../request/index.js"
Page({

  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      },
    ],
    goodsList: []
  },
  // 接口参数
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  // 总页数
  totalPages: 1,

  onLoad: function (options) {
    console.log(options)
    this.QueryParams.cid = options.cid || "";
    this.QueryParams.query = options.query || "";
    console.log(this.QueryParams.query)
    this.getGoodsList();
  },
  // 获取商品列表数据
  async getGoodsList() {
    const res = await request({ url: "/goods/search", data: this.QueryParams })
    // console.log(this.QueryParams)
    // 获取总条数
    const total = res.total;
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize)
    this.setData({
      // 拼接数据
      goodsList: [...this.data.goodsList, ...res.goods],
    })
    // 关闭下拉刷新
    wx.stopPullDownRefresh();
  
  },


  // 子组件传递过来
  handletabsItemChange(e) {
    console.log(e)
    const { index } = e.detail;
    // 修改原数组
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  },
  //  滚动条触底事件
  onReachBottom() {
    console.log("xxx")
    if (this.QueryParams.pagenum >= this.totalPages) {
      wx.showToast({
        title: '没有下一页数据了',
      });
    } else {
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },
  // 下拉刷新事件
  onPullDownRefresh(){
    this.setData({
      goodsList:[]
    });
    this.QueryParams.pagenum = 1;
    this.getGoodsList();
  }

})