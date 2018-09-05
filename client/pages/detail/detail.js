const qcloud = require("../../vendor/wafer2-client-sdk/index")
const config = require('../../config')



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
  },
  buy() {
    wx.showLoading({
      title: '商品购买中...',
    })
    let product = Object.assign({
      count: 1
    }, this.data.product)
    qcloud.request({
      url: config.service.addOrder,
      login: true,
      method: 'POST',
      data: {
        list: [product]
      },
      success: result => {
        wx.hideLoading()
        let data = result.data
        if (!data.code) {
          wx.showToast({
            title: '商品购买成功',
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '商品购买失败',
          })
        }
      },
      fail: () => {
        wx.hideLoading()
        wx.showToast({
          icon: 'none',
          title: '商品购买失败',
        })
      }
    })
  },

})