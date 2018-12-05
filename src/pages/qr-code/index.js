import React, { Component } from 'react';
import { Form, Input, Button, Cascader } from 'antd'
import './index.scss'
import QRCode from 'qrcode.react'

const FormItem = Form.Item
class index extends Component {
    state = {
        url: '100.100.1000.100,100.100.1000.100',
        options: [{
            value: 'X3',
            label: 'X3',
            children: [{
                value: 'X3',
                label: 'X3',
                children: [{
                    value: 'X3',
                    label: 'X3',
                }],
            }],
        }, {
            value: 'X5',
            label: 'X5',
            children: [{
                value: 'X5',
                label: 'X5',
                children: [{
                    value: 'X5',
                    label: 'X5',
                }],
            }],
        }]
    }
    qrClick = () => {
        let hasMarkDOM = document.querySelector('.qr-mark')
        if (hasMarkDOM) return
        let canvasDOM = this.state.canvasDOM
        let appDOM = document.querySelector('body')
        canvasDOM.style.width = "600px"
        canvasDOM.style.height = "600px"
        canvasDOM.style.top = "-110px"
        let markDOM = document.createElement('div')
        markDOM.setAttribute('class', 'qr-mark')
        markDOM.style.position = 'absolute'
        markDOM.style.top = "0"
        markDOM.style.bottom = "0"
        markDOM.style.left = "0"
        markDOM.style.right = "0"
        markDOM.style.backgroundColor = "rgba(0,0,0,.6)"
        markDOM.addEventListener('click', (e) => {
            e.preventDefault()
            canvasDOM.style.width = "150px"
            canvasDOM.style.height = "150px"
            canvasDOM.style.top = "0px"
            appDOM.removeChild(markDOM)
        })
        appDOM.appendChild(markDOM)
        // console.log(markDOM);

    }
    onChange = (item) => {
        console.log(item);
    }
    componentDidMount() {
        let canvasDOM = document.querySelector('.qr-code-canvas')
        this.setState({ canvasDOM })
    }
    X3Submit = (e) => {
        console.log('生成二维码');
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 14 },
        };
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="qr-code">
                <div className="head">
                    <Cascader options={this.state.options} onChange={this.onChange} placeholder="Please select" />
                    <QRCode onClick={this.qrClick} className="qr-code-canvas" size={150} value={this.state.url} />
                </div>
                <div className="content">
                    <Form onSubmit={this.X3Submit}>
                        <div className="table">
                            <div className="left">
                                <h2>X3配置</h2>
                                <FormItem
                                    label="设备名称"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('X3name', {
                                        rules: [{ required: true, message: '请输入设备名称' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="设备类型"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('X3type', {
                                        rules: [{ required: true, message: '请输入设备类型' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="主机IP"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('X3mainIP', {
                                        rules: [{ required: true, message: '请输入主机IP' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="网关"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('X3gateway', {
                                        rules: [{ required: true, message: '请输入网关' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="设备点码"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('X3deviceCode', {
                                        rules: [{ required: true, message: '请输入设备点码' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="物管servIP"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('X3PropertyServIP', {
                                        rules: [{ required: true, message: '请输入物管servIP' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="物管端口"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('X3PropertyPort', {
                                        rules: [{ required: false, message: '请输入物管端口' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="NAS ServIP"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('X3NASServIP', {
                                        rules: [{ required: false, message: '请输入NAS ServIP' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="NAS 端口"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('X3NASPort', {
                                        rules: [{ required: false, message: '请输入NAS 端口' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="运维ServIP"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('X3OperationIP', {
                                        rules: [{ required: false, message: '请输入运维ServIP' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="运维端口"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('X3OperationPort', {
                                        rules: [{ required: false, message: '请输入运维端口' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="固件版本"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('X3Version', {
                                        rules: [{ required: false, message: '请输入固件版本' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="序列号"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('X3Sequence', {
                                        rules: [{ required: false, message: '请输入序列号' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="MAC地址"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('X3Mac', {
                                        rules: [{ required: false, message: '请输入MAC地址' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="设备厂商"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('X3Factory ', {
                                        rules: [{ required: false, message: '请输入设备厂商' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </div>
                            <div className="mid">
                                <h2>IPC配置</h2>
                                <FormItem
                                    label="设备名称"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('IPC1name', {
                                        rules: [{ required: true, message: '请输入设备名称' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="设备类型"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('IPC1Type', {
                                        rules: [{ required: true, message: '请输入设备类型' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="主机IP"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('IPC1MainIP', {
                                        rules: [{ required: true, message: '请输入主机IP' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="网关"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('IPC1gateway', {
                                        rules: [{ required: true, message: '请输入网关' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="位置方向"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('IPC1Direction', {
                                        rules: [{ required: true, message: '请输入方向' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="设备点码"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('IPC1DeviceCode', {
                                        rules: [{ required: true, message: '请输入设备点码' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="DNS"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('IPC1DNS', {
                                        rules: [{ required: false, message: '请输入DNS' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="NAS ServIP"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('IPC1NASServIP', {
                                        rules: [{ required: false, message: '请输入NAS ServIP' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="固件版本"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('IPC1Version', {
                                        rules: [{ required: false, message: '请输入固件版本' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="序列号"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('IPC1Sequence', {
                                        rules: [{ required: false, message: '请输入序列号' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="MAC地址"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('IPC1Mac', {
                                        rules: [{ required: false, message: '请输入MAC地址' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="设备厂商"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('IPC1Factory', {
                                        rules: [{ required: false, message: '请输入设备厂商' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </div>
                            <div className="right">
                                <h2>IPC配置</h2>
                                <FormItem
                                    label="设备名称"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('IPC1name', {
                                        rules: [{ required: true, message: '请输入设备名称' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="设备类型"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('IPC1Type', {
                                        rules: [{ required: true, message: '请输入设备类型' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="主机IP"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('IPC1MainIP', {
                                        rules: [{ required: true, message: '请输入主机IP' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="网关"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('IPC1gateway', {
                                        rules: [{ required: true, message: '请输入网关' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="位置方向"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('IPC1Direction', {
                                        rules: [{ required: true, message: '请输入方向' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="设备点码"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('IPC1DeviceCode', {
                                        rules: [{ required: true, message: '请输入设备点码' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="DNS"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('IPC1DNS', {
                                        rules: [{ required: false, message: '请输入DNS' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="NAS ServIP"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('IPC1NASServIP', {
                                        rules: [{ required: false, message: '请输入NAS ServIP' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="固件版本"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('IPC1Version', {
                                        rules: [{ required: false, message: '请输入固件版本' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="序列号"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('IPC1Sequence', {
                                        rules: [{ required: false, message: '请输入序列号' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="MAC地址"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('IPC1Mac', {
                                        rules: [{ required: false, message: '请输入MAC地址' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="设备厂商"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('IPC1Factory', {
                                        rules: [{ required: false, message: '请输入设备厂商' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </div>
                        </div>
                        <div className="btn">
                            <Button type="primary" htmlType="submit">生成二维码</Button>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}
const WrappedApp = Form.create()(index);
export default WrappedApp;