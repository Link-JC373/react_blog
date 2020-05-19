import React from 'react'
import { Layout, Affix, BackTop } from 'antd';
import BlogHeader from '../components/header';
import AuthorContent from './AuthorContent';
import AuthorSider from './authorSider';
const AuthorDetail = () => {
    return (
        <div>
            <Layout>
                <Affix offsetTop={0}>
                    <div>
                        {/* <HeaderCon /> */}
                        <BlogHeader />
                    </div>
                </Affix>
                <Layout className="mainLayout">
                    <AuthorContent />
                    <AuthorSider />
                </Layout>

            </Layout>
            <BackTop />
        </div>
    );
}

export default AuthorDetail