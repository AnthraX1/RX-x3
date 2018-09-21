import React, { Component } from 'react';
import { Modal, Icon, Button } from 'antd';
import './index.scss'

class DeleteModal extends Component {
    state = {}
    componentWillReceiveProps(nextProps) {
        this.setState({
            visible: nextProps.visible
        })
    }
    cancel = () => {
        this.setState({
            visible: false
        })
        this.props.sonDeleteModal(false)
    }
    delete = () => {
        
        // this.props.sonDeleteModal()
    }
    render() {
        return (
            <Modal
                className='delete-modal'
                closable={false}
                footer={null}
                width={300}
                centered={true}
                visible={this.state.visible}
            >

                <div className='err'>
                    <Icon type="exclamation-circle" />
                </div>
                <div className='warn1'>
                    <span>删除警告</span>
                </div>
                <div className= 'warn2'>
                    <span>是否删除该摄像头设备?</span>
                </div>
                <div className='btn'>
                    <Button onClick={this.cancel} size='small'>取消</Button>
                    <Button onClick={this.delete} type='danger' size='small'>删除</Button>
                </div>
            </Modal>
        );
    }
}

export default DeleteModal;