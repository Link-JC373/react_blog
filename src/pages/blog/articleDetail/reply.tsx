import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import loginCon from 'container/loginCon';
import Request from '../../../utils/request';

const { Search } = Input
const Reply = (props: any) => {
    const [value, setValue] = useState<string>('');

    const onChange = (e: any) => {
        setValue(e.target.value)
    }

    let req = new Request()
    const addComment = async () => {
        await req.post(props.url, { ...props.data, commentContent: value }).then(async (res) => {
            console.log(res);
            setValue('')
            props.closeReply()
            await props.refresh()
        })
    }

    return (
        <>
            {
                props.isReply && <Search
                    className="reply-input"
                    placeholder={`回复${props.userName}:`}
                    enterButton="评论"
                    value={value}
                    onChange={onChange}
                    onSearch={addComment}
                />
            }
        </>
    )
}

Reply.getInstance = (function () {
    let instance: any = null
    return function () {
        console.log(!instance);

        if (!instance) {
            console.log('init');

            instance = loginCon(Reply)
        }
        console.log(instance);

        return instance
    }
})()

export default Reply.getInstance()