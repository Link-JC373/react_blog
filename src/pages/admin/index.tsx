import React, { useState, useEffect } from 'react';
import { Route, NavLink, Link, BrowserRouter, withRouter } from 'react-router-dom'

import { Layout, Menu, Switch, notification } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    PieChartOutlined,
    SmileOutlined,
    FileTextOutlined
} from '@ant-design/icons';
import './admin.scss';
import Loadable from '../../route/compLodable';
import QueueAnim from 'rc-queue-anim';
const { Header, Sider, Content, Footer } = Layout;

interface ICompObj {
    url: string,
    name: string,
    comp: any, //真心不知道这种第三方插件应该写什么类型，这应该就是我和大佬之间的差距吧 ;p
    icon: any,
}

const Admin = (props: any) => {
    const [collapsed, setCollapsed] = useState(false);
    const [defaultUrl, setDefaultUrl] = useState((
        function () {
            if (props.location.pathname === '/admin') {
                return '/admin/systemData'
            }
            return props.location.pathname
        }
    )()); //菜单栏随 输入的 url 变化而变化   *****


    const ArticleController = Loadable(() => import('./components/article'))
    const UserController = Loadable(() => import('./components/user'))
    const SystemData = Loadable(() => import('./components/systemData'))
    const CommentController = Loadable(() => import('./components/comments'))
    const arrComp: Array<ICompObj> = [
        {
            url: '/admin/systemData',
            name: '数据统计',
            comp: SystemData,
            icon: <PieChartOutlined />,
        },
        {
            url: '/admin/userController',
            name: '用户管理',
            comp: UserController,
            icon: <UserOutlined />,
        },
        {
            url: '/admin/articleController',
            name: '文章管理',
            comp: ArticleController,
            icon: <FileTextOutlined />,
        },
        {
            url: '/admin/commentController',
            name: '评论管理',
            comp: CommentController,
            icon: <FileTextOutlined />,
        },
    ]
    const toggle = () => {
        setCollapsed(!collapsed);
    };

    const changeMenu = (e: any) => {
        console.log(e.key);
    }
    useEffect(() => {
        if (props.location.pathname === '/admin') {
            props.history.push('/admin/systemData')
        }
        notification.open({
            message: 'Welcome Back, Admin',
            description:
                '欢迎回来！最近怎么样？',
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
    }, [])
    return (
        <div className='main'>
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={[defaultUrl]} onClick={changeMenu}>
                        {/* <QueueAnim delay={300} className="queue-simple"> */}
                        {
                            arrComp.map((item) => {
                                return <Menu.Item key={item.url}>
                                    {item.icon}
                                    {!collapsed && <Link to={item.url}>{item.name}</Link>}
                                </Menu.Item>
                            })
                        }
                        {/* </QueueAnim> */}

                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: toggle,
                        })}
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >

                        {/* <Route path='/admin' component={Chart} /> */}
                        {
                            arrComp.map((item, index) => {
                                return <Route path={item.url} component={item.comp} key={index} />
                            })
                        }

                    </Content>
                    <Footer style={{ textAlign: 'center' }}>playmate.com</Footer>
                </Layout>
            </Layout>
        </div>

    );
}
export default withRouter(Admin);