const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    locationAuthType: app.data.locationAuthType,
    orderList: [], // 订单列表
    // orderList: [
    //   {
    //     id: 0,
    //     list: [{
    //       count: 1,
    //       image: 'https://product-1254231096.cos.ap-chengdu.myqcloud.com/product1.jpg',
    //       name: '商品1',
    //       price: 50.5,
    //     }]
    //   },
    //   {
    //     id: 1,
    //     list: [{
    //       count: 1,
    //       image: 'https://product-1254231096.cos.ap-chengdu.myqcloud.com/product1.jpg',
    //       name: '商品1',
    //       price: 50.5,
    //     },
    //     {
    //       count: 1,
    //       image: 'https://product-1254231096.cos.ap-chengdu.myqcloud.com/product1.jpg',
    //       name: '商品2',
    //       price: 50.5,
    //     }
    //     ]
    //   },
    //   {
    //     id: 2,
    //     list: [{
    //       count: 1,
    //       image: 'https://product-1254231096.cos.ap-chengdu.myqcloud.com/product1.jpg',
    //       name: '商品2',
    //       price: 50.5,
    //     }]
    //   }
    // ], // 订单列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  onTapLogin: function () {
    app.login({
      success: ({ userInfo }) => {
        this.setData({
          userInfo,
          locationAuthType: app.data.locationAuthType
        })
      },
      error: () => {
        this.setData({
          locationAuthType: app.data.locationAuthType
        })
      }
    })
    this.getOrder()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 同步授权状态
    this.setData({
      locationAuthType: app.data.locationAuthType
    })
    app.checkSession({
      success: ({ userInfo }) => {
        this.setData({
          userInfo
        })
        this.getOrder()
      }
    })
  },

  getOrder() {
    wx.showLoading({
      title: '刷新订单数据...',
    })
    qcloud.request({
      url: config.service.orderList,
      login: true,
      success: result => {
        wx.hideLoading()
        let data = result.data
        console.log(data)
        if (!data.code) {
          this.setData({
            orderList: data.data
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '刷新订单数据失败',
          })
        }
      },
      fail: () => {
        wx.hideLoading()
        wx.showToast({
          icon: 'none',
          title: '刷新订单数据失败',
        })
      }
    })
  },

})