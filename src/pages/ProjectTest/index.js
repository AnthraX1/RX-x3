import React, { Component } from 'react';
import { Button, Upload, Icon, message } from 'antd'
import TestModal from './../../components/TestModal'
import './index.scss'
import api from '../../config/api'

class ProjectTest extends Component {


    state = {
        visible: false,
        loading: false,
        wayTestControl: true,
        fileList: [],
        fileListLenght: 0
    };

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
        // this.state.fileList.push(file)
        this.setState({ fileList })

        const reader = new FileReader();
        reader.addEventListener('load', () => {
            this.setState({
                imageUrl: reader.result
            })
        });
        reader.readAsDataURL(file);

        // this.setState({ file })
        //  return false 改为手动上传
        return false
    }
    asyncUpload = async (files) => {
        let _this = this
        // FormData 对象
        var form = new FormData();
        files.forEach((ele, index) => {
            let originEle = ele.originFileObj
            // console.log(ele);
            // 文件对象
            form.append("file", originEle);
        });
        // 其他参数
        // form.append("xxx", xxx);
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        // console.log(form);
        let data = await api.Upload(form, config)
        console.log('data',data);
        if (data.status === 200) {
            _this.setState({
                wayTestControl: false
            })
        }
        // axios.post('http://192.168.100.141:9180/v1/SPic/', form, config).then(data => {
        //     console.log('上传', data);
        //     if (data.status === 200) {
        //         _this.setState({
        //             wayTestControl: false
        //         })
        //     }
        // }).catch(err => {
        // })
    }
    upload = () => {
        if (!this.state.imageUrl) {
            message.warning('请先选择图片');
            return
        } else if (this.state.fileListLenght > 6) {
            message.warning('单次上传不能超过6张');
            return
        }

        // console.log('fileList', this.state.fileList);
        this.asyncUpload(this.state.fileList)

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
                    <Button ghost type='primary'>清空测试数据</Button>
                </div>
                <div className="body">
                    <div className="title">通道测试</div>
                    <div className="step">
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
                    </div>


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
                        <div className="btn">
                            <Button onClick={this.upload} type='primary'>上传网关</Button>
                        </div>
                    </div>

                    {/* 测试模态框 */}
                    <TestModal
                        modelType='type2'
                        visible={this.state.visible}
                        title='开门失败'
                        sonLinkTest={this.sonLinkTest}
                    />

                    <div className='after' style={{ display: this.state.wayTestControl ? 'none' : '' }}>
                        <Button onClick={this.testWay.bind(this, 1)} type='primary'>X1通道</Button>
                        <Button onClick={this.testWay.bind(this, 2)} type='primary'>X2通道</Button>
                    </div>

                </div>
            </div>
        );
    }
}

export default ProjectTest;