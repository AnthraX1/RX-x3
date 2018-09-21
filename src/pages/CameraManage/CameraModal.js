import React, { Component } from 'react';
import { Modal, Form, Input, Button, Radio } from 'antd';
import './CameraModal.scss'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class CameraModal extends Component {
    state = {
        protocol: 'RTSP',
        control: 'RTSP'
    }
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        this.setState({
            visible: nextProps.visible
        })
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
        this.props.sonCarmeraModal(false)
    }
    protocolChange = (e) => {
        // console.log(e.target.value);
        let _value = e.target.value
        if (_value === 'RTSP') {
            this.setState({
                control: 'RTSP',
            })
        } else if (_value === 'SDK') {
            this.setState({
                control: 'SDK',
            })
        }
    }
    submit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        })
    }
    change = (e) => {
        // console.log(e.target.value);
        let value = e.target.value
        this.props.form.setFieldsValue({
            RTSP: `rtsp://admin:abc123456@${value}/h264/ch1/main/av_stream`
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 12 },
        };
        return (
            < Modal
                className='carmera-modal'
                title={this.props.title}
                visible={this.state.visible}
                centered={true}
                cancelText='取消'
                okText='确定'
                width={800}
                footer={null}
                onCancel={this.handleCancel}
            >
                <Form onSubmit={this.submit}>
                    <FormItem
                        label="摄像头名称"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '摄像头名称不能为空' }],
                        })(
                            <Input autoComplete='off' />
                        )}
                    </FormItem>
                    {/* <FormItem
                        label="摄像头厂商"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('maker', {
                            rules: [{ required: false, message: '摄像头名称不能为空' }],
                        })(
                            <Input autoComplete='off' />
                        )}
                    </FormItem>
                    <FormItem
                        label="摄像头序列号"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('id', {
                            rules: [{ required: false, message: '摄像头名称不能为空' }],
                        })(
                            <Input autoComplete='off' />
                        )}
                    </FormItem> */}
                    <FormItem
                        label="摄像头IP"
                        {...formItemLayout}

                    >
                        {getFieldDecorator('ip', {
                            rules: [{ required: true, message: '摄像头IP不能为空' }],

                        })(
                            <Input onChange={this.change} autoComplete='off' />
                        )}
                    </FormItem>
                    {/* <FormItem
                        label="端口号"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('port', {
                            rules: [{ required: true, message: '端口号不能为空' }],
                        })(
                            <Input autoComplete='off' />
                        )}
                    </FormItem>
                    <FormItem
                        label="用户名"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '用户名不能为空' }],
                        })(
                            <Input autoComplete='off' />
                        )}
                    </FormItem>
                    <FormItem
                        label="密码"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('pass', {
                            rules: [{ required: true, message: '密码不能为空' }],
                        })(
                            <Input autoComplete='off' />
                        )}
                    </FormItem>
                    <FormItem
                        label="勾流方式"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('protocol', {
                            rules: [{ required: true, message: '请选择一种勾流方式' }],
                            initialValue: 'RTSP'
                        })(
                            <RadioGroup onChange={this.protocolChange}>
                                <Radio value={'RTSP'}>RTSP</Radio>
                                <Radio value={'SDK'}>厂商SDK</Radio>
                            </RadioGroup>
                        )}
                    </FormItem> */}


                    {
                        this.state.control === 'SDK' ?
                            <div style={{ display: this.state.SDKControl }}>
                                <FormItem
                                    label="摄像头型号"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('cameraType', {
                                        rules: [{ required: true, message: '摄像头型号不能为空' }],
                                    })(
                                        <Input autoComplete='off' />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="标准类型"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('standard', {
                                        rules: [{ required: true, message: '标准类型不能为空' }],
                                    })(
                                        <Input autoComplete='off' />
                                    )}
                                </FormItem>
                            </div>
                            :
                            <div style={{ display: this.state.RTSPControl }}>
                                <FormItem
                                    label="RTSP地址"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('RTSP', {
                                        rules: [{ required: true, message: 'RTSP地址不能为空' }],
                                        initialValue: ''
                                    })(
                                        <Input disabled />
                                    )}
                                </FormItem>
                            </div>
                    }


                    <FormItem
                        {...formItemLayout}

                    >
                        <div className='model-btn'>
                            <Button size='small' onClick={this.handleCancel}>
                                取消
                            </Button>
                            <Button size='small' type="primary" htmlType="submit">
                                确定
                            </Button>
                        </div>
                    </FormItem>
                </Form>
            </Modal >
        );
    }
}
const WrappedApp = Form.create()(CameraModal);
export default WrappedApp;