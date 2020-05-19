import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select } from 'antd';
import './search.scss'
const { Option } = Select;

const Search = (props: any) => {
    const [form] = Form.useForm();


    const onFinish = (values: any) => {
        console.log('Finish:', values);
        props.handleSearch(values)

    }


    return (
        <div >
            <Form form={form} name="horizontal_search" layout='inline' onFinish={onFinish} className='user_search'>

                <Form.Item
                    name="userId"
                    label="用户ID"
                // rules
                >
                    <Input placeholder='输入用户ID' />
                </Form.Item>
                <Form.Item
                    name="userName"
                    label="用户名"
                // rules
                >
                    <Input placeholder='输入用户名' />
                </Form.Item>


                <Form.Item shouldUpdate={true} className='search_btns'>

                    <Button type="primary" htmlType="submit" >搜 索 </Button>
                    <Button onClick={() => form.resetFields()}>重置</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Search;