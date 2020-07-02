let ajaxTime = 0;
export const request=(params)=>{
  ajaxTime++
  // 显示加载中
  wx.showLoading({
    title:"loading",
    mask: true,
  });
  // 定义公共url
  const baseUrl ="https://api-hmugo-web.itheima.net/api/public/v1"
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      url:baseUrl+params.url,
      success:(result)=>{
        resolve(result.data.message);
      },
      fail:(err)=>{
        reject(err);
      },
      complete:()=>{
        ajaxTime--;
        if(ajaxTime === 0){
          wx.hideLoading();
        }
      }
    })
  })
}