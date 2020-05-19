import React, { useState, useEffect, createElement } from 'react';
import { Comment, Tooltip, Modal, Input } from 'antd';

import { IComment, ILogin } from '../types';
import AntdComment from './AntdComment';
import loginCon from 'container/loginCon';
import { useParams } from 'react-router';
import Request from '../../../utils/request';
const { Search } = Input

interface ICommentComp extends IComment, ILogin {
}
const CommentComp = (data: ICommentComp) => {

    const [showMore, setShowMore] = useState<boolean>(false);

    const [subComData, setSubComData] = useState<Array<IComment>>([])

    useEffect(() => {
        setSubComData([...data.comments_to_comments])
    }, [])

    let { id } = useParams()

    //子评论
    const commentChildren = (children: Array<IComment>) => {
        // console.log(children);

        return children.map((item, index) => <AntdComment
            // style={{ backgroundColor: '#fafbfc' }}
            className="sub-comment"
            url="user/addToComment"
            requestData={{
                userId: data.user.id,
                articleId: id,
                tcName: item.user.username,
                tcId: item.user.id,
                commentId: data.comment_id
            }}
            refresh={getSubComments}
            key={index}
            {...item}
        />)
    }

    const getSubComments = async () => {
        let req = new Request()
        await req.post('default/getToComments', { commentId: data.comment_id }).then(res => {
            setSubComData([...res?.data])
        })
    }


    return (
        <AntdComment
            {...data}
            url="user/addToComment"
            requestData={{
                userId: data.userInfo?.userId,
                tcName: data.user.username,
                tcId: data.user.id,
                commentId: data.comment_id,
                articleId: id,

            }}
            refresh={getSubComments}

        >

            {/* 当次级评论数大于3时隐藏其他评论 否则显示所有评论 */}
            {
                subComData.length > 3 ? showMore ?
                    commentChildren(subComData) :
                    commentChildren(subComData.slice(0, 3)) :
                    commentChildren(subComData)
            }
            {
                subComData.length > 3
                &&
                !showMore && <a className="sub-comment-showmore" onClick={() => setShowMore(true)}>加载更多>>></a>
            }
        </AntdComment>
    )
}

export default loginCon(CommentComp)