import React, { useState, useEffect, useContext, useMemo } from 'react';
import { Button, Form, Input,message } from 'antd';
import { useHistory } from 'react-router-dom';
import TimeModal from './timeModal';
import { getDate, getParams } from '../util';
import { xhrCreateStore, xhrUpdateStore } from '../xhr';
import { ThemeContext } from '../store';

import './index.css';

function CreateStore() {
    const history = useHistory();
    const { state, dispatch } = useContext(ThemeContext);
    const [isModal, setModal] = useState(false);
    const [timeList, setList] = useState([]);

    const type = useMemo(() => getParams('type'), []);
    
    useEffect(() => {
        if (type === 'edit') {
            setList(state.temp.timer || []);
        }
    }, [state, type]);

    const goBack = () => {
        dispatch({
            type: 'set_temp',
            payload: {}
          });
        history.go(-1);
    }
    const onFinish = (values) => {
        console.log('values', values);
        values.timer = JSON.stringify(timeList);
        let request;
        if (type === 'edit') {
            request = xhrUpdateStore({ ...values, ...{ id: state.temp.id }});
        } else {
            request = xhrCreateStore(values);
        }
        request.then(res => {
            if (res.status === 200) {
                message.success(res.message);
                goBack();
            }
        }).catch(err => {
            message.error(err.message);
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const openModal = () => {
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
    }

    const getTimeList = (list) => {
        setList(list);
    }

    return (
        <div>
            <Button onClick={goBack} type="primary">返回列表页</Button>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    name: state.temp.name || '',
                    address: state.temp.address,
                    city: state.temp.city,
                    ipone: state.temp.ipone,
                    coordinate: JSON.stringify(state.temp.coordinate)
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="门店名称"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: '门店名称不能为空！',
                        },
                    ]}
                >
                    <Input style={{ width: '300px' }} />
                </Form.Item>

                <Form.Item
                    label="地址"
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: '地址不能为空',
                        },
                    ]}
                >
                    <Input style={{ width: '300px' }} />
                </Form.Item>
                <Form.Item
                    label="所在城市"
                    name="city"
                    rules={[
                        {
                            required: true,
                            message: '所在城市不能为空',
                        },
                    ]}
                >
                    <Input style={{ width: '300px' }} />
                </Form.Item>
                <Form.Item
                    label="营业时间"
                    name="timer"
                    rules={[
                        {
                            required: !(timeList.length > 0),
                            message: '请选择营业时间',
                        },
                    ]}
                >
                    <div>
                        <Button onClick={openModal} >{timeList.length > 0 ? '修改营业时间' : '选择营业时间'}</Button>
                       { timeList.length > 0 &&  <div className='hours-box'>
                            {
                                [{key:'日期',value:['开始时间','结束时间']}].concat(timeList).map(item => {
                                    return (
                                        <div className='business-hours' key={item.key}>
                                            <span>{getDate(item.key)}</span>
                                            <span>{item.value[0] === '00:00:00' ? '休息中' :item.value[0]}</span>
                                            <span>{item.value[1] === '00:00:00' ? '休息中' :item.value[1]}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>}
                    </div>
                </Form.Item>
                <Form.Item
                    label="电话号码"
                    name="ipone"
                    rules={[
                        {
                            required: true,
                            message: '电话号码不能为空',
                        },
                    ]}
                >
                    <Input style={{ width: '300px' }} />
                </Form.Item>
                <Form.Item
                    label="地图坐标"
                    name="coordinate"
                    rules={[
                        {
                            required: true,
                            message: '地图坐标不能为空',
                        },
                    ]}
                >
                    <Input style={{ width: '300px' }} />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        {type === 'edit' ?'编辑' :'新增'}
                    </Button>
                </Form.Item>
            </Form>
           {isModal&& <TimeModal
                isModal={isModal}
                getTimeList={getTimeList}
                closeModal={closeModal}
                list={timeList}
            />}
        </div>
    )
}

export default CreateStore;