import React from 'react';
import { Form, Button, List, Input } from 'antd';
const { TextArea } = Input;
const CommentEditor = (props: any) => (
    <div>
        <Form.Item>
            <TextArea rows={4} onChange={props.onChange} value={props.value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={props.submitting} onClick={props.onSubmit} type="primary">
                Add Comment
      </Button>
        </Form.Item>
    </div>
);

export default CommentEditor;