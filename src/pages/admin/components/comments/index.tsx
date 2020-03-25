
import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Button } from 'antd'
import TableEnterLeave from '../../../../components/TableEnterLeave.js';
// import ArticleContent from './articleContent';
import Search from './search';

interface IDataSource {
    id: string,
    articleName: string,
    userId: string,
    userName: string
}
const CommentController = () => {
    const [dataSource, setDataSource] = useState<Array<IDataSource>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [visible, setVisible] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
    useEffect(() => {
        let data = [
            {
                id: '1',
                articleName: 'John Brown',
                userId: '1',
                userName: 'New York No. 1 Lake Park',
            },
            {
                id: '2',
                articleName: 'Jim Green',
                userId: '1',
                userName: 'London No. 1 Lake Park',

            },
            {
                id: '3',
                userId: '1',
                articleName: 'Joe Black',
                userName: 'Sidney No. 1 Lake Park',
            },
            {
                id: '4',
                userId: '1',
                articleName: 'John Brown',
                userName: 'New York No. 1 Lake Park',
            },
            {
                id: '5',
                userId: '1',
                articleName: 'Jim Green',
                userName: 'London No. 1 Lake Park',

            },
            {
                id: '6',
                userId: '1',
                articleName: 'Joe Black',
                userName: 'Sidney No. 1 Lake Park',
            },
            {
                id: '7',
                userId: '1',
                articleName: 'John Brown',
                userName: 'New York No. 1 Lake Park',
            },
            {
                id: '8',
                userId: '1',
                articleName: 'Jim Green',
                userName: 'London No. 1 Lake Park',
            },
            {
                id: '9',
                userId: '1',
                articleName: 'Joe Black',
                userName: 'Sidney No. 1 Lake Park',
            },
            {
                id: '10',
                userId: '1',
                articleName: 'John Brown',
                userName: 'New York No. 1 Lake Park',
            },
            {
                id: '11',
                userId: '1',
                articleName: 'Jim Green',
                userName: 'London No. 1 Lake Park',

            },
            {
                id: '12',
                userId: '1',
                articleName: 'Joe Black',
                userName: 'Sidney No. 1 Lake Park',
            },
        ]
        setDataSource(
            data
        )
        setLoading(false)
    }, [])
    const deleteUser = (id: string) => {
        let newData = dataSource.filter(item => item.id !== id)
        setDataSource([...newData])
    }
    // const deleteUser = useCallback(() => (id: string) => {
    //     let newData = dataSource.filter(item => item.id !== id)
    //     setDataSource([...newData])
    // }, [])

    const openComment = (id: string, e: any) => {
        e.preventDefault();
        console.log(id);
        setVisible(true)
    }

    const columns = [
        {
            title: '评论id',
            dataIndex: 'id',
            align: 'center',
            key: 'id',

            render: (text: string, record: IDataSource) => (
                <a
                    onClick={(e) => { openComment(record.id, e); }}
                >
                    {record.id}
                </a>
            ),
        },
        { title: '文章名', dataIndex: 'articleName', key: 'type', align: 'center' },
        { title: '用户ID', dataIndex: 'userId', key: 'userId', align: 'center' },
        { title: '用户名', dataIndex: 'userName', key: 'userName', align: 'center' },

    ]


    const tableAction = {
        delete: 'delete'
    }
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };
    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setConfirmLoading(false);
            setVisible(false);
        }, 2000);
    };

    return (
        <div>

            <Search />
            <Modal
                title="Title"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>Test</p>
            </Modal>
            {/* 下面的原本想做表单的动画效果，失败了 */}
            <TableEnterLeave
                bordered={true}
                dataSource={dataSource}
                loading={loading}
                columns={columns}
                tableAction={tableAction}
                deleteUser={deleteUser}
            />
        </div>
    );
}

export default CommentController;