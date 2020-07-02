// pages/category/index.js
import regeneratorRuntime from '../../lib/runtime/runtime'
import { request } from "../../request/index.js"
Page({

  data: {
    leftMenuList: [],
    rightContent: [],
    // 被点击的左侧的菜单
    currentIndex: 0,
    scroolTop: 0
  },
  // 接口返回数据
  Cates: [],
  onLoad: function (options) {
    // 判断本地有没有旧数据，没有发送，有存
    // this.getCates()
    // 获取本地数据
    //     1写代码的方式不一一样了
    // web:
    // localStorage . setItem( "key" , "value") localstorage . getItem ( "key" )
    // 小程序中: wx . setStorageSync ("key", "value"); wWx . getStorageSync ("key" );
    // 2:存的时候有没有做类型转换
    // web:
    // 不管存入的是什么类型的数据，最终都会先调用以下toString( ) ,把数据变成了字符串再存入进去
    // 小程序:不存在类型转换的这个操作存什么类似的数据进去，获取的时候就是什么类型

    const Cates = wx.getStorageSync('cates');
    if (!Cates) {
      this.getCates();
    } else {
      // 定义过期时间
      if (Date.now() - Cates.time > 1000 * 60 * 5) {
        this.getCates()
      } else {
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v => v.cat_name);
        // 构造右侧菜单数据
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }


  },
  // 获取分类数据
  async getCates() {
    // request({ url: "/categories" })
    //   .then(res => {
    //     console.log("xxxxx")
    //     this.Cates = res.data.message;
    //     // 存本地
    //     wx.setStorageSync("cates",{time:Date.now(),data:this.Cates})
    //     // 构造左侧菜单数据
    //     let leftMenuList = this.Cates.map(v => v.cat_name);
    //     // 构造右侧菜单数据
    //     let rightContent = this.Cates[0].children;
    //     this.setData({
    //       leftMenuList,
    //       rightContent
    //     })
    //   })
    const res = await request({ url: "/categories" })
    this.Cates = res;

    // 存本地
    wx.setStorageSync("cates", { time: Date.now(), data: this.Cates })
    // 构造左侧菜单数据
    let leftMenuList = this.Cates.map(v => v.cat_name);
    // 构造右侧菜单数据
    let rightContent = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    })
  },
  // 左侧菜单点击事件
  handleItemTap(e) {
    // 获取索引，给data currentindex赋值 根据索引渲染数据
    const { index } = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      scroolTop: 0
    })
  }

})