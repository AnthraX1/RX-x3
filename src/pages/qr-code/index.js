import React, { Component } from 'react';
import './index.scss'
import QRCode from 'qrcode.react'

class index extends Component {
    state = {
        url: '我是二维码.,,, 继续扫我我是二维码.,,, 继续扫我我是二维码.,,, 继续扫我'
    }
    render() {
        return (
            <div>
                <QRCode size={500} value={this.state.url}/>
            </div>
        );
    }
}

export default index;