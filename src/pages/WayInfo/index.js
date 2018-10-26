import React, { Component } from 'react';
// import { Button, Pagination } from 'antd'
import api from '../../config/api.js'
import DeleteModal from './../../components/DeleteModal'
import WayInfoModal from './WayInfoModal'
import './index.scss'

class WayInfo extends Component {

    state = {
        deleteVisible: false,
        WayInfoModalVisible: false,
        WayInfoModalTitle: '配置通道信息'
    }
    componentDidMount() {
        this.list()
    }
    // WayInfoModal = () => {
    //     this.setState({
    //         WayInfoModalTitle: '配置通道信息',
    //         // WayInfoModalVisible: true
    //     })
    // }
    sonWayInfoModal = () => {
        this.setState({
            WayInfoModalVisible: false
        })
    }
    delete = () => {
        this.setState({
            deleteVisible: true
        })
    }
    reset = (item) => {
        this.setState({
            WayInfoModalTitle: '配置通道信息',
            WayInfoModalVisible: true
        })
        this.state.model.initItem(item)
    }
    sonDelteModal = () => {
        this.setState({
            deleteVisible: false
        })
    }
    initItem = (model) => {
        this.setState({
            model
        })
    }

    list =async () => {
        let {data} = await api.Location_g()
        // console.log(data);
        let listDOM = data.map((item, index) => {
            return (
                <div className="line layout" key={index}>
                    <div className="index">{item.chan}</div>
                    <div className="name">{item.ipc}</div>
                    <div className="position">{item.loc}</div>
                    <div className="code">{item.code}</div>
                    <div className="direction">{item.dir === "IN"? "进":"出"}</div>
                    <div className="thres">{item.thres}</div>
                    <div className="carmera">IP:{item.ipc_ip}</div>
                    {/* <div className="relay">
                        <p>IP:192.168.1.1</p>
                        <p>通道:123123</p>
                    </div> */}
                    <div className="operate">
                        <span onClick={this.reset.bind(this,item)}>配置通道信息</span>
                        {/* <span onClick={this.delete}>删除</span> */}
                    </div>
                </div>
            )
        })
        this.setState({
            listDOM
        })
    }


    render() {
        return (
            <div className='way-info'>
                <div className="top">
                    {/* <Button type='primary' onClick={this.WayInfoModal}>配置通道信息</Button>
                    <span>人脸网关路数:8</span> */}
                </div>
                <div className="table">
                    <div className="title layout">
                        <div className="index">序号</div>
                        <div className="name">摄像头名称</div>
                        <div className="position">位置信息</div>
                        <div className="code">位置点码</div>
                        <div className="direction">方向</div>
                        <div className="thres">阀值</div>
                        <div className="carmera">摄像头</div>
                        {/* <div className="relay">继电器信息</div> */}
                        <div className="operate">操作</div>
                    </div>
                    <div className="body">

                        {/* 配置通道信息模态框 */}

                        <WayInfoModal
                            title={this.state.WayInfoModalTitle}
                            visible={this.state.WayInfoModalVisible}
                            sonWayInfoModal={this.sonWayInfoModal}
                            initItem = {this.initItem}
                            reList = {this.list}
                        />

                        {/* 删除模态框 */}
                        <DeleteModal
                            visible={this.state.deleteVisible}
                            sonDeleteModal={this.sonDelteModal}
                        />
                        {this.state.listDOM}


                    </div>
                </div>
                <div className="page">
                    {/* <Pagination onChange={this.pageChange} defaultCurrent={1} total={500} /> */}
                </div>
            </div>
        );
    }
}

export default WayInfo;