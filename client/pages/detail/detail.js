const qcloud = require("../../vendor/wafer2-client-sdk/index.js")
const config = require('../../config.js')

Page({
  data: {
    product: {}
  },
  onLoad(options){
    this.getProduct(options.id)
  },
  getProduct(id){
    wx.showLoading({
      title: '商品数据加载中...',
    })
    qcloud.request({
      url: config.service.productDetail + id,
      success: result => {
        wx.hideLoading()
        if (!result.data.code) {
          this.setData({
            product: result.data.data
          })
        } else {
          setTimeout(()=>{
            wx.navigateBack()
          },2000)
        }
      },
      fail: result => {
        wx.hideLoading()
        setTimeout(() => {
          wx.navigateBack()
        }, 2000)
      }
    })
  }
})