import React, { Component } from 'react';
class Hello extends Component {
  render() {
    return (
      <div className="Hello">
        你好
      </div>
    );
  }
  componentWillMount(){
    console.log(window.websocket)
    if(window.websocket.readyState === 1){
      window.websocket.send("哈喽服务器")
    }
  }
}

export default Hello;
