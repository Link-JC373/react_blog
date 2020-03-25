import React from 'react';
import Loadable from 'react-loadable';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
//通用的过场组件
const loadingComponent = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    return (
        <Spin indicator={antIcon} />
        // <div>div</div>
    )
}

//过场组件默认采用通用的，若传入了loading，则采用传入的过场组件
export default (loader: any, loading = loadingComponent) => {
    return Loadable({
        loader,
        loading
    });
}