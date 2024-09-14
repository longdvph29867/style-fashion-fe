import { useEffect, useState } from "react";
import { hiddenSpinner, showSpinner } from "../../../util/util";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb, Image, Tabs, TabsProps, message } from "antd";
import { https } from "../../../config/axios";
import ChildrenTab from "./ChildrenTab";
import PaginationPage from "../../../components/PaginationPage/PaginationPage";
import reviewService from "../../../services/reviewService";

const ReviewList: React.FC = () => {
  const params = new URLSearchParams(location.search);
  const [totalReviews, setTotalReviews] = useState(0);
  const limitPerPage = 10;
  const currentPage = params.get("page") ? Number(params.get("page")) : 1;

  const { id } = useParams();
  const productId = id as string;

  console.log(productId);
  const [product, setProduct] = useState<any>(null);
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
  };

  const fetchData = async () => {
    window.scrollTo(0, 0);
    showSpinner();
    // const api = `/reviews/v2?productId=${productId}`;
    try {
      const { data } = await reviewService.getAllReviews(productId, limitPerPage, currentPage);
      setAllReviewsList(data.results);
      setNotApproveList(data.results.filter((review: any) => review.status === "offline"));
      setApproveList(data.results.filter((review: any) => review.status === "reviewed"));
      setDeletedList(data.results.filter((review: any) => review.status === "deleted"));
      setTotalReviews(data.totalResults);
      hiddenSpinner();
    } catch (error) {
      hiddenSpinner();
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchProductDetail();
  }, [location.search]);

  const onChange = (key: string) => {
    console.log(key);
    if (key === "offline") {
      setNotApproveList(allReviewsList.filter((review: any) => review.status === "offline"));
    }
    if (key === "reviewed") {
      setApproveList(allReviewsList.filter((review: any) => review.status === "reviewed"));
    }
    if (key === "deleted") {
      setDeletedList(allReviewsList.filter((review: any) => review.status === "deleted"));
    }
  };

  const items: TabsProps["items"] = [
    {
      key: "all",
      label: "Tất cả",
      children: <ChildrenTab currentPage={currentPage} limitPerPage={limitPerPage} reviewsList={allReviewsList} fetchData={fetchData} />,
    },
    {
      key: "offline",
      label: "Chưa duyệt",
      children: <ChildrenTab currentPage={currentPage} limitPerPage={limitPerPage} reviewsList={notApproveList} fetchData={fetchData} />,
    },
    {
      key: "reviewed",
      label: "Đã duyệt",
      children: <ChildrenTab currentPage={currentPage} limitPerPage={limitPerPage} reviewsList={approveList} fetchData={fetchData} />,
    },
    {
      key: "deleted",
      label: "Đã xóa",
      children: <ChildrenTab currentPage={currentPage} limitPerPage={limitPerPage} reviewsList={deletedList} fetchData={fetchData} />,
    },
  ];

  return (
    <div className="min-w-[800px]">
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item><Link to="/admin">Trang chủ</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/admin/reviews">Đánh giá</Link></Breadcrumb.Item>
        <Breadcrumb.Item>Chi tiết</Breadcrumb.Item>
      </Breadcrumb>
      <div className="relative">
        <div className="lg:absolute lg:right-0 flex items-center justify-end gap-5 z-10">
          <Image className="" height={40} width={40} src={product?.thumbnail} />
          <span className="">{product?.name}</span>
        </div>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        <PaginationPage
          current={1}
          total={totalReviews}
          pageSize={limitPerPage}
          currentUrl={null} // Page không có filter, sort nên truyền null

        />
      </div>
    </div>
  );
};

export default ReviewList;
