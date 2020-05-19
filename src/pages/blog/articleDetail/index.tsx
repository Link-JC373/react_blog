import React, { useState, useEffect } from 'react';
import { Layout, BackTop, Button, Affix, Badge, Popover, message } from 'antd';
import { Parallax } from 'rc-scroll-anim';
import {
    LikeTwoTone, StarFilled, LikeFilled, StarTwoTone, CheckCircleTwoTone
} from '@ant-design/icons';
import ArticleContent from './articleContent';
import ArticleSider from './articleSider';


import '../index.scss'

import { useParams } from 'react-router-dom';
import Request from '../../../utils/request';
import { IArticleData, ILogin } from '../types';
import BlogHeader from '../components/header';
import loginCon from 'container/loginCon';
// import loginCon from '../components/header';

const ArticleDetail = (props: ILogin) => {
    const [adData, setAdData] = useState<IArticleData>({
        id: 0,
        user: {
            username: '',
            user_icon: '',
            disc: '',
            id: 0,
        },
        title: '',
        blog_type: {
            typename: ''
        }

    });

    // const [userInfo, setUserInfo] = useState<any>();
    const { userInfo } = props
    const [content, setContent] = useState<Array<JSX.Element>>([])
    const [visible, setVisible] = useState<boolean>(false)
    let { id } = useParams()
    useEffect(() => {
        let info = localStorage.getItem('userInfo')
        console.log(props);

        if (info) {
            props.onLogin && props.onLogin(JSON.parse(info))
            // setUserInfo(JSON.parse(info))
        }

    }, [])

    useEffect(() => {
        console.log(id);
        initArticle()
    }, [])

    let req = new Request()

    const initArticle = async () => {
        let info = JSON.parse(`${localStorage.getItem('userInfo')}`)

        await req.post('default/getArticleById', { articleId: Number(id), userId: info?.userId }).then((res) => {
            console.log(res?.data);
            // res?.data.article_content = '# header' + res?.data.article_content,
            setAdData(res?.data);
        })
    }

    const handleLikeClick = async () => {
        // if (!props.isLogin) {
        //     return;
        // }
        console.log(userInfo);

        if (Boolean(adData.isLike)) {
            await req.post('user/reduceArticlePoint', { articleId: Number(id), userId: userInfo?.userId }).then((res) => {

                setAdData({ ...adData, isLike: !adData.isLike, likeCount: Number(adData?.likeCount) - 1 })
            })
        } else {

            await req.post('user/addArticlePoint', { articleId: Number(id), userId: userInfo?.userId }).then((res) => {

                setAdData({ ...adData, isLike: !adData.isLike, likeCount: Number(adData?.likeCount) + 1 })

            })
        }
    }

    // let content: Array<JSX.Element> = []

    const handleFavClick = async (favId: number, isFav: Boolean) => {
        if (isFav) {
            await req.post('user/cancelFav', { articleId: Number(id), userId: userInfo?.userId, favId }).then((res) => {

                message.success('取消收藏成功')
                setAdData({ ...adData, isFav: !isFav })
                setVisible(false)
            })
        } else {
            await req.post('user/favArticle', { articleId: Number(id), userId: userInfo?.userId, favId }).then((res) => {

                message.success('收藏成功')
                setAdData({ ...adData, isFav: !isFav })
                setVisible(false)

            })
        }

    }

    const showFav = async () => {
        setVisible(true)

        await req.post('user/getFavorites', { articleId: Number(id), userId: userInfo?.userId }).then((res) => {
            console.log(res);
            let arr: Array<JSX.Element> = []
            // let div: JSX.Element = (<div></div>)
            // let favContent = document.getElementById('fav-content')

            res?.data?.map((item: any, index: any) => {
                arr.push(<div className="fav-item" onClick={() => handleFavClick(item.fav_id, item.isFav)} key={index}>
                    <p>{item.fav_name}</p>
                    {
                        item.isFav && <CheckCircleTwoTone twoToneColor="yellow" />
                    }
                </div>)
                setContent([...content, <div key={index}>{item.fav_name}</div>])
                // let div = document.createElement('div')
                // let a = document.createElement('a')
                // a.click = () => handleFavClick(item.fav_id, item.isFav)
                // let p = document.createElement('p')
                // p.innerHTML = `${item.fav_name}`
                // a.appendChild(p)
                // item.isFav && a.appendChild(<CheckCircleTwoTone twoToneColor="yellow" />)
                // favContent?.appendChild(div)

            })
            setContent(arr)

        })
    }





    return (
        <div>

            <Layout>

                <Affix offsetTop={0}>
                    <div>
                        <BlogHeader />
                    </div>
                </Affix>

                {
                    adData && <Layout className="mainLayout">
                        <Affix offsetTop={220} className="article-action">
                            <Badge count={adData?.likeCount} showZero className="site-badge-count-4">
                                <Button shape="circle" size="large" onClick={handleLikeClick} icon={adData.isLike ? <LikeTwoTone /> : <LikeFilled />} />

                            </Badge>
                        </Affix>
                        <Affix offsetTop={300} className="article-action">
                            <Popover className="fav-action" placement="right" title='收藏文章' content={content} trigger="click" visible={visible}>
                                <Button shape="circle" onClick={showFav} size="large" icon={adData?.isFav ? <StarTwoTone twoToneColor="yellow" /> : <StarFilled />} />
                            </Popover>
                        </Affix>
                        <ArticleContent data={adData} />
                        <ArticleSider {...adData} />
                    </Layout>
                }


            </Layout>
            <BackTop />
        </div>
    );
}
export default loginCon(ArticleDetail);