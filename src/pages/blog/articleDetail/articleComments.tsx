
import React, { useEffect, useState, useRef } from 'react';
import { Comment, Avatar } from 'antd';
import moment from 'moment';
import CommentList from './commentList';
import CommentEditor from './commentEditor';
import { IUserData, IComment, ILoginInfo } from '../types';
import { useParams } from 'react-router-dom';
import Request from '../../../utils/request';
import loginCon from 'container/loginCon';
interface IAC {
    children?: any,
    userInfo: ILoginInfo
}

const ArticleComments = (props: IAC) => {
    const [submitting, setSubmittion] = useState(false);
    const [value, setValue] = useState('')
    const { userInfo } = props
    // const [userInfo, setUserInfo] = useState<ILoginInfo>()
    let { id } = useParams()


    const clEL = useRef(CommentList);
    const handleSubmit = async () => {
        if (!value) {
            return;
        };
        setSubmittion(true);
        console.log(clEL);

        let req = new Request()
        await req.post('user/addComment', { userId: userInfo?.userId, commentContent: value, articleId: Number(id) }).then((res) => {
            console.log(res);
            clEL.current.refresh()
            setSubmittion(false)
            setValue('')
            // setComments(res?.data.data.rows)

        })
    }


    const handleChange = (e: any) => {
        setValue(e.target.value);
    }

    return (
        <div>
            <p>评论</p>
            {
                props.userInfo.userId !== 0 ? <Comment
                    avatar={
                        <Avatar
                            src={userInfo?.userIcon}
                            alt={userInfo?.username}
                        />
                    }
                    content={
                        <CommentEditor
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            submitting={submitting}
                            value={value}
                        />
                    }
                />
                    :
                    <p>请登陆后评论</p>
            }

            <CommentList ref={clEL} />
        </div>
    );
}


export default loginCon(ArticleComments);