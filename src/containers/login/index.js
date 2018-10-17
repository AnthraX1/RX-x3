import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd'
import axios from '../../config/axios'
import { connect } from 'react-redux'
import { userName } from './../../redux/action'


import './index.scss'
const FormItem = Form.Item;

class Login extends Component {



    handleSubmit = (e) => {
        e.preventDefault();
        const { dispatch } = this.props
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                window.sessionStorage.setItem('userInfo',values.userName)
                dispatch(userName(values.userName))
                // axios.post('/login',{
                //     values
                // }).then(data => {
                //     console.log(data);
                // })
                window.location.href='#/internet/deploy'
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