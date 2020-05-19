import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { List, Button, Popover, Avatar, Skeleton } from 'antd'
import { IArticleData, ICommentData, IFav } from '../types';
import ArticleList from '../authorDetail/articleList';
import UserComment from '../authorDetail/userComment';
import Favorites from '../authorDetail/favorites';
import MainArticleList from './mainArticleList';
import RequestApi from 'utils/requestApi';
import { AxiosResponse } from 'axios';
import Request from '../../../utils/request';

interface IInfiniteList {
    onLoadMore?: (page: number) => void,
    url: string,
    loading?: boolean,
    data?: object,
    element?: string,
    hasMore?: boolean,
    children?: JSX.Element,
    req?: (pageNum: number) => Promise<AxiosResponse<any> | undefined>
}

const InfiniteList = (props: IInfiniteList) => {
    const [loading, setLoading] = useState<boolean>(true)
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [pageNum, setPageNum] = useState<number>(1)
    const [dataList, setDataList] = useState<Array<any>>([])

    const chooseElement = (item: any) => {
        // console.log(item);

        switch (props.element) {
            case 'articleList':
                return <ArticleList item={item} />
            case 'commentList':
                return <UserComment item={item} />
            case 'favList':
                return <Favorites item={item} />
            case 'mainArticleList':
                return <MainArticleList {...item} />
            case 'favArticle':
                return <MainArticleList {...item.blog_article} />
            default:
                break;
        }
    };

    const getList = async () => {
        // let req = new RequestApi()
        // req.post()

        setLoading(true)

        let req = new Request();
        let res = await req.post(props.url, { ...props.data, pageNum })
        if (res?.data) {
            setDataList([...dataList, ...res?.data.rows])
            setLoading(false)
            setPageNum(pageNum + 1)
            if (pageNum + 1 > res?.data.total_pages) {
                setHasMore(false)
            }
        } else {
            setHasMore(false)
            setDataList([...dataList])
        }

    }


    const onLoadMore = () => {
        console.log(123);

        hasMore && getList()
    }
    return (
        <InfiniteScroll
            initialLoad={true}
            pageStart={0}
            loadMore={onLoadMore}
            hasMore={hasMore}
        // useWindow={false}
        >
            <List
                size="large"
                header={<div>Header</div>}
                // footer={<div>Footer</div>}
                loading={loading}
                bordered={false}
                dataSource={dataList}
                renderItem={(item) => <List.Item>
                    {chooseElement(item)}
                </List.Item>}
            />
        </InfiniteScroll>
    )
}
export default InfiniteList;