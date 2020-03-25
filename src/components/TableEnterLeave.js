import React from 'react';
import { Table } from 'antd';
import Button from 'antd/lib/button';
import QueueAnim from 'rc-queue-anim';
import PropTypes from 'prop-types';
import { TweenOneGroup } from 'rc-tween-one';
import './table.css'
const TableContext = React.createContext(false);

class TableEnterLeave extends React.Component {
    static propTypes = {
        className: PropTypes.string,
    };

    static defaultProps = {
        className: 'table-enter-leave-demo',
    };

    constructor(props) {
        super(props);
        this.columns = [
            ...this.props.columns,
            this.props.tableAction.delete ? {
                title: '操作',
                dataIndex: '',
                align: 'center',
                key: 'x',

                render: (text, record) => (
                    <span
                        className={`${this.props.className}-delete`}
                        onClick={(e) => { this.onDelete(record.id, e); }}
                    >
                        Delete
                    </span>
                ),
            } : null,
        ];

        this.enterAnim = [
            {
                opacity: 0, x: 30, backgroundColor: '#fffeee', duration: 0,
            },
            {
                height: 0,
                duration: 200,
                type: 'from',
                delay: 250,
                ease: 'easeOutQuad',
                onComplete: this.onEnd,
            },
            {
                opacity: 1, x: 0, duration: 250, ease: 'easeOutQuad',
            },
            { delay: 1000, backgroundColor: '#fff' },
        ];
        this.pageEnterAnim = [
            {
                opacity: 0, duration: 0,
            },
            {
                height: 0,
                duration: 150,
                type: 'from',
                delay: 150,
                ease: 'easeOutQuad',
                onComplete: this.onEnd,
            },
            {
                opacity: 1, duration: 150, ease: 'easeOutQuad',
            },
        ];
        this.leaveAnim = [
            { duration: 150, opacity: 0 },
            { height: 0, duration: 200, ease: 'easeOutQuad' },
        ];
        this.pageLeaveAnim = [
            { duration: 150, opacity: 0 },
            { height: 0, duration: 150, ease: 'easeOutQuad' },
        ];
        // 动画标签，页面切换时改用 context 传递参数；
        this.animTag = ($props) => {
            return (
                <TableContext.Consumer>
                    {(isPageTween) => {
                        return (
                            <TweenOneGroup
                                component="tbody"
                                enter={!isPageTween ? this.enterAnim : this.pageEnterAnim}
                                leave={!isPageTween ? this.leaveAnim : this.pageLeaveAnim}
                                appear={false}
                                exclusive
                                {...$props}
                            />
                        );
                    }}
                </TableContext.Consumer>
            );
        };

        this.state = {
            data: this.data,
            isPageTween: false,
        };
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('Table Refresh');
    }
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.dataSource !== nextProps.dataSource;
    }


    onEnd = (e) => {
        const dom = e.target;
        dom.style.height = 'auto';
    }

    onDelete = (id, e) => {
        e.preventDefault();
        this.setState({ isPageTween: false });

        this.props.deleteUser(id)
        console.log('trigger delete');

        // const data = this.state.data.filter(item => item.id !== id);
    }



    pageChange = () => {
        this.setState({
            isPageTween: true,
        });
    };

    render() {
        return (
            <div>
                <TableContext.Provider value={this.state.isPageTween}>
                    <Table
                        bordered={this.props.bordered}
                        columns={this.columns}
                        pagination={{ pageSize: 5 }}
                        dataSource={this.props.dataSource}
                        // className={`${this.props.className}-table`}
                        // components={{ body: { wrapper: this.animTag } }}
                        onChange={this.pageChange}
                        rowKey='id'
                    />
                </TableContext.Provider>
            </div>
        );
    }
}

export default TableEnterLeave;