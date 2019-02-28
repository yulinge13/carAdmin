import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import httpLists from '../utils/http'
import history from '../history';
import './common.less'
let { containHttp } = httpLists
const { getMenuLists } = containHttp
const SubMenu = Menu.SubMenu;
class SliderCom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
            menuLists: [
                {
                    name:'预约列表',
                    url:'/'
                },
                {
                    name:'经销商管理',
                    url:'/distributor'
                }
            ]
        }
    }
    componentDidMount() {
        this.getMenuData()
    }
    //获取菜单
    getMenuData() {
        // getMenuLists().then(res => {
        //     if (res.success) {
        //         this.setState({
        //             menuLists: res.data
        //         })
        //     }
        // })
    }
    render() {
        const { menuLists } = this.state
        return (
            <div className="slider">
                <Menu
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                    defaultSelectedKeys={['0']}
                >
                    {
                        menuLists.map((i, index) => (
                            <Menu.Item key={index}>
                                <Link to={i.url}>
                                    <Icon type="pie-chart" />
                                    <span>{i.name}</span>
                                </Link>
                            </Menu.Item>
                        ))
                    }
                </Menu>
            </div>
        )
    }
}
export default SliderCom