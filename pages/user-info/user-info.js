// pages/user-info/user-info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: [],
    isLoading: false
  },

  readFile(event) {
    console.log(event);
  },

  update(event) {
    // console.log(event.detail.value)
    const username = event.detail.value.username;
    const nickname = event.detail.value.nickname;
    const password = event.detail.value.password;

    if (this.data.isLoading) {
      return
    } else if (!password || !nickname) {
      wx.showToast({
        title: '值不能为空！',
        icon: 'none'
      })
      return
    } else {
      this.setData({
        isLoading: true
      })

      wx.request({
        url: 'http://localhost:3000/wx/user/' + this.data.userInfo.id,
        method: 'POST',
        data: {
          nickname,
          password
        },
        header: {
          'content-type': 'application/json'
        },
        success: res => {
          if (res.statusCode === 200) {
            this.data.userInfo.nickname = nickname
            this.data.userInfo.password = password
            wx.setStorageSync('userInfo', this.data.userInfo)
            wx.showToast({
              title: res.data,
              icon: 'none'
            })
            wx.switchTab({
              url: '/pages/user/user',
            })
          } else {
            wx.showToast({
              title: '修改失败！',
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
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
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