import React, { Component } from 'react';
import { Button, Form, Input, message, Modal, Icon } from 'antd'
import './index.scss'

const FormItem = Form.Item

class System extends Component {

    state = {
        visible: false
    }


    showModal = () => {
        this.setState({
            visible: true,
        });
    }


    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    resetSystem = () => {
        message.success('成 功')
        this.setState({
            visible: false,
        });
    }

    submit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                message.success('修改成功')
                this.props.form.resetFields();
            }
        })
    }

    warning = () => {
        return (
            <Modal
                className='reset-modal'
                title=""
                width={400}
                centered={true}
                footer={null}
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <div className="icon">
                    <Icon type="exclamation-circle" />
                </div>
                <p>该操作将会重置数据，是否确认执行该操作</p>
                <div className="btn">
                    <Button onClick={this.handleCancel} >取消</Button>
                    <Button onClick={this.resetSystem} type='danger'>删除</Button>
                </div>
            </Modal>
        )
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const wrapper = {
            labelCol: {
                span: 3
            },
            wrapperCol: {
                span: 6
            }
        }
        return (
            <div className='system'>
                <div className="title">修改密码</div>
                <div className="reset-password">
                    <FormItem
                        label="用户名"
                        {...wrapper}
                    >
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入用户名' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        label="密码"
                        {...wrapper}
                    >
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '密码不能为空' }],
                        })(
                            <Input type='password' />
                        )}
                    </FormItem>
                    <FormItem
                        label="新密码"
                        {...wrapper}
                    >
                        {getFieldDecorator('newPass', {
                            rules: [{ required: true, message: '新密码不能为空' }],
                        })(
                            <Input type='password' />
                        )}
                    </FormItem>

                    <Form onSubmit={this.submit}>
                        <FormItem
                            wrapperCol={{ span: 12, offset: 3 }}
                        >
                            <Button type="primary" htmlType="submit">
                                修改密码
                            </Button>
                        </FormItem>
                    </Form>
                </div>
                <div className="title">恢复出厂设置</div>
                <div className="reboot">
                    {this.warning()}
                    <p>点击按钮，将会清空项目数据，不用重新激活</p>
                    <Button ghost type='primary' onClick={this.showModal}>恢复出厂设置</Button>
                </div>
            </div>
        );
    }
}

const warppedApp = Form.create()(System)
export default warppedApp;