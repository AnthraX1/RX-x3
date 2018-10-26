import React, { Component } from 'react';
import menuList from './../../data/navMenuData'
import { Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom'
import './index.scss'
const SubMenu = Menu.SubMenu;
class Nav extends Component {
    state = {
        hash: '/internet/deploy',
        defaultOpenKey: 'internet'
    }
    componentWillMount() {
        let hash, defaultOpenKey
        // this._isMounted = true;
        try {
            // 刷新页面, 默认选中tab
            hash = window.location.hash.replace(/#|\?.*$/g, '')
            // 刷新页面默认展开tab
            defaultOpenKey = hash.match(/\/(\S*)\//)[1]
            console.log(defaultOpenKey, hash);
            this.setState({
                hash,
                defaultOpenKey
            })
        } catch (err) {
            console.log(err);
        }
        window.addEventListener('hashchange', () => {
            hash = window.location.hash.replace(/#|\?.*$/g, '')
            if (hash !== '/login' && hash !== '/register') {
                // 刷新页面默认展开tab
                // console.log(defaultOpenKey,hash);
                defaultOpenKey = hash.match(/\/(\S*)\//)[1]
                this.setState({
                    hash,
                    defaultOpenKey
                })
            }
        })
        // console.log(hash, defaultOpenKey);


    }
    componentWillUnmount() {
        // 这里报错
        // Can't call setState (or forceUpdate) on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
        // 原因是因为如果页面切换路由的时候 , 页面更新state,发现组件已经卸载了,虽然不影响,但是强迫症
        // this._isMounted = false;
        this.setState = (state, callback) => {
            return;
        };
    }

    menu = () => {
        return menuList.map(item => {
            if (item.children) {
                return <SubMenu
                    key={item.key}
                    title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}
                >
                    {item.children.map(item => {
                        return <Menu.Item key={item.key}>
                            <NavLink to={item.key} replace>{item.name}</NavLink>
                        </Menu.Item>
                    })}
                </SubMenu>
            }
            return true
        })
    }

    render() {
        return (
            <div>
                <div className="logo" >
                    TERMINUS
                </div>
                <Menu
                    theme="dark"
                    defaultSelectedKeys={[this.state.hash]}
                    defaultOpenKeys={[this.state.defaultOpenKey]}
                    mode="inline">

                    {this.menu()}
                </Menu>
            </div>
        );
    }
}

export default Nav;