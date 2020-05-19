
import React, { useState, useEffect, useRef } from 'react';
import { Modal, Table } from 'antd'
import TableEnterLeave from '../../../../components/TableEnterLeave.js';
// import ArticleContent from './articleContent';
import Search from './search';
import Request from '../../../../utils/request';
import { TablePaginationConfig, ColumnProps } from 'antd/lib/table';

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
    const [pagination, setPagination] = useState<TablePaginationConfig>();
    let req = new Request()
    let queryData = useRef<Object>();

    const formateData = (data: any) => {
        return {
            id: data.comment_id,
            userId: data.user.id,
            userName: data.user.username,
            title: data.blog_article.title,
        }
    }


    const queryComment = async (current: number) => {
        setLoading(true);
        await req.post('admin/queryComment', { pageNum: current, ...queryData.current }).then(res => {
            const commentData = res?.data.rows.map((item: any, index: number) => formateData(item))
            console.log(commentData);
            setDataSource([...commentData]);
            setLoading(false);
            setPagination({ ...pagination, total: res?.data.count });
        })
    }


    useEffect(() => {
        queryComment(1)
    }, [])
    const deleteUser = (id: string) => {
        let newData = dataSource.filter(item => item.id !== id)
        setDataSource([...newData])
    }


    const openComment = (id: string, e: any) => {
        e.preventDefault();
        console.log(id);
        setVisible(true)
    }

    const columns: ColumnProps<IDataSource>[] = [
        {
            title: '评论id',
            dataIndex: 'commentId',
            align: 'center',
            key: 'commentId',

            render: (text: string, record: IDataSource) => (
                <a
                    onClick={(e) => { openComment(record.id, e); }}
                >
                    {record.id}
                </a>
            ),
        },
        { title: '文章名', dataIndex: 'title', key: 'type', align: 'center' },
        { title: '用户ID', dataIndex: 'userId', key: 'userId', align: 'center' },
        { title: '用户名', dataIndex: 'userName', key: 'userName', align: 'center' },
        { title: '操作', dataIndex: 'options', key: 'options', render: (text, record) => <a key={record.id} onClick={() => deleteUser(record.id)}> 删除 </a> }

    ]



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

    const changeQueryData = (value: any) => {
        queryData.current = value
        queryComment(1)
    }
    const handlePageChange = (page: number) => {
        console.log(page);
        setPagination({ ...pagination, current: page });
        queryComment(page);
    }


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
            {/* <TableEnterLeave
                bordered={true}
                dataSource={dataSource}
                loading={loading}
                columns={columns}
                tableAction={tableAction}
                deleteUser={deleteUser}
            /> */}
            <Table
                dataSource={dataSource}
                loading={loading}
                columns={columns}
                rowKey='id'
                pagination={{ ...pagination, onChange: (page: number) => handlePageChange(page) }}

            />
        </div>
    );
}

export default CommentController;