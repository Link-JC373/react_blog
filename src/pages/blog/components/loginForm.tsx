import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './static/loginForm.scss'
import LoginCon from 'container/loginCon';
import Request from 'utils/request';
import { ILogin } from '../types';
interface ILoginForm {
    loginFinish: (values: object) => void;
    // loginRedux?: ILogin;
}
// @LoginCon
const LoginForm = (props: ILoginForm) => {
    useEffect(() => {
        console.log(props);

    })
    const { loginFinish } = props;
    // const { onLogin } = loginRedux
    const onFinish = async (values: any) => {
        console.log('Received values of form: ', values);
        let req = new Request;
        await req.post('/user/checkLogin', { ...values }).then((res: any) => {
            console.log(res);
            switch (res?.status) {
                case 403:
                    message.error(res?.message)
                    break;
                case 200:
                    localStorage.setItem('token', res.token)
                    // props.onLogin(res?.data)
                    localStorage.setItem('userInfo', JSON.stringify(res?.data))
                    // setLoginVisible(false)
                    loginFinish({ data: res.data, visible: false })
                    window.location.reload()
                default:
                    break;
            }
        })
    };

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                name="userName"
                rules={[{ required: true, message: '请输入用户名!' }]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="passWord"
                rules={[{ required: true, message: '请输入密码!' }]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
        </Button><br />
                <span> Or </span><a href="">register now!</a>
            </Form.Item>
        </Form>
    )
}

export default LoginCon(LoginForm)