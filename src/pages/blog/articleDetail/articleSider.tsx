import React, { useEffect } from 'react'
import { UserOutlined } from '@ant-design/icons';
import { Layout, Avatar, Affix } from 'antd';
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';

import '../components/static/sider.scss'
import './articleSider.scss'

const { Sider } = Layout
const ArticleSider = (props: any) => {
    return (
        <Sider className=" sider articleSider">
            <div className="author-block">
                <div className="author-title">关于作者</div>
                <div className="block-body">
                    <a className="user-item">
                        <Avatar size="large" icon={<UserOutlined />} />
                        <div className="user-info">
                            <div className="user-name">Username</div>
                            <div className="user-disc">disc</div>
                        </div>
                    </a>
                </div>
            </div>
            <Affix offsetTop={80}>
                <div className="detailed-nav comm-box">
                    <div className="nav-title">目录</div>
                    <MarkNav
                        className="article-menu"
                        source={props.content}
                    // ordered={false}
                    // headingTopOffset={80}
                    />
                </div>
            </Affix>
        </Sider>
    )
}

export default ArticleSider