import React, { useState, useEffect, useRef } from 'react';
import TableEnterLeave from '../../../../components/TableEnterLeave.js';
import Search from './search';
import Request from '../../../../utils/request';
import { Pagination, Table, Button } from 'antd';
import { ColumnProps, TablePaginationConfig } from 'antd/lib/table';
import { PaginationConfig } from 'antd/lib/pagination';

interface IDataSource {
    id: string,
    name: string,
    disc: string,
}

// interface IQueryUser{

// }


const UserController = () => {
    const [dataSource, setDataSource] = useState<Array<IDataSource>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    // const [queryData, setQueryData] = useState<Object>({ userId: '', userName: '' })
    // const [pageNum, setPageNum] = useState<number>(1);
    const [pagination, setPagination] = useState<TablePaginationConfig>({ pageSize: 5, total: 0 })
    const queryData = useRef<Object>()
    let req = new Request()

    const queryUser = async (current: number) => {
        setLoading(true);
        console.log(pagination);

        await req.post('admin/queryUser', { pageNum: current, ...queryData.current }).then(res => {
            setDataSource([...res?.data.rows]);
            setLoading(false);
            setPagination({ ...pagination, total: res?.data.count });
        })
    }

    const handlePageChange = (page: number) => {
        console.log(page);
        setPagination({ ...pagination, current: page });
        queryUser(page);
    }


    useEffect(() => {
        setPagination({ ...pagination, current: 1 })
        queryUser(1)
    }, [])
    const deleteUser = async (id: string) => {
        setLoading(true)
        await req.post('admin/deleteUser', { userId: Number(id) }).then(res => {
            setLoading(false)
            let newData = dataSource.filter(item => item.id !== id)
            setDataSource([...newData])
        })
    }

    const changeQueryData = (value: any) => {
        queryData.current = value
        queryUser(1)
    }



    const columns: ColumnProps<IDataSource>[] = [
        { title: '用户id', dataIndex: 'id', key: 'id', align: 'center' },
        { title: '用户名', dataIndex: 'username', key: 'username', align: 'center' },
        { title: '用户简介', dataIndex: 'disc', key: 'disc', align: 'center' },
        { title: '操作', dataIndex: 'options', key: 'options', render: (text, record) => <a key={record.id} onClick={() => deleteUser(record.id)}> 删除 </a> }
    ]



    return (
        <div>
            {/* <UserTable dataSource={dataSource} loading={loading} deleteUser={deleteUser} /> */}
            <Search handleSearch={changeQueryData} />
            {/* <Button onClick={() => setPagination({ ...pagination, current: pagination.current + 1 })}>click</Button> */}
            <Table
                dataSource={dataSource}
                loading={loading}
                columns={columns}
                rowKey='id'
                pagination={{ ...pagination, onChange: (page: number) => handlePageChange(page) }}

            />
            {/* <Pagination defaultCurrent={1} total={total} pageSize={5} onChange={handlePageChange} /> */}
        </div>
    );
}

export default UserController;