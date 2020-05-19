import React from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';
import { Redirect } from 'react-router-dom'
// import Blog from '../pages/blog';
import Loadable from './pageLodable'
// import Admin from '../pages/admin';
// import AdminLogin from '../pages/admin/login'
// import Loadable from 'react-loadable';
// import UserController from '../pages/admin/components/user/index';


const Blog = Loadable(() => import('../pages/blog'))
const ArticleDetail = Loadable(() => import('../pages/blog/articleDetail'))
const AuthorDetail = Loadable(() => import('../pages/blog/authorDetail'))
const AddArticle = Loadable(() => import('../pages/blog/writeArticle'))
const Favorites = Loadable(() => import('../pages/blog/favorites'))

const SystemData = Loadable(() => import('../pages/admin/components/systemData'))
const UserController = Loadable(() => import('../pages/admin/components/user/index'))
const ArticleController = Loadable(() => import('../pages/admin/components/article'))
const Admin = Loadable(() => import('../pages/admin'))
const AdminLogin = Loadable(() => import('../pages/admin/login'))
const router: RouteConfig[] = [
    {
        path: "/",
        exact: true,
        render: () => <Redirect to='/blog' />,
    },
    {
        path: "/blog",
        component: Blog,
        // component: Blog,
    },
    {
        path: "/articleDetail/:id",
        component: ArticleDetail
    },
    {
        path: '/addArticle',
        component: AddArticle
    },
    {
        path: '/favorites/:id',
        component: Favorites
    },
    {
        path: "/authorDetail/:id",
        component: AuthorDetail,
        // render: () => <Redirect to='/authorDetail/:id/articleList' />,

        // children: [
        //     {
        //         path: '/authorDetail/1/articleList'
        //     }
        // ]
    },
    {
        path: "/admin",
        // exact: true,
        component: Admin,
        children: [
            {
                path: '/admin/systemData',
                component: SystemData,
            },
            {
                path: '/admin/userController',
                component: UserController,
            },
            {
                path: '/admin/ArticleController',
                component: ArticleController,
            }
        ]
    },
    {
        path: '/adminLogin',
        component: AdminLogin,
    }
]
export default renderRoutes(router) 