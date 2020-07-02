// promise的getsetting
export const getSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => { }
    });
  })
}

// promise的 chooseAddress
export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => { }
    });
  })
}
// promise的 openSetting
export const openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => { }
    });
  })
}

// promise的 showModal
export const showModal = () => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '提示',
      content: '是否删除？',
      success: (result) => {
        resolve(result)
      },
      fail:(err)=>{
        reject(err)
      }
      
    });
  })
}


// promise的 showToast
export const showToast = ({title}) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: title,
      success: (result) => {
        resolve(result)
      },
      fail:(err)=>{
        reject(err)
      }
      
    });
  })
}

// promise的 login
export const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout:10000,
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      },
      complete: ()=>{}
    });
  })
}
