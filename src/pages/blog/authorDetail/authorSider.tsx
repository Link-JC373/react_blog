import React from 'react';
import { Layout, Statistic, Divider } from 'antd';
import { LikeTwoTone, EyeTwoTone } from '@ant-design/icons';
import './authorSider.scss'
const { Sider } = Layout
const AuthorSider = () => {
    return (
        <div className="authorSider">
            <Sider >
                <div className="proud-info-box">
                    <div className="box-title">个人成就</div>
                    <div className="box-body">
                        <div className="proud-item">
                            <LikeTwoTone /> <span>获得点赞 5</span>
                        </div>
                        <div className="proud-item">
                            <EyeTwoTone /> <span>文章阅读数 205</span>
                        </div>

                    </div>
                </div>
                <div className="follow-box">

                    <Statistic title="关注了" value={112} />
                    <Divider type="vertical" />
                    <Statistic title="关注者" value={20} />

                </div>
            </Sider>
        </div>

    );
}

export default AuthorSider
