import React, { useState, useEffect } from 'react';
import BlogHeader from '../components/header';
import { Layout } from 'antd';
import './index.scss'
import Request from '../../../utils/request';
import { useParams } from 'react-router';
import InfiniteList from '../components/infiniteList';

const { Content } = Layout
const Favorites = () => {
    const [favName, setFavName] = useState<string>('');
    useEffect(() => {

    }, [])

    const { id } = useParams()



    return (
        <>
            <Layout>
                <BlogHeader />
                <Content className="fav-content">
                    <div className="fav-banner">{}</div>
                    <div className="fav-list">
                        <InfiniteList url='default/getFavArticle' data={{ favId: Number(id) }} element="favArticle" />
                    </div>
                </Content>
            </Layout>

        </>
    )
}

export default Favorites