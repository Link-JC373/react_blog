import React from 'react';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';

const CommentList = (props: any) => (
    <List
        dataSource={props.comments}
        header={`${props.comments.length} ${props.comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={(props: any) => <Comment {...props} />}
    />
);

export default CommentList