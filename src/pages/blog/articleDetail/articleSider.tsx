import React, { useEffect } from 'react'
// import { UserOutlined } from '@ant-design/icons';
import { Layout, Avatar, Affix } from 'antd';
// import MarkNav from 'markdown-navbar';
// import 'markdown-navbar/dist/navbar.css';

import '../components/static/sider.scss'
import './articleSider.scss'
import { IArticleData } from '../types';

const { Sider } = Layout
const ArticleSider = (props: IArticleData) => {
    return (
        <Sider className=" sider articleSider">
            <div className="author-block">
                <div className="author-title">关于作者</div>
                <div className="block-body">
                    <a className="user-item">
                        <Avatar size="large" src={props.user?.user_icon} />
                        <div className="user-info">
                            <div className="user-name">{props.user?.username}</div>
                            <div className="user-disc">{props.user?.disc}</div>
                        </div>
                    </a>
                </div>
            </div>
            {/* 目录功能暂时搁浅 */}
            {/* <Affix offsetTop={80}>
                <div className="detailed-nav comm-box">
                    <div className="nav-title">目录</div>

                    <MarkNav
                        className="article-menu"
                        source={props.data.article_content}
                    // ordered={false}
                    // headingTopOffset={80}
                    />
                </div>
            </Affix> */}
        </Sider>
    )
}

export default ArticleSider