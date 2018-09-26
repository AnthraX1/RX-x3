import React, { Component } from 'react';
// import { Button, Pagination } from 'antd'
import './index.scss'
import CameraModal from './CameraModal'
import TestModal from './../../components/TestModal'
import DeleteModal from './../../components/DeleteModal'
// const FormItem = Form.Item;


class CameraManage extends Component {

    state = {
        visible: false,
        testModalVisible: false,
        deleteModalVisible: false,
        modelTitle: '添加摄像头'
    }
    showModal = () => {
        this.setState({
            visible: true,
            modelTitle: '添加摄像头'
        });
    }
    linkTest = () => {
        this.setState({
            testModalVisible: true
        });
    }
    sonLinkTest = (control) => {
        this.setState({
            testModalVisible: control
        });
    }
    deleteCarmera = () => {
        this.setState({
            deleteModalVisible: true
        });
    }
    sonDeleteModal = () => {
        this.setState({
            deleteModalVisible: false
        });
    }
    restCarmera =()=> {
        this.setState({
            visible: true,
            modelTitle: '修改摄像头'
        });
    }
    sonCarmeraModal = (control) => {
        this.setState({
            visible: control
        });
    }


    pageChange = (page) => {
        console.log(page);
    }


    listDom = () => {
        let arr = [1, 1]

        let dom = arr.map((item, index) => {
            return (
                <div className="line layout" key={index}>
                    <div className="index">{index + 1}</div>
                    <div className="name">sonyx54</div>
                    <div className="maker">索尼索尼</div>
                    <div className="id">234MFHS435K</div>
                    <div className="ip">192.168.0.1</div>
                    <div className="port">8088</div>
                    <div className="protocol">
                        <p>RTSP</p>
                        <p>RTSP地址:<span>192.23.43.4</span></p>
                    </div>
                    <div className="link-state">
                        <p>视频连接:<span>正常</span></p>
                        <p>解码:<span>正常</span></p>
                    </div>
                    <div className="link-test">
                        <span onClick={this.linkTest} className='blue'>测试</span>
                    </div>
                    <div className="operate">
                        <span onClick={this.restCarmera} className='blue'>配置</span>
                        {/* <span onClick={this.deleteCarmera} className='red'>删除</span> */}
                    </div>
                </div>
            )
        })
        return dom
    }

    render() {
        return (
            <div className='camera-manage'>
                <div className="top">
                    {/* <Button type="primary" onClick={this.showModal} size={"default"}>添加摄像头</Button> */}
                    <span className='warn'>支持最大的摄像头路数:2</span>
                </div>
                <div className="table">
                    <div className="title layout">
                        <div className="index">序号</div>
                        <div className="name">摄像头名称</div>
                        <div className="maker">摄像头厂商</div>
                        <div className="id">摄像头序列号</div>
                        <div className="ip">摄像头ip</div>
                        <div className="port">端口号</div>
                        <div className="protocol">勾流方式</div>
                        <div className="link-state">连接状态</div>
                        <div className="link-test">连接测试</div>
                        <div className="operate">操作</div>
                    </div>
                    {/* 添加修改摄像头模态框 */}
                    <CameraModal 
                        visible={this.state.visible} 
                        title= {this.state.modelTitle} 
                        sonCarmeraModal = {this.sonCarmeraModal}
                    />
                    {/* 测试模态框 */}
                    <TestModal 
                        modelType = "type1"
                        visible = {this.state.testModalVisible}
                        sonLinkTest = {this.sonLinkTest}
                    />
                    {/* 删除模态框 */}
                    <DeleteModal 
                        visible = {this.state.deleteModalVisible}
                        sonDeleteModal = {this.sonDeleteModal}
                    />
                    <div className="body">
                        {this.listDom()}
                    </div>
                </div>
                <div className="page">
                    {/* <Pagination onChange={this.pageChange} defaultCurrent={1} total={500} /> */}
                </div>
            </div>
        );
    }
}

export default CameraManage;