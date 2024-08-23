import { Link, useLocation } from "react-router-dom";
import OrderSummary from "../../components/Checkout/OrderSummary";
import PaymentMethod from "../../components/Checkout/PaymentMethod";
import ShippingAddress from "../../components/Checkout/ShippingAddress";
import cartService from "../../services/cartService";
import { useEffect, useState } from "react";
import { CartType } from "../../types/cartType";
import { Tabs, TabsProps } from "antd";
import Item from "./Item";
import { hiddenSpinner, showSpinner } from "../../util/util";
import orderService from "../../services/orderService";
import PaginationPage from "../../components/PaginationPage/PaginationPage";

const OrderPage = () => {
  // const location = useLocation();
  // const params = new URLSearchParams(location.search);
  // const userId = params.get("user");
  // const userId = '666eaa54b5ee1db4f34bb02c'
  const [ordersList, setOrdersList] = useState<any>(null);
  const [paymentPendingList, setPaymentPendingList] = useState<any>(null);
  const [confirmPendingList, setConfirmPendingList] = useState<any>(null);
  const [prepareList, setPrepareList] = useState<any>(null);
  const [shippingList, setShippingList] = useState<any>(null);
  const [deliveredList, setDeliveredList] = useState<any>(null);
  const [successList, setSuccessList] = useState<any>(null);
  const [completeList, setCompleteList] = useState<any>(null);
  const [cancelList, setCancelList] = useState<any>(null);
  const [paymentFailedList, setPaymentFailedList] = useState<any>(null);

  const [lengthWaitPayment, setLengthWaitPayment] = useState(0);
  const [lengthWaitConfirm, setLengthWaitConfirm] = useState(0);
  const [lengthPrepare, setLengthPrepare] = useState(0);
  const [lengthShipping, setLengthShipping] = useState(0);

  const params = new URLSearchParams(location.search);
  const [totalOrders, setTotalOrders] = useState(0);
  const limitPerPage = 10;
  const currentPage = params.get("page") ? Number(params.get("page")) : 1;

  // const [userInfo, setUserInfo] = useState<any>(null);
  const userInfo = JSON.parse(localStorage.getItem("USER_INFO_FASHION") || "{}");


  // const getLengthStatus = async (userId: any, statusCode: any) => {
  //   try {

  //     const res = await orderService.getAllOrderUserByStatusCode(userId, statusCode);
  //     return res.data.totalResults
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // }

  const fetchOrdersList = async () => {
    showSpinner();
    // const userData = localStorage.getItem("USER_INFO_FASHION");

    if (userInfo) {
      // Chuyển đổi từ chuỗi JSON sang đối tượng
      // const userObject = JSON.parse(userData);
      // setUserInfo(userObject);

      // Lấy id từ đối tượng
      const userId = userInfo.id;

      orderService
        .getAllOrderUser(userId, limitPerPage, currentPage)
        .then((res) => {
          setOrdersList(res.data.results);
          setTotalOrders(res.data.totalResults);
          hiddenSpinner();

          // setPaymentPendingList(res.data.results.filter((order: any) => order?.orderStatus.code === 0 || order?.orderStatus.code === 2));
          // setConfirmPendingList(res.data.results.filter((order: any) => order?.orderStatus.code === 3 || order?.orderStatus.code === 1));
          // setPrepareList(res.data.results.filter((order: any) => order?.orderStatus.code === 4));
          // setShippingList(res.data.results.filter((order: any) => order?.orderStatus.code === 5 || order?.orderStatus.code === 6 || order?.orderStatus.code === 7));
          // setCompleteList(res.data.results.filter((order: any) => order?.orderStatus.code === 8));
          // setCancelList(res.data.results.filter((order: any) => order?.orderStatus.code === 9));
        })
        .catch((err) => {
          hiddenSpinner();
          console.error("Error fetching data:", err);
        });

      // setLengthWaitPayment(await getLengthStatus(userId, 1));
      // setLengthWaitConfirm(await getLengthStatus(userId, 2));
      // setLengthPrepare(await getLengthStatus(userId, 3));
      // setLengthShipping(await getLengthStatus(userId, 4));


      console.log("User ID:", userId);
    } else {
      console.log("User data not found in localStorage");
    }

  }

  useEffect(() => {
    fetchOrdersList();
  }, [location.search]);

  useEffect(() => {
    fetchOrdersList();
  }, []);
  const onChange = (key: string) => {
    showSpinner();
    console.log(key, 'key');
    if (key === 'all') {
      fetchOrdersList();
      return;
    }
    orderService.getAllOrderUserByStatusCode(userInfo.id, key).then((res) => {
      setOrdersList(res.data.results);
      hiddenSpinner();
    }).catch((error) => {
      hiddenSpinner();
      console.error("Error fetching data:", error);
    })
    console.log(ordersList, 'ordersList')
  };

  const label1 = (
    <>
      Chờ thanh toán <span className="ml-[1px] text-[#fe385c]"></span>
    </>
  );

  const label2 = (
    <>
      Chờ xác nhận <span className="ml-[1px] text-[#fe385c]"></span>
    </>
  );

  const label3 = (
    <>
      Chuẩn bị hàng <span className="ml-[1px] text-[#fe385c]"></span>
    </>
  );

  const label4 = (
    <>
      Đang giao hàng <span className="ml-[1px] text-[#fe385c]"></span>
    </>
  );

  // const label9 = (
  //   <>
  //     Hoàn thành <span className="ml-[1px] text-[#fe385c]">{completeList ? `(${completeList.length})` : null}</span>
  //   </>
  // );


  const items: TabsProps['items'] = [
    {
      key: 'all',
      label: 'Tất cả',
      children: <Item userInfo={userInfo} fetchOrdersList={fetchOrdersList} orderList={ordersList} setOrderList={setOrdersList} />,
    },
    {
      key: '1',
      label: label1,
      children: <Item userInfo={userInfo} fetchOrdersList={fetchOrdersList} orderList={ordersList} setOrderList={setOrdersList} />,
    },
    {
      key: '2',
      label: label2,
      children: <Item userInfo={userInfo} fetchOrdersList={fetchOrdersList} orderList={ordersList} setOrderList={setOrdersList} />,
    },
    {
      key: '3',
      label: label3,
      children: <Item userInfo={userInfo} fetchOrdersList={fetchOrdersList} orderList={ordersList} setOrderList={setOrdersList} />,
    },
    {
      key: '4',
      label: label4,
      children: <Item userInfo={userInfo} fetchOrdersList={fetchOrdersList} orderList={ordersList} setOrderList={setOrdersList} />,
    },
    {
      key: '9',
      label: 'Hoàn thành',
      children: <Item userInfo={userInfo} fetchOrdersList={fetchOrdersList} orderList={ordersList} setOrderList={setOrdersList} />,
    },
    {
      key: '10',
      label: 'Đã hủy',
      children: <Item userInfo={userInfo} fetchOrdersList={fetchOrdersList} orderList={ordersList} setOrderList={setOrdersList} />,
    },
    {
      key: '8',
      label: 'Trả hàng/Hoàn tiền',
      children: <Item userInfo={userInfo} fetchOrdersList={fetchOrdersList} orderList={ordersList} setOrderList={setOrdersList} />,
    },
  ];

  return (
    <div className="container pb-16 order-client">
      <h3 className="text-2xl my-8">Danh sách đơn hàng</h3>
      <Tabs type="card" defaultActiveKey="all" items={items} onChange={onChange} />
      <PaginationPage
        current={1}
        total={totalOrders}
        pageSize={limitPerPage} />
    </div>

  );
};

export default OrderPage;
