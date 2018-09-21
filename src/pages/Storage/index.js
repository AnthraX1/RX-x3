import React, { Component } from 'react';
import { Input } from 'antd'
import './index.scss'

class Storage extends Component {

    state = {
        imgUrl: 'XXXXXXX',
        videoUrl: 'XXXXXXX',
        logUrl: 'XXXXXXX',
    }

    render() {
        return (
            <div className='storage'>
                <div>
                    <div className="key">照片网络存储地址:</div>
                    <div className="value">
                        <Input disabled value={this.state.imgUrl} type="text"/>
                    </div>
                </div>
                <div>
                    <div className="key">视频网络存储地址:</div>
                    <div className="value">
                        <Input disabled value={this.state.videoUrl} type="text"/>
                    </div>
                </div>
                <div>
                    <div className="key">日志网络存储地址:</div>
                    <div className="value">
                        <Input disabled value={this.state.logUrl} type="text"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Storage;