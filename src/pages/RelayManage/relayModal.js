import React, { Component } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import './relayModal.scss'

const FormItem = Form.Item;

class RelayModal extends Component {
    state = { visible: false }

    componentWillReceiveProps(nextProps) {
        this.setState({
            visible: nextProps.relayModalVisible
        })
    }

    handleCancel = (e) => {
        // console.log(e);
        this.setState({
            visible: false,
        });
        this.props.sonRelayModal(false)
    }
    relaySubmit = (value) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
              console.log('Received values of form: ', values);
            }
          });
    }

    wayList = () => {
        let arr = [1,2,3,4,5,6,7,8]
        const {getFieldDecorator} = this.props.form
        const formLineItemLayout = {
            labelCol: { span: 10 },
            wrapperCol: { span: 12 },
        };
        return arr.map((item,index) => {
            return (
                <div className="line" key={index}>
                    <FormItem
                        label={`${index+1}.通道名称`}
                        {...formLineItemLayout}
                        >
                        {getFieldDecorator(`line${index+1}.name`, {
                            rules: [{ required: false, message: '' }],
                        })(
                            <Input autoComplete= 'off'/>
                        )}
                    </FormItem>
                    <FormItem
                        label="AT指令"
                        {...formLineItemLayout}
                        >
                        {getFieldDecorator(`line${index+1}.order`, {
                            rules: [{ required: false, message: '' }],
                        })(
                            <Input autoComplete= 'off'/>
                        )}
                    </FormItem>
                </div>
            )
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 6 },
        };
        return (
            <div>
                <Modal
                    className='relay-modal'
                    title={this.props.title}
                    footer={null}
                    centered={true}
                    width={850}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                >
                    <Form onSubmit= {this.relaySubmit}>
                        <FormItem
                            label="网络继电器名称"
                            {...formItemLayout}
                            >
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '网络继电器名称不能为空' }],
                            })(
                                <Input autoComplete= 'off'/>
                            )}
                        </FormItem>
                        <FormItem
                            label="网络继电器型号"
                            {...formItemLayout}
                            >
                            {getFieldDecorator('type', {
                                rules: [{ required: false, message: '' }],
                            })(
                                <Input autoComplete= 'off'/>
                            )}
                        </FormItem>
                        <FormItem
                            label="继电器序列号"
                            {...formItemLayout}
                            >
                            {getFieldDecorator('id', {
                                rules: [{ required: false, message: '' }],
                            })(
                                <Input autoComplete= 'off'/>
                            )}
                        </FormItem>
                        <FormItem
                            label="继电器IP"
                            {...formItemLayout}
                            >
                            {getFieldDecorator('ip', {
                                rules: [{ required: false, message: '' }],
                            })(
                                <Input autoComplete= 'off'/>
                            )}
                        </FormItem>

                        {this.wayList()}
                        
                        <FormItem
                            wrapperCol={{ span: 12, offset: 7 }}
                        >
                            <Button onClick= {this.handleCancel} size='small'>
                                取 消
                            </Button>
                            <Button  size='small' type="primary" htmlType="submit">
                                确 定
                            </Button>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}
const WrappedApp = Form.create()(RelayModal)
export default WrappedApp;