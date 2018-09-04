const qcloud = require("../../vendor/wafer2-client-sdk/index.js")
const config = require('../../config.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '',
  },
  onLoad(){
    
  },
  onTapLogin(){
    qcloud.setLoginUrl(config.service.loginUrl)
    qcloud.login({
      success: result => {
        console.log("success")
        console.log(result)
      },
      fail: result => {
        console.log("fail")
        console.log(result)
      }
    })
    this.doQcloudLogin({
      success: ({ userInfo }) => {
        this.setData({
          userInfo
        })
      }
    })
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
  doQcloudLogin({ success, error }) {
    // 调用 qcloud 登陆接口
    qcloud.login({
      success: result => {
        if (result) {
          let userInfo = result
          success && success({
            userInfo
          })
        } else {
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          this.getUserInfo({ success, error })
        }
      },
      fail: () => {
        error && error()
      }
    })
  },
  getUserInfo({ success, error }) {
    qcloud.request({
      url: config.service.requestUrl,
      login: true,
      success: result => {
        let data = result.data
        if (!data.code) {
          let userInfo = data.data
          success && success({
            userInfo
          })
        } else {
          error && error()
        }
      },
      fail: () => {
        error && error()
      }
    })
  },
})