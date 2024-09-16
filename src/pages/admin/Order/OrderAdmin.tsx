import { useEffect, useState } from "react";
import { Breadcrumb, Button, Image, message, Select, Table, Tabs, TabsProps } from "antd";
import Item from "./Item";
import { formartCurrency, hiddenSpinner, showSpinner } from "../../../util/util";
import orderService from "../../../services/orderService";
import { getNameByStatusCode, orderStatusValue } from "../../../util/constant";
import { render } from "react-dom";
import { Link } from "react-router-dom";
import { TableRowSelection } from "antd/es/table/interface";
import { OrderStatus } from "../../../components/OrderAdmin/status";
import { PaymentMethod } from "../../../components/OrderAdmin/paymentMethod";
import { OrderActions } from "../../../components/OrderAdmin/OrderAction";
import PaginationPage from "../../../components/PaginationPage/PaginationPage";

const OrderAdmin = () => {
  const [ordersList, setOrdersList] = useState<any>(null);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const params = new URLSearchParams(location.search);
  const [totalOrders, setTotalOrders] = useState(0);

  const limitPerPage = 15;
  const currentPage = params.get("page") ? Number(params.get("page")) : 1;
  params.set("limit", limitPerPage.toString());
  params.set("page", currentPage.toString());
  // window.history.replaceState(null, '', location.pathname + "?" + params.toString());

  const [loading, setLoading] = useState(false);

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
        // Nếu filters[key] là một mảng, chuyển đổi nó thành chuỗi
        const filterValue = Array.isArray(filters[key])
          ? filters[key].join(",")
          : filters[key];

        params.set(key, filterValue); // Set giá trị cho params
      } else {
        params.delete(key);

      }
    }

    // navigate(location.pathname + "?" + params.toString());
    window.history.replaceState(null, '', location.pathname + "?" + params.toString());
    fetchOrdersList();
  }

  const fetchOrdersList = async () => {
    setLoading(true);
    try {

      // Biến queryUrl chứa tất cả các tham số
      const queryUrl = `${params.toString()}`;
      console.log("queryUrl", queryUrl);

      // Gọi API với queryUrl
      const { data } = await orderService.getAllOrdersV2(queryUrl);

      console.log("data.results", data.results);
      setOrdersList(data.results);

      setTotalOrders(data.totalResults);
      setLoading(false);
      window.scrollTo(0, 0);
      // hiddenSpinner();
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("Lỗi khi lấy dữ liệu");
    }

    // showSpinner();
    // orderService
    //   .getAllOrders(limitPerPage, currentPage)
    //   .then((res) => {
    //     setOrdersList(res.data.results);
    //     setTotalOrders(res.data.totalResults);
    //     hiddenSpinner();
    //   })
    //   .catch((err) => {
    //     hiddenSpinner();
    //     console.error("Error fetching data:", err);
    //   });
  }
  useEffect(() => {
    fetchOrdersList();
  }, [currentPage]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: any = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const statusFilters = orderStatusValue.map((status) => ({
    text: status.name,
    value: status.code,
  }));

  const columns: any = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'orderCode',
      key: 'orderCode',
      render: (text: any, record: any) => <span className="text-blue-600"><Link to={`/admin/order/${record._id}`}>{text}</Link></span>,
      width: 100
    },
    {
      title: 'Trạng thái',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      filters: statusFilters,
      // onFilter: (value: any, record: any) => record.orderStatus.code === value,
      render: (status: any) => <OrderStatus statusCode={status.code} />,
      width: 230,
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'products',
      key: 'imageAtrribute',
      render: (productsOrder: any) => (
        <div className="">
          {productsOrder.map((product: any) => (
            <Image
              key={product._id}
              src={product.image}
              alt={product.productName}
              style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '8px', borderRadius: '8px' }}
            />
          ))}
        </div>
      ),
      width: 280, // Chiều rộng tối đa của cột
      // ellipsis: true, // Sử dụng ellipsis nếu nội dung quá dài
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (price: any) => formartCurrency(price),
      sorter: true,
      // sorter: (a: any, b: any) => a.totalPrice - b.totalPrice,
    },
    {
      title: 'Thanh toán',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: { setSelectedKeys: React.Dispatch<React.SetStateAction<React.Key[]>>, selectedKeys: React.Key[], confirm: () => void, clearFilters: () => void }) => (
        <div className="" style={{ padding: 8 }}>
          <Select
            value={selectedKeys[0]}
            onChange={(value) => {
              setSelectedKeys(value ? [value] : []);
              confirm();
            }}
            style={{ width: 120 }}
            placeholder="Chọn"
          >
            <Select.Option value="COD">COD</Select.Option>
            <Select.Option value="VNPAY">VNPAY</Select.Option>
          </Select>
          <div>
            <button
              className="text-left"
              onClick={() => {
                clearFilters && clearFilters();
                confirm();
              }}
              // size="small"
              style={{ width: 90, marginTop: 8 }}
            >
              Reset
            </button>
          </div>
        </div>
      ),
      // filters: [
      //   { text: 'COD', value: 'COD' },
      //   { text: 'VNPAY', value: 'VNPAY' },
      // ],
      render: (paymentMethod: 'COD' | 'VNPAY') => <PaymentMethod paymentMethod={paymentMethod} />,
    },
    {
      title: 'Người dùng',
      dataIndex: ['shippingAddress', 'name'],
      key: 'recipientName',
      render: (text: any, record: any) => <Link to={`/admin/users/${record.user}`}>{record.shippingAddress.name}</Link>,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: any) => new Date(text).toLocaleString(),
      sorter: true,
      // sorter: (a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      fixed: "right",
      title: 'Hành động',
      dataIndex: "actions",
      key: "actions",
      render: (_value: any, record: any) => <OrderActions record={record} setOrderList={setOrdersList} onPage={'list'} fetchOrder={fetchOrdersList} />,
      width: 110,
    }

  ];

  return (
    <div className="">
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item><Link to="/admin">Trang chủ</Link></Breadcrumb.Item>
        <Breadcrumb.Item>Đơn hàng</Breadcrumb.Item>
      </Breadcrumb>
      <h3 className="text-2xl mb-8">Danh sách đơn hàng</h3>
      <Table
        loading={loading}
        pagination={false}
        dataSource={ordersList}
        columns={columns}
        rowKey="_id"
        onChange={(pagination, filters, sorter) => handleTableChange(filters, sorter)}
      />
      <PaginationPage
        current={currentPage}
        total={totalOrders}
        pageSize={limitPerPage}
        currentUrl={window.location.href} // Truyền URL hiện tại vào
      />
    </div>

  );
};

export default OrderAdmin;
