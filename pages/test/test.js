// pages/test/test.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coupons: [],
    username: '',
    password: '',
    isLoading: false,
    price: 0,
    count: 0,
    expiredCount: 0
  },

  onChange(event) {
    // event.detail 为当前输入的值
    let count = 0;
    this.data.coupons.forEach(el => {
      if (event.detail >= el.minimum_amount) {
        count++
      }
    })
    this.setData({
      count: count
    })
  },

  onSubmit() {
    wx.navigateTo({
      url: '/pages/checkout/checkout?price=' + this.data.price,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
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