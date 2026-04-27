// components/ShoppingCartCard/CartCard.js
const app = getApp()
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    card: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    url: app.globalData.url,
    checked: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(e) {
      this.setData({
        checked: e.detail
      })
      const data = e.detail ? this.properties.card : +this.properties.card.cart_id
      this.triggerEvent('change', data)
    },
    // 删除事件
    onClick(e) {
      wx.showModal({
        title: '确认删除',
        content: '删除后无法恢复，确认删除？',
        complete: (res) => {
          if (res.confirm) {
            wx.request({
              url: this.data.url + 'shopping_cart/' + e.target.dataset.id,
              method: 'DELETE',
              success: (res) => {
                if (res.statusCode === 200) {
                  wx.showToast({
                    title: '删除成功',
                    icon: 'none'
                  })
                  this.triggerEvent('delete', e.target.dataset.id)
                }
                else if (res.statusCode === 404) {
                  wx.showToast({
                    title: '删除数据未找到',
                    icon: 'none'
                  })
                }
              },
              fail: err => {
                console.log(err);
              }
            })
          }
        }
      })
    }
  }
})