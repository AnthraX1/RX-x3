import React, { Component } from 'react';
import './index.scss'

import { Layout, Breadcrumb } from 'antd';

import Nav from './../../components/Nav'
import Head from '../../components/Header'
const { Content, Sider } = Layout;
class Main extends Component {
    state = {
        breadcrumb: ['入网配置', '设备激活']
    };
    componentDidMount() {
        let hash = window.location.hash.replace(/#|\?.*$/g, '');
        // 默认面包屑
        this.breadcrumbItem(hash)
        window.addEventListener('hashchange', () => {
            let hash = window.location.hash.replace(/#|\?.*$/g, '');
            this.breadcrumbItem(hash)
        })



    }

    breadcrumbItem = (hash) => {
        let item = []
        if (hash.includes('/internet/activation')) {
            item = ['入网配置', '设备激活']
        } else if (hash.includes('/internet/deploy')) {
            item = ['入网配置', '网络配置']
        } else if (hash.includes('/devicedeploy/face')) {
            item = ['设备配置', '人脸网管管理']
        } else if (hash.includes('/devicedeploy/carmera')) {
            item = ['设备配置', '摄像头管理']
        } else if (hash.includes('/devicedeploy/relay')) {
            item = ['设备配置', '网络继电器管理']
        } else if (hash.includes('/function/position')) {
            item = ['功能管理', '位置信息']
        } else if (hash.includes('/function/faceInfo')) {
            item = ['功能管理', '人脸库信息']
        } else if (hash.includes('/function/wayInfo')) {
            item = ['功能管理', '通道设置']
        } else if (hash.includes('/project/projectTest')) {
            item = ['工程操作', '工程测试']
        } else if (hash.includes('/project/esthesis')) {
            item = ['工程操作', '感知系统']
        }else if (hash.includes('/project/arrange')) {
            item = ['工程操作', '布控系统']
        } else if (hash.includes('/project/faceList')) {
            item = ['设备配置', '查看人脸库']
        } else if (hash.includes('/system/system')) {
            item = ['设备配置', '系统操作']
        } else if (hash.includes('/system/systemLog')) {
            item = ['设备配置', '系统日记']
        } else if (hash.includes('/system/storage')) {
            item = ['设备配置', '储存']
        } else if (hash.includes('/system/captureLog')) {
            item = ['系统管理', '抓拍日记']
        } else if (hash.includes('/system/passLog')) {
            item = ['系统管理', '通行日记']
        } else if (hash.includes('/system/monitor')) {
            item = ['系统管理', '监控']
        } else if (hash.includes('/system/storage')) {
            item = ['系统管理', '储存']
        }

        this.setState({
            breadcrumb: item
        })
    }

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider>
                    <Nav hash={this.state.hash} defaultOpenKey={this.state.defaultOpenKey} />
                </Sider>
                <Layout>
                    <Head />
                    <Content>
                        <div className='contain'>
                            <Breadcrumb separator='>'>
                                {this.state.breadcrumb.map(item => {
                                    return <Breadcrumb.Item key={item.toString()}>{item}</Breadcrumb.Item>
                                })}
                            </Breadcrumb>
                            {this.props.children}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default Main;