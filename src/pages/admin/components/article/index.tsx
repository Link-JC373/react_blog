
import React, { useState, useEffect, useRef } from 'react';
import { Modal, Table } from 'antd'
// import TableEnterLeave from '../../../../components/TableEnterLeave.js';
// import ArticleContent from './articleContent';
import Search from './search';
import Request from '../../../../utils/request';
import { TablePaginationConfig, ColumnProps } from 'antd/lib/table';
import { useHistory } from 'react-router-dom';

interface IDataSource {
    id: string,
    title: string,
    typename: string,
    username: string,
    userId: number,

}
const ArticleController = () => {
    const [dataSource, setDataSource] = useState<Array<IDataSource>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [pagination, setPagination] = useState<TablePaginationConfig>({});
    const queryData = useRef<Object>()

    let req = new Request();

    const formateData = (data: any) => {
        return {
            id: data.id,
            userId: data.user.id,
            userName: data.user.username,
            title: data.title,
            typeName: data.blog_type.typename,
        }
    }

    const queryArticle = async (current: number) => {
        setLoading(true);
        console.log(pagination);

        await req.post('default/getArticleList', { pageNum: current, ...queryData.current }).then(res => {
            const articleData = res?.data.rows.map((item: any, index: number) => formateData(item))
            console.log(articleData);

            setDataSource([...articleData]);
            setLoading(false);
            setPagination({ ...pagination, total: res?.data.count });
        })
    }
    useEffect(() => {
        queryArticle(1)
    }, [])




    const deleteArticle = async (id: string) => {
        setLoading(true)
        await req.post('admin/deleteArticle', { userId: Number(id) }).then(res => {
            setLoading(false)
            let newData = dataSource.filter(item => item.id !== id)
            setDataSource([...newData])
        })
    }

    const openModal = (id: string) => {
        // setVisible(true)
        Modal.confirm({
            title: '确认删除？',
            onOk: () => deleteArticle(id)
        })

    }

    let history = useHistory()

    const openArticle = (id: string, e: any) => {
        history.push(`/articleDetail/${id}`)

    }


    const handlePageChange = (page: number) => {
        console.log(page);
        setPagination({ ...pagination, current: page });
        queryArticle(page);
    }


    const columns: ColumnProps<IDataSource>[] = [
        { title: '文章ID', dataIndex: 'id', key: 'id', align: 'center' },
        { title: '文章类型', dataIndex: 'typeName', key: 'type', align: 'center' },
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
                    {record.title}
                </a>
            ),
        },
        {
            title: '操作',
            dataIndex: '',
            align: 'center',
            key: 'x',

            render: (text: string, record: IDataSource) => (
                <a
                    onClick={(e) => { openModal(record.id); }}
                >
                    删除
                </a>
            ),
        },
    ]
    const changeQueryData = (value: any) => {
        queryData.current = value
        queryArticle(1)
    }

    return (
        <div>
            <Search handleSearch={changeQueryData} />
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

export default ArticleController;