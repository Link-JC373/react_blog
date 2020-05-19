import React from 'react'
import { IArticleData } from '../types';
import { LikeOutlined, MessageOutlined } from '@ant-design/icons'
import { List, Popover, Button } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import Loadable from '../../../route/compLodable';
import './static/mainArticleList.scss'

const AuthorCard = Loadable(() => import('./authorCard'))

// interface IMainList {
//     item: IArticleData
// }
const MainArticleList = (props: IArticleData) => {
    // const { item } = props
    let history = useHistory();

    const jumpToAuthor = (id: number) => {
        history.push(`/authorDetail/${id}`)
    }
    return (
        <Link to={`/articleDetail/${props.id}`} className="link_to">
            <div >

                <div className="meta_row">
                    <span className="post">专栏 </span> ·  <Popover content={<AuthorCard data={props.user} />} >
                        <div onClick={() => jumpToAuthor(props.id)}>
                            <span className="user_name"> {props.user.username} </span>
                        </div>
                    </Popover >
                             · <span> {props.blog_type.typename} </span>
                </div>
                <div className="title">
                    {props.title}
                </div>
                <div className="btns">
                    <Button > <LikeOutlined /> {props.likeCount === 0 ? '' : props.likeCount}</Button>
                    <Button > <MessageOutlined /> </Button>
                </div>
            </div>


        </Link>
    )
}

export default MainArticleList