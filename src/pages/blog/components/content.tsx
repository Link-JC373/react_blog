import React from 'react';
import { Layout, List, Popover, Button } from 'antd'

import './static/content.scss'
import { IArticleData } from '../types';
import InfiniteList from './infiniteList';
const { Content } = Layout
interface IBlogContent {
    data: Array<IArticleData>,
    loading: boolean,
    hasMore: boolean,
    onLoadMore: (page: number) => void,
}

const BlogContent = (props: IBlogContent) => {

    return (

        <div className="content">
            <Content>
                {/* <InfiniteList
                    hasMore={props.hasMore}
                    data={props.data}
                    loading={props.loading}
                    onLoadMore={props.onLoadMore}
                    element="mainArticleList"
                /> */}
            </Content>

        </div>
    );
}

export default BlogContent;