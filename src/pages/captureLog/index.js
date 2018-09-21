import React, { Component } from 'react';
import { DatePicker, Pagination, Input, Button, Icon } from 'antd'
import locale from 'antd/lib/date-picker/locale/zh_CN';
import './index.scss'

const { RangePicker } = DatePicker;


class SystemLog extends Component {

    onChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }

    onOk = (value) => {
        console.log('onOk: ', value);
    }

    list = () => {
        let arr = [1, 2, 3, 4, 5]
        return arr.map((item,index) => {
            return (
                <div className='layout list' key={index}>
                    <div className="operate-data">2017-09-21 12:32</div>
                    {/* <div className="face-db">通行库</div> */}
                    <div className="way-info">万科小区围墙机</div>
                    {/* <div className="record">开门</div> */}
                    <div className="direction">进</div>
                    <div className="contrast">
                            <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1176987195,174235917&fm=27&gp=0.jpg" alt="" />
                    </div>
                </div>
            )
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
                    <div>
                        <div className="key">人脸库: </div>
                        <div className="value">
                            <Input></Input>
                        </div>
                    </div>
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
                    <div className="direction">方向</div>
                    <div className="contrast">照片(抓拍照片vs比对库照片)</div>
                </div>
                <div className="body">
                    {this.list()}
                </div>
                <div className="page">
                    <Pagination defaultCurrent={1} total={50} />
                </div>
            </div>
        );
    }
}

export default SystemLog;