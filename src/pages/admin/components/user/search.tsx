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


    return (
        <div >
            <Form form={form} name="horizontal_search" layout='inline' onFinish={onFinish} className='user_search'>

                <Form.Item
                    name="searchId"
                    label="用户ID"
                // rules
                >
                    <Input placeholder='输入用户ID' />
                </Form.Item>
                <Form.Item
                    name="searchName"
                    label="用户名"
                // rules
                >
                    <Input placeholder='输入用户名' />
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