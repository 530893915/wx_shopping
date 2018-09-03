const qcloud = require("../../vendor/wafer2-client-sdk/index.js")
const config = require('../../config.js')

Page({
  data:{
    productList: [], // 商品列表
  },
  onLoad(){
    this.getProductList()
  },
  getProductList(){
    wx.showLoading({
      title: '商品数据加载中...',
    })
    qcloud.request({
      url: config.service.productList,
      success: result => {
        wx.hideLoading()
        if(!result.data.code){
          this.setData({
            productList: result.data.data
          })
        }else{
          wx.showToast({
            title: '加载失败！'
          })
        }
      },
      fail: result => {
        wx.showToast({
          title: '加载失败！'
        })
        wx.hideLoading()
      }
    })
  }
})