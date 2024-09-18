import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, Table, message } from "antd";
import { https } from "../../../config/axios";
// import { Product } from "../../../types/productType";
import { Product } from "../../../types/products";
import React from 'react';

const ProductReviewList: React.FC = () => {
    const [loading, setLoading] = useState(false);


    const [productList, setProductList] = useState<Product[]>([]);

    const fetchData = async () => {
        setLoading(true);
        try {

            // Biến queryUrl chứa tất cả các tham số
            // const queryUrl = `${params.toString()}`;
            // console.log("queryUrl", queryUrl);

            // Gọi API với queryUrl
            const { data } = await https.get("/reviews/v2/grouped-reviews");

            console.log("data.results", data.results);
            setProductList(data);
            console.log("productList after setState", productList);

            setLoading(false);
            window.scrollTo(0, 0);
            // hiddenSpinner();
        } catch (error) {
            setLoading(false);
            console.log(error);
            message.error("Lỗi khi lấy dữ liệu");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const columns = [
        {
            title: 'Sản phẩm',
            dataIndex: 'product',
            key: 'name',
            sorter: (a: any, b: any) => a.product.name.localeCompare(b.product.name),
            render: (product: any, record: any) => {
                return (
                    <Link
                        to={`/admin/products/${record._id}`}
                        className="font-semibold"
                    >
                        {product?.name}
                    </Link>
                );
            },

        },
        {
            title: 'Chờ xác nhận',
            key: 'needApproval',
            sorter: (a: any, b: any) =>
                a.reviews.filter((r: any) => r.status === 'offline').length -
                b.reviews.filter((r: any) => r.status === 'offline').length,
            render: (record: any) => {
                const offlineReviews = record.reviews.filter((review: any) => review.status === 'offline').length;
                return offlineReviews;
            },
        },
        {
            title: 'Đã xác nhận',
            key: 'confirmedReviews',
            sorter: (a: any, b: any) =>
                a.reviews.filter((r: any) => r.status === 'reviewed').length -
                b.reviews.filter((r: any) => r.status === 'reviewed').length,
            render: (record: any) => {
                const reviewedReviews = record.reviews.filter((review: any) => review.status === 'reviewed').length;
                return reviewedReviews;
            },
        },
        {
            title: 'Đã xóa',
            key: 'deletedReviews',
            sorter: (a: any, b: any) =>
                a.reviews.filter((r: any) => r.status === 'deleted').length -
                b.reviews.filter((r: any) => r.status === 'deleted').length,
            render: (record: any) => {
                const deletedReviews = record.reviews.filter((review: any) => review.status === 'deleted').length;
                return deletedReviews;
            },
        },
        {
            title: 'Tổng đánh giá',
            key: 'totalReviews',
            sorter: (a: any, b: any) => a.reviews.length - b.reviews.length,
            render: (record: any) => {
                return record.reviews.length;
            },
        },
        {
            title: 'Xem đánh giá',
            key: 'viewReviews',
            render: (record: any) => {
                return (
                    <Link to={`/admin/reviews/${record._id}`} className="text-sm font-semibold text-green-500 hover:text-green-600">
                        Xem đánh giá
                    </Link>
                );
            },
        },
    ];




    return (
        <div className="">
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item><Link to="/admin">Trang chủ</Link></Breadcrumb.Item>
                <Breadcrumb.Item>Đánh giá</Breadcrumb.Item>
            </Breadcrumb>
            <div className="h-full">
                <Table
                    loading={loading}
                    columns={columns}
                    dataSource={productList}
                    rowKey="id"
                // onChange={(pagination, filters, sorter) => handleTableChange(filters, sorter)}
                />
                {/* )} */}
                {/* <PaginationPage
                    current={currentPage}
                    total={totalProducts}
                    pageSize={limitPerPage}
                    currentUrl={window.location.href} // Truyền URL hiện tại vào
                /> */}
            </div>
        </div>
    );
};

export default ProductReviewList;