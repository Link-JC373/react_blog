
import React, { useState, useEffect } from 'react';
import { Modal } from 'antd'
import TableEnterLeave from '../../../../components/TableEnterLeave.js';
// import ArticleContent from './articleContent';
import Search from './search';

interface IDataSource {
    id: string,
    articleName: string,
    type: string,
    userId: string,
    userName: string
}
const ArticleController = () => {
    const [dataSource, setDataSource] = useState<Array<IDataSource>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [visible, setVisible] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
    useEffect(() => {
        let data = [
            {
                id: '1',
                type: 'www',
                articleName: 'John Brown',
                userId: '1',
                userName: 'New York No. 1 Lake Park',
            },
            {
                id: '2',
                articleName: 'Jim Green',
                type: 'www',
                userId: '1',

                userName: 'London No. 1 Lake Park',

            },
            {
                id: '3',
                userId: '1',
                type: 'www',
                articleName: 'Joe Black',
                userName: 'Sidney No. 1 Lake Park',
            },
            {
                id: '4',
                userId: '1',
                type: 'www',
                articleName: 'John Brown',
                userName: 'New York No. 1 Lake Park',
            },
            {
                id: '5',
                userId: '1',
                type: 'www',
                articleName: 'Jim Green',
                userName: 'London No. 1 Lake Park',

            },
            {
                id: '6',
                userId: '1',
                type: 'www',
                articleName: 'Joe Black',
                userName: 'Sidney No. 1 Lake Park',
            },
            {
                id: '7',
                userId: '1',
                type: 'www',
                articleName: 'John Brown',
                userName: 'New York No. 1 Lake Park',
            },
            {
                id: '8',
                userId: '1',
                type: 'www',
                articleName: 'Jim Green',
                userName: 'London No. 1 Lake Park',
            },
            {
                id: '9',
                userId: '1',
                type: 'www',
                articleName: 'Joe Black',
                userName: 'Sidney No. 1 Lake Park',
            },
            {
                id: '10',
                userId: '1',
                type: 'www',
                articleName: 'John Brown',
                userName: 'New York No. 1 Lake Park',
            },
            {
                id: '11',
                userId: '1',
                type: 'www',
                articleName: 'Jim Green',
                userName: 'London No. 1 Lake Park',

            },
            {
                id: '12',
                userId: '1',
                type: 'www',
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

    const openArticle = (id: string, e: any) => {
        e.preventDefault();
        console.log(id);
        setVisible(true)
    }

    const columns = [
        { title: '文章ID', dataIndex: 'id', key: 'id', align: 'center' },
        { title: '文章类型', dataIndex: 'type', key: 'type', align: 'center' },
        { title: '作者ID', dataIndex: 'userId', key: 'userId', align: 'center' },
        { title: '作者名', dataIndex: 'userName', key: 'userName', align: 'center' },
        {
            title: '文章名',
            dataIndex: '',
            align: 'center',
            key: 'x',

            render: (text: string, record: IDataSource) => (
                <a
                    onClick={(e) => { openArticle(record.id, e); }}
                >
                    {record.articleName}
                </a>
            ),
        }
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

export default ArticleController;