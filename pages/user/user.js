const { isLogin } = require("../../utils/util");

// pages/user.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {}
  },

  toOrder() {
    wx.navigateTo({
      url: '/pages/orders/orders',
    })
  },

  toAddress() {
    wx.navigateTo({
      url: '/pages/address/address',
    })
  },
  
  toInfo() {
    wx.navigateTo({
      url: '/pages/user-info/user-info',
    })
  },

  signOut() {
    wx.setStorageSync("userInfo", ''),
    wx.setStorageSync("address", ''),
    wx.redirectTo({
      url: '/pages/account/account',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    isLogin()
    this.setData({
      user: wx.getStorageSync('userInfo')
    })
    
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
    this.setData({
      user: wx.getStorageSync('userInfo')
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
});