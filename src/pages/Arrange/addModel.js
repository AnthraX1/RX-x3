import React, { Component } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import './addModel.scss'
import api from '../../config/api';
const FormItem = Form.Item;

class addModel extends Component {
    state = {
        visible: false
    }
    componentDidMount() {
        this.props.initItem(this)
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            visible: nextProps.addModelVisible,
            type: nextProps.type
        })
    }
    initItem = (item) => {
        console.log(item);
        this.setState({ item })
        if ("Serv" in item) {
            let name = item.Name
            let server = item.Serv
            if (!server.match(/(\S*):/)) {
                message.error('数据不匹配')
                return
            }
            this.props.form.setFieldsValue({
                name: name,
                server: server.match(/(\S*):/)[1]
            })
        } else {
            // 如果新建的话 , 重置表单
            this.props.form.resetFields()
        }
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
        this.props.sonaddModel(false)

    }
    submit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            console.log(values);
            if (!err) {
                if (this.state.type === "add") {
                    let option = {
                        "Serv": values.server,
                        "Name": values.name,
                        "Sn": 0
                    }
                    let { data } = await api.arrange_p(option)
                    if (data.Sn === 0) {
                        message.error('不合法')
                    }
                } else if (this.state.type === "edit") {
                    let option = {
                        "Serv": values.server,
                        "Sn": this.state.item.Sn,
                        "Name": values.name,
                    }
                    await api.arrange_put(this.state.item.Sn, option)
                }
                // console.log("result", result);

                this.props.getInit()
                this.handleCancel()
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 24 },
        };
        // const macItemLayout = {
        //     labelCol: { span: 0 },
        //     wrapperCol: { span: 24 },
        // }
        return (
            <Modal
                className='add-modal'
                // title={this.props.title}
                visible={this.state.visible}
                centered={true}
                cancelText='取消'
                okText='确定'
                width={800}
                footer={null}
                onCancel={this.handleCancel}
            >
                <Form onSubmit={this.submit}>
                    <div className='box'>

                        <div className="key">名称</div>
                        <div className="value">
                            <FormItem
                                {...formItemLayout}
                            >
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: '名称不能为空' }],
                                })(
                                    <Input autoComplete='off' />
                                )}
                            </FormItem>
                        </div>

                    </div>
                    <div className="box">
                        <div className="key">server</div>
                        <div className="value">
                            <FormItem
                                {...formItemLayout}
                            >
                                {getFieldDecorator('server', {
                                    rules: [{ required: true, message: 'server不能为空' }],
                                })(
                                    <Input autoComplete='off' />
                                )}
                            </FormItem>
                        </div>
                    </div>


                    <FormItem
                        {...formItemLayout}

                    >
                        <div className='model-btn'>
                            <Button size='small' onClick={this.handleCancel}>
                                取消
                            </Button>
                            <Button size='small' type="primary" htmlType="submit">
                                {this.state.type === "edit" ? "确定" : "添加"}
                            </Button>
                        </div>
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}
const WrappedApp = Form.create()(addModel);
export default WrappedApp;