import React, { useEffect } from 'react'

import { List, Button, Popover, Avatar, Skeleton } from 'antd'
import { LikeOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import { IFav } from '../types';
import AuthorCard from '../components/authorCard';
import './userInfoList.scss'
interface IFavorites {

    item: IFav
}
const Favorites = (props: IFavorites) => {
    const { item } = props
    return (
        <Link to={`/favorites/${item?.fav_id}`} className="link_to">
            <div className="al">
                <div className="fav-row">

                    <span> {item?.fav_name} </span> · <span> {item?.articles_favorites.length} 篇文章</span>
                </div>
            </div>
        </Link>
    );
}

export default Favorites;