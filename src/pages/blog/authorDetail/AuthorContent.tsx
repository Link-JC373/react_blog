import React, { useState, useEffect } from 'react'
import { Layout, Avatar, Tabs } from 'antd';
import { UserOutlined, SolutionOutlined } from '@ant-design/icons';
import { IArticleData, ICommentData, IFav, IUserData } from '../types';
import { Route, useParams, useHistory } from 'react-router-dom';

import InfiniteList from '../components/infiniteList';
import './authorContent.scss'
import '../index.scss'
import Request from '../../../utils/request';
import loginCon from 'container/loginCon';

const { Content } = Layout
const { TabPane } = Tabs;

const AuthorContent = () => {

    // const [userId, setUserId] = useState<string>()
    const [userInfo, setUserInfo] = useState<IUserData>()
    const [loginInfo, setLoginInfo] = useState<any>()
    let { id } = useParams()

    useEffect(() => {
        id && initContent(id)
        setLoginInfo(JSON.parse('' + localStorage.getItem('userInfo')))
        console.log(JSON.parse('' + localStorage.getItem('userInfo')));

    }, [])

    const initContent = async (id: string | undefined) => {
        // setUserId(id)
        let req = new Request()
        await req.get(`default/findUserById/${id}`).then((res) => {
            setUserInfo(res?.data)
        })
    }

    let history = useHistory()
    const callback = (key: string) => {
        history.push(`/authorDetail/${id}/` + `${key}`)
        // console.log(key);
    }



    return (
        <div className="authorContent ">
            <Content >
                <div className="user-info-block">
                    {/* {id} */}
                    <Avatar size={100} src={userInfo?.user_icon} className="user-avator" />
                    <div className="info-box">
                        <div className="top">
                            <h1>{userInfo?.username}</h1>
                        </div>
                        <div className="bottom">
                            <SolutionOutlined /> {userInfo?.disc}
                        </div>

                    </div>
                    <div className="action-box">
                        <button className="follow-btn">
                            {loginInfo?.userId === userInfo?.id ? '修改个人信息' : '关注'}
                        </button>
                    </div>
                </div>
                <div className="list-block">
                    <Tabs defaultActiveKey="articleList" onChange={callback}>
                        <TabPane tab="文章" key="articleList">

                            <Route path={`/authorDetail/${id}/articleList`} render={() => <InfiniteList url='/default/getArticleList' data={{ userId: id }} element='articleList' />} />

                        </TabPane>
                        <TabPane tab="评论" key="comments">
                            <Route path={`/authorDetail/${id}/comments`} render={() => <InfiniteList url="/default/getUserComments" data={{ userId: id }} element='commentList' />} />
                        </TabPane>
                        <TabPane tab="收藏夹" key="fav">
                            <Route path={`/authorDetail/${id}/fav`} render={() => <InfiniteList url="/default/getFavorites" data={{ userId: id }} element='favList' />} />
                        </TabPane>
                    </Tabs>,
                </div>
            </Content>

        </div>
    )
}

export default loginCon(AuthorContent)