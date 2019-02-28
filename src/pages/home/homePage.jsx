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
let { containHttp } = httpLists
const {
    getAllAppointment
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
            ],
            pageNum: 1,
            pageSize: 10,
            modalShow: false,
            orderLists: [],//所有的订单
        }
    }
    componentDidMount() {
        this.getAllAppointment()
    }
    //获取列表
    getAllAppointment(){
        getAllAppointment().then(res => {
            if(res.success){
                this.setState({
                    orderLists:res.data
                })
            }
        })
    }
    render() {
        const {
            columns,
            orderLists,
        } = this.state
        return (
            <div className="home">
                {/* <div className="header example-input">
                    <div className="btns_left">
                    </div>
                    <div className="btns_right">
                        <Button type="primary">添加</Button>
                    </div>
                </div> */}
                <Table dataSource={orderLists} columns={columns} />
            </div>
        );
    }
}
export default HomePage
