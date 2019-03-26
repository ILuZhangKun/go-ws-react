import React, { Component } from 'react';
import './Upload.css';
import { Button, Upload, Layout, Checkbox, Table} from 'element-react';
class UploadFile extends Component {
  constructor(){
    super();
    this.state={
        submitValid: false,
        columns: [
          {
            label: "创建者",
            prop: "creator",
            width: 180,
            align: "center"
          },
          {
            label: "拥有者",
            prop: "keeper",
            width: 180,
            align: "center"
          },
          {
            label: "价格",
            prop: "price",
            width: 180,
            align: "center"
          },
          {
            label: "文件哈希",
            prop: "filehash",
            width: 260,
            align: "center"
          },
          {
            label: "时间戳",
            prop: "timestamp",
            align: "center"
          },
          {
            label: "类型",
            prop: "type",
            align: "center"
          }
        ],
        data: [],
        
    }
    this.backShow = this.backShow.bind(this);
  }
  render() {
    // 上传的文件
    const fileList = [
      {
        name: 'food.jpeg', 
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg'
      }, 
      {
        name: 'food2.jpeg', 
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg'
      }
    ];
    return (
      <div>
        <div className="header">
            欢迎来到上传中心！
        </div>
        <Layout.Row gutter="24">
          <Layout.Col span="8" offset="1">
            <div className="my-box-border">
              <div className='tip'>请上传您的文件</div>
              <Upload
                className="upload-demo"
                ref="upload"
                action="ws://0.0.0.0:7777/sayHi"
                onPreview={file => this.handlePreview(file)}
                onRemove={(file, fileList) => this.handleRemove(file, fileList)}
                fileList={fileList}
                autoUpload={false}
                trigger={<Button size="small" type="primary">选取文件</Button>}
              >
                <Button style={{ marginLeft: '10px'}} size="small" type="success" onClick={() => this.submitUpload()}>上传</Button>
                <Button style={{ marginLeft: '10px'}} size="small" type="success" onClick={() => this.test()}>测试</Button>
              </Upload>
              <div className="checkbox">
                <Checkbox checked={this.state.submitValid} onChange={(value) => this.handleCheck(value)}>我已阅读<a href=" about.html">《安权链用户安全协议》</a></Checkbox>
              </div>
            </div>
          </Layout.Col>
        </Layout.Row>
        <div className=" my-table">
          <Table
            style={{width: '100%'}}
            columns={this.state.columns}
            data={this.state.data}
            stripe={true}
            border={true}
            height={250}
          />
        </div>
      </div>
    );
  }
  componentWillMount(){
  }
  componentDidMount(){
  }
  handleRemove(file, fileList) {
    console.log(file, fileList);
  }
  
  handlePreview(file) {
    console.log(file);
  }
  submitUpload() {
    if(this.state.submitValid){
      // this.refs.upload.submit();
      // 
      console.log(window.ws)
      var res = {
        timestamp: '2016-05-02',
        creator: '张轩睿',
        keeper: '任家萱',
        price: "真爱无价，剧本另说",
        filehash: 'ashahaisdyf7989q00hjvhcjkxlskaj',
        type: '保存'
      };
      window.ws('/sayHi',res,this.backShow);
      
    }else{
      console.log("请您阅读并确认《安权链用户安全协议》")
    }
  }
  backShow(res){
    var self = this;
    var temp = [];
    console.log(JSON.parse(res.data))
    for(let i=0;i<10;i++){
      temp.push(JSON.parse(res.data));
    }
    console.log(temp)
    self.setState({
      data: temp
    })
  }
  handleCheck(value) {
    console.log(value)
    this.setState({submitValid: value});
  }
}

export default UploadFile;
