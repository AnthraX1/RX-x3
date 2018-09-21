import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd'
import './index.scss'

const FormItem = Form.Item

class FaceManage extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                message.success('成功')
            }
        });
    }

    render() {
        const { getFieldDecorator, setFieldsValue } = this.props.form;
        // setFieldsValue({
        //     name: 'RK-X3'
        // })
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
                            initialValue:'RK-X3'
                        })(
                            <Input />
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
                            <Input />
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
                            提交
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}
const WrappedApp = Form.create()(FaceManage)
export default WrappedApp;