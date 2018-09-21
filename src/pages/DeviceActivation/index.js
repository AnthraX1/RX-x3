import React, { Component } from 'react'
import './index.scss'
import { Form, Input, Button, message } from 'antd';
const FormItem = Form.Item;

class DeviceActivation extends Component {
    state = {
        btnText: '激活',
        style: {
            licenseControl: "none",
            hideRequiredMarkControl: false,
            disable: false
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // console.log('values',this.props.form.getFieldsValue());
        if(this.state.btnText === '重新激活') {
            this.props.form.resetFields();
            this.setState({
                btnText: '激活',
                style: {
                    licenseControl: "none",
                    hideRequiredMarkControl: false,
                    disable: false
                }
            })
            return false
        }
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                message.success('激活成功!');
                this.setState({
                    btnText: '重新激活',
                    style: {
                        licenseControl: "",
                        hideRequiredMarkControl: true,
                        disable: true
                    }
                })
            }
        });
    }
    handleSelectChange = (value) => {
        // console.log(value);
        this.props.form.setFieldsValue({
            note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form 
                hideRequiredMark = {this.state.style.hideRequiredMarkControl}
                onSubmit={this.handleSubmit}>
                <FormItem
                    label="Project ID"
                    labelCol={{ span: 2 }}
                    wrapperCol={{ span: 5 }}
                >
                    {getFieldDecorator('id', {
                        rules: [{ required: true, message: '请输入project id' }],
                    })(
                        <Input autoComplete='off' disabled= {this.state.style.disable} />
                    )}
                </FormItem>
                <FormItem
                    style= {{display:this.state.style.licenseControl}}
                    label="License"
                    labelCol={{ span: 2 }}
                    wrapperCol={{ span: 5 }}
                >
                    {getFieldDecorator('license', {
                        // rules: [{ required: true, message: 'Please select your gender!' }],
                    })(
                        <Input disabled= {this.state.style.disable} />
                    )}
                </FormItem>
                <FormItem
                    wrapperCol={{ span: 12 }}
                >
                    <Button type="primary" htmlType="submit">
                        {this.state.btnText}
                    </Button>
                </FormItem>
            </Form>
        )
    }
}

const WrappedApp = Form.create()(DeviceActivation);
export default WrappedApp