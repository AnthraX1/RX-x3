import React, { Component } from 'react';
import { DatePicker, Pagination, Input, Button, Icon, Popover } from 'antd'
// 点击放大图片插件
import Zmage from 'react-zmage'
import server from '../../config/api.js'
import tool from './../../tools'
import locale from 'antd/lib/date-picker/locale/zh_CN';
import './index.scss'

const { RangePicker } = DatePicker;


class SystemLog extends Component {
    state = {}
    componentDidMount() {
        this.list()
    }
    onChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }

    onOk = (value) => {
        console.log('onOk: ', value);
    }
    infoModel = (info = {db: '****', face:'*****'}) => {
        let spanStyle = {
            width: '40px',
            display: 'inline-block',
            textAlignLast: 'justify',
            marginRight: '10px'
        }
        let wordStyle = {
            fontWeight: '700'
        }
        return (
            <div>
                <div><span style={spanStyle}>来源:</span><span style={wordStyle}>{info.db}</span></div>
                <div><span style={spanStyle}>id :</span><span style={wordStyle}>{info.face}</span></div>
            </div>
        )
    }
    list =async () => {
        let { data } =await server.faceLog()

        console.log(tool.formatDate(data[0].ts*1000));
        let formatDate = tool.formatDate
        let listDOM=  data.map((item,index) => {
            return (
                <div className='layout list' key={index}>
                    <div className="operate-data">{formatDate(item.ts*1000)}</div>
                    {/* <div className="face-db">通行库</div> */}
                    <div className="way-info">{item.ch}</div>
                    {/* <div className="record">开门</div> */}
                    <div className="direction">进</div>
                    <div className="Snap-Shot">
                        <div className='get-img'>
                            <Zmage src={item.image} alt="" />
                            <span className='proportion'>抓拍照片</span>
                        </div>
                    </div>
                    <div className="contrast">
                        {
                            item.comps.map((item,index) => {
                                return (
                                    <div className='save-img' key={index + '_'}>
                                        <Zmage src="http://pic.baike.soso.com/p/20140728/20140728113802-1762160793.jpg" alt="" />
                                        <span className='proportion'>相识度{item.sim*100}%</span>
                                        <Popover placement="left" content={this.infoModel(item)} title="人物信息" trigger="click">
                                            <span className='proportion examine'>点击查看</span>
                                        </Popover>
                                    </div>
                                )
                            })
                        }
                        
                        
                    </div>
                </div>
            )
        })
        this.setState({listDOM})
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
                    {this.state.listDOM}
                </div>
                <div className="page">
                    <Pagination defaultCurrent={1} total={50} />
                </div>
            </div>
        );
    }
}

export default SystemLog;