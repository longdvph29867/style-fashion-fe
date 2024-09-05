import { useEffect, useState } from "react";
import {
  formartCurrency,
  hiddenSpinner,
  showSpinner,
} from "../../../util/util";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumb, Button, Image, Modal, Table, message } from "antd";
import { https } from "../../../config/axios";
// import { Product } from "../../../types/productType";
import PaginationPage from "../../../components/PaginationPage/PaginationPage";
import productService from "../../../services/productService";
import { Product } from "../../../types/products";
import React, { useRef } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import { Input, Space } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';


const ProductsList: React.FC = () => {
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);
  const limitPerPage = 10;
  const currentPage = params.get("page") ? Number(params.get("page")) : 1;
  const [productList, setProductList] = useState<Product[]>([]);
  const [currentSorter, setCurrentSorter] = useState<any>({}); // Lưu thông tin sorter hiện tại

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const searchInput = useRef<InputRef>(null);

  const fetchCategories = async () => {
    const { data } = await https.get("/categories?limit=100&page=1");
    setCategories(data.results.map((category: any) => ({
      text: category.name,
      value: category.id,
    })));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchData = async (filters: any = {}, sorter: any = {}) => {
    setLoading(true);
    console.log("filters", filters);
    console.log("sorter", sorter);
    // showSpinner();
    try {
      // const { data } = await productService.getAllProducts(limitPerPage, currentPage);
      // const queryParams = new URLSearchParams();
      // Nếu có thông tin sorter, thêm vào queryParams
      if (sorter.field) {
        let sortOrder = '';
        if (sorter.order === 'ascend') {
          sortOrder = 'asc';
          params.set('sortBy', `${sorter.field}:${sortOrder}`);
        } else if (sorter.order === 'descend') {
          sortOrder = 'desc';
          params.set('sortBy', `${sorter.field}:${sortOrder}`);
        } else if (sorter.order === undefined) {
          sortOrder = '';
          params.delete('sortBy');
        }
        // setCurrentSorter(sorter); // Lưu sorter vào state
      }

      // Thêm filters vào queryParams
      for (const key in filters) {
        if (filters[key]) {
          console.log("key", key);
          console.log("filters[key]", filters[key]);
          if (key === 'priceRange') {
            if (filters[key][0] === 'under1m') {
              console.log("under1m");
              params.set('toPrice', '1000000');
            } else if (filters[key][0] === '1to5m') {
              params.set('fromPrice', '1000000');
              params.set('toPrice', '5000000');
            } else if (filters[key][0] === 'over5m') {
              params.set('fromPrice', '5000000');
            }
          } else if (key === 'categories') {
            params.set(key, filters[key]);
          }
        } else {
          params.delete(key);
          params.delete('toPrice');
        }
      }

      // navigate(location.pathname + "?" + params.toString());
      window.history.replaceState(null, '', location.pathname + "?" + params.toString());


      // Biến queryUrl chứa tất cả các tham số
      const queryUrl = `${params.toString()}`;
      console.log("queryUrl", queryUrl);

      // Gọi API với queryUrl
      const { data } = await productService.getAllProductsV2(queryUrl);

      console.log("data.results", data.results);
      setProductList(data.results);
      setTotalProducts(data.totalResults);
      setLoading(false);
      window.scrollTo(0, 0);
      // hiddenSpinner();
    } catch (error) {
      hiddenSpinner();
      console.log(error);
    }
  };


  useEffect(() => {
    console.log("useeffect location.search", location.search);
    fetchData();
  }, [params.get('search'), currentPage]);

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

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: any,
  ) => {
    // confirm();
    params.set('search', selectedKeys[0]);
    window.history.replaceState(null, '', location.pathname + "?" + params.toString());
    console.log('params search: ', params.toString());
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
    console.log("searchText", searchText);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };


  const getColumnSearchProps = (dataIndex: any): TableColumnType<any> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          className="input-search-product"
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            className="btn-search-product"
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button> */}
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  // Define columns for the Table
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_: any, __: Product, index: number) => ((currentPage - 1) * limitPerPage + (index + 1)),
      width: "3%",
    },
    {
      title: "Ảnh",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (text: string) => <Image src={text} width={50} height={50} style={{ borderRadius: '8px' }} />,
      width: "4%",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      width: "20%",
      ...getColumnSearchProps('name'),
    },
    {
      title: "Tồn kho",
      dataIndex: "countInStock",
      key: "countInStock",
      // sorter: (a: Product, b: Product) => a.countInStock - b.countInStock,
      sorter: true
    },
    {
      title: "Lượt mua",
      dataIndex: "purchases",
      key: "purchases",
      // sorter: (a: Product, b: Product) => a.purchases - b.purchases,
      sorter: true
    },
    {
      title: "Lượt thích",
      dataIndex: "likes",
      key: "likes",
      // sorter: (a: Product, b: Product) => a.likes - b.likes,
      sorter: true
    },
    {
      title: "Đánh giá",
      dataIndex: "finalScoreReview",
      key: "finalScoreReview",
      // sorter: (a: Product, b: Product) => a.finalScoreReview - b.finalScoreReview,
      sorter: true,
      // defaultSortOrder: "descend",
    },
    {
      title: "Khoảng giá",
      key: "priceRange",
      dataIndex: ["minPrice"], // Mảng chứa cả minPrice và maxPrice
      // sorter: (a: Product, b: Product) => a.minPrice - b.minPrice,
      sorter: true,
      render: (_: any, record: Product) => {
        const { minPrice, maxPrice } = record;
        return `${formartCurrency(minPrice)} - ${formartCurrency(maxPrice)}`;
      },
      filters: [
        { text: "Dưới 1 triệu", value: "under1m" },
        { text: "1 triệu - 5 triệu", value: "1to5m" },
        { text: "Trên 5 triệu", value: "over5m" }
      ],
      onFilter: (value: any, record: Product) => record.minPrice <= value,
    },
    {
      title: "Danh mục",
      key: "categories",
      dataIndex: "categories", // Không cần chỉ định ["categories", "name"], chỉ lấy toàn bộ mảng categories
      width: "12%",
      filters: categories, // Giả sử `categories` là danh sách bộ lọc có sẵn
      render: (categories: any[]) => (
        categories.map((category) => category.name).join(", ")
      ),
    },
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
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item><Link to="/admin">Trang chủ</Link></Breadcrumb.Item>
        <Breadcrumb.Item>Sản phẩm</Breadcrumb.Item>
      </Breadcrumb>
      <div className="h-full">
        <Table
          loading={loading}
          columns={columns}
          dataSource={productList}
          rowKey="id"
          pagination={false}
          onChange={(pagination, filters, sorter) => fetchData(filters, sorter)}
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