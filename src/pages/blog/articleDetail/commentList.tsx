import React, { useState, useEffect, useImperativeHandle, forwardRef, useRef, createElement } from 'react';
import { Comment, List, Tooltip } from 'antd';
import { IComment } from '../types';
import Request from '../../../utils/request';
import { useParams } from 'react-router';
import MainComment from './mainComment';
const CommentList = (props: any, ref: any) => {

    const [comments, setComments] = useState<Array<IComment>>([]);
    const [totalPages, setTotalPages] = useState<number>(0)
    const [totalComments, setTotalComments] = useState<number>(0)
    const currentPage = useRef(1);

    let { id } = useParams();

    useImperativeHandle(
        ref,
        () => (
            {
                refresh: refreshComment
            }
        ),
    )

    //原本这里应该直接调用 getComments() 来刷新数据的，但是hooks里comments不能初始化，只能重新写一遍，希望之后能找到好方法
    const refreshComment = async () => {
        console.log(123);
        currentPage.current = 1;
        let req = new Request();
        await req.post('default/getComments', { articleId: id, pageNum: currentPage.current }).then((res) => {
            console.log(res);
            setComments([...res?.data.rows]);
            setTotalComments(res?.data.count);
            setTotalPages(+res?.data.total_pages);
            // setPageNum(pageNum + 1);
            currentPage.current++
        })
        // getComments()
    }


    //初始化加载评论
    useEffect(() => {
        console.log(id);
        getComments();
    }, []);

    //获取评论方法
    const getComments = async () => {
        let req = new Request();
        await req.post('default/getComments', { articleId: id, pageNum: currentPage.current }).then((res) => {
            console.log(res);
            setComments([...comments, ...res?.data.rows]);
            setTotalComments(res?.data.count);
            setTotalPages(+res?.data.total_pages);
            // setPageNum(pageNum + 1);
            currentPage.current++
        })
    }





    return (
        <>
            <List
                dataSource={comments}
                header={`${totalComments} ${totalComments > 1 ? 'replies' : 'reply'}`}
                itemLayout="horizontal"
                renderItem={(data: IComment) => <MainComment {...data} />}
            />
            {
                currentPage.current < totalPages && <a className="showMore" onClick={() => getComments()}>查看更多</a>
            }
        </>
    )
};
interface IRefreshForwardRef extends React.ForwardRefExoticComponent<
    React.RefAttributes<any>
    > {
    refresh: () => void
}
export default forwardRef(CommentList) as IRefreshForwardRef