import React, { Component } from 'react';
import { Form, Icon, Input, Button, message } from 'antd'
import api from '../../config/api'
import { connect } from 'react-redux'
import { userName } from './../../redux/action'


import './index.scss'
const FormItem = Form.Item;

class Login extends Component {



    handleSubmit = (e) => {
        e.preventDefault();
        const { dispatch } = this.props
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                window.sessionStorage.setItem('userInfo', values.userName)
                dispatch(userName(values.userName))
                let option = {
                    "password":values.password ,
                    "user": values.userName
                }
                let result = await api.login(option)
                console.log(result);
                if(result.data.auth === 'Succ'){

                    window.location.href = '#/internet/deploy'
                }else {
                    message.error('登录失败')
                }
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div className='login'>
                <div className="title">TERMINUS</div>
                <div className="login-form">
                    <div className="tit">特斯联人脸网关配置</div>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input autoComplete='off' prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input autoComplete='off' prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </FormItem>
                    </Form>

                </div>
            </div>
        );
    }
}


const wrappedApp = Form.create()(Login)
export default connect()(wrappedApp);