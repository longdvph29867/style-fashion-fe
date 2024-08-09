import { useEffect, useState } from "react";
import { Tabs, TabsProps } from "antd";
import Item from "./Item";
import { hiddenSpinner, showSpinner } from "../../../util/util";
import orderService from "../../../services/orderService";

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

  return (
    <div className="p-4">
      <h3 className="text-2xl my-8">Danh sách đơn hàng</h3>
      <Tabs defaultActiveKey="all" items={items} onChange={onChange} />
    </div>

  );
};

export default OrderAdmin;
