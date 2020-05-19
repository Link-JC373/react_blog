import React, { useState, useEffect } from 'react';
import { Layout, BackTop, Menu, Affix, Row, Col } from 'antd';
import BlogHeader from './components/header';
import './components/static/content.scss'
import './index.scss'
import InfiniteList from './components/infiniteList';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import BlogSider from './components/sider';



const Blog = () => {

    const [articleTypeId, setArticleTypeId] = useState<string>((
        function () {
            if (window.location.pathname === '/blog') {
                return '/blog/recommend'
            }
            return window.location.pathname
        }
    )())


    const handleClick = (e: { key: React.SetStateAction<string>; }) => {
        console.log('click ', e);

        setArticleTypeId(e.key)

    };



    return (
        <div>

            <Layout>
                <Affix offsetTop={0}>
                    <div>
                        <BlogHeader />
                        {/* <LoginCon /> */}
                        <div className="header_nav">
                            <Menu onClick={handleClick} selectedKeys={[articleTypeId]} mode="horizontal">
                                <Menu.Item key="/blog/recommend">
                                    <Link to={'/blog/recommend'}>推荐</Link>

                                </Menu.Item>
                                <Menu.Item key="/blog/development">
                                    <Link to={'/blog/development'}>游戏开发</Link>

                                </Menu.Item>
                                <Menu.Item key="/blog/devops">
                                    <Link to={'/blog/devops'}>游戏运维</Link>

                                </Menu.Item>
                                <Menu.Item key="/blog/plan">
                                    <Link to={'/blog/plan'}>游戏测评</Link>

                                </Menu.Item>
                            </Menu>


                        </div>
                    </div>

                </Affix>

                <Layout className="mainLayout">
                    <div className="content">
                        <Route path="/blog" exact render={() => <InfiniteList url="/default/getArticleList" element="mainArticleList" />} />
                        <Route path="/blog/recommend" render={() => <InfiniteList url="/default/getArticleList" element="mainArticleList" />} />
                        <Route path="/blog/development" render={() => <InfiniteList url="/default/getArticleList" data={{ articleTypeId: 1 }} element="mainArticleList" />} />
                        <Route path="/blog/devops" render={() => <InfiniteList url="/default/getArticleList" data={{ articleTypeId: 2 }} element="mainArticleList" />} />
                        <Route path="/blog/plan" render={() => <InfiniteList url="/default/getArticleList" data={{ articleTypeId: 3 }} element="mainArticleList" />} />

                    </div>
                    {/* <BlogContent data={dataList} loading={loading} onLoadMore={onLoadMore} hasMore={hasMore} /> */}
                    {/* <SiderCon /> */}
                    <BlogSider />
                </Layout>

            </Layout>
            <BackTop />
        </div>
    );
}
export default Blog;