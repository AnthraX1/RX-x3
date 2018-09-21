import React, { Component } from 'react';
import { Modal, Tree } from 'antd';
import './positionModal.scss'
const TreeNode = Tree.TreeNode;

class positionModal extends Component {

    treeData = [
        {
            title: '万科小区1期',
            key: '1',
            children: [
                {
                    title: '万科小区1栋',
                    key: '1-1',
                },
                {
                    title: '万科小区2栋',
                    key: '1-2',
                }
            ]
        },
        {
            title: '龙湖小区1期',
            key: '2',
            children: [
                {
                    title: '龙湖小区1栋',
                    key: '2-1',
                },
                {
                    title: '龙湖小区2栋',
                    key: '2-2',
                }
            ]
        }
    ]

    state = { visible: false }

    componentWillReceiveProps(nextProps) {
        this.setState({
            visible: nextProps.visible
        })
    }
    handleOk = (e) => {
        console.log(this.state.seleted);
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
        this.props.sonModal()
    }


    onCheck = (key,e) => {
        console.log(key, e);
        this.setState({
            seleted: key
        })
    }


    renderTreeNodes = (data) => {
        return data.map((item,index) => {
            if(item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                )
            }
            return <TreeNode {...item} />
        })
    }

    render() {
        return (
            <Modal
                className='position-modal'
                title="添加位置信息"
                cancelText='取消'
                okText='确定'
                width={300}
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <Tree
                    checkable
                    autoExpandParent
                    onCheck={this.onCheck}
                >

                    {this.renderTreeNodes(this.treeData)}
                </Tree>
            </Modal>
        );
    }
}

export default positionModal;