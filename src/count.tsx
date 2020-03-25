import React from 'react';

import { Button } from 'antd';
export interface IProps {
    value: number,
    str?: string,
    onIncrement: () => void,
    onDecrement: () => void
}

const count = (props: IProps) => {
    const { value, onIncrement, onDecrement } = props
    return (
        <div>
            <Button type="primary" onClick={onDecrement}>-</Button>

            {value}

            <Button type="primary" onClick={onIncrement}>+</Button>

        </div>


    );
}
export default count