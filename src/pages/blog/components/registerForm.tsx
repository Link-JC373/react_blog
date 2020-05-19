import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './static/registerForm.scss';
import Request from '../../../utils/request';
const RegisterForm = () => {
    const onFinish = async (e: any) => {

        let req = new Request()
        await req.post('user/register', { userName: e.username, passWord: e.password }).then((res) => {
            console.log(res);

            if (res?.data.state === 200) {
                message.success('注册成功')
            } else {
                message.error(res?.data.message)
            }
        })
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
                rules={[{ required: true, message: '请输入用户名!' }]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: '请输入密码!' }]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="密码"
                />
            </Form.Item>
            <Form.Item
                name="checkpassword"
                dependencies={['password']}
                hasFeedback
                rules={[
                    { required: true, message: '请输入密码!' },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('两次密码不一致!');
                        },
                    }),
                ]}
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