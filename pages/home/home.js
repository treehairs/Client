const { isLogin } = require("../../utils/util")

// pages/home/home.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    products: [],
  },

  getData() {
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.url + 'products',
      success: res => {
        const arr = Object.values(res.data.data)
        wx.hideLoading()
        this.setData({
          products: res.data.data,
        })
      },
      fail: err => {
        wx.hideLoading()
        wx.showToast({
          title: '获取数据失败',
          icon: 'none'
        })
      }

    })
  },

  onClick(item){
    wx.navigateTo({
      url: `/pages/product/product?product_id=${item.target.dataset.id}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getData()
    wx.stopPullDownRefresh();
    isLogin()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.getData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})