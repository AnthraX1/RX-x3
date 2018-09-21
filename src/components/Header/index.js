import React, { Component } from 'react';
import { Layout } from 'antd';
import './index.scss'
const { Header } = Layout;

class Heade extends Component {
    render() {
        return (
            <Header style={{ background: '#fff', padding: 0 }} >
                <div className="left">人脸网管配置</div>
                <div className="right">
                    <span>你好，dora</span>
                    <span>退出</span>
                </div>
            </Header>
        );
    }
}

export default Heade;