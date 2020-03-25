import React from 'react'
import { IArticleData } from '../types';
import { LikeOutlined, MessageOutlined } from '@ant-design/icons'
import { List, Popover, Button } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import Loadable from '../../../route/compLodable';
const AuthorCard = Loadable(() => import('./authorCard'))

interface IMainList {
    item: IArticleData
}
const MainArticleList = (props: IMainList) => {
    const { item } = props
    let history = useHistory();

    const jumpToAuthor = (id: number) => {
        history.push(`/authorDetail/${id}`)
    }
    return (
        <Link to={`/articleDetail/${item.id}`} className="link_to">
            <div >

                <div className="meta_row">
                    <span className="post">专栏 </span> ·  <Popover content={<AuthorCard data={item.user} />} >
                        <div onClick={() => jumpToAuthor(item.id)}>
                            <span className="user_name"> {item.user.username} </span>
                        </div>
                    </Popover >
                             · <span> {item.blog_type.typename} </span>
                </div>
                <div className="title">
                    {item.title}
                </div>
                <div className="btns">
                    <Button > <LikeOutlined /> {item.likeCount === 0 ? '' : item.likeCount}</Button>
                    <Button > <MessageOutlined /> </Button>
                </div>
            </div>


        </Link>
    )
}

export default MainArticleList