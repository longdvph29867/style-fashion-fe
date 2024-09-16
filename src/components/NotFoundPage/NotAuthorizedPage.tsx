import React from 'react';
import { Result } from 'antd';
import { Link } from 'react-router-dom';

const NotAuthorizedPage: React.FC = () => (
    <Result
        status="403"
        title="403"
        subTitle="Xin lỗi, bạn không có quyền truy cập trang này."
        extra={<Link to="/admin/order" className='text-blue-500'>Trở về</Link>}
    />
);

export default NotAuthorizedPage;