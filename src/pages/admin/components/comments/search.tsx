import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import './search.scss'

const Search = () => {
    const [form] = Form.useForm();
    const [, forceupdate] = useState();

    useEffect(() => forceupdate([]), []);

    const onFinish = (values: any) => {
        console.log('Finish:', values);

    }

    return (
        <div >
            <Form form={form} name="horizontal_search" onFinish={onFinish} className='comment_search'>

                <Form.Item
                    label="评论ID"
                    name="searchId"
                // rules
                >
                    <Input placeholder='输入评论ID' />
                </Form.Item>
                <Form.Item
                    name="searchName"
                    label="文章名"
                // rules
                >
                    <Input placeholder='输入文章名' />
                </Form.Item>
                <Form.Item
                    label="用户名"
                    name="searchUserName"
                // rules
                >
                    <Input placeholder='输入用户名' />
                </Form.Item>
                <Form.Item
                    label="用户ID"
                    name="searchUserId"
                // rules
                >
                    <Input placeholder='输入用户ID' />
                </Form.Item>

                <Form.Item shouldUpdate={true} className='comment_search'>

                    <Button type="primary" htmlType="submit" >搜 索 </Button>
                    <Button>重置</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Search;