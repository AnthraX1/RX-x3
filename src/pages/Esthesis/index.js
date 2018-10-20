import React, { Component } from 'react';
import { Button } from 'antd'
import api from '../../config/api.js'
import './index.scss'
import AddModel from './addModel'

class Esthesis extends Component {
    state = {
        addModelVisible: false
    }
    componentDidMount() {
        
        this.list()
        this.getInit()
    }
   
    AddModelControl = (item) => {
        // e.preventDefault();
        this.setState({
            addModelVisible: true
        })
        this.state.addModel.initItem(item)
    }
    initItem = (addModel) => {
        this.setState({
            addModel
        })
    }
    sonaddModel = (e) => {
        this.setState({
            addModelVisible: false
        })
    }
    getInit = async () => {
        let result = await api.esthesis_g()
        console.log(result.data[0]);
        this.list(result.data)
    }
    list = (data = [{ Mac: '', Serv: '' }]) => {
        let listDOM = data.map((item, index) => {
            return (
                <div className="line layout" key={index}>
                    <div className="index">{index + 1}</div>
                    <div className="name">{item.Mac}</div>
                    <div className="type">{item.Serv}</div>
                    <div className="operate">
                        <span onClick={this.AddModelControl.bind(this, item)} className='blue'>配置</span>
                    </div>
                </div>
            )
        })
        listDOM = listDOM.slice(0, 1)
        this.setState({
            listDOM
        })
    }
    render() {
        return (
            <div className='esthesis'>
                <div className="top">
                    {/* <Button type='primary' onClick={this.AddModelControl}>添加感知</Button> */}
                </div>
                <div className="table">
                    <div className="title layout">
                        <div className="index">序号</div>
                        <div className="name">MAC地址</div>
                        <div className="type">server</div>
                        <div className="operate">操作</div>
                    </div>
                    <div className="body">
                        {/* 添加感知框 */}
                        <AddModel
                            addModelVisible={this.state.addModelVisible}
                            sonaddModel={this.sonaddModel}
                            getInit={this.getInit}
                            initItem={this.initItem}
                        />

                        {this.state.listDOM}
                    </div>
                </div>
            </div>
        );
    }
}

export default Esthesis;