import { useLocation } from "react-router-dom";
import OrderSummary from "../../components/Checkout/OrderSummary";
import PaymentMethod from "../../components/Checkout/PaymentMethod";
import ShippingAddress from "../../components/Checkout/ShippingAddress";
import cartService from "../../services/cartService";
import { useEffect, useState } from "react";
import { CartType } from "../../types/cartType";
import { Tabs, TabsProps } from "antd";
import Item from "./Item";
import orderService from "../../services/orderSerivce";
import { hiddenSpinner, showSpinner } from "../../util/util";

const OrderPage = () => {
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
        setPaymentPendingList(res.data.results.filter((order: any) => order.paymentStatus.code === 0));
        setConfirmPendingList(res.data.results.filter((order: any) => order.paymentStatus.code === 1));
        setPrepareList(res.data.results.filter((order: any) => order.paymentStatus.code === 2));
        setShippingList(res.data.results.filter((order: any) => order.paymentStatus.code === 3));
        setDeliveredList(res.data.results.filter((order: any) => order.paymentStatus.code === 4));
        setSuccessList(res.data.results.filter((order: any) => order.paymentStatus.code === 5));
        setCompleteList(res.data.results.filter((order: any) => order.paymentStatus.code === 6));
        setCancelList(res.data.results.filter((order: any) => order.paymentStatus.code === 7));
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
    console.log(key);
    console.log(ordersList, 'ordersList')
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
    <div className="container py-16 ">
      <h3 className="text-2xl mb-8">Danh sách đơn hàng</h3>
      <Tabs type="card" defaultActiveKey="all" items={items} onChange={onChange} />
    </div>

  );
};

export default OrderPage;
