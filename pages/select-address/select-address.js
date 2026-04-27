// pages/select-address/select-address.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addresses: [],
    url: app.globalData.url
  },

  getData() {
    const uid = wx.getStorageSync('userInfo').id
    wx.request({
      url: this.data.url + 'address/' + uid,
      success: res => {
        if (res.statusCode === 200) {
          this.setData({
            addresses: res.data.data
          })
        }
      }
    })
  },

  onClick(e) {
    wx.setStorageSync('address', e.detail)
    wx.navigateBack()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getData()
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