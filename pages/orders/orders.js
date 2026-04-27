// pages/orders/orders.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.url,
    orders: []
  },

  getData() {
    wx.request({
      url: this.data.url + 'orders/' + wx.getStorageSync('userInfo').id,
      success: res => {
        if (res.statusCode === 200) {
          // 分类后的数据
          const classifiedData = {
            orders: []
          };
          // 根据order_id将数据分类
          res.data.orders.forEach(order => {
            const orderData = {
              order: order,
              item: res.data.order_item.filter(item => item.order_id === order.order_id)
            };
            classifiedData.orders.push(orderData);
          });
          this.setData({
            orders: classifiedData.orders
          })
          console.log(this.data.orders);
        }
      }
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