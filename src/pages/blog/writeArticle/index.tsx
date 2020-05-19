import React, { useState, useEffect } from 'react';
import marked from 'marked';
import { useHistory } from 'react-router-dom';
import { Row, Col, Input, Tag, Button, Popover, Avatar, Dropdown, Menu, Divider, message } from 'antd';
import {
    FileTextOutlined,
    EditOutlined,
    UserOutlined,
    CaretDownOutlined,
    CaretUpOutlined,
} from '@ant-design/icons';
import './AddArticle.scss'
import { ILoginInfo } from '../types';
import Request from '../../../utils/request';
import loginCon from 'container/loginCon';

const { TextArea } = Input
const { CheckableTag } = Tag;

const tagsFromServer = ['游戏开发', '游戏运维', '游戏测评'];
const WriteArticle = (props: ILoginInfo) => {
    // const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle, setArticleTitle] = useState('')   //文章标题
    const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [userInfo, setUserInfo] = useState<ILoginInfo>();
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [selectedTag, setSelectTag] = useState<number>();//记录被选择的标签
    const [showIntroduce, setShowIntroduce] = useState<boolean>(true);//是否显示简介
    const [introduceVal, setIndroduceVal] = useState<string>('')//记录简介

    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        breaks: false,
        smartLists: true,
        smartypants: false
    })

    const changeContent = (e: any) => {
        setArticleContent(e.target.value)
        let html = marked(e.target.value)
        setMarkdownContent(html)
    }
    const changeIntroduce = (e: any) => {
        setIntroducemd(e.target.value)
        setIndroduceVal(e.target.value)
        let html = marked(e.target.value)
        setIntroducehtml(html)
    }
    useEffect(() => {
        let info = localStorage.getItem('userInfo')
        if (info) {
            setUserInfo(JSON.parse(info))
        }
    }, [])

    const onGoTo = (url: string) => {
        console.log(url);

        history.push(url)
    }

    const addArticle = async () => {
        let req = new Request()
        await req.post('user/addArticle', {
            userId: userInfo?.userId,
            title: articleTitle,
            articleContent: articleContent,
            introduce: introduceVal,
            typeid: selectedTag
        }).then((res) => {
            message.success('发布成功，正在跳转回主页面~~~')
            setTimeout(() => onGoTo('/blog'), 1000)

        })
        // console.log(props.userId);

        // props.userId
    }

    const content = (
        <div className="choose-type">
            <p>选择分类:</p>
            <div>
                {tagsFromServer.map((tag, index) => <CheckableTag
                    key={tag}
                    checked={selectedTag === index + 1}
                    onChange={() => setSelectTag(index + 1)}
                >
                    {tag}
                </CheckableTag>)}
            </div>
            {/* <Divider className="push-divider" /> */}
            <Button size="small" className="push-button" onClick={addArticle}>确定并发布</Button>
        </div>
    );
    let history = useHistory();



    //点击头像下拉菜单
    const menu = (
        <Menu className="header_drow_menu">
            <Menu.Item key="0">
                <a onClick={() => onGoTo('/blog')} ><EditOutlined /> 回到主页</a>
            </Menu.Item>
            <Menu.Item key="1">
                <a onClick={() => onGoTo(`/authorDetail/${userInfo?.userId}/articleList`)}><UserOutlined /> 个人中心</a>
            </Menu.Item>
        </Menu>
    );


    return (
        <div>
            <Row gutter={5}>
                <Col span={24}>
                    <Row gutter={10} className="write-title">
                        <Col span={18}>
                            <Input
                                placeholder="博客标题"
                                size="large"
                                onChange={e => setArticleTitle(e.target.value)}
                            />
                        </Col>
                        <Col span={6} className="right-box">
                            <Button onClick={() => setShowIntroduce(!showIntroduce)}>{showIntroduce ? '隐藏简介' : '显示简介'} </Button>

                            <Popover content={content} title="发布文章" trigger="click">
                                <Button onClick={() => setOpenMenu(!openMenu)}>发布{openMenu ? <CaretUpOutlined /> : < CaretDownOutlined />} </Button>
                            </Popover>
                            <Dropdown overlay={menu} trigger={['click']}>
                                <a> <Avatar src={userInfo?.userIcon} /></a>
                            </Dropdown>,
                        </Col>
                    </Row>
                    {/* <br /> */}
                    {
                        showIntroduce && <Row gutter={10} className="input-introduce">
                            <Col span={12}>
                                <TextArea
                                    rows={4}
                                    className="input-introduce-textarea"
                                    placeholder="文章简介"
                                    defaultValue={introduceVal}
                                    onChange={changeIntroduce}
                                />
                            </Col>
                            <Col span={12}>
                                <div className="introduce-html"
                                    dangerouslySetInnerHTML={{ __html: introducehtml }}
                                >
                                </div>
                            </Col>
                        </Row>
                    }
                    <Row gutter={10}>
                        <Col span={12}>
                            <TextArea
                                className="markdown-content"
                                rows={35}
                                placeholder="文章内容"
                                onChange={changeContent}
                            />
                        </Col>
                        <Col span={12}>
                            <div className="show-html"
                                dangerouslySetInnerHTML={{ __html: markdownContent }}
                            ></div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default WriteArticle