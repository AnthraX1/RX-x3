import React, { Component } from 'react'
import { Select, Input, Button, Upload, Modal, Spin, message, Popover } from 'antd'
import Zmage from 'react-zmage'
import api from '../../config/api'
import './index.scss'



const InputGroup = Input.Group;
const Option = Select.Option;
// const Search = Input.Search;

class FaceList extends Component {

    state = {
        dataSource: [],
        select: '',
        visible: false,
        loading: false,
        imgList: []
    }
    componentDidMount() {
        this.getDbList()
    }
    getDbList = async () => {
        let result = await api.PicDb_g()
        console.log('resu', result);
        let DBlistDOM = result.data.map((item, index) => {
            return (
                <Option key={index} value={item.name}>{item.name}</Option>
            )
        })

        this.setState({
            DBlistDOM
        })
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        // console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        // console.log(e);
        this.setState({
            visible: false,
        });
    }
    imgListModal = (item) => {
        return (
            <Modal
                className='img-list-modal'
                title="人脸照片"
                width={700}
                footer={null}
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <p>人员ID: 9573</p>
                <div className="img-list">
                    {item.map(((item, index) => {
                        return (
                            <img src={item} alt='' key={index} />
                        )
                    }))}
                </div>
                <div className="btn">
                    <Button onClick={this.handleCancel} type='primary'>关闭</Button>
                </div>
            </Modal>
        )
    }

    onchang = (info) => {

    }
    beforeUpload = (file, fileList) => {
        console.log('beforeUpload', file);
        if (this.state.select === '') {
            message.warning('请先选择上传的库')
            return
        }
        this.setState({
            loading: true
        })
        // this.upload(file, this.state.select)
        this.upload(file, this.state.select)
        // 改为手动上传
        return false
    }
    upload = async (file, name) => {
        // FormData 对象
        var form = new FormData();
        form.append("file", file);
        // 其他参数
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        let result = await api.Vupload(form, name, config)
        console.log("以图搜图", result.data.logs);
        this.list(result.data.logs)
        if (result.status === 200) {
            this.setState({
                loading: false
            })
        } else {
            setTimeout(() => {
                this.setState({
                    loading: false
                })
                message.warning("没有找到相应的数据...")
            }, 5000);
        }
    }
    change = () => {
        this.setState({
            control: !this.state.control
        })
    }
    selectChange = (e) => {
        // console.log(e);
        this.setState({
            select: e
        })
    }
    inputChange = (e) => {
        // console.log(e.target.value);
        this.setState({
            input: e.target.value
        })
    }
    search = () => {
        console.log(this.state);
    }
    infoModel = (info = { db: '****', face: '*****' }) => {
        let spanStyle = {
            width: '80px',
            display: 'inline-block',
            textAlignLast: 'justify',
            marginRight: '10px'
        }
        let wordStyle = {
            fontWeight: '700'
        }
        return (
            <div>
                <div><span style={spanStyle}>来源:</span><span style={wordStyle}>{info.db === "" ? "暂时不提供" : info.db}</span></div>
                <div><span style={spanStyle}>相识度 :</span><span style={wordStyle}>{info.sim * 100}%</span></div>
            </div>
        )
    }
    formatTime = (time = 0) => {
        // 1540615857
        let obj = new Date(time)
        let year = obj.getFullYear()
        let month = obj.getMonth() + 1
        let date = obj.getDate()

        let hour = obj.getHours()
        let minute = obj.getMinutes()
        let second = obj.getSeconds()

        month = month < 10 ? `0${month}` : month
        date = date < 10 ? `0${date}` : date
        hour = hour < 10 ? `0${hour}` : hour
        minute = minute < 10 ? `0${minute}` : minute
        second = second < 10 ? `0${second}` : second

        // console.log(`${year}-${month}-${date} ${hour}:${minute}:${second}`);
        return `${year}-${month}-${date} ${hour}:${minute}:${second}`
    }
    list = (items = []) => {
        let listDOM = items.map((item, index) => {
            return (
                <div className='body layout' key={index}>
                    <div className="index">{index + 1}</div>
                    <div className="time">{this.formatTime(item.ts * 1000)}</div>
                    <div className="img">
                        <img src={item.image} alt="" />
                    </div>
                    <div className="DB-img">
                        {
                            item.comps?
                            item.comps.map((item, index) => {
                                return (
                                    <div className='save-img' key={index + '_'}>
                                        <Zmage src={item.pic} alt="" />
                                        <span className='proportion'>相识度{item.sim * 100}%</span>
                                        <Popover placement="left" content={this.infoModel(item)} title="人物信息" trigger="click">
                                            <span className='proportion examine'>点击查看</span>
                                        </Popover>
                                    </div>
                                )
                            }): ""
                        }


                    </div>
                </div>
            )
        })
        this.setState({ listDOM })
    }
    render() {
        const props = {
            name: 'file',
            action: '//jsonplaceholder.typicode.com/posts/',
            headers: {
                authorization: 'authorization-text',
            },
            withCredentials: true,
            showUploadList: false,
            beforeUpload: (file, fileList) => this.beforeUpload(file, fileList)
        }
        return (
            <div className='face-list'>
                <div className="search">
                    <div className="select">
                        <InputGroup compact>
                            <Button>选择库</Button>
                            <Select style={{ width: '50%' }} onChange={this.selectChange}>
                                {this.state.DBlistDOM}
                            </Select>
                        </InputGroup>
                    </div>

                    <div className="searchByImg">
                        <Upload {...props}>
                            <Button>本地上传</Button>
                        </Upload>
                        {/* <Search
                                placeholder="在此粘贴图片网址"
                                onSearch={value => console.log(value)}
                                style={{ width: 200 }}
                            />
                            <Button onClick={this.change}>取消</Button> */}
                    </div>
                    <div className="btn">
                        {/* <Button onClick={this.search}><Icon type="search" />搜索</Button> */}
                    </div>
                </div>
                <div className="list">
                    <Spin spinning={this.state.loading} tip="Loading..." size="large">
                        <div className="title layout">
                            <div className="index">序号</div>
                            <div className="time">比对时间</div>
                            <div className="img">上传图片</div>
                            <div className="DB-img">底库图片</div>
                        </div>
                        {/* {this.imgListModal(this.state.imgList)} */}
                        {this.state.listDOM}
                    </Spin>
                </div>
                <div className="page">
                    {/* <Pagination defaultCurrent={1} total={50} /> */}
                </div>
            </div>
        );
    }
}

export default FaceList;