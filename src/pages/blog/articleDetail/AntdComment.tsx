import React, { useEffect, useState, createElement } from 'react';
import { Comment, Tooltip } from 'antd';
import { LikeOutlined, LikeFilled } from '@ant-design/icons';
import { IComment } from '../types';
import Reply from './reply';
import { useHistory } from 'react-router-dom';
const AntdComment = (props: any) => {
    const [action, setAction] = useState<string>();
    const [likes, setLikes] = useState(0);
    const [isReply, setIsReply] = useState<boolean>(false);

    //绑定关闭评论操作
    useEffect(() => {
        isReply && document.getElementsByTagName('body')[0].addEventListener('click', closeReply)
        console.log(isReply);

    }, [isReply])

    const like = () => {
        setLikes(1);
        setAction('liked');
    };

    //关闭评论
    const closeReply = (e: any) => {
        console.log(e.target.parentNode);
        if (e.target.nodeName === 'INPUT' || e.target.nodeName === 'BUTTON' || e.target.nodeName === 'SPAN') return;
        setIsReply(false)
        document.getElementsByTagName('body')[0].removeEventListener('click', closeReply)
    }
    //评论上的操作
    const actions = [
        <span key="comment-basic-like">
            <Tooltip title="Like">
                {createElement(action === 'liked' ? LikeFilled : LikeOutlined, {
                    onClick: like,
                })}
            </Tooltip>
            <span className="comment-action">{likes}</span>
        </span>, <span key="comment-basic-reply-to" onClick={() => setIsReply(!isReply)}>回复</span>
    ];

    let history = useHistory()

    const onGoTo = (id: number) => {
        history.push(`/authorDetail/${id}/articleList`)
    }


    return (
        <Comment
            // style={{ backgroundColor: '#fafbfc' }}
            // key={index}
            className={props.className}
            actions={actions}
            content={props.comment_content}
            avatar={props.user.user_icon}
            datetime={props.createdAt}
            author={
                props.tc_id ?
                    <p> <a onClick={() => onGoTo(props.user.id)}>{props.user.username}</a>   回复 <a onClick={() => onGoTo(props.tc_id)}> {props.tc_name} </a>  : </p> :
                    <p> <a onClick={() => onGoTo(props.user.id)}>{props.user.username}</a> </p>
            }
        >
            <Reply
                userName={props.user.username}
                isReply={isReply}
                url={props.url}
                data={props.requestData}
                refresh={props.refresh}
                closeReply={() => setIsReply(false)}
            />
            {props.children}
        </Comment>
    )
}

export default AntdComment