import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { formartCurrency, hiddenSpinner, showSpinner } from '../../util/util';
import { Button, Image, message, Modal } from 'antd';
import { getMessageByStatusCode } from '../../util/constant';
import orderService from '../../services/orderService';
import ButtonOption from './ButtonOption';
import { StepStatus } from '../../components/OrderAdmin/StepStatus';
import LogOrder from '../../components/OrderAdmin/LogOrder';

type Props = {}

const OrderDetail = (props: Props) => {
  window.scrollTo(0, 0);
  const { id } = useParams();

  const [order, setOrder] = useState<any>(null);

  const userInfo = JSON.parse(localStorage.getItem("USER_INFO_FASHION") || "{}");


  const fetchOrderDetail = async () => {
    showSpinner();
    if (id) {
      try {
        const res = await orderService.getOrderDetail(id);
        setOrder(res.data);
        console.log(res.data, 'res.data');
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

  console.log(order, 'order');
  return (
    <div className='container mb-16'>
      <div className='my-6'>
        <div className='my-2'>
          <Link to='/order'>
            <i className="fa-solid fa-chevron-left"></i>
            <span>Trở về</span>
          </Link>

        </div>
        <h3 className="text-2xl ">Chi tiết đơn hàng</h3>

        <div className='mt-4 mb-2'>
          <StepStatus order={order} />

        </div>
      </div>

      <div className="shadow">
        <div className="p-4 flex justify-between items-center" style={{ borderBottom: '1px dotted rgba(0,0,0,.09)' }}>
          <div>
            <span>MÃ ĐƠN HÀNG: <span className='font-medium'>{order?.orderCode}</span></span>
            <span className="mx-1">|</span>
            <span className="font-medium text-primary">{order?.orderStatus?.name}</span>
          </div>
          <div className="font-medium text-primary">{getMessageByStatusCode(order?.orderStatus?.code)}</div>

        </div>

        <div className="p-4">
          {order?.products.map((product: any) => (
            <div key={product._id}>
              <div className="flex justify-between items-center mb-2">
                <div className="flex gap-2">
                  <div>
                    {/* <img className="w-20 h-20 object-cover" src={product.imageProduct} alt={product.productName} /> */}
                    <Image
                      width={80}
                      src={product.image}
                      alt={product.productName}
                      style={{ height: '80px', objectFit: 'cover', marginRight: '8px', borderRadius: '8px' }}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg">{product.productName}</h3>
                    <p className="normal-case text-[#757575]">
                      Phân loại hàng: <span className="">{product.variantName}</span>
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
                  <span className="text-lg text-primary">₫{formartCurrency(product.price * product.quantity)}</span>
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
            <p className="text-sm text-gray-500">Đơn vị vận chuyển: <span className="text-primary font-semibold">Giao hàng nhanh</span></p>
          </div>
          <div className="flex pt-4">
            <div className="w-2/5 pr-5 border-gray-300" style={{ borderRightWidth: 1 }}>
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h4 className="">{order?.shippingAddress.name}</h4>
                  <div className="text-sm text-gray-500 space-y-1 normal-case">
                    <p>{order?.shippingAddress.phoneNumber}</p>
                    <p>{order?.shippingAddress.address}, {order?.shippingAddress.ward}, {order?.shippingAddress.district}, {order?.shippingAddress.province}</p>
                    <p>Ghi chú: {order?.note || 'Không có'}</p>
                  </div>
                </div>
                <div className='mt-10'>
                  <LogOrder logs={order?.logs} />

                </div>
              </div>
            </div>
            <div className="w-3/5 pl-5 text-sm text-gray-500 normal-case">
              <div>
                <div className="flex justify-between items-center py-3 border-gray-200" style={{ borderBottomWidth: 1 }}>
                  <p className='font-medium'>Tổng tiền hàng</p>
                  <p>₫{formartCurrency(order?.subTotal)}</p>
                </div>
                <div className="flex justify-between items-center py-3 border-gray-200" style={{ borderBottomWidth: 1 }}>
                  <p className='font-medium'>Giảm giá</p>
                  <p>{formartCurrency(order?.discountAmount)}</p>
                </div>
                <div className="flex justify-between items-center py-3 border-gray-200" style={{ borderBottomWidth: 1 }}>
                  <p className='font-medium'>Phí vận chuyển</p>
                  <p>₫{formartCurrency(order?.shippingFee)}</p>
                </div>
                <div className="flex justify-between items-center py-2 border-gray-300" style={{ borderBottomWidth: 1 }}>
                  <p className='font-medium'>Thành tiền</p>
                  <p className="text-2xl text-primary font-semibold">₫{formartCurrency(order?.totalPrice)}</p>
                </div>
                <div className="flex justify-between items-center py-3 border-gray-200">
                  <p className='font-medium'>
                    <i className="fa-solid fa-file-invoice-dollar text-primary"></i>
                    Phương thức Thanh toán
                  </p>
                  <p>{order?.paymentMethod}</p>
                </div>
              </div>
              <div className=' flex justify-end mt-8'>
                <ButtonOption userInfo={userInfo} orderId={order?._id} orderStatus={order?.orderStatus?.code} fetchOrdersList={fetchOrderDetail} setOrderList={setOrder} onPage='detail' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail