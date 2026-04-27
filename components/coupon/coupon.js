// components/coupon/coupon.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    coupon: Object,
    isSelected: Boolean, // 是否被选中的属性
  },

  /**
   * 组件的初始数据
   */
  data: {
    isUse: false,
    canClick: true,
    buttonAnimation: {},
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onUseCoupon(event) {
      if (!this.data.canClick) return;

      // 触发自定义事件，并传递被点击的优惠券对象
      this.triggerEvent('selectcoupon', { coupon: this.data.coupon });

      // 设置标志变量为不允许点击
      this.setData({
        canClick: false,
      });

      const isCurrentlyUsed = this.data.isUse
      const discount = isCurrentlyUsed ? 0 : event.currentTarget.dataset.discount
      const delay = isCurrentlyUsed ? 0 : 1000

      this.animateButton(isCurrentlyUsed)

      setTimeout(() => {
        this.setData({
          isUse: !this.data.isUse,
          useCoupon: !this.data.useCoupon,
          discount,
          canClick: true, // 延迟后恢复允许点击
        });
      }, delay)

      // 向父组件传递折扣金额
      this.triggerEvent('useCoupon', {
        discount
      })

    },

    animateButton(reverse) {
      // 创建一个动画实例
      const animation = wx.createAnimation({
        duration: 1000, // 动画持续s时间，单位毫秒
        timingFunction: 'ease', // 动画速度曲线，可根据需要修改
      });

      if (reverse) {
        // 如果 reverse 参数为 true，则反转动画，恢复按钮
        animation.scale(1).step();
      } else {
        // 否则，缩小按钮并消失，显示van-icon
        animation.rotateY(360).scale(0.01).opacity(0).step();
      }

      // 导出动画效果
      this.setData({
        buttonAnimation: animation.export(),
      });
    }
  }
})