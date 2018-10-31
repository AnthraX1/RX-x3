import React, { Component } from 'react';
import { DatePicker, Pagination, Input, Button, Icon, message } from 'antd'
import locale from 'antd/lib/date-picker/locale/zh_CN';
import api from '../../config/api.js';
import tool from './../../tools'
import "./index.scss"


const { RangePicker } = DatePicker;

class OperateLog extends Component {
    state = {
        currentPage: 1,  //当前页码
        pageSize: 8,   // 每页显示的数量
        totalNum: 0,   // 列表总数量
    }

    componentDidMount() {
        this.list()
    }
    download = async () => {
        let option = {
            "beg": this.state.beg,
            "end": this.state.end,
            "limit":  999999,
            "offset":0,
            "user": this.state.user
        }
        let {data} = await api.operate_download(option)
        let downloadUrl = data.Url
        // console.log(downloadUrl);
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
    search = () => {
        this.list(this.state.beg, this.state.end, 1, this.state.user)
        this.setState({
            currentPage: 1
        })
    }
    inputChange = (e) => {
        this.setState({
            user: e.target.value
        })
    }
    timeChange = (value) => {
        // console.log(value);
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
    pageChange = (page) => {
        this.list(this.state.beg, this.state.end, page, this.state.user)
        this.setState({
            currentPage: page
        })
    }
    list = async (beg = 0, end = 0, page = 1, user = "") => {
        let option = {
            "beg": beg,
            "end": end,
            "limit": this.state.pageSize,
            "offset": (page - 1) * this.state.pageSize,
            "user": user
        }
        let formatDate = tool.formatDate
        let result = await api.operate_g(option)
        // console.log('result', result);

        let data = result.data

        if (!data.logs || data.logs.length === 0) {
            message.error('没有搜到结果,请确定搜索条件重新搜索')
            let user = this.refs.user.input.value = ""
            this.setState({
                user: user
            })
            return
        }
        // 排序算法
        let logs = data.logs.sort((a, b) => {
            let time1 = a.ts
            let time2 = b.ts
            return time2 - time1
        })
        let listDOM = logs.map((item, index) => {
            return (
                <div className="layout list" key={index}>
                    <div className="operate-data">{formatDate(item.ts * 1000)}</div>
                    <div className="user">{item.user}</div>
                    <div className="operate">{item.op}</div>
                    <div className="time">{item.duration}</div>
                    <div className={item.status === "Succ" ? "status succ" : "status fail"}></div>
                </div>
            )
        })
        this.setState({
            listDOM,
            totalNum: data.total
        })
    }
    render() {
        return (
            <div className="operate-log">
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
                    <div>
                        <div className="key">用户:</div>
                        <div className="value">
                            <Input ref="user" onChange={this.inputChange}></Input>
                        </div>
                    </div>
                    <div className="btn">
                        <Button onClick={this.search}><Icon type='search'></Icon>搜索</Button>
                    </div>
                    <div className="download">
                        <Button type="primary" onClick={this.download}><Icon type='download'></Icon>下载</Button>
                    </div>
                </div>
                <div className="title layout">
                    <div className="operate-data">操作日期</div>
                    <div className="user">用户</div>
                    <div className="operate">操作</div>
                    <div className="time">耗时(ms)</div>
                    <div className="status">状态</div>
                </div>
                <div className="body">
                    {this.state.listDOM}
                </div>
                <div className="page">
                    <Pagination onChange={this.pageChange} current={this.state.currentPage} pageSize={this.state.pageSize} total={this.state.totalNum} />
                </div>
            </div>
        );
    }
}

export default OperateLog;