import React, { Component } from 'react';
import { Modal, Form, Select, Button, Row, Col, Input, message } from 'antd';
import api from '../../config/api.js'
import './WayInfoModal.scss'

const FormItem = Form.Item;
const Option = Select.Option;

class WayInfoModal extends Component {

    state = {
        visible: false,
        control: ''
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            visible: nextProps.visible
        })
    }
    componentDidMount() {
        this.props.initItem(this)
    }
    initItem = (item) => {
        // console.log('item', item);
        this.setState({ item })
        this.props.form.setFieldsValue({
            wayDirection: item.dir === "IN" ? "in" : "out",
            carmeraIP: item.ipc_ip
        })
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
        this.props.sonWayInfoModal(false)
    }
    handleChange = (e) => {
        if (e === 'yes') {
            this.setState({
                control: ''
            })
        } else if (e === 'no') {
            this.setState({
                control: 'none'
            })
        }
    }
    submit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                // console.log(values);
                let options = {
                    ...this.state.item,
                    "dir": values.wayDirection === "in" ? "IN" : "OUT",
                    "height":parseInt(values.height),
                    "ipc_ip": values.carmeraIP,
                    "pitch": parseInt(values.pitch),
                    "roll": parseInt(values.roll),
                    "score": parseInt(values.score),
                    "thres": parseInt(values.liminal),
                    "track": parseInt(values.track),
                    "width": parseInt(values.width),
                    "yaw": parseInt(values.yaw)
                }
                let data = await api.Location_P(options)
                // console.log('data', data);
                if (data.status === 200) {
                    message.success('配置成功')
                    this.props.reList()
                    this.handleCancel()
                } else {
                    message.error('配置失败')
                }
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 12 }
        }
        return (
            <Modal
                className='way-info-modal'
                title={this.props.title}
                footer={null}
                centered={true}
                visible={this.state.visible}
                onCancel={this.handleCancel}
            >
                <Form onSubmit={this.submit}>

                    <Row type="flex" justify="start">
                        <Col span={8} className="title">添加通道信息配置</Col>
                    </Row>
                    <FormItem
                        label="通道方向"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('wayDirection', {
                            rules: [{ required: false, message: 'Please input your note!' }],
                        })(
                            <Select
                                showSearch
                                optionFilterProp="children"
                                // onChange={handleChange}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                <Option value="in">进</Option>
                                <Option value="out">出</Option>
                            </Select>
                        )}
                    </FormItem>


                    <Row type="flex" justify="start">
                        <Col span={8} className="title">绑定摄像头</Col>
                    </Row>
                    <FormItem
                        label="摄像头IP/名称"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('carmeraIP', {
                            rules: [{ required: false, message: 'Please input your note!' }],
                        })(
                            <Select
                                showSearch
                                optionFilterProp="children"
                                // onChange={handleChange}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                <Option value="1">122.141.12.15</Option>
                                <Option value="2">192.168.147.2</Option>
                            </Select>
                        )}
                    </FormItem>



                    <Row type="flex" justify="start">
                        <Col span={8} className="title">绑定摄像头</Col>
                    </Row>

                    <FormItem
                        label="人脸识别阈值"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('liminal', {
                            rules: [{ required: false, message: 'Please input your note!' }],
                            initialValue: "80"
                        })(
                            <Select
                                showSearch
                                optionFilterProp="children"
                                // onChange={handleChange}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            // 默认阀值75
                            >
                                <Option value="65">65%</Option>
                                <Option value="70">70%</Option>
                                <Option value="75">75%</Option>
                                <Option value="80">80%</Option>
                                <Option value="85">85%</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        label="人脸矩形框宽"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('width', {
                            rules: [{ required: false, message: 'Please input your note!' }],
                            initialValue: '70'
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        label="人脸矩形框高"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('height', {
                            rules: [{ required: false, message: 'Please input your note!' }],
                            initialValue: '70'
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        label="姿态yaw"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('yaw', {
                            rules: [{ required: false, message: 'Please input your note!' }],
                            initialValue: '40'
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        label="姿态pitch"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('pitch', {
                            rules: [{ required: false, message: 'Please input your note!' }],
                            initialValue: '40'
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        label="姿态roll"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('roll', {
                            rules: [{ required: false, message: 'Please input your note!' }],
                            initialValue: '40'
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        label="评分"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('score', {
                            rules: [{ required: false, message: 'Please input your note!' }],
                            initialValue: '75'
                        })(
                            <Select
                                showSearch
                                optionFilterProp="children"
                                // onChange={handleChange}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                <Option value="70">70</Option>
                                <Option value="75">75</Option>
                                <Option value="80">80</Option>
                                <Option value="85">85</Option>
                                <Option value="90">90</Option>
                                <Option value="95">95</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        label="追踪帧率"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('track', {
                            rules: [{ required: false, message: 'Please input your note!' }],
                            initialValue: '15'
                        })(
                            <Select
                                showSearch
                                optionFilterProp="children"
                                // onChange={handleChange}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                <Option value="10">10</Option>
                                <Option value="15">15</Option>
                            </Select>
                        )}
                    </FormItem>

                    <FormItem className='footer' {...formItemLayout}>
                        <Button onClick={this.handleCancel}>取消</Button>
                        <Button type='primary' htmlType='submit'>确定</Button>
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}
const WrappedApp = Form.create()(WayInfoModal)
export default WrappedApp;