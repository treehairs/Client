// pages/orders/orders.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    url: app.globalData.url,
    total_price: 0,
    address: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const goods = JSON.parse(options.d)
    const total_price = goods.reduce((sum, el) => sum + Number(el.price * el.quantity || 0), 0)
    this.setData({
      total_price: total_price * 100,
      goods: goods
    })
    console.log(this.data.goods);
  },

  getAddress() {
    const address = wx.getStorageSync('address')
    if (address !== "") {
      this.setData({
        address
      })
    } else {
      this.setData({
        address: { recipient_name: '请选择' }
      })
    }
  },

  onClickAddress() {
    wx.navigateTo({
      url: '/pages/address/address',
    })
  },

  onSubmit() {
    console.log(this.data.goods);
    console.log(this.data.address);
    console.log(this.data.total_price);
    const address = this.data.address
    const goods = this.data.goods
    wx.request({
      url: this.data.url + 'orders',
      method: 'POST',
      data: {
        user_id: wx.getStorageSync('userInfo').id,
        total_amount: this.data.total_price * 0.01,
        tel: address.telephone,
        address: address.city + address.street_address,
        recipient_name: address.recipient_name,
        items: goods
      },
      success: res => {
        if (res.statusCode !== 200) return
        wx.showToast({
          title: '提交成功',
          icon: 'none'
        })
        setTimeout(() => {
          wx.navigateBack()
        }, 1000);

      }
    })
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
    this.getAddress()
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