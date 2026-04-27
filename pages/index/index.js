// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    show: true,
    actions: [{
        name: '选项',
      },
      {
        name: '选项',
      },
      {
        name: '选项',
        subname: '描述信息',
        openType: 'share',
      },
    ],
    steps: [],
    activeKey: 0,
  },

  onClose() {
    this.setData({
      show: false
    });
  },

  onSelect(event) {
    console.log(event.detail);
  },

  getToken() {
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token?appid=wx2c45c76a2af141fc&secret=7194ab7fbfd57fc0235e5dc4d33ad972&grant_type=client_credential',
      method: 'GET',
      success: res => {
        this.setData({
          token: res.data.access_token
        })
        console.log(this.data.token);
      }
    })
  },

  kuaidi() {
    wx.request({
      url: 'http://api.tianapi.com/txapi/kuaidi/index?key=3e78da07152a0117ac0bf339239c3555&number=YT7413480561651',
      success: res => {
        console.log(res.data.newslist[0].list);
        const list = res.data.newslist[0].list
        const steps = []
        list.forEach(element => {
          steps.push({
            text: element.content,
            desc: element.time
          })
        });
        console.log(steps);
        this.setData({
          steps
        })

      }
    })
  },

  kuaidi2() {
    wx.request({
      url: 'https://api.kuaidi100.com/tools/map/fe802e14a407d003d250c88df7b461a1_113.751765,23.020536_5',
      success: res => {
        console.log(res);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // this.getToken()
    // this.kuaidi2()
    // this.kuaidi()
    // wx.request({
    //   url: 'https://api.weixin.qq.com/cgi-bin/express/business/path/get?access_token='+this.data.token,
    //   method: 'POST',
    //   data: {
    //     "order_id": "01234567890123456789",
    //     "openid": "oABC123456",
    //     "delivery_id": "SF",
    //     "waybill_id": "123456789"
    //   },
    //   success: res => {
    //     console.log(res);
    //   }

    // })
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