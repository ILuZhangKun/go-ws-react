var websocket = null;
var global_callback = null;
var serverPort = '7777';	//webSocket连接端口

function getWebIP(){
	var curIP = window.location.hostname;
  return curIP;
}
 
function initWebSocket(path){ //初始化weosocket
    //ws地址
    var wsurl = "ws://" +getWebIP()+ ":" + serverPort + path;
    console.log(wsurl)
    websocket = new WebSocket(wsurl);
    websocket.onmessage = function(e){
      websocketOnMessage(e); //数据接收
    } 
    websocket.onclose = function(e){
      websocketClose(e); // 关闭
    }
    websocket.onopen = function (e) {
      websocketOpen(e); // 打开
    }
    websocket.onerror = function () {
      console.log("WebSocket连接发生错误");
    }
  return websocket;
}
// 连接
function websocketOpen(e){
  console.log(e)
  console.log("连接成功");
}
//关闭
function websocketClose(e){  
    console.log("connection closed (" + e.code + ")");
}
//数据接收
function websocketOnMessage(e){
    // 如果接收到服务器消息，就给回调函数函数
    if(global_callback != null){
        global_callback(e)
    }
    else{
        console.log("收到服务器主动发送到消息：")
        console.log(e)
    }
    // 如果没有回调函数？
}
// 数据发送
function websocketSend(clientData){
    websocket.send(JSON.stringify(clientData));
}

// 实际调用的方法
function sendSock(path,agentData,callback){  
  console.log(agentData,callback)
  // 首先获取访问的接口path
  if(path === '' || agentData === '' || callback === ''){
    path = '/'
    websocket = initWebSocket(path);
  }else{
    websocket = initWebSocket(path);
    global_callback = callback;
    if (websocket.readyState === websocket.OPEN) {
      //若是ws开启状态--发送
      websocketSend(agentData)
    }else if (websocket.readyState === websocket.CONNECTING) {
      // 若是 正在开启状态，则等待1s后重新调用
      console.log("正在开启状态")
        setTimeout(function () {
          websocketSend(agentData)
        }, 3000);
    }else {
      // 若未开启 ，则等待1s后重新调用
      console.log("未开启")
        // setTimeout(function () {
        //   sendSock(path,agentData,callback);
        // }, 1000);
    }
  }
}
window.ws = sendSock
export default{sendSock}
