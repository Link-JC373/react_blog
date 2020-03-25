import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './static/registerForm.scss';
const RegisterForm = () => {
    const onFinish = () => {

    }
    return (
        <Form
            name="normal_login"
            className="register-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >

            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your Username!' }]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="密码"
                />
            </Form.Item>
            <Form.Item
                name="checkpassword"
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="确认密码"
                />
            </Form.Item>


            <Form.Item>
                <Button type="primary" htmlType="submit" className="register-form-button">
                    注册
                         </Button>

            </Form.Item>
        </Form>
    );
}

export default RegisterForm;