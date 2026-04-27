// pages/shopcart/shopcart.js
const { isLogin } = require('../../utils/util')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.url,
    cards: [],
    selected_data: [],
    total_price: 0
  },

  getData() {
    wx.request({
      url: this.data.url + 'shopping_cart/' + wx.getStorageSync('userInfo').id,
      success: res => {
        this.setData({
          cards: res.data.data
        })
      }
    })
  },

  onChange(e) {
    const data = e.detail
    let selected_data = this.data.selected_data
    if (typeof data !== "number") {
      // this.data.selected_data.push(data)
      selected_data.push(data)
      this.setData({
        selected_data: selected_data
      })
    }
    else {
      selected_data = selected_data.filter(item => item.cart_id !== data)
      this.setData({
        selected_data: selected_data
      })
    }
    let total_price = 0
    if (selected_data.length) {
      total_price = selected_data.reduce((sum, el) => sum + Number(el.price * el.quantity || 0), 0)
    }
    this.setData({
      total_price: total_price * 100
    })
  },

  onDelete(e) {
    console.log(e);
    // this.data.cards.filter(item=>item.cart_id!==e.detail)
  },

  onSubmit() {
    wx.navigateTo({
      url: '/pages/balance/balance?d=' + JSON.stringify(this.data.selected_data),
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getData()
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