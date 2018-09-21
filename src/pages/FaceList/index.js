import React, { Component } from 'react'
import { Select, Input, Button, Icon, Upload, Pagination, Modal } from 'antd'
import './index.scss'


const InputGroup = Input.Group;
const Option = Select.Option;
const Search = Input.Search;

class FaceList extends Component {

    state = {
        dataSource: [],
        control: true,
        select: 'position',
        visible: false
    }

    imgList = ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534758785818&di=3e4d36648b7cc3743af3d70bddf8d347&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201607%2F09%2F20160709073958_5vBTZ.thumb.700_0.jpeg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534758785818&di=3e4d36648b7cc3743af3d70bddf8d347&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201607%2F09%2F20160709073958_5vBTZ.thumb.700_0.jpeg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534758785818&di=3e4d36648b7cc3743af3d70bddf8d347&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201607%2F09%2F20160709073958_5vBTZ.thumb.700_0.jpeg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534758785818&di=3e4d36648b7cc3743af3d70bddf8d347&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201607%2F09%2F20160709073958_5vBTZ.thumb.700_0.jpeg']

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
                            <img src={item} alt='' key={index}/>
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
    list = () => {
        let arr = [1, 2, 3, 4, 5, 6]
        return arr.map((item, index) => {
            return (
                <div onClick={this.showModal} className='body layout' key={index}>
                    <div className="index">{this.state.control ? (index + 1) : ''}</div>
                    <div className="id">9573</div>
                    <div style={{ display: this.state.control ? '' : 'none' }} className="time">2018-8-20</div>
                    <div style={{ display: this.state.control ? '' : 'none' }} className="ID-card">12356809876543213</div>
                    <div style={{ display: this.state.control ? 'none' : '' }} className="img">
                        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534758785818&di=3e4d36648b7cc3743af3d70bddf8d347&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201607%2F09%2F20160709073958_5vBTZ.thumb.700_0.jpeg" alt="" />
                        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534758785818&di=3e4d36648b7cc3743af3d70bddf8d347&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201607%2F09%2F20160709073958_5vBTZ.thumb.700_0.jpeg" alt="" />
                        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534758785818&di=3e4d36648b7cc3743af3d70bddf8d347&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201607%2F09%2F20160709073958_5vBTZ.thumb.700_0.jpeg" alt="" />
                    </div>
                </div>
            )
        })
    }
    render() {
        const props = {
            name: 'file',
            action: '//jsonplaceholder.typicode.com/posts/',
            headers: {
                authorization: 'authorization-text',
            }
        }
        return (
            <div className='face-list'>
                <div className="search">
                    <div className="select">
                        <InputGroup compact>
                            <Select onChange={this.selectChange} defaultValue={this.state.select}>
                                <Option value="position">位置信息</Option>
                                <Option value="id">人员ID</Option>
                            </Select>
                            <Input onChange={this.inputChange} style={{ width: '50%' }}></Input>
                        </InputGroup>
                    </div>
                    <div className="btn">
                        <Button onClick={this.search}><Icon type="search" />搜索</Button>
                    </div>
                    <div className="searchByImg">

                        {
                            this.state.control ? <Button onClick={this.change}>以图搜图</Button> :

                                <div>
                                    <Upload {...props}>
                                        <Button>
                                            本地上传
                                    </Button>
                                    </Upload>
                                    <Search
                                        placeholder="在此粘贴图片网址"
                                        onSearch={value => console.log(value)}
                                        style={{ width: 200 }}
                                    />
                                    <Button onClick={this.change}>取消</Button>
                                </div>
                        }
                    </div>
                </div>
                <div className="list">
                    <div className="title layout">
                        <div className="index">{this.state.control ? '序号' : ''}</div>
                        <div className="id">人员ID</div>
                        <div className="time" style={{ display: this.state.control ? '' : 'none' }}>录入时间</div>
                        <div className="ID-card" style={{ display: this.state.control ? '' : 'none' }}>身份证</div>
                        <div className="img" style={{ display: this.state.control ? 'none' : '' }}>人脸照片</div>
                    </div>
                    {this.imgListModal(this.imgList)}
                    {this.list()}
                </div>
                <div className="page">
                    <Pagination defaultCurrent={1} total={50} />
                </div>
            </div>
        );
    }
}

export default FaceList;