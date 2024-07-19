import { useEffect, useState } from "react";
import {
    hiddenSpinner,
    showSpinner,
} from "../../../util/util";
import { Link, useParams } from "react-router-dom";
import { Image, Tabs, TabsProps, message } from "antd";
import { https } from "../../../config/axios";
import { IProduct } from "../../../types/productType";
import ChildrenTab from "./ChildrenTab";

const ReviewList: React.FC = () => {
    const { id } = useParams();
    const productId = id as string;

    console.log(productId)
    const [product, setProduct] = useState<IProduct>();
    const [allReviewsList, setAllReviewsList] = useState<any>([]);
    const [notApproveList, setNotApproveList] = useState<any>([]);
    const [approveList, setApproveList] = useState<any>([]);
    const [deletedList, setDeletedList] = useState<any>([]);

    const fetchProductDetail = async () => {
        try {
            const { data } = await https.get(`/products/${productId}`);
            setProduct(data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchData = async () => {
        window.scrollTo(0, 0);
        showSpinner();
        const api = `/reviews/v2?productId=${productId}`;
        try {
            const { data } = await https.get(api);
            setAllReviewsList(data.results);
            setNotApproveList(data.results.filter((review: any) => review.status === 'offline'))
            setApproveList(data.results.filter((review: any) => review.status === 'reviewed'))
            setDeletedList(data.results.filter((review: any) => review.status === 'deleted'))
            hiddenSpinner();
        } catch (error) {
            hiddenSpinner();
            console.log(error);
        }
    };
    useEffect(() => {
        fetchData();
        fetchProductDetail();
    }, []);
    useEffect(() => {
        console.log(allReviewsList)

    }, [allReviewsList]);

    const onChange = (key: string) => {
        console.log(key);
        if (key === 'offline') {
            setNotApproveList(allReviewsList.filter((review: any) => review.status === 'offline'))
        }
        if (key === 'reviewed') {
            setApproveList(allReviewsList.filter((review: any) => review.status === 'reviewed'))
        }
        if (key === 'deleted') {
            setDeletedList(allReviewsList.filter((review: any) => review.status === 'deleted'))
        }
    };

    const items: TabsProps['items'] = [
        {
            key: 'all',
            label: 'Tất cả',
            children: <ChildrenTab reviewsList={allReviewsList} fetchData={fetchData} />,
        },
        {
            key: 'offline',
            label: 'Chưa duyệt',
            children: <ChildrenTab reviewsList={notApproveList} fetchData={fetchData} />,
        },
        {
            key: 'reviewed',
            label: 'Đã duyệt',
            children: <ChildrenTab reviewsList={approveList} fetchData={fetchData} />,
        },
        {
            key: 'deleted',
            label: 'Đã xóa',
            children: <ChildrenTab reviewsList={deletedList} fetchData={fetchData} />,
        },
    ];

    return (
        <div className="p-4">
            <div className="relative">
                <div className="lg:absolute lg:right-0 flex items-center justify-end gap-5 z-10">
                    <Image className="" height={40} width={40} src={product?.thumbnail} />
                    <span className="">{product?.name}</span>
                </div>
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            </div>

        </div>
    );
};

export default ReviewList;
