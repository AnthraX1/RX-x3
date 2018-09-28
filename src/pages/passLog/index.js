import React, { Component } from 'react';
import { DatePicker, Pagination, Input, Button, Icon, Popover } from 'antd'
// 点击放大图片插件
import Zmage from 'react-zmage'
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
    infoModel = (info = {type: '身份证', id:'41101321100011222222224'}) => {
        let spanStyle = {
            width: '60px',
            display: 'inline-block',
            textAlignLast: 'justify',
            marginRight: '10px'
        }
        let wordStyle = {
            fontWeight: '700'
        }
        return (
            <div>
                <div><span style={spanStyle}>证件类型:</span><span style={wordStyle}>{info.type}</span></div>
                <div><span style={spanStyle}>证件号:</span><span style={wordStyle}>{info.id}</span></div>
            </div>
        )
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
                    <div className="Snap-Shot">
                        <div className='get-img'>
                            <Zmage src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1176987195,174235917&fm=27&gp=0.jpg" alt="" />
                            <span className='proportion'>抓拍照片</span>
                        </div>
                    </div>
                    <div className="contrast">
                        
                        
                        <div className='save-img'>
                            <Zmage src="http://pic.baike.soso.com/p/20140728/20140728113802-1762160793.jpg" alt="" />
                            <span className='proportion'>相识度80%</span>
                            <Popover placement="left" content={this.infoModel()} title="人物信息" trigger="click">
                                <span className='proportion examine'>点击查看</span>
                            </Popover>
                        </div>
                        <div className='save-img'>
                            <Zmage src="http://pic.baike.soso.com/p/20140728/20140728113802-1762160793.jpg" alt="" />
                            <span className='proportion'>相识度80%</span>
                            <Popover placement="left" content={this.infoModel()} title="人物信息" trigger="click">
                                <span className='proportion examine'>点击查看</span>
                            </Popover>
                        </div>
                        <div className='save-img'>
                            <Zmage src="http://pic.baike.soso.com/p/20140728/20140728113802-1762160793.jpg" alt="" />
                            <span className='proportion'>相识度80%</span>
                            <Popover placement="left" content={this.infoModel()} title="人物信息" trigger="click">
                                <span className='proportion examine'>点击查看</span>
                            </Popover>
                        </div>
                        
                        
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
                    <div className="direction">方向</div>
                    <div className="Snap-Shot">抓拍照片</div>
                    <div className="contrast">比对库照片</div>
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