import React, { useState, useEffect, useRef } from 'react';
import { Layout, Avatar, message, Input, Divider, Dropdown, Modal, Button, Menu } from 'antd'
// import QueueAnim from 'rc-queue-anim';
import {
    FileTextOutlined,
    EditOutlined,
    UserOutlined,
    ExportOutlined
} from '@ant-design/icons';
import './static/header.scss'
import LoginForm from './loginForm'
import RegisterForm from './registerForm';
import Request from '../../../utils/request';
import { useHistory } from 'react-router-dom';
import { ILogin, ILoginInfo } from '../types';
import loginCon from 'container/loginCon';
const { Search } = Input
const { Header } = Layout




const BlogHeader = (props: ILogin) => {
    const [registerVisible, setRegsiterVisible] = useState<boolean>(false)
    const [loginVisible, setLoginVisible] = useState<boolean>(false)
    const [isShow, setIsShow] = useState<boolean>(true);
    // const [userInfo, setUserInfo] = useState<ILoginInfo>();
    // const [pageYOffset, setPageYOffSet] = useState(window.pageYOffset)
    const headerRef = useRef<HTMLDivElement>(null)
    const { userInfo, onLogin, onLogout } = props
    useEffect(() => {
        document.addEventListener('scroll', () => {
            onScroll()
        })
        return document.removeEventListener('scroll', () => { onScroll() })
    }, [])

    //初始时判断是否有登录数据
    useEffect(() => {
        let info = localStorage.getItem('userInfo')
        console.log(props);

        if (info) {
            onLogin && onLogin(JSON.parse(info))
            // setUserInfo(JSON.parse(info))
        }
    }, [])



    //随着滚动事件 显示 / 隐藏 header
    let pageYOffset = 0
    const onScroll = () => {
        if (window.pageYOffset - pageYOffset > 0) {
            setIsShow(false)
        } else {
            setIsShow(true)
        }
        pageYOffset = window.pageYOffset
    }

    const loginFinish = async (values: any) => {
        console.log(values);
        setLoginVisible(values.visible);
        props.onLogin(values.data);
    }
    let history = useHistory();

    const onGoTo = (url: string) => {
        console.log(url);

        history.push(url)
    }

    const logout = () => {
        onLogout && onLogout()
        window.localStorage.removeItem('userInfo')
        window.location.reload()

    }

    const menu = (
        <Menu className="header_drow_menu">
            <Menu.Item key="0">
                <a onClick={() => onGoTo('/addArticle')} ><EditOutlined /> 写文章</a>
            </Menu.Item>
            <Menu.Item key="1">
                <a onClick={() => onGoTo(`/authorDetail/${userInfo?.userId}/articleList`)}><UserOutlined /> 个人中心</a>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3" onClick={logout}><ExportOutlined /> 退出</Menu.Item>
        </Menu>
    );

    const loginCancel = () => {
        setLoginVisible(false);
    }

    const openLoginModal = () => {
        setLoginVisible(true)
    }

    const registerCancel = () => {
        setRegsiterVisible(false)
    }

    const openRegisterModal = () => {
        setRegsiterVisible(true)
    }

    return (
        <>
            <div className="header" ref={headerRef}>
                {/* <QueueAnim className="demo-content"
                    // ease={['easeOutQuart', 'easeInOutQuart']}
                    animConfig={[
                        { opacity: [1, 0], translateY: [0, -50] },
                        { opacity: [1, 0], translateY: [-50, 0] }
                    ]}
                > */}
                {isShow ? [
                    <Header key='1'>
                        <div className="header-title">
                            <div>
                                <a className="header-logo" onClick={() => onGoTo('/blog')}>PlayMate </a>
                                <span className="header-text"> Meet! And play with your playmate</span>

                            </div>

                            <div>
                                <Search
                                    placeholder="你在找什么？快告诉我"
                                    onSearch={value => console.log(value)}
                                    style={{ width: 200 }}
                                />
                                {
                                    props.userInfo?.userId !== 0 ?
                                        <>
                                            <Button className='addArticle_btn' type="primary" onClick={() => onGoTo('/addArticle')} > 写文章</Button>
                                            <Dropdown overlay={menu} trigger={['click']}>
                                                <Avatar src={userInfo?.userIcon} />
                                            </Dropdown>,
                                        </>
                                        :
                                        <>
                                            <a className='addArticle'><FileTextOutlined className="arIcon" />写文章</a>
                                            <Divider type="vertical" style={{ width: 2 }} />
                                            <a className="header_login" onClick={openLoginModal}>登录 · </a>
                                            <a className="header_login" onClick={openRegisterModal}>注册</a>
                                        </>
                                }
                            </div>
                        </div>
                    </Header>
                ] : null}
                {/* </QueueAnim> */}
                <Modal
                    title="登录"
                    visible={loginVisible}
                    footer={null}
                    onCancel={loginCancel}
                    destroyOnClose
                >
                    <LoginForm loginFinish={loginFinish} />
                </Modal>
                <Modal
                    title="注册"
                    visible={registerVisible}
                    footer={null}
                    onCancel={registerCancel}
                    destroyOnClose
                >
                    <RegisterForm />
                </Modal>
                <Divider />

            </div>


        </>



    );
}

export default loginCon(BlogHeader)

