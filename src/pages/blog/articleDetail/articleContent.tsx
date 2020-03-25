import React, { useEffect, useState } from 'react';
import { Layout, Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown'
import ArticleComments from './articleComments';

import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
import '../components/static/content.scss'
import './articleContent.scss'

const { Content } = Layout

const ArticleContent = (props: any) => {
    useEffect(() => {

    })

    return (
        <div>
            <Content className="content articleContent-shell">

                <div className="author_info_block">
                    <Avatar size="large" icon={<UserOutlined />} />
                    <div className="author_info_box">
                        <a className="user_name">username</a>
                        <div>
                            <time>time</time>
                        </div>
                    </div>
                    <Button className="author_info_btn">关注</Button>
                </div>
                <div className="articleContent">
                    <div
                        id="articleContent"
                        className="article-detail"
                    >
                        <ReactMarkdown
                            source={props.content}
                            escapeHtml={false}
                        />
                    </div>
                </div>
                <ArticleComments />



            </Content >
        </div>

    );
}

export default ArticleContent