// pages/checkout/checkout.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalCost: 0,
    coupons: [],
    discount: 0,
    selectedCoupon: null,
  },

  getCoupons(event) {
    const uid = app.globalData.userInfo.id
    wx.request({
      url: 'http://localhost:3000/wx/coupons/' + uid,
      success: res => {
        if (res.statusCode === 200) {
          this.setData({
            coupons: this.filCoupons(res.data.data.results)
          })
        }
      }
    })
  },

  filCoupons(coupons) {
    return coupons.filter(item => {
      return Date.now() <= Date.parse(item.expiration_date)
    })
  },

  onUseCouponFromChild(event) {
    const discount = event.detail.discount

    this.setData({
      discount
    })
  },

  // 监听子组件的自定义事件，更新选中的优惠券
  onCouponSelect(event) {
    const selectedCouponIndex = event.detail.selectedCouponIndex;
    this.setData({ selectedCouponIndex });
  },

  // 自定义事件处理程序，用于接收子组件传递的选中优惠券对象
  onSelectCoupon(event) {
    const selectedCoupon = event.detail.coupon;

    // 更新选中的优惠券
    this.setData({
      selectedCoupon: selectedCoupon,
    });
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      totalCost: options.price
    })
    this.getCoupons()

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