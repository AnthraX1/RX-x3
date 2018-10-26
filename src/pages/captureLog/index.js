import React, { Component } from 'react';
import { DatePicker, Pagination, Input, Button, Icon, message } from 'antd'
import Zmage from 'react-zmage'
import api from '../../config/api.js'
import tool from './../../tools'
import locale from 'antd/lib/date-picker/locale/zh_CN';
import './index.scss'

const { RangePicker } = DatePicker;


class captureLog extends Component {
    state = {
        currentPage: 1,  //当前页码
        pageSize: 100,   // 每页显示的数量
        totalNum: 0,   // 列表总数量
        beg: 0,
        end: 0,
        ch: "",
    }
    componentDidMount() {
        this.list(this.state.pageSize, 1)
    }
    inputChange = (e) => {
        console.log(e.target.value);
        this.setState({
            ch: e.target.value
        })
    }
    pageChange = (page) => {
        this.list(this.state.pageSize, page, this.state.ch, this.state.beg, this.state.end)
        this.setState({
            currentPage: page
        })
    }

    timeChange = (value) => {
        console.log(value);
        if (!value.length) {
            this.setState({
                beg: 0,
                end: 0
            })
            return
        }
        let data0 = new Date(value[0]._d)
        let data1 = new Date(value[1]._d)
        let beg = parseInt(data0.getTime() / 1000, 10)
        let end = parseInt(data1.getTime() / 1000, 10)
        this.setState({
            beg,
            end
        })
    }

    search = async () => {
        console.log('search', this.state.ch, this.state.beg, this.state.end);
        this.list(this.state.pageSize, 1, this.state.ch, this.state.beg, this.state.end)
    }

    download = async (page) => {
        let options = {
            "beg": this.state.beg,
            "end": this.state.end,
            "ch": this.state.ch,
            "db": "",
            "face": "",
            "hit": 0,
            "limit": 10000000000000,
            "offset": 0
        }
        let {data} = await api.download(options)
        let downloadUrl = data.Url
        this.downloadFile(downloadUrl)

    }
    downloadFile = (url) => {
        var formDOM = document.createElement('form')
        formDOM.style = 'display:none'
        formDOM.target = ""
        formDOM.method = "get"
        formDOM.action = url
        document.body.appendChild(formDOM)
        formDOM.submit()
        document.body.removeChild(formDOM)
    }


    list = async (num = 10, page = 1, ch = "", beg = 0, end = 0) => {
        let { data } = await api.faceLog(0, num, page, ch, beg, end)
        console.log(data);
        if (!data.logs) {
            message.error('没有搜到结果')
            return
        }
        // let arr = [1, 2, 3, 4, 5]
        let formatDate = tool.formatDate
        let listDom = data.logs.map((item, index) => {
            return (
                <div className='layout list' key={index}>
                    <div className="operate-data">{formatDate(item.ts * 1000)}</div>
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
                                onChange={this.timeChange}
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
                            <Input onChange={this.inputChange}></Input>
                        </div>
                    </div>
                    <div className="btn">
                        <Button onClick={this.search}><Icon type='search'></Icon>搜索</Button>
                    </div>
                    <div className="download">
                        <Button type='primary' onClick={this.download}><Icon type='download'></Icon>下载</Button>
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

export default captureLog;