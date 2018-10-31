import React, { Component } from 'react';
import { Button, Upload, Icon, message, Input, Select } from 'antd'
// import TestModal from './../../components/TestModal'
import './index.scss'
import api from '../../config/api'
const Option = Select.Option;

class ProjectTest extends Component {


    state = {
        visible: false,
        loading: false,
        wayTestControl: true,
        fileList: [],
        fileListLenght: 0,
        db: ''
    };
    componentDidMount() {
        this.getDbList()
    }

    getDbList = async () => {
        let result = await api.PicDb_g()
        let listDOM = result.data.map((item, index) => {
            return (
                <Option key={index} value={item.name}>{item.name}</Option>
            )
        })

        this.setState({
            listDOM
        })
    }

    createDb = async () => {
        // console.log('创建',this.refs.dbName.input.value);
        let dbname = this.refs.dbName.input.value
        let options = {
            "Name": dbname
        }
        let result = await api.picDb_p(options)
        // console.log('post-dbname', result);
        if (result.status === 200) {
            this.getDbList()
            this.refs.dbName.input.value = ""
            message.success('创建成功')
        }
    }

    handleChange = (info) => {
        // console.log(info);
        this.setState({
            fileList: info.fileList
        })
    }

    handleRemove(file) {
        // console.log(file);
    }

    beforeUpload = (file, fileList) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            this.setState({
                imageUrl: reader.result
            })
        });
        reader.readAsDataURL(file);

        //  return false 改为手动上传
        return false
    }
    asyncUpload = async (files, name) => {
        // FormData 对象
        var form = new FormData();
        files.forEach((ele, index) => {
            let originEle = ele.originFileObj
            // 文件对象
            form.append("file", originEle);
        });
        // 其他参数
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        let data = await api.Upload(form, name, config)
        if (data.status === 200) {
            message.success('上传成功')
        }

    }
    upload = () => {
        let username = window.sessionStorage.getItem('userInfo')
        if (!this.state.imageUrl) {
            message.warning('请先选择图片');
            return
        } else if (this.state.fileListLenght > 6) {
            message.warning('单次上传不能超过6张');
            return
        } else if (this.state.dbSelect === "") {
            message.warning('请选择上传的库')
            return
        } else if (username !== 'admin') {
            message.warning('你没有权限上传图片')
            return
        }

        this.asyncUpload(this.state.fileList, this.state.db)

    }
    testWay = (way) => {
        // console.log(way);
        this.setState({
            visible: true
        })
    }
    sonLinkTest = () => {
        this.setState({
            visible: false
        })
    }

    dbChange = (value) => {
        this.setState({
            db: value
        })
    }

    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">导入照片</div>
            </div>
        )
        return (
            <div className='project-test'>
                <div className="top">
                    <Input ref="dbName" placeholder="输入需要创建的库名"></Input>
                    <Button onClick={this.createDb} ghost type='primary'>创建</Button>
                </div>
                <div className="body">
                    <div className="title">通道测试</div>
                    {/* <div className="step">
                        <div className={this.state.wayTestControl ? 'step1' : 'step1 did'}>
                            <span>1</span>
                            <span>上传图片</span>
                            <span></span>
                        </div>
                        <div className={this.state.wayTestControl ? 'step2 dont' : 'step2'}>
                            <span>2</span>
                            <span>通道测试</span>
                            <span></span>
                        </div>
                    </div> */}


                    <div className='before' style={{ display: this.state.wayTestControl ? '' : 'none' }}>

                        <div className="upload">
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                multiple={true}
                                // showUploadList={false}
                                // action="http://192.168.100.141:9180/v1/SPic/"
                                beforeUpload={this.beforeUpload}
                                onChange={this.handleChange}
                                onRemove={this.handleRemove}
                            >
                                {/* {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" /> : uploadButton} */}
                                {this.state.fileList.length > 0 ? '' : uploadButton}
                            </Upload>
                        </div>
                        <div className="dbs">
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="选择需要上传的库"
                                optionFilterProp="children"
                                onChange={this.dbChange}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {this.state.listDOM}
                            </Select>
                        </div>
                        <div className="btn">
                            <Button onClick={this.upload} type='primary'>上传网关</Button>
                        </div>
                    </div>

                    {/* 测试模态框 */}
                    {/* <TestModal
                        modelType='type2'
                        visible={this.state.visible}
                        title='开门失败'
                        sonLinkTest={this.sonLinkTest}
                    /> */}

                    {/* <div className='after' style={{ display: this.state.wayTestControl ? 'none' : '' }}>
                        <Button onClick={this.testWay.bind(this, 1)} type='primary'>X1通道</Button>
                        <Button onClick={this.testWay.bind(this, 2)} type='primary'>X2通道</Button>
                    </div> */}

                </div>
            </div>
        );
    }
}

export default ProjectTest;