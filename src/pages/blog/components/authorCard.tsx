import React from 'react';
import { Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import './static/content.scss'
import { IUserData } from '../types';
import { Link } from 'react-router-dom';

interface IAuthorCard {
    data: IUserData;
}

const AuthorCard = (props: IAuthorCard) => {
    return (
        <div className="author-box">
            <div>
                <Link to={`/authorDetail/1`} className="author_card">
                    <Avatar size={64} src={props.data.user_icon} />
                    <div className="author_info">

                        <div className="user_name">{props.data.username}</div>
                        <div className="user_disc">{props.data.disc}</div>
                    </div>
                </Link>

                <div className="meta-row">

                    <div>
                        <div className="count">123</div>
                        <div className="title">关注</div>
                    </div>
                    <div>
                        <div className="count">123</div>
                        <div className="title">关注者</div>
                    </div>
                    <div className="follow_btn">
                        <Button size='large'>关注</Button>
                    </div>

                </div>
            </div>
        </div>


    );
}
export default AuthorCard