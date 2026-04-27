// components/OrderCard/OrderCard.js
const app = getApp()
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    url: app.globalData.url
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClick() {
      wx.navigateTo({
        url: '/pages/order-info/order-info?d=' + JSON.stringify(this.properties.data),
      })
    },
    done_order() {
      wx.request({
        url: this.data.url + 'orders/' + this.properties.data.order.order_id,
        method: 'POST',
        success: res => {
          if (res.statusCode !== 200) return
          wx.showToast({
            title: '订单已完成',
            icon: 'none'
          })
          this.triggerEvent('update')
        }
      })
    },
    onDelete() {
      wx.request({
        url: this.data.url + 'orders/' + this.properties.data.order.order_id,
        method: 'DELETE',
        success: res => {
          if (res.statusCode !== 200) return
          wx.showToast({
            title: '订单已删除',
            icon: 'none'
          })
          this.triggerEvent('update')
        }
      })
    }
  }
})