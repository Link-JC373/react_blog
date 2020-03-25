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
const { Search } = Input
const { Header } = Layout

interface ILoginInfo {
    userId: number;
    userIcon: string;
    token: string;
}

interface IBlogHeader {
    isLogin?: boolean;
    onLogin?: () => void;
    onLogout?: () => void;

}

const BlogHeader = (props: IBlogHeader) => {
    const [registerVisible, setRegsiterVisible] = useState<boolean>(false)
    const [loginVisible, setLoginVisible] = useState<boolean>(false)
    const [isShow, setIsShow] = useState<boolean>(true);
    const [userInfo, setUserInfo] = useState<ILoginInfo>();
    // const [pageYOffset, setPageYOffSet] = useState(window.pageYOffset)
    const headerRef = useRef<HTMLDivElement>(null)
    const { isLogin, onLogin, onLogout } = props
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
            onLogin && onLogin()
            setUserInfo(JSON.parse(info))
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

    const loginFinish = async (values: object) => {
        console.log(values);
        let req = new Request();
        await req.post('/user/checkLogin', { ...values }).then((res: any) => {
            console.log(res);
            switch (res?.status) {
                case 403:
                    message.error(res?.message)
                    break;
                case 200:
                    setUserInfo(res?.data)
                    onLogin && onLogin()
                    localStorage.setItem('userInfo', JSON.stringify(res?.data))
                    setLoginVisible(false)
                default:
                    break;
            }
        })
    }
    let history = useHistory();

    const onGoTo = (url: string) => {
        history.push(url)
    }

    const menu = (
        <Menu className="header_drow_menu">
            <Menu.Item key="0">
                <a href="http://www.alipay.com/"><EditOutlined /> 写文章</a>
            </Menu.Item>
            <Menu.Item key="1">
                <a onClick={() => onGoTo(`/authorDetail/${userInfo?.userId}`)}><UserOutlined /> 个人中心</a>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3"><ExportOutlined /> 退出</Menu.Item>
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
                                <span className="header-logo">PlayMate </span>
                                <span className="header-text"> Meet! And play with your playmate</span>

                            </div>

                            <div>
                                <Search
                                    placeholder="你在找什么？快告诉我"
                                    onSearch={value => console.log(value)}
                                    style={{ width: 200 }}
                                />
                                {
                                    isLogin ?
                                        <>
                                            <Button className='addArticle_btn' type="primary">写文章</Button>
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
                >
                    <LoginForm loginFinish={loginFinish} />
                </Modal>
                <Modal
                    title="注册"
                    visible={registerVisible}
                    footer={null}
                    onCancel={registerCancel}
                >
                    <RegisterForm />
                </Modal>
                <Divider />

            </div>


        </>



    );
}

export default BlogHeader

