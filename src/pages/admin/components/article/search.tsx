import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select } from 'antd';
import './search.scss'
const { Option } = Select;

const Search = () => {
    const [form] = Form.useForm();
    const [, forceupdate] = useState();

    useEffect(() => forceupdate([]), []);

    const onFinish = (values: any) => {
        console.log('Finish:', values);

    }

    const onTypeChange = (newType: any) => {
        console.log(newType);

    }

    return (
        <div >
            <Form form={form} name="horizontal_search" onFinish={onFinish} className='article_search'>

                <Form.Item
                    label="文章ID"
                    name="searchId"
                // rules
                >
                    <Input placeholder='输入文章ID' />
                </Form.Item>
                <Form.Item
                    name="searchName"
                    label="文章名"
                // rules
                >
                    <Input placeholder='输入文章名' />
                </Form.Item>
                <Form.Item
                    label="作者名"
                    name="searchUserName"
                // rules
                >
                    <Input placeholder='输入作者名' />
                </Form.Item>
                <Form.Item
                    label="作者ID"
                    name="searchUserId"
                // rules
                >
                    <Input placeholder='输入作者ID' />
                </Form.Item>
                <Form.Item
                    name="searchType"
                    label="文章类型"
                // rules
                >
                    <Select style={{ width: 150 }} defaultValue="0" onChange={onTypeChange}>
                        <Option value='0'>全部类型</Option>
                        <Option value="1">游戏开发</Option>
                        <Option value="2">游戏运维</Option>
                        <Option value="3">游戏测评</Option>
                    </Select>
                </Form.Item>

                <Form.Item shouldUpdate={true} className='search_btns'>

                    <Button type="primary" htmlType="submit" >搜 索 </Button>
                    <Button>重置</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Search;