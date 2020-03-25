import React from 'react';
import { Layout, Form, Input, Button } from 'antd';

import './static/sider.scss'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import RegisterForm from './registerForm';
const { Sider } = Layout
const BlogSider = () => {

    return (
        <Sider className="sider">
            <div className="register">
                <h1 className="register-title">立即注册</h1>

                <RegisterForm />
            </div>
        </Sider>
    );
}

export default BlogSider