// components/AddressCard/Address.js
const app = getApp()
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    address: {
      type: Object,
      value: {}
    },
    btn_show: {
      type: Boolean,
      value: false
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
    onDelete(e) {
      console.log("dasd");
      wx.showModal({
        title: '确认删除',
        content: '删除后无法恢复，确认删除？',
        complete: (res) => {
          if (res.confirm) {
            wx.request({
              url: this.data.url + 'address/' + this.properties.address.address_id,
              method: 'DELETE',
              success: res => {
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
              }
            })
          }
        }
      })
    },
    onEdit() {
      this.triggerEvent('edit', this.properties.address)
    },
    onClick() {
      this.triggerEvent('click', this.properties.address)
    }
  }
})