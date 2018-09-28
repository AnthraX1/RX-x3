import React, { Component } from 'react';
import { Pagination, Drawer, Input, Button } from 'antd'
import './list.scss'
import axios from './../../config/axios.js';
class List extends Component {
    state = {
        visible: false,
        childrenDrawer: false,
        pageSize: 2,
        totalNum: 0
    };
    componentWillReceiveProps(props) {
        // console.log(this.state);
        this.setState({
            visible: props.visible,
            listItem: props.listItem,
            totalNum: props.listItem.person
        }, () => {
            if (this.state.listItem && this.state.visible) {
                // console.log('节流请求')
                this.peopleList(this.state.listItem.db, this.state.pageSize, 1)
            }
        })
    }
    asyncPeopleList = async (db, num, page) => {
        return axios.get(`/FaceDb/${db}/${(page - 1) * num}/${num}`)
    }
    onClose = () => {
        this.setState({
            visible: false,
        });
        this.props.sonListModal(false)
    };
    showChildrenDrawer = (item) => {
        // console.log(item);
        this.setState({
            childrenDrawer: true,
        });
        this.imgList(item)
    };
    onChildrenDrawerClose = () => {
        this.setState({
            childrenDrawer: false,
        });
    };
    pageChange = (page) => {
        this.peopleList(this.state.listItem.db, this.state.pageSize, page)
    }
    peopleList = async (db, num, page) => {
        let { data } = await this.asyncPeopleList(db, num, page)
        // console.log("data",data);
        let peopleListDom = data.map((item,index) => {
            return (
                <div className="line layout" key={index}>
                    <div className="index">{(index+1) + (page-1) * this.state.pageSize}</div>
                    <div className="face-id">{item.face}</div>
                    <div className="examine" onClick={this.showChildrenDrawer.bind(this,item)}>查看</div>
                </div>
            )
        })
        this.setState({
            peopleListDom
        })
    }
    imgList =async (item) => {
        let imgDom = item.image.map((item,index) => {
            return (
                <img src={item} alt="" key={index}/>
            )
        })
        this.setState({
            imgDom
        })
    }
    render() {
        return (
            <Drawer
                className='face-id-list'
                title="face id列表"
                placement="left"
                width={700}
                // closable={false}
                onClose={this.onClose}
                visible={this.state.visible}
            >
                <div className="search">
                    <Input placeholder='请输入您想查询的face id'></Input>
                    <Button>搜索</Button>
                </div>
                <div className="tit layout">
                    <div className="index">序号</div>
                    <div className="face-id">face id</div>
                    <div className="examine">查看人脸库</div>
                </div>
                <div className="body">
                    {/* <div className="line layout">
                        <div className="index">1</div>
                        <div className="face-id">abc124312-dsaf</div>
                        <div className="examine" onClick={this.showChildrenDrawer}>查看</div>
                    </div> */}
                    {this.state.peopleListDom}
                </div>
                <div className="page">
                    <Pagination onChange={this.pageChange} defaultCurrent={1} pageSize={this.state.pageSize} total={this.state.totalNum} />
                </div>

                {/* 二级抽屉 */}
                <Drawer
                    className='children-drawer'
                    title="人脸图片列表"
                    width={520}
                    closable={false}
                    placement="left"
                    onClose={this.onChildrenDrawerClose}
                    visible={this.state.childrenDrawer}
                >
                    {this.state.imgDom}
                </Drawer>
            </Drawer>
        );
    }
}

export default List;