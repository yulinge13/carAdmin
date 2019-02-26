import React, { Component } from 'react';
import {
    Button,
    Table,
    Select,
    message,
    Form
} from 'antd';
import './home.less'
import httpLists from '../../utils/http'
import { connect } from 'react-redux'
const Option = Select.Option;
let { containHttp } = httpLists
const {
    addOrder,
    getOrderLists,
    getAllProduct,
    orderPay
} = containHttp
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
                    title: '商品名称',
                    dataIndex: 'productName',
                    key: 'productName',
                },
                {
                    title: '商品价格',
                    dataIndex: 'price',
                    key: 'price',
                },
                {
                    title: '商品图片',
                    dataIndex: 'productPic',
                    key: 'productPic',
                    render: (row) => {
                        return (
                            row ? <img
                                src={'http://localhost:7001' + row}
                                alt="avatar"
                                style={{
                                    width: '50px',
                                    height: '50px'
                                }}
                            /> : '暂无图片'
                        )
                    }
                },
                {
                    title: '商品数量',
                    dataIndex: 'productNum',
                    key: 'productNum',
                },
                {
                    title: '操作',
                    dataIndex: 'opaction',
                    render: (row, columns) => {
                        return columns.orderStatus < 2 ?
                            (<div
                                style={{
                                    display: 'flex'
                                }}
                            >
                                <Button type="primary" shape="circle" icon="shopping" style={{ marginRight: '10px' }} />
                            </div>) : (<div
                                style={{
                                    display: 'flex'
                                }}
                            >
                                <Button type="primary" shape="circle" icon="book" style={{ marginRight: '10px' }} />
                            </div>)

                    }
                }
            ],
            pageNum: 1,
            pageSize: 10,
            modalShow: false,
            orderLists: [],//所有的订单
        }
    }
    componentDidMount() {
    }
    render() {
        const {
            columns,
            orderLists,
        } = this.state
        return (
            <div className="home">
                <div className="header example-input">
                    <div className="btns_left">
                    </div>
                    <div className="btns_right">
                        <Button type="primary">添加</Button>
                    </div>
                </div>
                <Table dataSource={orderLists} columns={columns} />
            </div>
        );
    }
}
export default HomePage
