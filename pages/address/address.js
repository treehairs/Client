// pages/address/address.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.url,
    addresses: [],
    show: false,
    isUpdate: false,
    name: '',
    telephone: '',
    city: '',
    street_address: '',
    address_id: 0

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

  add() {
    this.setData({
      show: true,
      isUpdate: false
    })
  },

  onClose() {
    this.setData({
      show: false
    })
  },

  onSubmit() {
    const name = this.data.name
    const telephone = this.data.telephone
    const city = this.data.city
    const street_address = this.data.street_address

    if (!name || !telephone || !city || !street_address) {
      wx.showToast({
        title: '内容不能为空',
        icon: 'none'
      })
      return
    }

    const path = this.data.isUpdate ? 'address/' + this.data.address_id : 'address';

    wx.request({
      url: this.data.url + path,
      method: 'POST',
      data: {
        uid: wx.getStorageSync('userInfo').id,
        name,
        telephone,
        city,
        street_address
      },
      success: res => {
        if (res.statusCode === 200) {
          this.setData({
            show: false
          })
          wx.showToast({
            title: '编辑成功',
            icon: 'none'
          })
          this.getData()
        }
      },
      fail: err => {
        console.log(err);
      }
    })
  },

  onClick(e) {
    wx.setStorageSync('address', e.detail)
    wx.navigateBack()
  },

  onEdit(e) {
    console.log(e.detail);
    const { address_id, recipient_name, city, street_address, telephone } = e.detail
    this.setData({
      show: true,
      isUpdate: true,
      name: recipient_name,
      city,
      street_address,
      telephone,
      address_id
    })
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