// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    // userInfo: {
    //   nickName: "优达学城",
    //   avatarUrl: "/images/image.png",
    // },
  },
  onLoad(){
  },
  onTapAddress() {
    wx.showToast({
      icon: 'none',
      title: '此功能暂未开放'
    })
  },
  onTapKf() {
    wx.showToast({
      icon: 'none',
      title: '此功能暂未开放'
    })
  },
})