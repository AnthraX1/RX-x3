import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import './index.scss'
const FormItem = Form.Item;

class InterDeploy extends Component {

    state = {
        pattern: /((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))/,
    }

    submitForm = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                message.success('成功')
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form className='inter-deploy' onSubmit={this.submitForm}>
                <div className="form">
                    {/* <div className="left">
                        <div className="tit">
                            <span className="value">WAN配置</span>
                            <span className="warn"><span>*</span><span>必填项目</span></span>
                        </div>
                        <FormItem
                            label="IP地址"
                        >
                            {getFieldDecorator('WANIP', {
                                rules: [{ required: true, message: 'IP地址不能为空' }, {pattern: this.state.pattern, message: 'IP地址格式不正确'}],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            label="子网掩码"
                        >
                            {getFieldDecorator('WANSubnet', {
                                rules: [{ required: true, message: '子网掩码不能为空' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            label="默认网关"
                        >
                            {getFieldDecorator('WANDefaultGateway', {
                                rules: [{ required: true, message: '默认网关不能为空' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            label="DNS"
                        >
                            {getFieldDecorator('WANDNS', {
                                rules: [{ required: false, message: '' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            label="NTO"
                        >
                            {getFieldDecorator('WANNTO', {
                                rules: [{ required: true, message: 'NTO不能为空' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            label="服务器IP"
                        >
                            {getFieldDecorator('WANServerIP', {
                                rules: [{ required: true, message: '服务器IP不能为空' }, {pattern: this.state.pattern, message: 'IP地址格式不正确'}],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            label="安装地址"
                        >
                            {getFieldDecorator('WANPosition', {
                                rules: [{ required: true, message: '安装地址不能为空' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                    </div> */}
                    <div className="right">
                        <div className="tit">
                            <span className="value">LAN配置</span>
                            <span className="warn"><span>*</span><span>必填项目</span></span>
                        </div>
                        <FormItem
                            label="IP地址"
                        >
                            {getFieldDecorator('LANIP', {
                                rules: [{ required: true, message: 'IP地址不能为空' }, {pattern: this.state.pattern, message: 'IP地址格式不正确'}],
                            })(
                                <Input autoComplete='off'/>
                            )}
                        </FormItem>
                        <FormItem
                            label="子网掩码"
                        >
                            {getFieldDecorator('LANSubnet', {
                                rules: [{ required: true, message: '子网掩码不能为空' }],
                            })(
                                <Input autoComplete='off'/>
                            )}
                        </FormItem>
                        <FormItem
                            label="默认网关"
                        >
                            {getFieldDecorator('LANDefaultGateway', {
                                rules: [{ required: true, message: '默认网关不能为空' }],
                            })(
                                <Input autoComplete='off'/>
                            )}
                        </FormItem>
                    </div>
                </div>
                <div className="submit">
                    <FormItem
                        wrapperCol={{ span: 12, offset: 1 }}
                    >
                        <Button type="primary" htmlType="submit">
                            完成
                        </Button>
                    </FormItem>
                </div>
            </Form>
        );
    }
}
const WrappedApp = Form.create()(InterDeploy);

export default WrappedApp;