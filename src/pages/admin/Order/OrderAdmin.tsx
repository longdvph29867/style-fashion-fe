import { useEffect, useState } from "react";
import { Button, Image, Select, Table, Tabs, TabsProps } from "antd";
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


  const fetchOrdersList = async () => {
    showSpinner();
    orderService
      .getAllOrders(limitPerPage, currentPage)
      .then((res) => {
        setOrdersList(res.data.results);
        setTotalOrders(res.data.totalResults);
        hiddenSpinner();
      })
      .catch((err) => {
        hiddenSpinner();
        console.error("Error fetching data:", err);
      });
  }
  useEffect(() => {
    fetchOrdersList();
  }, [location.search]);
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
      onFilter: (value: any, record: any) => record.orderStatus.code === value,
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
      sorter: (a: any, b: any) => a.totalPrice - b.totalPrice,
    },
    {
      title: 'Thanh toán',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      filters: [
        { text: 'COD', value: 'COD' },
        { text: 'VNPAY', value: 'VNPAY' },
      ],
      onFilter: (value: any, record: any) => record.paymentMethod === value,
      render: (paymentMethod: 'COD' | 'VNPAY') => <PaymentMethod paymentMethod={paymentMethod} />,
    },
    {
      title: 'Người nhận',
      dataIndex: ['shippingAddress', 'name'],
      key: 'recipientName',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: any) => new Date(text).toLocaleString(),
      sorter: (a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
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
    <div className="p-10">
      <h3 className="text-2xl mb-8">Danh sách đơn hàng</h3>
      <Table pagination={false} dataSource={ordersList} columns={columns} rowKey="_id" />
      <PaginationPage
        current={1}
        total={totalOrders}
        pageSize={limitPerPage} />
    </div>

  );
};

export default OrderAdmin;
