import React, { useState } from 'react';
import { Spin, Form, Input, Button, Row, Col, message } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './loginForm.scss'
import Request from '../../../../../utils/request';
const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    // const [userName, setUserName] = useState();
    // const [passWord, setPassWord] = useState();
    const onFinish = async (values: any) => {
        console.log(values);

        setLoading(true)

        let req = new Request()
        await req.post('admin/checkLogin', {
            userName: values.username,
            password: values.password
        }).then((res: any) => {
            console.log(res);
            setLoading(false)

            if (res?.status === 101) {
                return message.error(res.data.message)
            }
            window.location.href = '/admin'
            localStorage.setItem('adminInfo', JSON.stringify(res?.data))
            localStorage.setItem('adminToken', JSON.stringify(res?.token))
        }).catch(res => {
            message.error(res.message)
        })
    }
    return (
        <div className='loginForm'>
            <Row>
                <Col span={10} />
                <Col span={5}>
                    <Spin spinning={loading}>
                        <Form onFinish={onFinish}>
                            <FormItem
                                name="username"
                                rules={[{ required: true, message: '请输入用户名!' }]}
                            >
                                <Input addonBefore={<UserOutlined />} placeholder="请输入用户名" type="text" />
                            </FormItem>
                            <FormItem
                                name="password"
                                rules={[{ required: true, message: '请输入密码!' }]}
                            >
                                <Input addonBefore={<LockOutlined />} placeholder="请输入密码" type="password" />
                            </FormItem>
                            <FormItem>
                                <Button className="login-form-button" type="primary" htmlType="submit" >登录</Button>
                            </FormItem>
                        </Form>
                    </Spin>
                </Col>

            </Row>
        </div>
    );
}
export default LoginForm