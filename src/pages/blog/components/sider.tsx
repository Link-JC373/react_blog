import React, { useState, useEffect } from 'react';
import { Layout, Form, Input, Spin, Avatar } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import './static/sider.scss'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import RegisterForm from './registerForm';
import { IUserData, ILogin } from '../types';
import Request from 'utils/request';
import { useHistory } from 'react-router-dom';
import loginCon from 'container/loginCon';
const { Sider } = Layout
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


const BlogSider = (props: ILogin) => {
    const [rankingList, setRankingList] = useState<Array<IUserData>>([])
    const { userInfo } = props

    useEffect(() => {
        initRanikng()
    }, [])

    const initRanikng = async () => {
        let req = new Request()
        await req.get('default/getRanking').then((res) => {
            console.log(res);
            setRankingList(res?.data)
        })
    }
    let history = useHistory()

    const onGoTo = (id: number) => {
        history.push(`/authorDetail/${id}/articleList`)
    }

    return (
        <Sider className="sider">
            {
                !userInfo?.userId && <div className="register">
                    <h1 className="register-title">立即注册</h1>

                    <RegisterForm />
                </div>
            }


            <div className="sider-author-block">
                <div className="sider-author-block-header">
                    🎖️作者榜
                </div>
                <ul className="sider-author-block-content">
                    {rankingList ? rankingList.map((item, index) => {
                        return <li key={index} className="user-info-list" onClick={() => onGoTo(item.id)}>
                            <Avatar size={42} src={item.user_icon} />
                            <div className='user-info'>
                                <div className='user-info-first'> <span>{item.username}</span>  · {item.article_count} 篇文章</div>
                                <div>{item.disc}</div>
                            </div>
                        </li>

                    })
                        :
                        <Spin indicator={antIcon} />
                    }
                </ul>
            </div>
        </Sider>
    );
}

export default loginCon(BlogSider) 