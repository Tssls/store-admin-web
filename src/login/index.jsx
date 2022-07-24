import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';
import './index.css';
import { xhrLogin,xhrRegsiter } from '../xhr';

const Login = () => {
    const history = useHistory();
    const [isLogin, setLogin] = useState(true);
    const onFinish = (values) => {
        let result;
        if (isLogin) {
            result = xhrLogin(values);
        } else {
            result = xhrRegsiter(values);
        }
        result.then(res => {
            if (res.status === 200) {
                sessionStorage.setItem('token', res.token);
                message.success(res.message);
                history.push(`/home?name=${res.name}`);
            } else {
                message.error(res.message); 
            }
        }).catch(err => {
            message.error(err.message);
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handlen = () => { 
        setLogin(false);
    };

    return (
        <div className='login-box'>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="账号"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: '账号不能为空！',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '密码不能为空',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                {!isLogin && <Form.Item
                    label="电话号码"
                    name="ipone"
                    rules={[
                        {
                            required: true,
                            message: '电话号码不能为空',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>}
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        {isLogin ? '登录' :'注册'}
                    </Button>
                </Form.Item>
            </Form>
            {isLogin && <Button onClick={handlen} className='regsiter' type="link">没有账号？点击注册</Button>}
        </div>
    )
}

export default Login;