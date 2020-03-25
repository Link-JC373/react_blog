import React, { useState, useEffect } from 'react'
import { Layout, Avatar, Tabs } from 'antd';
import { UserOutlined, SolutionOutlined } from '@ant-design/icons';
import { IArticleData, ICommentData, IFav } from '../types';
import InfiniteList from '../components/infiniteList';
import './authorContent.scss'
import '../index.scss'

const { Content } = Layout
const { TabPane } = Tabs;
const AuthorContent = () => {
    const [dataList, setDataList] = useState<Array<IArticleData>>([
    ])
    const [loading, setLoading] = useState<boolean>(true)
    const [commentDataList, setCommentDataList] = useState<Array<ICommentData>>([])
    const [favDataList, setFavDataList] = useState<Array<IFav>>([])
    const [commentLoading, setCommentLoading] = useState<boolean>(true)
    const [favLoading, setFavLoading] = useState<boolean>(true)
    const callback = (key: string) => {
        console.log(key);
    }

    useEffect(() => {
        setTimeout(() => {
            setCommentDataList([])
            setCommentLoading(false)
        }, 1000)
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setDataList([])
            setLoading(false)
        }, 1000)

    }, [])

    useEffect(() => {
        setTimeout(() => {
            setFavDataList([
                {
                    id: '1',
                    favName: 'Flutter',
                    count: '10'
                },
                {
                    id: '2',
                    favName: 'WebPack',
                    count: '10'
                },
                {
                    id: '3',
                    favName: 'JavaScript',
                    count: '10'
                },
            ])
            setFavLoading(false)
        }, 1000)
    }, [])

    const onArticleLoadMore = (num: number) => {
        console.log(num);

        setLoading(true)
        setTimeout(() => {
            setDataList([...dataList])
            setLoading(false)
        })
    }


    const onCommentLoadMore = (num: number) => {
        setCommentLoading(true)

        setTimeout(() => {
            setCommentDataList([...commentDataList])
            setCommentLoading(false)
        }, 1000)
    }

    const onFavLoadMore = (num: number) => {
        setFavLoading(true)

        setTimeout(() => {
            setFavDataList([...favDataList, {
                id: '3',
                favName: 'JavaScript',
                count: '10'
            },])
            setFavLoading(false)
        }, 1000)
    }

    return (
        <div className="authorContent ">
            <Content >
                <div className="user-info-block">
                    <Avatar size={100} icon={<UserOutlined />} className="user-avator" />
                    <div className="info-box">
                        <div className="top">
                            <h1>UserName</h1>
                        </div>
                        <div className="bottom">
                            <SolutionOutlined />Disc
                        </div>

                    </div>
                    <div className="action-box">
                        <button className="follow-btn">
                            关注
                            </button>
                    </div>
                </div>
                <div className="list-block">
                    <Tabs defaultActiveKey="1" onChange={callback}>
                        <TabPane tab="文章" key="1">
                            <InfiniteList data={dataList} loading={loading} onLoadMore={onArticleLoadMore} element='articleList' />
                            {/* <ArticleList />
                            </InfiniteList> */}
                        </TabPane>
                        <TabPane tab="评论" key="2">
                            <InfiniteList data={commentDataList} loading={commentLoading} onLoadMore={onCommentLoadMore} element='commentList' />

                        </TabPane>
                        <TabPane tab="收藏夹" key="3">
                            <InfiniteList data={favDataList} loading={favLoading} onLoadMore={onFavLoadMore} element='favList' />
                        </TabPane>
                    </Tabs>,
                </div>
            </Content>

        </div>
    )
}

export default AuthorContent