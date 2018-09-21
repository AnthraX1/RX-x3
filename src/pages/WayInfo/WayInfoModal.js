import React, { Component } from 'react';
import { Modal, Form, Select, Input, Button, Row, Col } from 'antd';
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


    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
        this.props.sonWayInfoModal(false)
    }
    handleChange = (e) => {
        if(e === 'yes') {
            this.setState({
                control: ''
            })
        }else if(e === 'no') {
            this.setState({
                control: 'none'
            })
        }
    }
    submit = (e) => {
        console.log('23412');
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
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
                    {/* <FormItem
                        label="位置信息"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('position', {
                            rules: [{ required: false, message: 'Please input your note!' }],
                        })(
                            <Select
                                showSearch
                                optionFilterProp="children"
                                // onChange={handleChange}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                <Option value="1">万科1期</Option>
                                <Option value="2">万科2期</Option>
                                <Option value="3">万科3期</Option>
                            </Select>
                        )}
                    </FormItem> */}
                    {/* <FormItem
                        label="人脸库信息"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('faceDBInfo', {
                            rules: [{ required: false, message: 'Please input your note!' }],
                        })(
                            <Input disabled autoComplete='off' />
                        )}
                    </FormItem> */}
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
                    {/* <FormItem
                        label="是否监控"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('monitor', {
                            rules: [{ required: false, message: 'Please input your note!' }],
                        })(
                            <Select
                                showSearch
                                optionFilterProp="children"
                                // onChange={handleChange}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                <Option value="yes">是</Option>
                                <Option value="no">否</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        label="是否用于开门"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('openDoor', {
                            rules: [{ required: false, message: 'Please input your note!' }],
                            initialValue: 'yes'
                        })(
                            <Select
                                showSearch
                                optionFilterProp="children"
                                onChange={this.handleChange}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                <Option value="yes">是</Option>
                                <Option value="no">否</Option>
                            </Select>
                        )}
                    </FormItem>

                    <div style={{display:this.state.control}}>
                        <FormItem
                            label="继电器IP"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('relayIP', {
                                rules: [{ required: false, message: 'Please input your note!' }],
                            })(
                                <Select
                                    showSearch
                                    optionFilterProp="children"
                                    // onChange={handleChange}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value="1">127.168.11.22</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            label="继电器通道"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('relayWay', {
                                rules: [{ required: false, message: 'Please input your note!' }],
                            })(
                                <Select
                                    showSearch
                                    optionFilterProp="children"
                                    // onChange={handleChange}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value="1">way1</Option>
                                    <Option value="2">way2</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            label="开门延时"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('delay', {
                                rules: [{ required: false, message: 'Please input your note!' }],
                                initialValue: '1s'
                            })(
                                <Input disabled />
                            )}
                        </FormItem>
                        <FormItem
                            label="开门时间"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('time', {
                                rules: [{ required: false, message: 'Please input your note!' }],
                                initialValue: '1s'
                            })(
                                <Input disabled />
                            )}
                        </FormItem>
                        <FormItem
                            label="开门超时报警"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('overtimeWarning', {
                                rules: [{ required: false, message: 'Please input your note!' }],
                            })(
                                <Select
                                    showSearch
                                    optionFilterProp="children"
                                    // onChange={handleChange}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value="open">开启</Option>
                                    <Option value="close">关闭</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            label="超时时间"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('overtime', {
                                rules: [{ required: false, message: 'Please input your note!' }],
                                initialValue: '120s'
                            })(
                                <Input disabled />
                            )}
                        </FormItem>
                    </div> */}
                    

                    <Row type="flex" justify="start">
                        <Col span={8} className="title">绑定摄像头</Col>
                    </Row>
                    {/* <FormItem
                        label="人脸识别模式"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('discernMode', {
                            rules: [{ required: false, message: 'Please input your note!' }],
                        })(
                            <Select
                                showSearch
                                optionFilterProp="children"
                                // onChange={handleChange}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                <Option value="single">单脸识别</Option>
                                <Option value="multi">多脸识别</Option>
                            </Select>
                        )}
                    </FormItem> */}
                    <FormItem
                        label="人脸识别阈值"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('liminal', {
                            rules: [{ required: false, message: 'Please input your note!' }],
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
                    {/* <FormItem
                        label="人脸偏转角度"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('angle', {
                            rules: [{ required: false, message: 'Please input your note!' }],
                        })(
                            <Select
                                showSearch
                                optionFilterProp="children"
                                // onChange={handleChange}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                <Option value="10">10°</Option>
                                <Option value="20">20°</Option>
                            </Select>
                        )}
                    </FormItem> */}
                    {/* <FormItem
                        label="人脸瞳距"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('overtime', {
                            rules: [{ required: false, message: 'Please input your note!' }],
                            initialValue: 'xxx'
                        })(
                            <Input disabled />
                        )}
                    </FormItem>
                    <FormItem
                        label="人脸抓拍速度"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('speed', {
                            rules: [{ required: false, message: 'Please input your note!' }],
                        })(
                            <Select
                                showSearch
                                optionFilterProp="children"
                                // onChange={handleChange}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                <Option value="1">1s</Option>
                                <Option value="2">2s</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        label="抓拍照片"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('speed', {
                            rules: [{ required: false, message: 'Please input your note!' }],
                        })(
                            <Select
                                showSearch
                                optionFilterProp="children"
                                // onChange={handleChange}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                <Option value="l">大</Option>
                                <Option value="m">中</Option>
                                <Option value="s">小</Option>
                            </Select>
                        )}
                    </FormItem> */}




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