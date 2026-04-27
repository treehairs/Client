// pages/account/account.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    err: '',
    isLoading: false
  },

  login(event) {
    // console.log(event.detail.value)
    const username = event.detail.value.username;
    const password = event.detail.value.password;

    if (this.data.isLoading) {
      return
    } else if (!username || !password) {
      wx.showToast({
        title: '账号或密码不能为空！',
        icon: 'none'
      })
      return
    } else {
      this.setData({
        isLoading: true
      })

      wx.request({
        url: 'http://localhost:3000/wx/user',
        method: 'POST',
        data: {
          username,
          password
        },
        header: {
          'content-type': 'application/json'
        },
        success: res => {
          if (res.data.status === 200) {
            wx.setStorageSync('userInfo', res.data.userInfo[0])
            wx.switchTab({
              url: '/pages/home/home',
            })
          } else if (res.data.status === 201) {
            wx.showToast({
              title: '账号或密码错误！',
              icon: 'none'
            })
          }
          this.setData({
            isLoading: false
          })
        },
        fail: err => {
          wx.showToast({
            title: '请求失败！',
            icon: 'none'
          })
          this.setData({
            isLoading: false
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '账号登录',
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