
var ws = null;
var serverPort =  '7777';	//webSocket连接端口
var path =  null;
function getWebIP(){
	var curIP = window.location.hostname;
  return curIP;
}

import React, { Component } from 'react';
class WebSocket extends Component {
  constructor(){
    super();
  }
  render() {
    return null;
  }
  init(path) {
    console.log("init");
    path = path ? path : '/';
    // 每次都重新创建连接
    if (ws != null) {
      ws.close();
      ws = null;
    }
    var wsurl = "ws://" +getWebIP()+ ":" + serverPort + path;
    ws = new WebSocket(wsurl);
    
    ws.onopen = function () {
       console.log("连接成功")
       console.log(ws)
       
    };
    ws.onmessage = function (e) {
       console.log("接受到消息")
    };
    ws.onclose = function (e) {
       console.log("关闭连接")
    };
    return ws;
 };
 sendMsg() {
    console.log("开始处理path发送消息");
    var m = "哈喽";
    if (path === "/echo") {
     console.log("访问echo了")
    } else if (path === "/sayHi") {
      m = JSON.stringify({Msg: "test", Path: path})
    }
    console.log("send:" + m);
    ws.send(m);
    return false;
 };
  
}

export default WebSocket;