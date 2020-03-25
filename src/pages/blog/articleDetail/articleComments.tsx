
import React, { useEffect, useState } from 'react';
import { Comment, Avatar } from 'antd';
import moment from 'moment';
import CommentList from './commentList';
import CommentEditor from './commentEditor';
interface IAC {
    children?: any
}

interface IComments {
    author: string,
    avatar: string,
    content: JSX.Element,
    datetime: string,

}

const ArticleComments = (props: IAC) => {
    const [comments, setComments] = useState<Array<IComments>>([]);
    const [submitting, setSubmittion] = useState(false);
    const [value, setValue] = useState('')

    const handleSubmit = () => {
        if (!value) {
            return;
        };
        setSubmittion(true);

        setTimeout(() => {
            setSubmittion(false);
            setValue('');
            setComments([
                {
                    author: 'Han Solo',
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    content: <p>{value}</p>,
                    datetime: moment().fromNow(),
                },
                ...comments
            ]);
        }, 1000)
    }

    const handleChange = (e: any) => {
        setValue(e.target.value);
    }

    return (
        <div>
            <p>评论</p>
            <Comment
                avatar={
                    <Avatar
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        alt="Han Solo"
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
            {comments.length > 0 && <CommentList comments={comments} />}
        </div>
    );
}


export default ArticleComments;