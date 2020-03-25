import React, { useState, useEffect } from 'react';
import { Layout, BackTop, Menu, Affix, Row, Col } from 'antd';
import { Parallax } from 'rc-scroll-anim';
import BlogHeader from './components/header';
import BlogContent from './components/content';
import BlogSider from './components/sider';
import Request from '../../utils/request';

import { IArticleData } from './types';
import './index.scss'
import LoginCon from 'container/HeaderCon';


const Blog = () => {
    const [dataList, setDataList] = useState<Array<IArticleData>>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [pageNum, setPageNum] = useState<number>(1)
    const [articleTypeId, setArticleTypeId] = useState<number>(0)
    useEffect(() => {
        getArticleList(pageNum)
    }, [])

    const getArticleList = async (pageNum: number, articleTypeId?: number, isAdd: boolean = true) => {
        let req = new Request()
        setLoading(true)
        await req.post('/default/getArticleList', { pageNum, articleTypeId }).then((res) => {
            console.log(res);
            isAdd ? setDataList([...dataList, ...res?.data.rows]) : setDataList([...res?.data.rows])
            setLoading(false)
            setPageNum(pageNum + 1)
            if (pageNum >= res?.data.total_pages) {
                setHasMore(false)
            }
        }).catch((err) => {
            setLoading(false)
            console.log(err);
        })
        console.log(dataList);

    }

    const handleClick = (e: { key: React.SetStateAction<string>; }) => {
        console.log('click ', e);

        setArticleTypeId(+e.key)
        setPageNum(1)
        getArticleList(1, +e.key, false)

    };

    const onLoadMore = (page: number) => {
        getArticleList(pageNum, articleTypeId)
    }

    return (
        <div>

            <Layout>
                <Affix offsetTop={0}>
                    <div>
                        {/* <BlogHeader /> */}
                        <LoginCon />
                        <div className="header_nav">
                            <Menu onClick={handleClick} selectedKeys={[`${articleTypeId}`]} mode="horizontal">
                                <Menu.Item key="0">
                                    推荐
                                </Menu.Item>
                                <Menu.Item key="1">
                                    游戏开发
                                </Menu.Item>
                                <Menu.Item key="2">
                                    游戏测评
                                 </Menu.Item>
                                <Menu.Item key="3">
                                    游戏策划
                                </Menu.Item>
                            </Menu>


                        </div>
                    </div>

                </Affix>


                <Layout className="mainLayout">
                    <BlogContent data={dataList} loading={loading} onLoadMore={onLoadMore} hasMore={hasMore} />
                    <BlogSider />
                </Layout>

            </Layout>
            <BackTop />
        </div>
    );
}
export default Blog;