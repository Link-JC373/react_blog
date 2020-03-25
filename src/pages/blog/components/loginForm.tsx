import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './static/loginForm.scss'

interface ILoginForm {
    loginFinish: (values: object) => void;
}

const LoginForm = (props: ILoginForm) => {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        props.loginFinish(values)
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

export default LoginForm