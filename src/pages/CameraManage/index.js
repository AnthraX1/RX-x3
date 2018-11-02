import React, { Component } from 'react';
import { Button } from 'antd'
import api from '../../config/api.js'
import './index.scss'
import CameraModal from './CameraModal'
import TestModal from './../../components/TestModal'
import DeleteModal from './../../components/DeleteModal'


class CameraManage extends Component {

    state = {
        visible: false,
        testModalVisible: false,
        deleteModalVisible: false,
        modelTitle: '添加摄像头'
    }
    componentDidMount() {
        this.listDom()
    }
    // initModel窗
    initForm = (CameraModal) => {
        this.setState({
            CameraModal
        })
    }
    showModal = () => {
        this.setState({
            visible: true,
            modelTitle: '添加摄像头',
            cameraType: "add"
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
    restCarmera = (item) => {
        // console.log(item);
        this.state.CameraModal.initForm(item)
        this.setState({
            visible: true,
            modelTitle: '修改摄像头',
            clickItem: item,
            cameraType: "edit"
        });
    }
    sonCarmeraModal = (control) => {
        this.setState({
            visible: control
        }, () => {
            // 模态框关闭的时候刷新一下列表信息
            this.listDom()
        });
    }


    pageChange = (page) => {
        console.log(page);
    }


    listDom = async () => {
        let { data: result } = await api.Camera_g()
        console.log(result);
        let dom = result.map((item, index) => {
            return (
                <div className="line layout" key={index}>
                    <div className="index">{index + 1}</div>
                    <div className="name">{item.name}</div>
                    <div className="maker">{item.prod}</div>
                    <div className="id">{item.sn}</div>
                    <div className="ip">{item.ip}</div>
                    {/* <div className="port">8088</div> */}
                    <div className="protocol">
                        <p>RTSP地址:</p>
                        <p title={item.protocol}><span>{item.protocol}</span></p>
                    </div>
                    {/* <div className="link-state">
                        <p>视频连接:<span>正常</span></p>
                        <p>解码:<span>正常</span></p>
                    </div>
                    <div className="link-test">
                        <span onClick={this.linkTest} className='blue'>测试</span>
                    </div> */}
                    <div className="operate">
                        <span onClick={this.restCarmera.bind(this, item)} className='blue'>配置</span>
                        {/* <span onClick={this.deleteCarmera} className='red'>删除</span> */}
                    </div>
                </div>
            )
        })
        this.setState({
            dom
        })
    }

    render() {
        return (
            <div className='camera-manage'>
                <div className="top">
                    <Button type="primary" onClick={this.showModal} size={"default"}>添加摄像头</Button>
                    <span className='warn'>支持最大的摄像头路数:2</span>
                </div>
                <div className="table">
                    <div className="title layout">
                        <div className="index">序号</div>
                        <div className="name">摄像头名称</div>
                        <div className="maker">摄像头厂商</div>
                        <div className="id">摄像头序列号</div>
                        <div className="ip">摄像头ip</div>
                        {/* <div className="port">端口号</div> */}
                        <div className="protocol">勾流方式</div>
                        {/* <div className="link-state">连接状态</div>
                        <div className="link-test">连接测试</div> */}
                        <div className="operate">操作</div>
                    </div>
                    {/* 添加修改摄像头模态框 */}
                    <CameraModal
                        type={this.state.cameraType}
                        data={this.state.clickItem}
                        initForm={this.initForm}
                        visible={this.state.visible}
                        title={this.state.modelTitle}
                        sonCarmeraModal={this.sonCarmeraModal}
                    />
                    {/* 测试模态框 */}
                    <TestModal
                        modelType="type1"
                        visible={this.state.testModalVisible}
                        sonLinkTest={this.sonLinkTest}
                    />
                    {/* 删除模态框 */}
                    <DeleteModal
                        visible={this.state.deleteModalVisible}
                        sonDeleteModal={this.sonDeleteModal}
                    />
                    <div className="body">
                        {this.state.dom}
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