import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd'
import api from '../../config/api.js'
import './index.scss'

const FormItem = Form.Item

class FaceManage extends Component {
    state = {
        btnText: "修改",
        control: true
    }
    componentDidMount() {
        this.initForm()
    }
    initForm =async () => {
        let {data} =await api.FaceGW_g()
        let result = data[0]
        if(!result) return
        this.setState({
            result
        })
        this.props.form.setFieldsValue({
            type: result.type,
            name: result.name,
            MAC: result.mac,
            version: result.version,
            MQTT: result.mqtt,
            supportLinesNum: result.caps_ch,
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            control: false,
            btnText: "完成"
        })
        if (this.state.control) return
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                this.setState({
                    control: true,
                    btnText: "修改"
                })
                let option = {
                    caps_ch: this.state.result.caps_ch,
                    code: this.state.result.code,
                    mac: this.state.result.mac,
                    mqtt: values.MQTT,
                    name: values.name,
                    type: this.state.result.type,
                    version: this.state.result.version
                }
                let data = await api.FaceGW_p(option)
                if(data.status !== 200) {
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
            <div className='face-manage'>
                <div className="tit">
                    <span className="value">人脸网关配置</span>
                    <span className="warn"><span>*</span><span>必填项目</span></span>
                </div>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        label="网关型号"
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 5 }}
                    >
                        {getFieldDecorator('type', {
                            rules: [{ required: false, message: '请输入网关型号' }],
                        })(
                            <Input disabled />
                        )}
                    </FormItem>
                    <FormItem
                        label="网关名称"
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 5 }}

                    >
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '网关名称不能为空' }],
                            initialValue: 'RK-X3'
                        })(
                            <Input disabled={this.state.control} />
                        )}
                    </FormItem>
                    <FormItem
                        label="网关MAC"
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 5 }}
                    >
                        {getFieldDecorator('MAC', {
                            rules: [{ required: false, message: '请输入网关型号' }],
                        })(
                            <Input disabled />
                        )}
                    </FormItem>
                    <FormItem
                        label="固件版本"
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 5 }}
                    >
                        {getFieldDecorator('version', {
                            rules: [{ required: false, message: '请输入网关型号' }],
                        })(
                            <Input disabled />
                        )}
                    </FormItem>
                    <FormItem
                        label="MQTT"
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 5 }}
                    >
                        {getFieldDecorator('MQTT', {
                            rules: [{ required: true, message: 'MQTT不能为空' }],
                        })(
                            <Input disabled={this.state.control} />
                        )}
                    </FormItem>
                    <FormItem
                        label="支持路数"
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 5 }}
                    >
                        {getFieldDecorator('supportLinesNum', {
                            rules: [{ required: false, message: '请输入网关型号' }],
                        })(
                            <Input disabled />
                        )}
                        <p className="warn">人脸网关最大支持路数，在进行通道配置时通道数量只能≤通道数</p>
                    </FormItem>
                    <FormItem
                        wrapperCol={{ span: 12 }}
                    >
                        <Button type="primary" htmlType="submit">
                            {this.state.btnText}
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}
const WrappedApp = Form.create()(FaceManage)
export default WrappedApp;