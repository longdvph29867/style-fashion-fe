import React from 'react';
import { Result } from 'antd';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => (
    <Result
        status="404"
        title="404"
        subTitle="Trang không tồn tại"
        extra={<Link className='text-blue-500' to="/">Về trang chủ</Link>}
    />
);

export default NotFoundPage;