import React, { Component } from 'react';
import { Button, Pagination } from 'antd'
import './index.scss'
import RelayModal from './relayModal'
import TestModal from './../../components/TestModal'
import DeleteModal from './../../components/DeleteModal'

class RelayManage extends Component {

    state = {
        relayModalTitle: '添加网络继电器',
        relayModalVisible: false,
        testModalVisible: false,
        deleteModalVisible: false,
    }
    test = () => {
        this.setState({
            testModalVisible: true
        });
    }
    sonLinkTest = (control) => {
        this.setState({
            testModalVisible: control
        });
    }
    delete = () => {
        this.setState({
            deleteModalVisible: true
        });
    }

    sonDeleteModal = (control) => {
        this.setState({
            deleteModalVisible: control
        });
    }

    relayModal = () => {
        this.setState({
            relayModalTitle: '添加网络继电器',
            relayModalVisible: true
        });
    }
    sonRelayModal = () => {
        this.setState({
            relayModalVisible: false
        });
    }
    resetRelay = () => {
        this.setState({
            relayModalTitle: '修改网络继电器',
            relayModalVisible: true
        });
    }
    list = () => {
        let arr = [1, 1, 1, 1, 1, 1]

        return arr.map((item, index) => {
            return (
                <div className="line layout" key={index}>
                    <div className="index">{index + 1}</div>
                    <div className="name">sonyx54</div>
                    <div className="maker">索尼索尼</div>
                    <div className="id">234MFHS435K</div>
                    <div className="ip">192.168.0.1</div>
                    <div className="way">8088</div>
                    <div className="link-test">
                        <span onClick={this.test} className='blue'>测试</span>
                    </div>
                    <div className="link-state">
                        <span className='blue'>在线</span>
                    </div>
                    <div className="operate">
                        <span onClick={this.resetRelay} className='blue'>修改</span>
                        <span onClick={this.delete} className='red'>删除</span>
                    </div>
                </div>
            )
        })
    }
    render() {
        return (
            <div className='relay-manage'>
                <div className="top">
                    <Button type='primary' onClick={this.relayModal}>添加网络继电器</Button>
                </div>
                <div className="table">
                    <div className="title layout">
                        <div className="index">序号</div>
                        <div className="name">网络继电器名称</div>
                        <div className="maker">网络继电器型号</div>
                        <div className="id">网络继电器序列号</div>
                        <div className="ip">继电器IP</div>
                        <div className="way">继电器通道</div>
                        <div className="link-test">连接测试</div>
                        <div className="link-state">状态</div>
                        <div className="operate">操作</div>
                    </div>
                    <div className="body">

                        {/* 添加修改继电器模态框 */}
                        <RelayModal
                            title={this.state.relayModalTitle}
                            relayModalVisible={this.state.relayModalVisible}
                            sonRelayModal={this.sonRelayModal}
                        />

                        {/* 测试模态框 */}
                        <TestModal
                            modelType="type2"
                            title='继电器连接正常'
                            visible={this.state.testModalVisible}
                            sonLinkTest={this.sonLinkTest}
                        />
                        {/* 删除模态框 */}
                        <DeleteModal
                            visible={this.state.deleteModalVisible}
                            sonDeleteModal={this.sonDeleteModal}
                        />
                        {this.list()}
                    </div>
                </div>
                <div className="page">
                    <Pagination onChange={this.pageChange} defaultCurrent={1} total={500} />
                </div>
            </div>
        );
    }
}

export default RelayManage;