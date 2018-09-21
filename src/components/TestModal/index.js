import React, { Component } from 'react';
import { Modal, Icon, Button } from 'antd';
import './index.scss'

class TestModal extends Component {
    state = {}
    componentWillReceiveProps(nextProps) {
        this.setState({
            visible: nextProps.visible
        })
    }

    Iknow = () => {
        this.setState({
            visible: false,
        });
        this.props.sonLinkTest(false)
    }

    type = () => {
        if(this.props.modelType === "type1") {
            return (
                <div className= 'type1'>
                    <div>
                        <span>视频连接:</span>
                        <span className='err'>正常</span>
                    </div>
                    <div>
                        <span>解码:</span>
                        <span className='success'>正常</span>
                    </div>
                </div>
            )
        }else if(this.props.modelType === "type2"){
            return <div className='type2'>
                    {this.props.title || '请传入title'}
                   </div>
        }
    }

    render() {
        return (
            <Modal
                className='test-modal'
                closable={false}
                footer={null}
                width={300}
                centered={true}
                visible={this.state.visible}
            >

                <div className='err-icon err'>
                    {/* <Icon type="check-circle" /> */}
                    <Icon type="exclamation-circle" />
                </div>
                
                {
                   this.type()
                }
                
                <div className= 'btn'>
                    <Button onClick={this.Iknow} type='primary' size='small'>我知道了</Button>
                </div>
            </Modal>
        );
    }
}

export default TestModal;