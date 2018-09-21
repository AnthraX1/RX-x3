import React, { Component } from 'react';
import { Button, Upload, Icon, message } from 'antd'
import TestModal from './../../components/TestModal'
import './index.scss'

class ProjectTest extends Component {


    state = {
        visible: false,
        loading: false,
        wayTestControl: true
    };


    beforeUpload = (file) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            this.setState({
                imageUrl: reader.result
            })
        });
        reader.readAsDataURL(file);
    }
    upload = ()=> {
        if(!this.state.imageUrl){
            message.warning('请先选择图片');
            return
        }
        this.setState({
            wayTestControl: false
        })
    }
    testWay = (way) => {
        // console.log(way);
        this.setState({
            visible: true
        })
    }
    sonLinkTest = ()=> {
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
                        <div className={this.state.wayTestControl?'step1':'step1 did'}>
                            <span>1</span>
                            <span>上传图片</span>
                            <span></span>
                        </div>
                        <div className={this.state.wayTestControl?'step2 dont':'step2'}>
                            <span>2</span>
                            <span>通道测试</span>
                            <span></span>
                        </div>
                    </div>


                    <div className='before' style={{display:this.state.wayTestControl?'':'none'}}>
                        <div className="upload">
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                // action="//jsonplaceholder.typicode.com/posts/"
                                beforeUpload={this.beforeUpload}
                                onChange={this.handleChange}
                            >
                                {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" /> : uploadButton}
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

                    <div className='after' style={{display:this.state.wayTestControl?'none':''}}>
                        <Button onClick={this.testWay.bind(this,1)} type='primary'>X1通道</Button>
                        <Button onClick={this.testWay.bind(this,2)} type='primary'>X2通道</Button>
                    </div>

                </div>
            </div>
        );
    }
}

export default ProjectTest;