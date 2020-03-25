import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { List, Button, Popover, Avatar, Skeleton } from 'antd'
import { IArticleData, ICommentData, IFav } from '../types';
import ArticleList from '../authorDetail/articleList';
import UserComment from '../authorDetail/userComment';
import Favorites from '../authorDetail/favorites';
import MainArticleList from './mainArticleList';

interface IInfiniteList {
    onLoadMore: (page: number) => void,
    loading: boolean,
    data: any,
    element: string,
    hasMore?: boolean,
    children?: JSX.Element,
}

const InfiniteList = (props: IInfiniteList) => {

    const chooseElement = (item: any) => {
        switch (props.element) {
            case 'articleList':
                return <ArticleList item={item} />
            case 'commentList':
                return <UserComment item={item} />
            case 'favList':
                return <Favorites item={item} />
            case 'mainArticleList': return <MainArticleList item={item} />
            default:
                break;
        }
    }
    return (
        <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={props.onLoadMore}
            hasMore={props.hasMore}
        // useWindow={false}
        >
            <List
                size="large"
                header={<div>Header</div>}
                // footer={<div>Footer</div>}
                loading={props.loading}
                bordered={false}
                dataSource={props.data}
                renderItem={(item) => <List.Item>
                    {chooseElement(item)}
                </List.Item>}
            ></List>
        </InfiniteScroll>
    )
}
export default InfiniteList;