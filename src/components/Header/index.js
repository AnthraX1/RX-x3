import React, { Component } from 'react';
import { Layout } from 'antd';
import './index.scss'
import { connect } from 'react-redux';
import { userName } from './../../redux/action'
const { Header } = Layout;

class Heade extends Component {
    componentDidMount() {
        let localUserInfo = window.sessionStorage.getItem('userInfo')
        if(localUserInfo) {
            const { dispatch } = this.props
            dispatch(userName(localUserInfo))
        }
    }
    render() {
        return (
            <Header style={{ background: '#fff', padding: 0 }} >
                <div className="left">人脸网关配置</div>
                <div className="right">
                    <span>{this.props.userName}</span>
                    <span>退出</span>
                </div>
            </Header>
        );
    }
}
const mapState = state => {
    return {
        userName: state.name
    }
}

export default connect(mapState)(Heade);