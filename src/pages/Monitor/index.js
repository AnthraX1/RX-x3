import React, { Component } from 'react';
import './index.scss'
class Monitor extends Component {
    componentDidMount() {
        // console.log(window.Aliplayer);
        // console.log(this.refs.playerBox);
        let Aliplayer = window.Aliplayer
        let width = this.refs.playerBox.offsetWidth
        let height = this.refs.playerBox.offsetHeight
        // let url = "//player.alicdn.com/video/aliyunmedia.mp4"

        let url = {
            url1: '',
            url2: '',
            url3: '',
            url4: ''
        }

        this.newAliplayer(Aliplayer, "player-con1", url.url1, width, height)
        this.newAliplayer(Aliplayer, "player-con2", url.url2, width, height)
        this.newAliplayer(Aliplayer, "player-con3", url.url3, width, height)
        this.newAliplayer(Aliplayer, "player-con4", url.url4, width, height)
    }
    newAliplayer = (Aliplayer, id, url, width, height) => {
        new Aliplayer({
            "id": id,
            "source": url,
            "width": width,
            "height": height,
            "autoplay": false,
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
    render() {
        return (
            <div className='monitor'>
                <div className="line">
                    <div ref='playerBox' className='video-box' id="player-con1"></div>
                    <div className='video-box' id="player-con2"></div>
                </div>
                <div className="line">
                    <div className='video-box' id="player-con3"></div>
                    <div className='video-box' id="player-con4"></div>
                </div>
            </div>
        );
    }
}

export default Monitor;