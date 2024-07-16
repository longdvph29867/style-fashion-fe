import { useEffect, useState } from "react";
import { Tabs, TabsProps } from "antd";
import Item from "./Item";
import { hiddenSpinner, showSpinner } from "../../../util/util";
import orderService from "../../../services/orderSerivce";

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
  const [completeList, setCompleteList] = useState<any>(null);
  const [cancelList, setCancelList] = useState<any>(null);

  const fetchOrdersList = async () => {
    showSpinner();
    orderService
      .getAllOrders()
      .then((res) => {
        setOrdersList(res.data.results);
        setPaymentPendingList(res.data.results.filter((order: any) => order.orderStatus === 0));
        setConfirmPendingList(res.data.results.filter((order: any) => order.orderStatus === 1));
        setPrepareList(res.data.results.filter((order: any) => order.orderStatus === 2));
        setShippingList(res.data.results.filter((order: any) => order.orderStatus === 3));
        setDeliveredList(res.data.results.filter((order: any) => order.orderStatus === 4));
        setSuccessList(res.data.results.filter((order: any) => order.orderStatus === 5));
        setCompleteList(res.data.results.filter((order: any) => order.orderStatus === 6));
        setCancelList(res.data.results.filter((order: any) => order.orderStatus === 7));
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

  const items: TabsProps['items'] = [
    {
      key: 'all',
      label: 'Tất cả',
      children: <Item fetchOrdersList={fetchOrdersList} orderList={ordersList} />,
    },
    {
      key: '0',
      label: 'Chờ thanh toán',
      children: <Item fetchOrdersList={fetchOrdersList} orderList={paymentPendingList} />,
    },
    {
      key: '1',
      label: 'Chờ xác nhận',
      children: <Item fetchOrdersList={fetchOrdersList} orderList={confirmPendingList} />,
    },
    {
      key: '2',
      label: 'Chuẩn bị hàng',
      children: <Item fetchOrdersList={fetchOrdersList} orderList={prepareList} />,
    },
    {
      key: '3',
      label: 'Đang giao hàng',
      children: <Item fetchOrdersList={fetchOrdersList} orderList={shippingList} />,
    },

    {
      key: '4',
      label: 'Đã giao hàng',
      children: <Item fetchOrdersList={fetchOrdersList} orderList={deliveredList} />,
    },
    {
      key: '5',
      label: 'Giao hàng thành công',
      children: <Item fetchOrdersList={fetchOrdersList} orderList={successList} />,
    },
    {
      key: '6',
      label: 'Hoàn thành',
      children: <Item fetchOrdersList={fetchOrdersList} orderList={completeList} />,
    },
    {
      key: '7',
      label: 'Đã hủy',
      children: <Item fetchOrdersList={fetchOrdersList} orderList={cancelList} />,
    },
  ];

  return (
    <div className="p-4">
      <h3 className="text-2xl my-8">Danh sách đơn hàng</h3>
      <Tabs defaultActiveKey="all" items={items} onChange={onChange} />
    </div>

  );
};

export default OrderAdmin;
