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
  // const location = useLocation();
  // const params = new URLSearchParams(location.search);
  // const userId = params.get("user");
  // const userId = '666eaa54b5ee1db4f34bb02c'
  const [ordersList, setOrdersList] = useState<any>(null);
  // const [paymentPendingList, setPaymentPendingList] = useState<any>(null);
  // const [confirmPendingList, setConfirmPendingList] = useState<any>(null);
  // const [prepareList, setPrepareList] = useState<any>(null);
  // const [shippingList, setShippingList] = useState<any>(null);
  // const [deliveredList, setDeliveredList] = useState<any>(null);
  // const [successList, setSuccessList] = useState<any>(null);
  // const [unCompleteShippingList, setUnCompleteShippingList] = useState<any>(null);
  // const [completeList, setCompleteList] = useState<any>(null);
  // const [cancelList, setCancelList] = useState<any>(null);
  // const [paymentFailedList, setPaymentFailedList] = useState<any>(null);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [nextStatus, setNextStatus] = useState(null);

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
        // setPaymentPendingList(res.data.results.filter((order: any) => order.orderStatus === 0));
        // setConfirmPendingList(res.data.results.filter((order: any) => order.orderStatus === 3 || order.orderStatus === 1));
        // setPrepareList(res.data.results.filter((order: any) => order.orderStatus === 4));
        // setShippingList(res.data.results.filter((order: any) => order.orderStatus === 5));
        // setDeliveredList(res.data.results.filter((order: any) => order.orderStatus === 6));
        // setUnCompleteShippingList(res.data.results.filter((order: any) => order.orderStatus === 7));
        // setCompleteList(res.data.results.filter((order: any) => order.orderStatus === 8));
        // setCancelList(res.data.results.filter((order: any) => order.orderStatus === 9));
        // setPaymentFailedList(res.data.results.filter((order: any) => order.orderStatus === 2));
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
  const onChange = (key: string) => {
    // console.log(key);
    // console.log(ordersList, 'ordersList')
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: any = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const options = [
    {
      value: 3,
      label: <span className="h-10">Xác nhận đơn hàng</span>,
      disabled: 3 !== nextStatus,
    },
    {
      value: 4,
      label: <span className="h-10">Giao hàng</span>,
      disabled: 4 !== nextStatus,
    },
    {
      value: 5,
      label: <span className="h-10">Giao hàng không thành công</span>,
      disabled: 5 !== nextStatus,
    },
    {
      value: 6,
      label: <span className="h-10">Đã giao hàng</span>,
      disabled: 6 !== nextStatus,
    },
    {
      value: 10,
      label: <span className="h-10">Hủy đơn hàng</span>,
      disabled: 10 !== nextStatus,
    },
  ]

  const onUpdateStatus = async (value: any) => {
    console.log(value, 'value');
  }

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
      {/* <Tabs defaultActiveKey="all" items={items} onChange={onChange} /> */}
      <div className="mb-4 flex gap-2 items-center">
        <Select
          options={options}
          // value={order?.orderStatus?.code}
          onChange={(value) => onUpdateStatus(value)}
          style={{ width: 250, height: 40 }}
          placeholder="Cập nhật trạng thái đơn hàng"
        />
        <span>
          {hasSelected ? `Chọn ${selectedRowKeys.length} đơn hàng` : null}

        </span>

      </div>
      <Table pagination={false} rowSelection={rowSelection} dataSource={ordersList} columns={columns} rowKey="_id" />
      <PaginationPage
        current={1}
        total={totalOrders}
        pageSize={limitPerPage} />
    </div>

  );
};

export default OrderAdmin;
