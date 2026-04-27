// app.js
// import io from '@hyoga/uni-socket.io'
import io from 'weapp.socket.io'
// const io = require("weapp.socket.io")
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    this.globalData.userInfo = wx.getStorageSync('userInfo')

    wx.loadFontFace({
      family: 'Title',
      source: 'url("/assets/title.ttf")',
      success: () => {
        console.log("引入成功");
      }

    })


    // socket.on('connect', function () {
    //     console.log('连上了');
    // })

    const socket = io('http://localhost:4000', {
      query: {},
      transports: ['websocket', 'polling'],
      timeout: 5000,
    });

    socket.on('connect', () => {
      // ws连接已建立，此时可以进行socket.io的事件监听或者数据发送操作
      // 连接建立后，本插件的功能已完成，接下来的操作参考socket.io官方客户端文档即可
      console.log('ws 已连接');
      // socket.io 唯一连接id，可以监控这个id实现点对点通讯
      const { id } = socket;
      socket.on(id, (message) => {
        // 收到服务器推送的消息，可以跟进自身业务进行操作
        console.log('ws 收到服务器消息：', message);
      });
      // 主动向服务器发送数据
      socket.emit('send_data', {
        time: +new Date(),
      });
    });

    socket.on('error', (msg) => {
      console.log('ws error', msg);
    });

    socket.on("connect_error", (res) => {
      console.log("连接失败", res);
    });

  },
  globalData: {
    userInfo: null,
    url: 'http://localhost:3000/'
  }
})