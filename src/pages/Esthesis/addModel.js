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
        this.setState({item})
        if ("Serv" in item) {
            let mac = item.Mac
            let server = item.Serv
            if (!server.match(/(\S*):/)) {
                message.error('数据不匹配')
                return
            }
            this.props.form.setFieldsValue({
                mac1: mac.slice(0, 2),
                mac2: mac.slice(2, 4),
                mac3: mac.slice(4, 6),
                mac4: mac.slice(6, 8),
                mac5: mac.slice(8, 10),
                mac6: mac.slice(10, 12),
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
                let type = this.state.type
                
                if (type === 'add') {
                    let option = {
                        "Mac": values.mac1 + values.mac2 + values.mac3 + values.mac4 + values.mac5 + values.mac6,
                        "Serv": values.server,
                    }
                    let {data} = await api.esthesis_p(option)
                    if(data.Node === 0) {
                        message.error('不合法')
                    }
                } else if (type === 'edit') {
                    console.log('type',this.state.item);
                    let option = {
                        "Mac": values.mac1 + values.mac2 + values.mac3 + values.mac4 + values.mac5 + values.mac6,
                        "Serv": values.server,
                        "Node": this.state.item.Node
                    }
                    await api.esthesis_put(this.state.item.Node, option)
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
        const macItemLayout = {
            labelCol: { span: 0 },
            wrapperCol: { span: 24 },
        }
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
                        <div className="key">mac</div>
                        <div className="value">
                            <FormItem
                                {...macItemLayout}
                            >
                                {getFieldDecorator('mac1', {
                                    rules: [{ required: true, message: 'mac不能空' }],
                                })(
                                    <Input autoComplete='off' />
                                )}
                            </FormItem>
                            <FormItem
                                label=""
                                {...macItemLayout}
                            >
                                {getFieldDecorator('mac2', {
                                    rules: [{ required: true, message: 'mac不能空' }],
                                })(
                                    <Input autoComplete='off' />
                                )}
                            </FormItem>
                            <FormItem
                                label=""
                                {...macItemLayout}
                            >
                                {getFieldDecorator('mac3', {
                                    rules: [{ required: true, message: 'mac不能空' }],
                                })(
                                    <Input autoComplete='off' />
                                )}
                            </FormItem>
                            <FormItem
                                label=""
                                {...macItemLayout}
                            >
                                {getFieldDecorator('mac4', {
                                    rules: [{ required: true, message: 'mac不能空' }],
                                })(
                                    <Input autoComplete='off' />
                                )}
                            </FormItem>
                            <FormItem
                                label=""
                                {...macItemLayout}
                            >
                                {getFieldDecorator('mac5', {
                                    rules: [{ required: true, message: 'mac不能空' }],
                                })(
                                    <Input autoComplete='off' />
                                )}
                            </FormItem>
                            <FormItem
                                label=""
                                {...macItemLayout}
                            >
                                {getFieldDecorator('mac6', {
                                    rules: [{ required: true, message: 'mac不能空' }],
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