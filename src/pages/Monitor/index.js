import React, { Component } from 'react';
import { Icon } from 'antd'
import mqtt from 'mqtt'
import ip from "./../../config/ipconfig.js"
import './index.scss'
class Monitor extends Component {
    state = {
        lineArr: [],
        lineDOM1: [],
        lineDOM2: [],
        lineDOM3: [],
        lineDOM4: [],
    }
    componentDidMount() {
        // console.log(window.Aliplayer);
        // console.log(this.refs.playerBox);
        let Aliplayer = window.Aliplayer
        // let width = this.refs.playerBox.offsetWidth
        // let height = this.refs.playerBox.offsetHeight

        let width = "520px"
        let height = "300px"

        // let url = "//player.alicdn.com/video/aliyunmedia.mp4"

        let url = {
            url1: `http://${ip.ip}:9880/live?port=1985&app=x3&stream=stream1`,
            url2: `http://${ip.ip}:9880/live?port=1985&app=x3&stream=stream2`,
            url3: `http://${ip.ip}:9880/live?port=1985&app=x3&stream=stream3`,
            url4: `http://${ip.ip}:9880/live?port=1985&app=x3&stream=stream4`,
        }

        this.newAliplayer(Aliplayer, "player-con1", url.url1, width, height)
        this.newAliplayer(Aliplayer, "player-con2", url.url2, width, height)
        this.newAliplayer(Aliplayer, "player-con3", url.url3, width, height)
        this.newAliplayer(Aliplayer, "player-con4", url.url4, width, height)

        this.mqtt('/ATT/CH01/', "box1")
        this.mqtt('/ATT/CH02/', "box2")
        this.mqtt('/ATT/CH03/', "box3")
        this.mqtt('/ATT/CH04/', "box4")
    }
    mqtt = (subscribe, type) => {
        let _this = this
        var client = mqtt.connect(`ws://${ip.ip}:9001`)
        let arr = []

        client.on('connect', function () {
            client.subscribe(subscribe, function (err) {
                if (!err) {
                    client.publish('presence', 'Hello mqtt')
                }
            })
        })

        client.on('message', function (topic, message) {
            // message is Buffer
            // console.log(message.toString())
            // console.log(JSON.parse(message));
            // _this.state.lineArr
            if (arr.length > 20) {
                arr = arr.slice(0, 6)
            }
            arr.unshift(JSON.parse(message))
            _this.line(arr, type)
        })
    }
    newAliplayer = (Aliplayer, id, url, width, height) => {
        new Aliplayer({
            "id": id,
            "source": url,
            "width": width,
            "height": height,
            "autoplay": true,
            "isLive": false,
            "rePlay": false,
            "showBuffer": true,
            "snapshot": false,
            "showBarTime": 5000,
            "useFlashPrism": true,
            "skinLayout": [
                {
                    "name": "bigPlayButton",
                    "align": "blabs",
                    "x": 30,
                    "y": 80
                },
                {
                    "name": "controlBar",
                    "align": "blabs",
                    "x": 0,
                    "y": 0,
                    "children": [
                        {
                            "name": "progress",
                            "align": "tlabs",
                            "x": 0,
                            "y": 0
                        },
                        {
                            "name": "playButton",
                            "align": "tl",
                            "x": 15,
                            "y": 26
                        },
                        {
                            "name": "nextButton",
                            "align": "tl",
                            "x": 10,
                            "y": 26
                        },
                        {
                            "name": "timeDisplay",
                            "align": "tl",
                            "x": 10,
                            "y": 24
                        },
                        {
                            "name": "fullScreenButton",
                            "align": "tr",
                            "x": 10,
                            "y": 25
                        },
                        {
                            "name": "streamButton",
                            "align": "tr",
                            "x": 10,
                            "y": 23
                        },
                        {
                            "name": "volume",
                            "align": "tr",
                            "x": 10,
                            "y": 25
                        }
                    ]
                },
                {
                    "name": "fullControlBar",
                    "align": "tlabs",
                    "x": 0,
                    "y": 0,
                    "children": [
                        {
                            "name": "fullTitle",
                            "align": "tl",
                            "x": 25,
                            "y": 6
                        },
                        {
                            "name": "fullNormalScreenButton",
                            "align": "tr",
                            "x": 24,
                            "y": 13
                        },
                        {
                            "name": "fullTimeDisplay",
                            "align": "tr",
                            "x": 10,
                            "y": 12
                        },
                        {
                            "name": "fullZoom",
                            "align": "cc"
                        }
                    ]
                }
            ]
        }, function (player) {
            console.log("播放器创建了。");
        }
        );
    }
    line = (data, type) => {
        //表示四个视频框的state
        const lineState = {
            box1: "lineDOM1",
            box2: "lineDOM2",
            box3: "lineDOM3",
            box4: "lineDOM4"
        }
        let lineDOM = data.map(item => (
            <div className="line" key={item.id}>
                <img className="img" src={`data:image/gif;base64,${item.image}`} alt="" />
                <div className="age">{item.age}</div>
                <div className="sex"><Icon type={item.sex === 1 ? "man" : "woman"} theme="outlined" /></div>
                <div className="mood"><Icon type={item.emotion === "0" ? "smile" : "meh"} theme="outlined" /></div>
            </div>
        ))
        this.setState({
            [lineState[type]]: lineDOM
        })
    }
    render() {
        return (
            <div className='monitor'>
                <div className="line">
                    <div className="box">
                        <div ref='playerBox' className='video-box' id="player-con1"></div>
                        <div className="list">
                            {this.state.lineDOM1}
                        </div>

                    </div>
                    <div className="box">
                        <div className='video-box' id="player-con2"></div>
                        <div className="list">
                            {this.state.lineDOM2}
                        </div>
                    </div>



                </div>
                <div className="line">
                    <div className="box">
                        <div className='video-box' id="player-con3"></div>
                        <div className="list">
                            {this.state.lineDOM3}
                        </div>
                    </div>
                    <div className="box">
                        <div className='video-box' id="player-con4"></div>
                        <div className="list">
                            {this.state.lineDOM4}
                        </div>
                    </div>


                </div>
            </div>
        );
    }
}

export default Monitor;