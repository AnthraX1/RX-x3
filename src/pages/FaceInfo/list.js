import React, { Component } from 'react';
import { Drawer } from 'antd'
import './list.scss'
class List extends Component {
    state = {
        visible: false,
        childrenDrawer: false
    };
    componentWillReceiveProps(props) {
        this.setState({
            visible: props.visible
        })
    }
    onClose = () => {
        this.setState({
            visible: false,
        });
        this.props.sonListModal(false)
    };
    showChildrenDrawer = () => {
        this.setState({
            childrenDrawer: true,
        });
    };
    onChildrenDrawerClose = () => {
        this.setState({
            childrenDrawer: false,
        });
    };
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
                <div className="tit layout">
                    <div className="index">序号</div>
                    <div className="face-id">face id</div>
                    <div className="examine">查看人脸库</div>
                </div>
                <div className="body">
                    <div className="line layout">
                        <div className="index">1</div>
                        <div className="face-id">abc124312-dsaf</div>
                        <div className="examine" onClick={this.showChildrenDrawer}>查看</div>
                    </div>
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
                    <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1176987195,174235917&fm=27&gp=0.jpg" alt=""/>
                    <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1176987195,174235917&fm=27&gp=0.jpg" alt=""/>
                    <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1176987195,174235917&fm=27&gp=0.jpg" alt=""/>
                    <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1176987195,174235917&fm=27&gp=0.jpg" alt=""/>
                    <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1176987195,174235917&fm=27&gp=0.jpg" alt=""/>
                    <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1176987195,174235917&fm=27&gp=0.jpg" alt=""/>
                    <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1176987195,174235917&fm=27&gp=0.jpg" alt=""/>
                    <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1176987195,174235917&fm=27&gp=0.jpg" alt=""/>
                    <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1176987195,174235917&fm=27&gp=0.jpg" alt=""/>
                    <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1176987195,174235917&fm=27&gp=0.jpg" alt=""/>
                </Drawer>
            </Drawer>
        );
    }
}

export default List;