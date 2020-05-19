import React from 'react';
import Loadable from 'react-loadable';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { CSSTransition } from 'react-transition-group';
import './loader.css'
//通用的过场组件
const loadingComponent = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    return (
        // <CSSTransition
        //     // in={this.state.show} // 如果this.state.show从false变为true，则动画入场，反之out出场
        //     timeout={1000} //动画执行1秒
        //     classNames='fade' //自定义的class名
        //     unMountOnExit //可选，当动画出场后在页面上移除包裹的dom节点
        // >
        <div id="loader-wrapper">
            <div id="loader"></div>
            <div className="loader-section section-left"></div>
            <div className="loader-section section-right"></div>
            <div className="load_title">Please waiting.....<br /><span>V1.0</span></div>
        </div>
        // </CSSTransition>


        // <Spin indicator={antIcon} />
        // <div>div</div>
    )
}

//过场组件默认采用通用的，若传入了loading，则采用传入的过场组件
export default (loader: any, loading = loadingComponent) => {
    return Loadable({
        loader,
        loading
    });
}