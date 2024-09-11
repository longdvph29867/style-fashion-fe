import { useEffect, useState } from "react";
import {
    formartCurrency,
    hiddenSpinner,
    showSpinner,
} from "../../../util/util";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumb, Button, Image, Modal, Select, Table, message } from "antd";
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

const priceRanges = [
    { text: "Dưới 100k", value: 'under100' },
    { text: "Từ 100k - 500k", value: '100to500' },
    { text: "Từ 500k - 2 triệu", value: '500to2m' },
    { text: "Trên 2 triệu", value: 'over2m' },
];

const ProductCommentList: React.FC = () => {
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const [totalProducts, setTotalProducts] = useState(0);
    const [loading, setLoading] = useState(false);

    const limitPerPage = 15;
    const currentPage = params.get("page") ? Number(params.get("page")) : 1;
    params.set("limit", limitPerPage.toString());
    params.set("page", currentPage.toString());
    // window.history.replaceState(null, '', location.pathname + "?" + params.toString());


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

    const handleTableChange = (filters: any, sorter: any) => {
        // setLoading(true);
        console.log("filters", filters);
        console.log("sorter", sorter);

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
                if (key === 'defaultPrice') {
                    switch (filters[key][0]) {
                        case 'under100':
                            params.set('toPrice', '100000');
                            break;
                        case '100to500':
                            params.set('fromPrice', '100000');
                            params.set('toPrice', '500000');
                            break;

                        case '500to2m':
                            params.set('fromPrice', '500000');
                            params.set('toPrice', '2000000');
                            break;

                        case 'over2m':
                            params.set('fromPrice', '2000000');
                            break;
                    }
                } else if (key === 'categories') {
                    params.set(key, filters[key]);
                }
            } else {
                console.log("key", key);
                if (key === 'categories') {
                    params.delete(key);
                } else {
                    params.delete('toPrice');
                    params.delete('fromPrice');
                }
            }
        }

        // navigate(location.pathname + "?" + params.toString());
        window.history.replaceState(null, '', location.pathname + "?" + params.toString());
        fetchData();
    }

    const fetchData = async () => {
        setLoading(true);
        try {

            // Biến queryUrl chứa tất cả các tham số
            const queryUrl = `${params.toString()}`;
            console.log("queryUrl", queryUrl);

            // Gọi API với queryUrl
            const { data } = await productService.getAllProductsV2(queryUrl);

            console.log("data.results", data.results);
            setProductList(data.results);
            console.log("productList after setState", productList);

            setTotalProducts(data.totalResults);
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
        console.log("useeffect location.search", params.get('search'));
        if (params.get('search') === 'undefined') {
            params.delete('search');
            console.log("params.get('search')", params.get('search'));
            window.history.replaceState(null, '', location.pathname + "?" + params.toString());
        }
        fetchData();
    }, [params.get('search'), currentPage]);

    // useEffect(() => {
    //   console.log("productList updated: ", productList);
    // }, [productList]);

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
        close: () => void
    ) => {
        // confirm();
        params.set('search', selectedKeys[0]);
        window.history.replaceState(null, '', location.pathname + "?" + params.toString());
        console.log('params search: ', params.toString());
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
        console.log("searchText", searchText);
        close(); // Ẩn dropdown sau khi search
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
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex, close)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        className="btn-search-product"
                        type="primary"
                        onClick={() => {
                            handleSearch(selectedKeys as string[], confirm, dataIndex, close);
                        }}
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
            width: "15%",
            render: (text: string, record: any) => (
                <Link to={`/admin/products/${record.id}`}>
                    {text}
                </Link>
            ),
            ...getColumnSearchProps('name'),
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
            width: "28%",
            render: (text: string) => {
                const maxLength = 50; // Độ dài tối đa của mô tả trước khi thêm dấu '...'
                return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
            },
        },
        // {
        //   title: "Tồn kho",
        //   dataIndex: "countInStock",
        //   key: "countInStock",
        //   // sorter: (a: Product, b: Product) => a.countInStock - b.countInStock,
        //   sorter: true
        // },
        // {
        //   title: "Lượt mua",
        //   dataIndex: "purchases",
        //   key: "purchases",
        //   // sorter: (a: Product, b: Product) => a.purchases - b.purchases,
        //   sorter: true
        // },
        // {
        //   title: "Lượt thích",
        //   dataIndex: "likes",
        //   key: "likes",
        //   // sorter: (a: Product, b: Product) => a.likes - b.likes,
        //   sorter: true
        // },
        {
            title: "Điểm đánh giá",
            dataIndex: "finalScoreReview",
            key: "finalScoreReview",
            // sorter: (a: Product, b: Product) => a.finalScoreReview - b.finalScoreReview,
            sorter: true,
            width: "8%",
            // defaultSortOrder: "descend",
        },
        {
            title: "Khoảng giá",
            key: "defaultPrice",
            dataIndex: ["defaultPrice"], // Mảng chứa cả minPrice và maxPrice
            // sorter: (a: Product, b: Product) => a.minPrice - b.minPrice,
            sorter: true,
            render: (_: any, record: any) => {
                const { defaultPrice, maxPrice } = record;
                return `${formartCurrency(defaultPrice)} - ${formartCurrency(maxPrice)}`;
            },
            filterDropdown: (props: any) => {
                const { setSelectedKeys, selectedKeys, confirm, clearFilters } = props;
                return (
                    <div style={{ padding: 8 }}>
                        <Select
                            placeholder="Chọn khoảng giá"
                            value={selectedKeys[0]}
                            onChange={(value) => {
                                setSelectedKeys(value ? [value] : []);
                                // confirm();
                            }}
                            style={{ width: 188, marginBottom: 8, display: "block" }}
                        >
                            {priceRanges.map((range) => (
                                <Select.Option key={range.value} value={range.value}>
                                    {range.text}
                                </Select.Option>
                            ))}
                        </Select>
                        <div className="flex justify-between">
                            <button className="bg-blue-500 text-white px-2 py-1 w-18 rounded-lg mr-2" onClick={clearFilters}>Reset</button>
                            <button className="bg-primary text-white px-2 py-1 w-18 rounded-lg" onClick={() => {
                                confirm(); // Áp dụng bộ lọc
                                props.setVisible(false); // Ẩn dropdown sau khi lọc
                            }}>OK</button>
                        </div>
                    </div>
                );
            },
            // filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => {
            //   const [minPrice, setMinPrice] = useState(selectedKeys[0]?.min || "");
            //   const [maxPrice, setMaxPrice] = useState(selectedKeys[0]?.max || "");

            //   const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            //     setMinPrice(e.target.value);
            //   };

            //   const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            //     setMaxPrice(e.target.value);
            //   };

            //   const handleOK = () => {
            //     if (!minPrice || !maxPrice || parseFloat(minPrice) > parseFloat(maxPrice)) {
            //       // Thông báo lỗi hoặc hiển thị message
            //       console.error("Giá trị không hợp lệ");
            //       return;
            //     }
            //     setSelectedKeys([{ min: minPrice, max: maxPrice }]);
            //     confirm();
            //   };

            //   return (
            //     <div style={{ padding: 8 }}>
            //       <Input
            //         placeholder="Giá Min"
            //         value={minPrice}
            //         onChange={handleMinPriceChange}
            //         style={{ marginBottom: 8, display: "block" }}
            //       />
            //       <Input
            //         placeholder="Giá Max"
            //         value={maxPrice}
            //         onChange={handleMaxPriceChange}
            //         style={{ marginBottom: 8, display: "block" }}
            //       />
            //       <div className="flex justify-between">
            //         <button
            //           className="bg-blue-500 text-white px-2 py-1 w-18 rounded-lg mr-2"
            //           onClick={clearFilters}
            //         >
            //           Reset
            //         </button>
            //         <button
            //           className="bg-primary text-white px-2 py-1 w-18 rounded-lg"
            //           onClick={handleOK}
            //         >
            //           OK
            //         </button>
            //       </div>
            //     </div>
            //   );
            // },
            filters: priceRanges,
            // onFilter: (value: any, record: Product) => record.minPrice <= value,
            width: "10%",
        },
        {
            title: "Danh mục",
            key: "categories",
            dataIndex: "categories", // Không cần chỉ định ["categories", "name"], chỉ lấy toàn bộ mảng categories
            filters: categories, // Giả sử `categories` là danh sách bộ lọc có sẵn
            render: (categories: any[]) => (
                categories.map((category) => category.name).join(", ")
            ),
            filterDropdown: (props: any) => {
                const { setSelectedKeys, selectedKeys, confirm, clearFilters } = props;
                return (
                    <div style={{ padding: 8 }}>
                        <Select
                            showSearch
                            placeholder="Chọn danh mục"
                            value={selectedKeys[0]}
                            onChange={(value) => {
                                setSelectedKeys(value ? [value] : []);
                                // confirm();
                            }}
                            style={{ width: 188, marginBottom: 8, display: "block" }}
                        >
                            {categories.map((category) => (
                                <Select.Option key={category.value} value={category.value}>
                                    {category.text}
                                </Select.Option>
                            ))}
                        </Select>
                        <div className="flex justify-between">
                            <button className="bg-blue-500 text-white px-2 py-1 w-18 rounded-lg mr-2" onClick={clearFilters}>Reset</button>
                            <button className="bg-primary text-white px-2 py-1 w-18 rounded-lg" onClick={() => {
                                confirm(); // Áp dụng bộ lọc
                                props.setVisible(false); // Ẩn dropdown sau khi lọc
                            }}>OK</button>
                        </div>

                    </div>
                );
            },
            width: "15%",
        },
        {
            fixed: "right" as any,
            title: "Thao tác",
            key: "actions",
            render: (text: any, record: Product) => (
                <>
                    <Link
                        to={`/admin/comments/${record.id}`}
                        className="text-sm font-semibold text-orange-500 hover:text-orange-600"
                    >
                        Xem bình luận
                    </Link>
                </>
            ),
        },
    ];




    return (
        <div className="">
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item><Link to="/admin">Trang chủ</Link></Breadcrumb.Item>
                <Breadcrumb.Item>Bình luận</Breadcrumb.Item>
            </Breadcrumb>
            <div className="h-full">
                <Table
                    loading={loading}
                    columns={columns}
                    dataSource={productList}
                    rowKey="id"
                    pagination={false}
                    onChange={(pagination, filters, sorter) => handleTableChange(filters, sorter)}
                />
                {/* )} */}
                <PaginationPage
                    current={currentPage}
                    total={totalProducts}
                    pageSize={limitPerPage}
                    currentUrl={window.location.href} // Truyền URL hiện tại vào
                />
            </div>
        </div>
    );
};

export default ProductCommentList;