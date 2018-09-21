import React, { Component } from 'react';
import { Button, Pagination } from 'antd'
import './index.scss'
import DeleteModal from './../../components/DeleteModal'
import PositionModal from './positionModal'

class PositionInfo extends Component {
    state = {
        ModalVisible: false,
        deleteModalVisible: false
    }

    delete = () => {
        this.setState({
            deleteModalVisible: true
        })
    }
    sonDeleteModal = () => {
        this.setState({
            deleteModalVisible: false
        })
    }
    add = () => {
        this.setState({
            ModalVisible: true
        })
    }
    sonModal = () => {
        this.setState({
            ModalVisible: false
        })
    }
    list = () => {
        let arr = [1, 1, 1, 1, 1, 1]
        return arr.map((Item, index) => {
            return (
                <div className="line layout" key={index}>
                    <div className="index">{index + 1}</div>
                    <div className="position">万科小区1期北大门</div>
                    {/* <div onClick={this.delete} className="operate red">删除</div> */}
                </div>
            )
        })
    }

    render() {
        return (
            <div className='position-info'>
                <div className="top">
                    {/* <Button onClick={this.add} type='primary'>添加位置信息</Button> */}
                </div>
                <div className="table">
                    <div className="title layout">
                        <div className="index">序号</div>
                        <div className="position">位置</div>
                        {/* <div className="operate">操作</div> */}
                    </div>
                    <div className="body">
                        {/* 删除模态框 */}
                        <DeleteModal
                            sonDeleteModal={this.sonDeleteModal}
                            visible={this.state.deleteModalVisible}
                        />

                        {/* 添加位置信息模态框 */}
                        {/* <PositionModal
                            visible = {this.state.ModalVisible}
                            sonModal = {this.sonModal}
                        /> */}

                        {this.list()}
                    </div>
                </div>
                <div className="page">
                    <Pagination onChange={this.pageChange} defaultCurrent={1} total={500} />
                </div>
            </div>
        );
    }
}

export default PositionInfo;