import React, { Component } from 'react';
import { Form, Input,  Col } from 'antd'
import api from '../../config/api'
const FormItem = Form.Item

class X3Form extends Component {
    state = {
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
                label: '安装位',
                model: 'loc',
                message: '请输入安装位信息'
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
            {
                label: '物管服务器',
                model: 'pm',
                message: '请输入物管服务器信息'
            },
            {
                label: '存储服务器',
                model: 'nas',
                message: '请输入存储服务器信息'
            }
        ]
    }
    componentDidMount() {
        this.getX3Info()
    }
    getX3Info = async () => {
        let options = {
            "model": "X3",
            "sn": ""
        }
        let { data } = await api.getX3(options)
        let { fw, loc, mac, model, nas, network, pm, pt_dev, pt_loc, sn, sw, vendor } = data[0]
        // console.log("data", data);
        this.props.parent(sn)
        this.props.form.setFieldsValue({
            fw, loc, mac, model, nas, network, pm, pt_dev, pt_loc, sn, sw, vendor
        })
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
    X3Submit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    render() {

        return (
            <div>
                <h2>X3配置</h2>
                <Form onSubmit={this.X3Submit}>
                    {this.formItem()}
                    <div className="btn">
                        {/* <Button type="primary" htmlType="submit">配   置</Button> */}
                    </div>
                </Form>
            </div>
        )
    }
}

const WrappedApp = Form.create()(X3Form);
export default WrappedApp;