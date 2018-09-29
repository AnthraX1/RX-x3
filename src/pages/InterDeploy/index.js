import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import './index.scss'
import api from '../../config/api.js'
const FormItem = Form.Item;

class InterDeploy extends Component {

    state = {
        pattern: /^(?:(?:2[0-4][0-9]\.)|(?:25[0-5]\.)|(?:1[0-9][0-9]\.)|(?:[1-9][0-9]\.)|(?:[0-9]\.)){3}(?:(?:2[0-5][0-5])|(?:25[0-5])|(?:1[0-9][0-9])|(?:[1-9][0-9])|(?:[0-9]))$/,
        btnText: "修改",
        control: true
    }
    componentDidMount() {
        this.initForm()
    }
    initForm =async () => {
        let {data} = await api.network_g()
        let result = data[0]
        this.setState({
            "netif": result.netif
        })
        this.props.form.setFieldsValue({
            LANIP: result.ip,
            LANSubnet: result.subnet,
            LANDefaultGateway: result.gateway
        })
    }
    submitForm = (e) => {
        e.preventDefault();
        // 重置form
        // this.props.form.resetFields()
        this.setState({
            control: false,
            btnText: "完成"
        })
        if (this.state.control) return
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                this.setState({
                    control: true,
                    btnText: "修改"
                })
                let option = {
                    "gateway": values.LANDefaultGateway,
                    "ip": values.LANIP,
                    "netif": this.state.netif,
                    "subnet": values.LANSubnet
                }
                let data = await api.network_p(option)
                if (data.status !== 200) {
                    message.error('配置失败')
                    return
                }
                this.initForm()
                message.success('配置成功')
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form className='inter-deploy' onSubmit={this.submitForm}>
                <div className="form">

                    <div className="right">
                        <div className="tit">
                            <span className="value">LAN配置</span>
                            <span className="warn"><span>*</span><span>必填项目</span></span>
                        </div>
                        <FormItem
                            label="IP地址"
                        >
                            {getFieldDecorator('LANIP', {
                                rules: [{ required: true, message: 'IP地址不能为空' }, { pattern: this.state.pattern, message: 'IP地址格式不正确' }],
                            })(
                                <Input disabled={this.state.control} autoComplete='off' />
                            )}
                        </FormItem>
                        <FormItem
                            label="子网掩码"
                        >
                            {getFieldDecorator('LANSubnet', {
                                rules: [{ required: true, message: '子网掩码不能为空' }],
                            })(
                                <Input disabled={this.state.control} autoComplete='off' />
                            )}
                        </FormItem>
                        <FormItem
                            label="默认网关"
                        >
                            {getFieldDecorator('LANDefaultGateway', {
                                rules: [{ required: true, message: '默认网关不能为空' }],
                            })(
                                <Input disabled={this.state.control} autoComplete='off' />
                            )}
                        </FormItem>
                    </div>
                </div>
                <div className="submit">
                    <FormItem
                        wrapperCol={{ span: 12, offset: 1 }}
                    >
                        <Button type="primary" htmlType="submit">{this.state.btnText}</Button>
                    </FormItem>
                </div>
            </Form>
        );
    }
}
const WrappedApp = Form.create()(InterDeploy);

export default WrappedApp;