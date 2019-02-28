import React, { Component } from 'react';
import {
    Button,
    Table,
    Select,
    Modal,
    Input,
    message,
} from 'antd';
import './index.less'
import httpLists from '../../utils/http'
import { connect } from 'react-redux'
const confirm = Modal.confirm;
const Option = Select.Option;
let { containHttp } = httpLists
const {
    getProductInfo,
    addDistributor,
    getAllDistributor,
    deleteDistributor
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
class Distributor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalShow: false,
            productlists: [],//所有的商品
            keyWord: '',
            columns: [
                {
                    title: '经销商名称',
                    dataIndex: 'name',
                    key: '1',
                },
                {
                    title: '营业状态',
                    dataIndex: 'state',
                    key: '2',
                },
                {
                    title: '大区',
                    dataIndex: 'largeArea',
                    key: '3',
                },
                {
                    title: '省份',
                    dataIndex: 'provinceName',
                    key: '4',
                },
                {
                    title: '地级市',
                    dataIndex: 'cityName',
                    key: '5',
                },
                {
                    title: '展厅地址',
                    dataIndex: 'address',
                    key: '6',
                },
                {
                    title: '展厅电话',
                    dataIndex: 'tel',
                    key: '7',
                },
                {
                    title: '操作',
                    dataIndex: 'opaction',
                    key: '8',
                    render: (row, columns) => {
                        return (
                            <div>
                                <Button
                                    type="danger"
                                    shape="circle"
                                    icon="delete"
                                    style={{ marginRight: '10px' }}
                                    onClick={this.deleteDistributor.bind(this, columns)}
                                />
                            </div>
                        )
                    }
                }
            ],
            pageNum: 1,
            pageSize: 10,
            modalShow: false,
            orderLists: [],//所有的订单
            provinceLists: [],//省
            provinceValue: '',//省的id
            cityLists: [],//城市
            cityValue: '',//城市的id
            fromData: {
                name: '',
                state: '',
                largeArea: '',
                address: '',
                tel: ''
            }
        }
    }
    componentDidMount() {
        this.getProductInfo(0)
        this.getAllDistributor()
    }
    //重置数据
    initModalFromData() {
        let { fromData, cityValue, cityLists, provinceValue, provinceLists, modalShow } = this.state
        fromData = {
            name: '',
            state: '',
            largeArea: '',
            address: '',
            tel: ''
        }
        cityValue = ''
        cityLists = []
        provinceValue = ''
        provinceLists = []
        modalShow = false
        this.setState({
            fromData,
            cityValue,
            cityLists,
            provinceValue,
            provinceLists,
            modalShow
        })
    }
    //获取省市级区
    getProductInfo(id) {
        getProductInfo({ id }).then(res => {
            if (res.success) {
                if (id == 0) {
                    this.setState({
                        provinceLists: res.data || []
                    })
                } else {
                    this.setState({
                        cityLists: res.data || []
                    })
                }
            }
        })
    }
    //选择省份
    selectProvince(value) {
        this.setState({
            provinceValue: value
        }, () => {
            this.getProductInfo(value)
        })
    }
    //选择城市
    selectCity(value) {
        this.setState({
            cityValue: value
        })
    }
    //提交
    handleSumbit() {
        const { fromData, provinceValue, cityValue } = this.state
        if (this.isFillOk()) {
            console.log(fromData)
            if (/^1[34578]\d{9}$/.test(fromData.tel)) {
                addDistributor({
                    ...fromData,
                    province: provinceValue,
                    prefectureLevelCity: cityValue
                }).then(res => {
                    if (res.success) {
                        message.success("添加经销商成功");
                        this.initModalFromData()
                        this.getAllDistributor()
                    }
                })
            } else {
                message.error('请输入正确的手机号');
            }
        } else {
            message.error('请填写完整信息');
        }

    }
    //是否填写完整
    isFillOk() {
        const { fromData, provinceValue, cityValue } = this.state
        let onOff = true
        for (let key in fromData) {
            if (fromData[key].length <= 0) {
                onOff = false
            }
        }
        if (!provinceValue) {
            onOff = false
        }
        if (!cityValue) {
            onOff = false
        }
        return onOff
    }
    //关闭
    handleCancel() {
        this.initModalFromData()
    }
    //获取值
    getInputValue(type, val) {
        let { fromData } = this.state
        fromData[type] = val
        this.setState({
            fromData
        })
    }
    //打开modal
    openModal() {
        this.setState({
            modalShow: true
        })
    }
    //获取所有的经销商
    getAllDistributor() {
        getAllDistributor().then(res => {
            if (res.success) {
                this.setState({
                    orderLists: res.data
                })
            }
        })
    }
    //删除经销商
    deleteDistributor(row) {
        const _this = this
        confirm({
            title: '确定要永久删除？',
            content: '确定要永久删除？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                deleteDistributor({
                    id:row.id
                }).then(res => {
                    if(res.success){
                        message.success("删除成功")
                        _this.getAllDistributor()
                    }
                })
            },
            onCancel() {
            },
        })
    }
    render() {
        const {
            columns,
            orderLists,
            modalShow,
            provinceLists,
            cityLists,
            provinceValue,
            cityValue,
            fromData
        } = this.state
        return (
            <div className="distributor">
                <div className="header example-input">
                    <div className="btns_left">
                    </div>
                    <div className="btns_right">
                        <Button type="primary" onClick={this.openModal.bind(this)}>添加</Button>
                    </div>
                </div>
                <Table dataSource={orderLists} columns={columns} />
                <div className="add_modal">
                    <Modal
                        title="添加经销商"
                        visible={modalShow}
                        onOk={this.handleSumbit.bind(this)}
                        onCancel={this.handleCancel.bind(this)}
                        okText="提交"
                        cancelText="取消"
                        width={400}
                    >
                        <div className="modal_cont">
                            <div className="fill">
                                <div className="fill_name">
                                    经销商名称
                                </div>
                                <div className="fill_input">
                                    <Input
                                        placeholder="经销商名称"
                                        onChange={e => this.getInputValue('name', e.target.value)}
                                        value={fromData.name}
                                    />
                                </div>
                            </div>
                            <div className="fill">
                                <div className="fill_name">
                                    营业状态
                                </div>
                                <div className="fill_input">
                                    <Input
                                        placeholder="营业状态"
                                        onChange={e => this.getInputValue('state', e.target.value)}
                                        value={fromData.state}
                                    />
                                </div>
                            </div>
                            <div className="fill">
                                <div className="fill_name">
                                    大区
                                </div>
                                <div className="fill_input">
                                    <Input
                                        placeholder="大区"
                                        onChange={e => this.getInputValue('largeArea', e.target.value)}
                                        value={fromData.largeArea}
                                    />
                                </div>
                            </div>
                            <div className="fill">
                                <div className="fill_name">
                                    省份
                                </div>
                                <div className="fill_input">
                                    <Select
                                        defaultValue=""
                                        style={{ width: 352 }}
                                        loading
                                        onChange={this.selectProvince.bind(this)}
                                        value={provinceValue}
                                    >
                                        <Option value="">请选择省份</Option>
                                        {
                                            provinceLists.map((i, index) => {
                                                return (
                                                    <Option key={index} value={i.id}>{i.area_name}</Option>
                                                )
                                            })
                                        }
                                    </Select>
                                </div>
                            </div>
                            <div className="fill">
                                <div className="fill_name">
                                    地级市
                                </div>
                                <div className="fill_input">
                                    <Select
                                        defaultValue=""
                                        style={{ width: 352 }}
                                        loading
                                        onChange={this.selectCity.bind(this)}
                                        value={cityValue}
                                    >
                                        <Option value="">请选择城市</Option>
                                        {
                                            cityLists.map((i, index) => {
                                                return (
                                                    <Option key={index} value={i.id}>{i.area_name}</Option>
                                                )
                                            })
                                        }
                                    </Select>
                                </div>
                            </div>
                            <div className="fill">
                                <div className="fill_name">
                                    展厅地址
                                </div>
                                <div className="fill_input">
                                    <Input
                                        placeholder="展厅地址"
                                        onChange={e => this.getInputValue('address', e.target.value)}
                                        value={fromData.address}
                                    />
                                </div>
                            </div>
                            <div className="fill">
                                <div className="fill_name">
                                    展厅电话
                                </div>
                                <div className="fill_input">
                                    <Input
                                        placeholder="展厅电话"
                                        onChange={e => this.getInputValue('tel', e.target.value)}
                                        value={fromData.tel}
                                    />
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }
}
export default Distributor


