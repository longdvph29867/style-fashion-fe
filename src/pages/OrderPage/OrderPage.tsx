import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Tabs, TabsProps } from "antd";
import Item from "./Item";
import { hiddenSpinner, showSpinner } from "../../util/util";
import orderService from "../../services/orderService";
import PaginationPage from "../../components/PaginationPage/PaginationPage";
import { localUserService } from "../../services/localService";

const OrderPage = () => {
  // const location = useLocation();
  // const params = new URLSearchParams(location.search);
  // const userId = params.get("user");
  // const userId = '666eaa54b5ee1db4f34bb02c'
  const [ordersList, setOrdersList] = useState<any>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [totalOrders, setTotalOrders] = useState(0);
  const limitPerPage = 10;
  const currentPage = params.get("page") ? Number(params.get("page")) : 1;

  // const [userInfo, setUserInfo] = useState<any>(null);
  const userInfo = JSON.parse(localStorage.getItem("USER_INFO_FASHION") || "{}");

  const infoUser = localUserService.get();

  useEffect(() => {
    if (!infoUser) {
      window.location.href = "/auth/login";
    }
  }, [infoUser]);


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
      const orderStatus = params.get("orderStatus");
      // console.log(orderStatus, 'orderStatus')
      // return

      if (orderStatus) {
        orderService
          .getAllOrderUser(userId, limitPerPage, currentPage, orderStatus)
          .then((res) => {
            setOrdersList(res.data.results);
            setTotalOrders(res.data.totalResults);
            hiddenSpinner();
          })
          .catch((err) => {
            hiddenSpinner();
            console.error("Error fetching data:", err);
          });
      } else {
        orderService
          .getAllOrderUser(userId, limitPerPage, currentPage, null)
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


      // setLengthWaitPayment(await getLengthStatus(userId, 1));
      // setLengthWaitConfirm(await getLengthStatus(userId, 2));
      // setLengthPrepare(await getLengthStatus(userId, 3));
      // setLengthShipping(await getLengthStatus(userId, 4));


      // console.log("User ID:", userId);
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
    // console.log(key, 'key');
    params.set("page", "1");
    // console.log(location, 'location')
    // console.log(params.toString(), 'params.toString()')
    // console.log(params.get("list"), 'params.get("list")')
    if (key === 'all') {
      params.delete("orderStatus");
      navigate(location.pathname + "?" + params.toString());
      return;
    }
    params.set("orderStatus", key.toString());
    navigate(location.pathname + "?" + params.toString());

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
      key: '0',
      label: label1,
      children: <Item userInfo={userInfo} fetchOrdersList={fetchOrdersList} orderList={ordersList} setOrderList={setOrdersList} />,
    },
    {
      key: '1,2',
      label: label2,
      children: <Item userInfo={userInfo} fetchOrdersList={fetchOrdersList} orderList={ordersList} setOrderList={setOrdersList} />,
    },
    {
      key: '3',
      label: label3,
      children: <Item userInfo={userInfo} fetchOrdersList={fetchOrdersList} orderList={ordersList} setOrderList={setOrdersList} />,
    },
    {
      key: '4,5,6',
      label: label4,
      children: <Item userInfo={userInfo} fetchOrdersList={fetchOrdersList} orderList={ordersList} setOrderList={setOrdersList} />,
    },
    {
      key: '7,9',
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
        pageSize={limitPerPage}
        currentUrl={null} // Page không có filter, sort nên truyền null
      />
    </div>

  );
};

export default OrderPage;
