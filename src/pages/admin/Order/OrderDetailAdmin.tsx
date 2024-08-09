import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, message, Modal, Select } from 'antd';
import { formartCurrency, hiddenSpinner, showSpinner } from '../../../util/util';
import orderService from '../../../services/orderService';
import { orderStatusValue } from '../../../util/constant';

type Props = {}

const OrderDetailAdmin = (props: Props) => {
  window.scrollTo(0, 0);
  const { id } = useParams();

  const [order, setOrder] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReceivedOrderId, setSelectedReceivedOrderId] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [nextStatus, setNextStatus] = useState(null);

  const { confirm } = Modal;

  const fetchOrderDetail = async () => {
    showSpinner();
    if (id) {
      try {
        const res = await orderService.getOrderDetail(id);
        setOrder(res.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        hiddenSpinner();
      }
    }
  };

  useEffect(() => {
    fetchOrderDetail();
  }, []);

  useEffect(() => {
    if (order) {
      setCurrentStatus(order?.orderStatus?.code);
      setNextStatus(order?.orderStatus?.code + 1);
    }
  }, [order]);

  const handleReceiveOrder = async () => {
    setIsModalOpen(false);
    try {
      showSpinner();
      if (selectedReceivedOrderId !== null) {
        const data = await orderService.receivedOrder(selectedReceivedOrderId);
        if (data) {
          message.success('Thao tác thành công');
          fetchOrderDetail();
          hiddenSpinner();
        }
      }
    } catch (error) {
      hiddenSpinner();
      console.log(error);
      message.error(error.response.data.message);
    }
    setSelectedReceivedOrderId(null);
  };

  const showReceiveModal = (id: any) => {
    setIsModalOpen(true);
    setSelectedReceivedOrderId(id);
  };

  const handleCancelOrder = async (id: string) => {
    setIsModalOpen(false);
    try {
      showSpinner();
      if (id) {
        const data = await orderService.cancelOrder(id);
        if (data) {
          message.success('Hủy thành công');
          fetchOrderDetail();
          hiddenSpinner();
        }
      }
    } catch (error) {
      hiddenSpinner();
      console.log(error);
      message.error(error.response.data.message);
    }
  };


  const showCancelOrder = (id: string) => {
    confirm({
      title: 'Bạn có chắc chắn muốn hủy đơn hàng này?',
      onOk() {
        handleCancelOrder(id);
      },
      onCancel() {
        console.log('Cancel');
      },
      maskClosable: true,
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedReceivedOrderId(null);
  };

  const options = orderStatusValue.map(status => ({
    value: status.code,
    label: <span>{status.name}</span>,
    disabled: status.code !== nextStatus,
  }));

  const onUpdateStatus = async (value: any) => {
    console.log(value, 'value');
  }

  console.log(order, 'order');
  return (
    <div className='container mb-16'>
      <div className='my-6'>
        <div className='my-2'>
          <Link to='/admin/order'>
            <i className="fa-solid fa-chevron-left"></i>
            <span>Trở về</span>
          </Link>

        </div>
        <h3 className="text-2xl ">Chi tiết đơn hàng</h3>
      </div>

      <div className="shadow">
        <div className="p-4 flex justify-between items-center" style={{ borderBottom: '1px dotted rgba(0,0,0,.09)' }}>
          <div>
            <span>MÃ ĐƠN HÀNG: {order?.orderCode}</span>
            <span className="mx-1">|</span>
            <span className="text-[#62d2a2]">{order?.orderStatus?.name}</span>
          </div>
        </div>

        <div className="p-4">
          {order?.productsOrder.map((product: any) => (
            <div key={product._id}>
              <div className="flex justify-between items-center mb-2">
                <div className="flex">
                  <div className="border-gray-400 mr-3" style={{ borderWidth: 1 }}>
                    <img className="w-20 h-20 object-cover" src={product.imageProduct} alt={product.productName} />
                  </div>
                  <div>
                    <h3 className="text-lg">{product.productName}</h3>
                    <p className="normal-case text-[#757575]">
                      Phân loại hàng: <span className="">{product.attribute}</span>
                    </p>
                    <p className="normal-case text-[#212121] ">
                      {/* Số lượng: <span className="text-xl">{product.quantity} x </span> Cái */}
                      x{product.quantity}
                    </p>
                    {/* <p className="normal-case">Số lượng: <span className="text-xl">{product.quantity} x </span> {product.attribute}</p> */}
                  </div>
                </div>
                <p className="normal-case">
                  {/* <span className="line-through">₫{product.price * product.quantity}</span> */}
                  <span className="text-lg text-[#62d2a2]">{formartCurrency(product.price * product.quantity)}</span>
                </p>
              </div>
              <div className="h-[1px] bg-gray-300 my-2"></div>
            </div>
          ))}
        </div>

        <div className="h-1"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg,#6fa6d6,#6fa6d6 33px,transparent 0,transparent 41px,#f18d9b 0,#f18d9b 74px,transparent 0,transparent 82px)'
          }}
        ></div>

        <div className="p-5">
          <div className="flex justify-between">
            <h3 className="font-semibold text-xl">Địa Chỉ Nhận Hàng</h3>
            <p className="text-sm text-gray-500">Đơn vị vận chuyển: <span className="text-[#62d2a2]">Giao hàng nhanh</span></p>
          </div>
          <div className="flex pt-4">
            <div className="w-2/5 pr-5 border-gray-300" style={{ borderRightWidth: 1 }}>
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h4 className="font-medium">{order?.shippingAddress.recipientName}</h4>
                  <div className="text-sm text-gray-500 space-y-1 normal-case">
                    <p>{order?.shippingAddress.recipientPhoneNumber}</p>
                    <p>{order?.shippingAddress.streetAddress}, {order?.shippingAddress.wardCommune}, {order?.shippingAddress.district}, {order?.shippingAddress.cityProvince}</p>
                    <p>Ghi chú: {order?.note || 'Không có'}</p>
                  </div>
                </div>
                <div className="text-[#62d2a2]">{order?.orderStatus?.name}</div>
              </div>
            </div>
            <div className="w-3/5 pl-5 text-sm text-gray-500 normal-case">
              <div className="flex justify-between items-center py-3 border-gray-200" style={{ borderBottomWidth: 1 }}>
                <p>Tổng tiền hàng</p>
                <p>{formartCurrency(order?.historicalCost)}</p>
              </div>
              <div className="flex justify-between items-center py-3 border-gray-200" style={{ borderBottomWidth: 1 }}>
                <p>Phí vận chuyển</p>
                <p>{formartCurrency(order?.shippingFee)}</p>
              </div>
              <div className="flex justify-between items-center py-2 border-gray-300" style={{ borderBottomWidth: 1 }}>
                <p>Thành tiền</p>
                <p className="text-2xl text-[#62d2a2] font-semibold">{formartCurrency(order?.totalPrice)}</p>
              </div>
              <div className="flex justify-between items-center py-3 border-gray-200">
                <p>
                  <i className="fa-solid fa-file-invoice-dollar text-[#62d2a2]"></i>
                  Phương thức Thanh toán
                </p>
                <p>{order?.paymentMethod}</p>
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-end p-6'>
          <Select
            options={options}
            value={order?.orderStatus?.code}
            onChange={(value) => onUpdateStatus(value)}
            style={{ width: 250, height: 40 }}
          />

        </div>
      </div>
    </div>
  )
}

export default OrderDetailAdmin