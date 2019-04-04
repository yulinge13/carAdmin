import React, { Component } from 'react';
import {
    Button,
    Table,
    Select,
    message,
} from 'antd';
import './home.less'
import httpLists from '../../utils/http'
import { connect } from 'react-redux'
const Option = Select.Option;
let { containHttp } = httpLists
const {
    getAllAppointment,
    exprotData,
    getFromLists
} = containHttp
function getTime(time) {
    const date = new Date(time - 0)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const h = date.getHours()
    const m = date.getMinutes()
    const s = date.getSeconds()
    const str = `${year}年${month}月${day}日 ${h}:${m}:${s}`
    return str
}
@connect(
    state => {
        return {
        }
    },
    dispatch => {
        return {

        }
    }
)
class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            productlists: [],//所有的商品
            keyWord: '',
            columns: [
                {
                    title: '姓名',
                    dataIndex: 'name',
                    key: '1',
                },
                {
                    title: '手机号',
                    dataIndex: 'tel',
                    key: '2',
                },
                {
                    title: '车型',
                    dataIndex: 'carType',
                    key: '3',
                },
                {
                    title: '经销商',
                    dataIndex: 'distributorName',
                    key: '6',
                },
                {
                    title: '经销商所在省份',
                    dataIndex: 'provinceName',
                    key: '4',
                },
                {
                    title: '经销商所在城市',
                    dataIndex: 'cityName',
                    key: '5',
                },
                {
                    title: '预约时间',
                    dataIndex: 'creatTime',
                    key: '7',
                    render(row, columns) {
                        return (
                            <div>
                                {getTime(columns.creatTime)}
                            </div>
                        )
                    }
                },
            ],
            pageNum: 1,
            pageSize: 10,
            total: null,
            modalShow: false,
            orderLists: [],//所有的订单
            fromLists: [],//获取所有来源列表
            fromValue: 1
        }
    }
    componentDidMount() {
        this.getAllAppointment()
        this.getFromLists()
    }
    //获取列表
    getAllAppointment() {
        const { fromValue, pageNum, pageSize } = this.state
        getAllAppointment({
            pageNum,
            pageSize,
            from: fromValue
        }).then(res => {
            if (res.success) {
                this.setState({
                    orderLists: res.data.lists,
                    total: res.data.total
                })
            }
        })
    }
    //导出
    exprotData() {
        const { fromValue, pageNum, pageSize } = this.state
        exprotData({
            from:fromValue,
            pageNum,
            pageSize
        }).then(res => {
            if (res.success) {
                const a = document.createElement('a')
                a.href = 'http://39.105.193.91:7001' + res.data
                a.target = '_blank'
                a.click()
                a.remove()
            } else {
                message.error('导出失败')
            }
        })
    }
    //获取所有来源列表
    getFromLists() {
        getFromLists().then(res => {
            if (res.success) {
                this.setState({
                    fromLists: res.data.map(i => {
                        return { name: `Q${i.from}`, val: i.from }
                    })
                })
            }
        })
    }
    //选择来源列表
    selectFrom(val) {
        this.setState({
            fromValue: val,
            pageNum: 1
        }, () => {
            this.getAllAppointment()
        })
    }
    render() {
        const {
            columns,
            orderLists,
            fromLists,
            fromValue,
            pageSize,
            pageNum,
            total
        } = this.state
        const pagination = {
            current: pageNum,
            pageSize,
            onChange: (pageNum) => {
                this.setState({
                    pageNum
                }, () => {
                    this.getAllAppointment()
                })
            },
            total
        }
        return (
            <div className="home">
                {/* <div className="header example-input">
                    <div className="btns_left">
                    </div>
                    <div className="btns_right">
                        <Button type="primary">添加</Button>
                    </div>
                </div> */}
                <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between' }}>
                    <Select defaultValue={fromValue} style={{ width: 160 }} onChange={this.selectFrom.bind(this)}>
                        {
                            fromLists.length > 0 && fromLists.map((i, index) => {
                                return (
                                    <Option value={i.val} key={index}>{i.name}</Option>
                                )
                            })
                        }

                    </Select>
                    <Button type="primary" onClick={this.exprotData.bind(this)}>导出</Button>
                </div>
                <Table
                    dataSource={orderLists}
                    columns={columns}
                    pagination={
                        pagination
                    }
                />
            </div>
        );
    }
}
export default HomePage
