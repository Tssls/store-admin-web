import React, { useEffect } from 'react';
import { Modal, Button, Form, TimePicker } from 'antd';
import moment from 'moment';

function TimeModal(props) {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        let list = [];
        for (const key in values) {
            list.push({
                key,
                value:[moment(values[key][0]).format("HH:mm:ss"),moment(values[key][1]).format("HH:mm:ss")]
            })
        }
        props.getTimeList(list)
        props.closeModal();
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if (props.list && props.list.length) {
            props.list.forEach(item => {
                form.setFieldsValue({
                    [item.key]: [moment(item.value[0], 'HH:mm:ss'), moment(item.value[1], 'HH:mm:ss')],
                })
            })
        }
    }, [props.list, form]);

    return (
        <Modal
            title="选择营业时间"
            visible={props.isModal}
            onCancel={props.closeModal}
            footer={false}
            maskClosable={false}
        >
            <p className='tips'>注意：休息日开始时间和结束时间请选择 00:00:00</p>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                form={form}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="周一"
                    name="mon"
                    rules={[
                        {
                            required: true,
                            message: '输入营业时间',
                        },
                    ]}
                >
                    <TimePicker.RangePicker style={{ width: '300px' }} />
                </Form.Item>

                <Form.Item
                    label="周二"
                    name="tue"
                    rules={[
                        {
                            required: true,
                            message: '输入营业时间',
                        },
                    ]}
                >
                    <TimePicker.RangePicker style={{ width: '300px' }} />
                </Form.Item>
                <Form.Item
                    label="周三"
                    name="wed"
                    rules={[
                        {
                            required: true,
                            message: '输入营业时间',
                        },
                    ]}
                >
                    <TimePicker.RangePicker style={{ width: '300px' }} />
                </Form.Item>
                <Form.Item
                    label="周四"
                    name="thu"
                    rules={[
                        {
                            required: true,
                            message: '输入营业时间',
                        },
                    ]}
                >
                    <TimePicker.RangePicker style={{ width: '300px' }} />
                </Form.Item>
                <Form.Item
                    label="周五"
                    name="fri"
                    rules={[
                        {
                            required: true,
                            message: '输入营业时间',
                        },
                    ]}
                >
                    <TimePicker.RangePicker style={{ width: '300px' }} />
                </Form.Item>
                <Form.Item
                    label="周六"
                    name="sat"
                    rules={[
                        {
                            required: true,
                            message: '输入营业时间',
                        },
                    ]}
                >
                    <TimePicker.RangePicker style={{ width: '300px' }} />
                </Form.Item>
                <Form.Item
                    label="周日"
                    name="sun"
                    rules={[
                        {
                            required: true,
                            message: '输入营业时间',
                        },
                    ]}
                >
                    <TimePicker.RangePicker style={{ width: '300px' }} />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        确定
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default TimeModal;