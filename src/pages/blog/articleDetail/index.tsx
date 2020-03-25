import React, { useState, useEffect } from 'react';
import { Layout, BackTop, Menu, Affix } from 'antd';
import { Parallax } from 'rc-scroll-anim';
import BlogHeader from '../components/header';
import ArticleContent from './articleContent';
import ArticleSider from './articleSider';


import '../index.scss'

const ArticleDetail = () => {
    const [content, setContent] = useState('')

    useEffect(() => {
        setContent(
            '# P1:课程介绍和环境搭建\n' +

            '## P2:课程介绍和环境搭建\n' +
            '### P3:课程介绍和环境搭建\n' +
            '#### P4:课程介绍和环境搭建\n' +
            '##### P5:课程介绍和环境搭建\n' +

            '[ **M** ] arkdown + E [ **ditor** ] = **Mditor**  \n' +
            '> Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已... \n\n' +
            '**这是加粗的文字**\n\n' +
            '*这是倾斜的文字*`\n\n' +
            '***这是斜体加粗的文字***\n\n' +
            '~~这是加删除线的文字~~ \n\n' +
            '\`console.log(111)\` \n\n' +
            '# p02:来个Hello World 初始Vue3.0\n' +
            '> aaaaaaaaa\n' +
            '>> bbbbbbbbb\n' +
            '>>> cccccccccc\n' +
            '***\n\n\n' +
            '# p03:Vue3.0基础知识讲解\n' +
            '> aaaaaaaaa\n' +
            '>> bbbbbbbbb\n' +
            '>>> cccccccccc\n\n' +
            '## p04:Vue3.0基础知识讲解\n' +
            '> aaaaaaaaa\n' +
            '>> bbbbbbbbb\n' +
            '>>> cccccccccc\n\n' +
            '# p05:Vue3.0基础知识讲解\n' +
            '> aaaaaaaaa\n' +
            '>> bbbbbbbbb\n' +
            '>>> cccccccccc\n\n' +
            '# p06:Vue3.0基础知识讲解\n' +
            '> aaaaaaaaa\n' +
            '>> bbbbbbbbb\n' +
            '>>> cccccccccc\n\n' +
            '# p07:Vue3.0基础知识讲解\n' +
            '> aaaaaaaaa\n' +
            '>> bbbbbbbbb\n' +
            '>>> cccccccccc\n\n' +
            '``` var a=11; ```')
    }, [])


    return (
        <div>
            <Layout>
                <Affix offsetTop={0}>
                    <div>
                        <BlogHeader />

                    </div>
                </Affix>
                <Layout className="mainLayout">
                    <ArticleContent content={content} />
                    <ArticleSider content={content} />
                </Layout>

            </Layout>
            <BackTop />
        </div>
    );
}
export default ArticleDetail;