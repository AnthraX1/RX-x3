import React, { Component } from 'react';
// import { Button, Pagination } from 'antd'
import DeleteModal from './../../components/DeleteModal'
import WayInfoModal from './WayInfoModal'
import './index.scss'

class WayInfo extends Component {

    state = {
        deleteVisible: false,
        WayInfoModalVisible: false,
        WayInfoModalTitle: '配置通道信息'
    }
    WayInfoModal = () => {
        this.setState({
            WayInfoModalTitle: '配置通道信息',
            WayInfoModalVisible: true
        })
    }
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
    reset = () => {
        this.setState({
            WayInfoModalTitle: '配置通道信息',
            WayInfoModalVisible: true
        })
    }
    sonDelteModal = () => {
        this.setState({
            deleteVisible: false
        })
    }


    list = () => {
        let arr = [1, 2]
        return arr.map((Item, index) => {
            return (
                <div className="line layout" key={index}>
                    <div className="index">{index + 1}</div>
                    <div className="position">1期1栋1单元1门</div>
                    <div className="direction">进</div>
                    <div className="carmera">IP:192.168.1.1</div>
                    <div className="relay">
                        <p>IP:192.168.1.1</p>
                        <p>通道:123123</p>
                    </div>
                    <div className="operate">
                        <span onClick={this.reset}>配置通道信息</span>
                        {/* <span onClick={this.delete}>删除</span> */}
                    </div>
                </div>
            )
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
                        <div className="position">位置信息</div>
                        <div className="direction">方向</div>
                        <div className="carmera">摄像头</div>
                        <div className="relay">继电器信息</div>
                        <div className="operate">操作</div>
                    </div>
                    <div className="body">

                        {/* 配置通道信息模态框 */}

                        <WayInfoModal
                            title={this.state.WayInfoModalTitle}
                            visible={this.state.WayInfoModalVisible}
                            sonWayInfoModal={this.sonWayInfoModal}
                        />

                        {/* 删除模态框 */}
                        <DeleteModal
                            visible={this.state.deleteVisible}
                            sonDeleteModal={this.sonDelteModal}
                        />
                        {this.list()}


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