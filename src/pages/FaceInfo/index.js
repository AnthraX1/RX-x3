import React, { Component } from 'react';
import { Button } from 'antd'
import FaceDB from './download.js'
import List from './list.js'
import DeleteModal from './../../components/DeleteModal'
import api from './../../config/api.js'

import './index.scss'

class FaceInfo extends Component {

    state = {
        visible: false,
        DeleteModalVisible: false,
        listModalVisible: false,
        listItem: {
            person: 0
        }
    }
    componentDidMount() {
        this.list()
    }
    faceDBMOdal =() => {
        this.setState({
            visible: true
        })
    }
    sonFaceDB = () => {
        this.setState({
            visible:false
        })
    }
    deleteModal = () => {
        this.setState({
            DeleteModalVisible: true
        })
    }
    sonDeleteModal = () => {
        this.setState({
            DeleteModalVisible: false
        })
    }
    showList = (item) => {
        // console.log(item);
        this.setState({
            listModalVisible: true,
            listItem: item
        })
    }
    sonListModal = () => {
        this.setState({
            listModalVisible: false
        })
    }
    pageChange = (e) => {
        console.log(e);
    }
    list = async () => {
        let { data } = await api.FaceDb_g()
        let listDom = data.map((item,index) => {
            return (
                <div className="line layout" key={index}>
                    <div className="index">{index+1}</div>
                    {/* <div className="name">万科小区1期通行库</div> */}
                    {/* <div className="type">白名单</div> */}
                    <div className="source">{item.db}</div>
                    <div className="position">
                        {
                            item.location.map((item,index) => {
                                return (
                                    <p key={index+ "_"}>{item}</p>
                                )
                            })
                        }
                    </div>
                    <div className="count">
                        <p>人数:{item.person}人</p>
                        <p>照片:{item.photo}张</p>
                    </div>
                    <div className="operate">
                        <span onClick={this.showList.bind(this, item)}>查看</span>
                        <span onClick={this.deleteModal}>本地删除</span>
                    </div>
                </div>
            )
        })
        this.setState({
            listDom
        })
    }

    render() {
        return (
            <div className='face-info'>
                <div className="top">
                    <Button onClick= {this.faceDBMOdal} type='primary'>下载人脸库</Button>
                </div>
                <div className="table">
                    <div className="title layout">
                        <div className="index">序号</div>
                        {/* <div className="name">通行库名称</div> */}
                        {/* <div className="type">库类型</div> */}
                        <div className="source">库来源</div>
                        <div className="position">位置信息</div>
                        <div className="count">人脸库统计</div>
                        <div className="operate">操作</div>
                    </div>
                    <div className="body">
                        {/* 下载人脸库模态框 */}
                        <FaceDB 
                            visible= {this.state.visible}
                            sonFaceDB = {this.sonFaceDB}
                        />

                        {/* 删除模态框 */}
                        <DeleteModal 
                            visible = {this.state.DeleteModalVisible}
                            sonDeleteModal = {this.sonDeleteModal}
                        />
                        {/* 人脸库列表 */}

                        <List
                            listItem = {this.state.listItem}
                            visible = {this.state.listModalVisible}
                            sonListModal = {this.sonListModal}
                        />
                        {this.state.listDom}
                    </div>
                </div>
                <div className="page">
                    {/* <Pagination onChange={this.pageChange} defaultCurrent={1} total={500} /> */}
                </div>
            </div>
        );
    }
}

export default FaceInfo;