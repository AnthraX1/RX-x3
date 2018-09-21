import React, { Component } from 'react';
import { Modal, Input, Form, Button } from 'antd';
import './download.scss'

const FormItem = Form.Item;
class FaceDB extends Component {
    state = {
        visible: false,
        // checkedList: [],
        indeterminate: true,
        checkAll: false,
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            visible: nextProps.visible
        })
    }

    handleOk = () => {
        // console.log(this.state.checkedList);
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
        this.props.sonFaceDB(false)
    }
    submit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            <Modal
                className='face-db-modal'
                title="下载人脸库"
                cancelText='取消'
                okText='下载'
                width={500}
                footer={null}
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >

                <Form onSubmit={this.submit}>
                    <FormItem
                        {...formItemLayout}
                        label="server ip"
                    >
                        {getFieldDecorator('ip', {
                            rules: [{
                                required: true,
                                message: '请输入server ip',
                            }],
                        })(
                            <Input autoComplete='off' placeholder="server ip" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="人脸库id"
                    >
                        {getFieldDecorator('id', {
                            rules: [{
                                required: true,
                                message: '请输入人脸库id',
                            }],
                        })(
                            <Input autoComplete='off' placeholder="人脸库id" />
                        )}
                    </FormItem>
                    <FormItem className='btn'>
                        <Button onClick={this.handleCancel}>取消</Button>
                        <Button type="primary" htmlType="submit" className="download">
                            下载
                        </Button>
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}
const FaceDBForm = Form.create()(FaceDB);
export default FaceDBForm;