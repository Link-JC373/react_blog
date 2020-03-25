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
        <Link to={`/articleDetail/${item?.id}`} className="link_to">
            <div className="al">

                <div className="user-info-row">
                    <Popover content={<AuthorCard data={item.user} />} >
                        <Avatar size={40} icon={<UserOutlined />} />
                        <span className="user_name"> {item.user.username} </span>
                    </Popover >
                             · <span> {item.title} </span> · <span> {item.blog_type.typename} </span>
                </div>
                <div className="comment">
                    {item.comment}
                </div>
            </div>
        </Link>
    );
}

export default UserComment;