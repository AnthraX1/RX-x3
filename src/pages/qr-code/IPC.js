import React, { Component } from 'react';
import { Form, Input, Button, Col } from 'antd'
const FormItem = Form.Item
class AddIPC extends Component {
    state = {
        ipc_location: '',
        item: [
            {
                label: '供应商',
                model: 'vendor',
                message: '请输入供应商信息'
            },
            {
                label: '设备类型',
                model: 'model',
                message: '请输入设备类型信息'
            },
            {
                label: '设备序列号',
                model: 'sn',
                message: '请输入设备序列号信息'
            },
            {
                label: '软件版本',
                model: 'sw',
                message: '请输入软件版本信息'
            },
            {
                label: '固件版本',
                model: 'fw',
                message: '请输入固件版本信息'
            },
            {
                label: 'MAC地址',
                model: 'mac',
                message: '请输入MAC地址信息'
            },
            {
                label: '网络IP/子网',
                model: 'network',
                message: '请输入网络IP/子网信息'
            },
            {
                label: '安装位置',
                model: 'loc',
                message: '请输入安装位置信息'
            },
            {
                label: '设备码',
                model: 'pt_dev',
                message: '请输入设备码信息'
            },
            {
                label: '位置码',
                model: 'pt_loc',
                message: '请输入位置码信息'
            },
        ]
    }
    componentDidMount() {
        this.props.parent(this)
    }

    formItem = () => {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };
        let formDOM = this.state.item.map((v, i) => {
            return (
                <Col span={8} key={i}>
                    <FormItem
                        label={v.label}
                        {...formItemLayout}
                    >
                        {getFieldDecorator(`${v.model}`, {
                            rules: [{ required: true, message: `${v.message}` }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                </Col>
            )
        })
        return formDOM
    }
    initForm = (data) => {
        this.setState({ipc_location: data.loc})
        let { fw, loc, mac, model, network, pt_dev, pt_loc, sn, sw, vendor } = data
        this.props.form.setFieldsValue({
            fw, loc, mac, model, network, pt_dev, pt_loc, sn, sw, vendor
        })
    }
    IPCSubmit = () => {
        console.log(this.props.data);
    }
    render() {
        return (
            <div>
                <Form onSubmit={this.IPCSubmit}>
                    <h2>IPC配置 {this.state.ipc_location}</h2>
                    {this.formItem()}
                    <div className="btn">
                        <Button type="primary" htmlType="submit">配   置</Button>
                    </div>
                </Form>
            </div>

        );
    }
}

const WrappedApp = Form.create()(AddIPC);
export default WrappedApp;