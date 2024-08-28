import { useEffect, useState } from "react";
import {
  formartCurrency,
  hiddenSpinner,
  showSpinner,
} from "../../../util/util";
import { Link } from "react-router-dom";
import { Breadcrumb, Button, Image, Modal, Table, message } from "antd";
import { https } from "../../../config/axios";
// import { Product } from "../../../types/productType";
import PaginationPage from "../../../components/PaginationPage/PaginationPage";
import productService from "../../../services/productService";
import ProductListSkeleton from "../../../components/Skeleton/Admin/ProductListSkeleton";
import { Product } from "../../../types/products";
import { Content } from "antd/es/layout/layout";

const ProductsList: React.FC = () => {
  const params = new URLSearchParams(location.search);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const limitPerPage = 10;
  const currentPage = params.get("page") ? Number(params.get("page")) : 1;
  const [productList, setProductList] = useState<Product[]>([]);

  const fetchData = async () => {
    showSpinner();
    try {
      const { data } = await productService.getAllProducts(limitPerPage, currentPage);
      setLoading(false);
      setProductList(data.results);
      setTotalProducts(data.totalResults);
      window.scrollTo(0, 0);
      hiddenSpinner();
    } catch (error) {
      hiddenSpinner();
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [location.search]);

  const handleDelete = async (id: string) => {
    showSpinner();
    try {
      const data = await https.delete(`/products/${id}`);
      if (data) {
        message.success(data.data.message);
        fetchData();
        hiddenSpinner();
      }
    } catch (error) {
      hiddenSpinner();
      console.log(error);
      message.error(error.response.data.message);
    }
  };

  const { confirm } = Modal;

  const showConfirm = (id: string) => {
    confirm({
      title: 'Bạn có chắc chắn muốn xóa?',
      onOk() {
        handleDelete(id);
      },
      onCancel() {
        console.log('Cancel');
      },
      maskClosable: true,
    });
  };

  // Define columns for the Table
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_: any, __: Product, index: number) => ((currentPage - 1) * limitPerPage + (index + 1)),
    },
    {
      title: "Ảnh",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (text: string) => <Image src={text} width={50} height={50} style={{ borderRadius: '8px' }} />,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tồn kho",
      dataIndex: "countInStock",
      key: "countInStock",
      sorter: (a: Product, b: Product) => a.countInStock - b.countInStock,
    },
    {
      title: "Lượt mua",
      dataIndex: "purchases",
      key: "purchases",
      sorter: (a: Product, b: Product) => a.purchases - b.purchases,
    },
    {
      title: "Lượt thích",
      dataIndex: "likes",
      key: "likes",
      sorter: (a: Product, b: Product) => a.likes - b.likes,
    },
    {
      title: "Đánh giá",
      dataIndex: "finalScoreReview",
      key: "finalScoreReview",
      sorter: (a: Product, b: Product) => a.finalScoreReview - b.finalScoreReview,
    },
    {
      title: "Khoảng giá",
      key: "priceRange",
      dataIndex: ["minPrice", "maxPrice"], // Mảng chứa cả minPrice và maxPrice
      sorter: (a: Product, b: Product) => a.minPrice - b.minPrice,
      render: (_: any, record: Product) => {
        const { minPrice, maxPrice } = record;
        return `${formartCurrency(minPrice)} - ${formartCurrency(maxPrice)}`;
      },
      // filters: [
      //   { text: "Dưới 1 triệu", value: 1000000 },
      //   { text: "1 triệu - 5 triệu", value: 5000000 },
      //   { text: "Trên 5 triệu", value: 5000001 }
      // ],
      onFilter: (value: any, record: Product) => record.minPrice <= value,
    },
    // {
    //   title: "Danh mục",
    //   dataIndex: "categories",
    //   key: "categories",
    //   // sorter: (a: Product, b: Product) => a.maxPrice - b.maxPrice,
    // },
    {
      // fixed: "right",
      title: "Thao tác",
      key: "actions",
      render: (text: any, record: Product) => (
        <>
          <Link
            to={`/admin/products/${record.id}`}
            className="text-sm font-semibold text-yellow-500 hover:text-yellow-600"
          >
            Chi tiết
          </Link>
          <Button
            type="link"
            onClick={() => showConfirm(record.id)}
            className="text-sm font-semibold text-red-500 hover:text-red-600"
          >
            Xoá
          </Button>
        </>
      ),
    },
  ];




  return (
    <div className="">
      {/* <div className="p-6 pb-0 mb-0 bg-white rounded-t-2xl">
        <Link
          to="/admin/products/add"
          className="text-white text-base font-semibold bg-green-500 py-2 px-2 rounded my-5 hover:bg-green-600"
        >
          <span>Thêm mới</span>
        </Link>
      </div> */}
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item><Link to="/admin">Trang chủ</Link></Breadcrumb.Item>
        <Breadcrumb.Item>Sản phẩm</Breadcrumb.Item>
      </Breadcrumb>
      <div className="h-full">
        <Table
          columns={columns}
          dataSource={productList}
          rowKey="id"
          pagination={false}
        />
        {/* )} */}
        <PaginationPage
          current={currentPage}
          total={totalProducts}
          pageSize={limitPerPage}
        />
      </div>
    </div>
  );
};

export default ProductsList;