import React, { useState, useEffect } from 'react';
import TableEnterLeave from '../../../../components/TableEnterLeave.js';
import Search from './search';

interface IDataSource {
    id: string,
    name: string,
    disc: string,
}
const UserController = () => {
    const [dataSource, setDataSource] = useState<Array<IDataSource>>([]);
    const [loading, setLoading] = useState<Boolean>(true);


    useEffect(() => {
        let data = [
            {
                id: '1',
                name: 'John Brown',
                disc: 'New York No. 1 Lake Park',
            },
            {
                id: '2',
                name: 'Jim Green',
                disc: 'London No. 1 Lake Park',

            },
            {
                id: '3',
                name: 'Joe Black',
                disc: 'Sidney No. 1 Lake Park',
            },
            {
                id: '4',
                name: 'John Brown',
                disc: 'New York No. 1 Lake Park',
            },
            {
                id: '5',
                name: 'Jim Green',
                disc: 'London No. 1 Lake Park',

            },
            {
                id: '6',
                name: 'Joe Black',
                disc: 'Sidney No. 1 Lake Park',
            },
            {
                id: '7',
                name: 'John Brown',
                disc: 'New York No. 1 Lake Park',
            },
            {
                id: '8',
                name: 'Jim Green',
                disc: 'London No. 1 Lake Park',
            },
            {
                id: '9',
                name: 'Joe Black',
                disc: 'Sidney No. 1 Lake Park',
            },
            {
                id: '10',
                name: 'John Brown',
                disc: 'New York No. 1 Lake Park',
            },
            {
                id: '11',
                name: 'Jim Green',
                disc: 'London No. 1 Lake Park',

            },
            {
                id: '12',
                name: 'Joe Black',
                disc: 'Sidney No. 1 Lake Park',
            },
        ]
        setDataSource(
            data
        )
        setLoading(false)
    }, [])
    const deleteUser = (id: string) => {
        // e.preventDefault();
        let newData = dataSource.filter(item => item.id !== id)

        setDataSource([...newData])
    }

    const columns = [
        { title: 'id', dataIndex: 'id', key: 'id', align: 'center' },
        { title: 'name', dataIndex: 'name', key: 'name', align: 'center' },
        { title: 'disc', dataIndex: 'disc', key: 'disc', align: 'center' },
    ]
    const tableAction = {
        delete: 'delete'
    }


    return (
        <div>
            {/* <UserTable dataSource={dataSource} loading={loading} deleteUser={deleteUser} /> */}
            <Search />
            <TableEnterLeave
                dataSource={dataSource}
                loading={loading}
                columns={columns}
                tableAction={tableAction}
                deleteUser={deleteUser}
            />
        </div>
    );
}

export default UserController;