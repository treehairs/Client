const { isLogin } = require("../../utils/util");

// pages/product/product.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    url: app.globalData.url,
    show: false,
    variants: [],
    variant_price: 0,
    quantity: 1,
    selected_variant: null,
    clickEvent: '',
    address: {
      name: "",
      street_address: "",
      telephone: ""
    }
  },

  getProduct(id) {
    wx.request({
      url: this.data.url + `products/${id}`,
      success: res => {
        this.setData({
          info: res.data.data[0]
        })
        this.getVariants()

      }
    })
  },

  getVariants() {
    wx.request({
      url: this.data.url + `variants?pid=${this.data.info.product_id}`,
      success: res => {
        this.setData({
          variants: res.data.data
        })
      }
    })
  },

  onClickBuy() {
    this.setData({
      show: true,
      clickEvent: 'buy'
    })
  },

  onClickToCart() {
    this.setData({
      show: true,
      clickEvent: 'toCart'
    })
  },

  onClickOverlay() {
    this.setData({
      show: false
    })
  },

  onCancel() {
    this.setData({
      show: false
    })
  },

  onClickVariantCard(option) {
    const id = option.currentTarget.dataset.id
    let variants = this.data.variants
    variants.map(item => {
      item.checked = false
    })
    variants.find(item => item.variant_id === id).checked = true
    this.setData({
      variants,
      variant_price: variants.find(item => item.variant_id === id).price.toFixed(2),
      selected_variant: variants.find(item => item.checked)
    })

  },

  onChange(event) {
    this.setData({
      quantity: event.detail
    })

  },

  onClickCart() {
    wx.navigateTo({
      url: '/pages/shopcart/shopcart',
    })
  },

  onClickAddress() {
    wx.navigateTo({
      url: '/pages/address/address',
    })
  },

  getAddress() {
    const address = wx.getStorageSync('address')
    if (address !== "") {
      this.setData({
        address
      })
    }
  },

  balance() {
    const data = this.data.selected_variant
    data.product_name = this.data.info.product_name
    data.quantity = this.data.quantity
    wx.navigateTo({
      url: '/pages/balance/balance?d=' + JSON.stringify([data]),
    })
  },

  addItem() {
    let data = this.data.selected_variant
    data.user_id = wx.getStorageSync('userInfo').id
    console.log(data);
    data.quantity = this.data.quantity
    wx.request({
      url: this.data.url + 'shopping_cart',
      method: 'POST',
      data: data,
      success: res => {
        if (res.statusCode === 200) {
          wx.showToast({
            title: '添加成功',
            icon: 'none'
          })
        }
      },
      fail: err => {
        console.log(err);
      }
    })
  },

  toChat(){
    wx.navigateTo({
      url: '/pages/customer-service/customer-service',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getProduct(options.product_id)
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