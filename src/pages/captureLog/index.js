import React, { Component } from 'react';
import { DatePicker, Pagination, Input, Button, Icon } from 'antd'
import Zmage from 'react-zmage'
import api from '../../config/api.js'
import tool from './../../tools'
import locale from 'antd/lib/date-picker/locale/zh_CN';
import './index.scss'

const { RangePicker } = DatePicker;


class SystemLog extends Component {
    state = {
        currentPage: 1,
        pageSize:4,
        totalNum: 0
    }
    componentDidMount() {
        this.list(this.state.pageSize, 1)
    }
    pageChange = (page) => {
        this.list(this.state.pageSize, page)
        this.setState({
            currentPage: page
        })
    }
    onChange = (value, dateString) => {
        // console.log('Selected Time: ', value);
        // console.log('Formatted Selected Time: ', dateString);
    }


    onOk = (value) => {
        console.log(value);
        let data0 = new Date(value[0]._d)
        let data1 = new Date(value[1]._d)
        console.log(data0.getTime(),data1);
    }



    list = async (num, page) => {
        let { data } = await api.faceLog(0, num, page)
        console.log(data);
        // let arr = [1, 2, 3, 4, 5]
        let formatDate = tool.formatDate
        let listDom = data.logs.map((item, index) => {
            return (
                <div className='layout list' key={index}>
                    <div className="operate-data">{formatDate(item.ts*1000)}</div>
                    {/* <div className="face-db">通行库</div> */}
                    <div className="way-info">{item.ch}</div>
                    {/* <div className="record">开门</div> */}
                    {/* <div className="direction">进</div> */}
                    <div className="contrast">
                        <Zmage src={item.image} alt="" />
                    </div>
                </div>
            )
        })
        this.setState({
            listDom,
            totalNum: data.total
        })
    }
    render() {
        return (
            <div className='system-log'>
                <div className="search">
                    <div>
                        <div className="key">日期：</div>
                        <div className="value">
                            <RangePicker
                                locale={locale}
                                showTime={{ format: 'HH:mm' }}
                                format="YYYY-MM-DD HH:mm"
                                placeholder={['开始时间', '结束时间']}
                                onChange={this.onChange}
                                onOk={this.onOk}
                            />
                        </div>
                    </div>
                    {/* <div>
                        <div className="key">人脸库: </div>
                        <div className="value">
                            <Input></Input>
                        </div>
                    </div> */}
                    <div>
                        <div className="key">通道信息:</div>
                        <div className="value">
                            <Input></Input>
                        </div>
                    </div>
                    <div className="btn">
                        <Button><Icon type='search'></Icon>搜索</Button>
                    </div>
                </div>
                <div className="title layout">
                    <div className="operate-data">操作日期</div>
                    {/* <div className="face-db">人脸库</div> */}
                    <div className="way-info">通道信息</div>
                    {/* <div className="record">行为记录</div> */}
                    {/* <div className="direction">方向</div> */}
                    <div className="contrast">照片(抓拍照片vs比对库照片)</div>
                </div>
                <div className="body">
                    {this.state.listDom}
                </div>
                <div className="page">
                    <Pagination onChange={this.pageChange} current={this.state.currentPage} pageSize={this.state.pageSize} total={this.state.totalNum} />
                </div>
            </div>
        );
    }
}

export default SystemLog;