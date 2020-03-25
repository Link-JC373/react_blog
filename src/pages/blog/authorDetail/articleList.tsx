import React, { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroller';
import { List, Button, Popover, Avatar, Skeleton } from 'antd'
import { LikeOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import { IArticleData } from '../types';
import AuthorCard from '../components/authorCard';
import './userInfoList.scss'
interface IArticleList {

    item: IArticleData
}
const ArticleList = (props: IArticleList) => {
    const { item } = props
    return (
        <Link to={`/articleDetail/${item?.id}`} className="link_to">
            <div className="al">

                <div className="user-info-row">
                    <Popover content={<AuthorCard data={item.user} />} >
                        <Avatar size={40} icon={<UserOutlined />} />
                        <span className="user_name"> {item.user.username} </span>
                    </Popover >
                             · <span> {item.blog_type.typename} </span>
                </div>
                <div className="title">
                    {item.title}
                </div>
                <div className="introduce">
                    {item.introduce ? item.introduce : ''}
                </div>
                <div className="btns">
                    <Button > <LikeOutlined /> </Button>
                    <Button > <MessageOutlined /> </Button>
                </div>
            </div>
        </Link>
    );
}

export default ArticleList;