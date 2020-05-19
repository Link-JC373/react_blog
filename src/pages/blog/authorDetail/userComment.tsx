import React, { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroller';
import { List, Button, Popover, Avatar, Skeleton } from 'antd'
import { LikeOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import { ICommentData } from '../types';
import AuthorCard from '../components/authorCard';
import './userInfoList.scss'
interface IUserComment {

    item: ICommentData
}
const UserComment = (props: IUserComment) => {
    const { item } = props
    return (
        <Link to={`/articleDetail/${item?.blog_article.id}`} className="link_to">
            <div className="al">

                <div className="user-info-row">
                    <Popover content={<AuthorCard data={item.user} />} >
                        <span>
                            <Avatar size={40} src={item.user.user_icon} />
                            <span className="user_name"> {item.user.username} </span>
                        </span>

                    </Popover >
                             · <span> {item.blog_article.title} </span>
                </div>
                <div className="comment">
                    {item.comment_content}
                </div>
            </div>
        </Link>
    );
}

export default UserComment;