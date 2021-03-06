import React, { Component } from 'react';
import { Form, Input, Button, Modal, Select } from 'antd'
import './index.scss'
import api from '../../config/api'
import QRCode from 'qrcode.react'
import X3Form from './X3Form'
import IPC from './IPC'

const FormItem = Form.Item
const Option = Select.Option;


class index extends Component {
    state = {
        formType: 'x3',
        loading: false,
        visible: false,
        url: '',

    }
    qrClick = () => {
        let hasMarkDOM = document.querySelector('.qr-mark')
        if (hasMarkDOM) return
        let canvasDOM = this.state.canvasDOM
        let appDOM = document.querySelector('body')
        canvasDOM.style.width = "600px"
        canvasDOM.style.height = "600px"
        canvasDOM.style.top = "-110px"
        canvasDOM.style.display = "inline-block"
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
            canvasDOM.style.display = "none"
            appDOM.removeChild(markDOM)
        })
        appDOM.appendChild(markDOM)
        // console.log(markDOM);

    }
    onChange = (item) => {
        this.child.initForm(this.state.data[item]) // 触发子组件的方法
    }
    componentDidMount() {
        let canvasDOM = document.querySelector('.qr-code-canvas')
        this.setState({ canvasDOM })
        this.getIPC()
    }
    getIPC = async () => {
        let options = {
            "model": "IPC",
            "sn": ""
        }
        let { data } = await api.getIPC(options)

        let optionList = data.map((v, i) => {
            return (
                <Option value={i} key={v.sn}>{v.loc}</Option>
            )
        })
        this.setState({ optionList, data })

    }


    addIPC = () => {
        this.setState({
            visible: true
        })
    }
    handleOk = () => { }
    handleCancel = () => {
        this.setState({
            visible: false
        })
    }
    addSubmit = () => {

    }
    parent = (child) => {
        this.child = child
    }
    getX3Info = (info) => {
        console.log(info);
        this.setState({sn: info})
    }
    show = (type) => {
        this.setState({ formType: type })
    }
    FormTable = (type) => {
        if (type === 'x3') {
            return <X3Form parent={this.getX3Info}></X3Form>
        } else if (type === 'ipc') {
            return <IPC parent={this.parent} index={this.state.IPCIndex} data={this.state.data}></IPC>
        }
    }
    ipcSelect = (type) => {
        if (type === 'ipc') {
            return <Select className="select" defaultValue="" style={{ width: 300 }} onChange={this.onChange}>
                {this.state.optionList}
            </Select>
        } else {
            return
        }
    }
    getQrData = async () => {
        this.setState({loading: true})
        let options = {
            "model": "X3",
            "sn": this.state.sn
        }
        let {data} = await api.getQRData(options)
        console.log(data.qr);
        this.setState({url: data.qr,loading:false }, () => {
            this.qrClick()
        })
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 10 },
            wrapperCol: { span: 14 },
        };
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="qr-code">
                <div className="head">
                    {/* <Button type="primary" onClick={this.addIPC}>新增</Button> */}
                    <QRCode onClick={this.qrClick} className="qr-code-canvas" size={1000} value={this.state.url} />
                    <Button onClick={this.show.bind(this, 'x3')} type="primary">X3参数</Button>
                    <Button onClick={this.show.bind(this, 'ipc')} type="primary">IPC参数</Button>

                    <Button onClick={this.getQrData} type="primary" loading={this.state.loading}>生成二维码</Button>
                    {this.ipcSelect(this.state.formType)}
                </div>
                {/* 添加框 */}
                <Modal
                    title="添加摄像头"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Form onSubmit={this.addSubmit}>
                        <FormItem
                            label="设备名称"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('IPC2name', {
                                rules: [{ required: true, message: '请输入设备名称' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            label="设备类型"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('IPC2Type', {
                                rules: [{ required: true, message: '请输入设备类型' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            label="主机IP"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('IPC2MainIP', {
                                rules: [{ required: true, message: '请输入主机IP' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            label="网关"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('IPC2gateway', {
                                rules: [{ required: true, message: '请输入网关' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            label="位置方向"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('IPC2Direction', {
                                rules: [{ required: true, message: '请输入方向' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            label="设备点码"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('IPC2DeviceCode', {
                                rules: [{ required: true, message: '请输入设备点码' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            label="DNS"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('IPC2DNS', {
                                rules: [{ required: false, message: '请输入DNS' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            label="NAS ServIP"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('IPC2NASServIP', {
                                rules: [{ required: false, message: '请输入NAS ServIP' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            label="固件版本"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('IPC2Version', {
                                rules: [{ required: false, message: '请输入固件版本' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            label="序列号"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('IPC2Sequence', {
                                rules: [{ required: false, message: '请输入序列号' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            label="MAC地址"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('IPC2Mac', {
                                rules: [{ required: false, message: '请输入MAC地址' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            label="设备厂商"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('IPC2Factory', {
                                rules: [{ required: false, message: '请输入设备厂商' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <Button type="primary" htmlType="submit">新增摄像头</Button>
                    </Form>
                </Modal>
                <div className="content">
                    <div className="table">
                        {this.FormTable(this.state.formType)}
                    </div>

                </div>
            </div>
        );
    }
}
const WrappedApp = Form.create()(index);
export default WrappedApp;