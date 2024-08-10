import { useEffect, useState } from "react";
import { Button, Select, Table, Tabs, TabsProps } from "antd";
import Item from "./Item";
import { formartCurrency, hiddenSpinner, showSpinner } from "../../../util/util";
import orderService from "../../../services/orderService";
import { getNameByStatusCode, orderStatusValue } from "../../../util/constant";
import { render } from "react-dom";
import { Link } from "react-router-dom";
import { TableRowSelection } from "antd/es/table/interface";

const OrderAdmin = () => {
  // const location = useLocation();
  // const params = new URLSearchParams(location.search);
  // const userId = params.get("user");
  const userId = '666eaa54b5ee1db4f34bb02c'
  const [ordersList, setOrdersList] = useState<any>(null);
  const [paymentPendingList, setPaymentPendingList] = useState<any>(null);
  const [confirmPendingList, setConfirmPendingList] = useState<any>(null);
  const [prepareList, setPrepareList] = useState<any>(null);
  const [shippingList, setShippingList] = useState<any>(null);
  const [deliveredList, setDeliveredList] = useState<any>(null);
  const [successList, setSuccessList] = useState<any>(null);
  const [unCompleteShippingList, setUnCompleteShippingList] = useState<any>(null);
  const [completeList, setCompleteList] = useState<any>(null);
  const [cancelList, setCancelList] = useState<any>(null);
  const [paymentFailedList, setPaymentFailedList] = useState<any>(null);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [nextStatus, setNextStatus] = useState(null);

  const fetchOrdersList = async () => {
    showSpinner();
    orderService
      .getAllOrders()
      .then((res) => {
        setOrdersList(res.data.results);
        setPaymentPendingList(res.data.results.filter((order: any) => order.orderStatus === 0));
        setConfirmPendingList(res.data.results.filter((order: any) => order.orderStatus === 3 || order.orderStatus === 1));
        setPrepareList(res.data.results.filter((order: any) => order.orderStatus === 4));
        setShippingList(res.data.results.filter((order: any) => order.orderStatus === 5));
        setDeliveredList(res.data.results.filter((order: any) => order.orderStatus === 6));
        setUnCompleteShippingList(res.data.results.filter((order: any) => order.orderStatus === 7));
        setCompleteList(res.data.results.filter((order: any) => order.orderStatus === 8));
        setCancelList(res.data.results.filter((order: any) => order.orderStatus === 9));
        setPaymentFailedList(res.data.results.filter((order: any) => order.orderStatus === 2));
        hiddenSpinner();
      })
      .catch((err) => {
        hiddenSpinner();
        console.error("Error fetching data:", err);
      });
  }
  useEffect(() => {
    fetchOrdersList();
  }, []);
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
      value: 4,
      label: <span className="h-10">Xác nhận đơn hàng</span>,
      disabled: 4 !== nextStatus,
    },
    {
      value: 5,
      label: <span className="h-10">Giao hàng</span>,
      disabled: 5 !== nextStatus,
    },
    {
      value: 6,
      label: <span className="h-10">Đã giao hàng</span>,
      disabled: 6 !== nextStatus,
    },
    {
      value: 7,
      label: <span className="h-10">Giao hàng không thành công</span>,
      disabled: 7 !== nextStatus,
    },
    {
      value: 9,
      label: <span className="h-10">Hủy đơn hàng</span>,
      disabled: 9 !== nextStatus,
    },
  ]

  const onUpdateStatus = async (value: any) => {
    console.log(value, 'value');
  }

  const statusFilters = orderStatusValue.map((status) => ({
    text: status.name,
    value: status.code,
  }));

  const label0 = (
    <>
      Chờ thanh toán <span className="ml-[1px] text-[#fe385c]">{paymentPendingList ? `(${paymentPendingList.length})` : null}</span>
    </>
  );

  const label3 = (
    <>
      Chờ xác nhận <span className="ml-[1px] text-[#fe385c]">{confirmPendingList ? `(${confirmPendingList.length})` : null}</span>
    </>
  );

  const label4 = (
    <>
      Chuẩn bị hàng <span className="ml-[1px] text-[#fe385c]">{prepareList ? `(${prepareList.length})` : null}</span>
    </>
  );

  const label5 = (
    <>
      Đang giao hàng <span className="ml-[1px] text-[#fe385c]">{shippingList ? `(${shippingList.length})` : null}</span>
    </>
  );

  const label6 = (
    <>
      Đã giao hàng <span className="ml-[1px] text-[#fe385c]">{deliveredList ? `(${deliveredList.length})` : null}</span>
    </>
  );

  const label7 = (
    <>
      Giao hàng thành công <span className="ml-[1px] text-[#fe385c]">{unCompleteShippingList ? `(${unCompleteShippingList.length})` : null}</span>
    </>
  );

  const label9 = (
    <>
      Hoàn thành <span className="ml-[1px] text-[#fe385c]">{completeList ? `(${completeList.length})` : null}</span>
    </>
  );

  const items: TabsProps['items'] = [
    {
      key: 'all',
      label: 'Tất cả',
      children: <Item fetchOrdersList={fetchOrdersList} orderList={ordersList} />,
    },
    {
      key: '0',
      label: label0,
      children: <Item fetchOrdersList={fetchOrdersList} orderList={paymentPendingList} />,
    },
    {
      key: '3',
      label: label3,
      children: <Item fetchOrdersList={fetchOrdersList} orderList={confirmPendingList} />,
    },
    {
      key: '4',
      label: label4,
      children: <Item fetchOrdersList={fetchOrdersList} orderList={prepareList} />,
    },
    {
      key: '5',
      label: label5,
      children: <Item fetchOrdersList={fetchOrdersList} orderList={shippingList} />,
    },
    {
      key: '6',
      label: label6,
      children: <Item fetchOrdersList={fetchOrdersList} orderList={deliveredList} />,
    },
    {
      key: '7',
      label: label7,
      children: <Item fetchOrdersList={fetchOrdersList} orderList={unCompleteShippingList} />,
    },
    {
      key: '8',
      label: label9,
      children: <Item fetchOrdersList={fetchOrdersList} orderList={completeList} />,
    },
    {
      key: '9',
      label: 'Đã hủy',
      children: <Item fetchOrdersList={fetchOrdersList} orderList={cancelList} />,
    },
    {
      key: '2',
      label: 'Thanh toán thất bại',
      children: <Item fetchOrdersList={fetchOrdersList} orderList={paymentFailedList} />,
    },
  ];

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'orderCode',
      key: 'orderCode',
      render: (text, record) => <span className="text-blue-600"><Link to={`/admin/order/${record._id}`}>{text}</Link></span>,
    },
    {
      title: 'Người nhận',
      dataIndex: ['shippingAddress', 'recipientName'],
      key: 'recipientName',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      filters: statusFilters,
      onFilter: (value, record) => record.orderStatus === value,
      render: (status) => (getNameByStatusCode(status)),
    },

    {
      title: 'Thanh toán',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      filters: [
        { text: 'COD', value: 'COD' },
        { text: 'VNPAY', value: 'VNPAY' },
      ],
      onFilter: (value, record) => record.paymentMethod === value,
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (price) => formartCurrency(price),
      sorter: (a, b) => a.totalPrice - b.totalPrice,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => new Date(text).toLocaleString(),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },

  ];

  return (
    <div className="p-4">
      <h3 className="text-2xl my-8">Danh sách đơn hàng</h3>
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
      <Table rowSelection={rowSelection} dataSource={ordersList} columns={columns} rowKey="_id" />
    </div>

  );
};

export default OrderAdmin;
