import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, message, Modal, Select } from 'antd';
import { formartCurrency, hiddenSpinner, showSpinner } from '../../../util/util';
import orderService from '../../../services/orderService';
import { getNameByStatusCode, orderStatusValue } from '../../../util/constant';
import { StepStatus } from '../../../components/OrderAdmin/StepStatus';
import ProductOrderDetail from '../../../components/OrderAdmin/productOrderDetail';
import InforUserDetail from '../../../components/OrderAdmin/InforUserDetail';
import LogOrder from '../../../components/OrderAdmin/LogOrder';
import { OrderActions } from '../../../components/OrderAdmin/OrderAction';

type Props = {}


const OrderDetailAdmin = (props: Props) => {
  window.scrollTo(0, 0);
  const { id } = useParams();

  const [order, setOrder] = useState<any>(null);

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

  console.log(order, 'order');
  return (
    <>

      <div className='min-w-[600px]'>
        <div className='my-6'>
          <div className='my-4'>
            <Link to='/admin/order'>
              <i className="fa-solid fa-chevron-left"></i>
              <span>Trở về</span>
            </Link>
          </div>
          <span>MÃ ĐƠN HÀNG: <span className='font-medium'>{order?.orderCode}</span></span>

          <div className='my-4'>
            <StepStatus order={order} />

          </div>

        </div>

        <div className='mb-4 flex justify-between items-center'>
          {/* <Select
            options={options}
            // value={order?.orderStatus?.code}
            onChange={(value) => onUpdateStatus(value)}
            style={{ width: 250, height: 40 }}
            placeholder="Cập nhật trạng thái đơn hàng"
          /> */}
          <OrderActions record={order} setOrderList={setOrder} onPage={'detail'} fetchOrder={fetchOrderDetail} />
          <div>
            <span className='text-xl text-primary2 font-medium'>{getNameByStatusCode(order?.orderStatus?.code)}</span>
          </div>
        </div>

        <div className=''>
          <div className=''>
            <ProductOrderDetail order={order} />

            <div className='mt-6 mb-10 flex '>
              <div className='w-3/5 pr-10'>
                <InforUserDetail order={order} />
                <LogOrder logs={order?.logs} />
              </div>
              <div className="w-2/5 pl-10 text-sm text-gray-500 normal-case border-l border-gray-200">
                <div className="flex justify-between items-center py-6 border-gray-200" style={{ borderBottomWidth: 1 }}>
                  <p className='font-medium'>Tổng tiền hàng</p>
                  <p>{formartCurrency(order?.subTotal)}</p>
                </div>
                <div className="flex justify-between items-center py-6 border-gray-200" style={{ borderBottomWidth: 1 }}>
                  <p className='font-medium'>Giảm giá</p>
                  <p>{formartCurrency(order?.discountAmount)}</p>
                </div>
                <div className="flex justify-between items-center py-6 border-gray-200" style={{ borderBottomWidth: 1 }}>
                  <p className='font-medium'>Phí vận chuyển</p>
                  <p>{formartCurrency(order?.shippingFee)}</p>
                </div>
                <div className="flex justify-between items-center py-6 border-gray-300" style={{ borderBottomWidth: 1 }}>
                  <p className='font-medium'>Thành tiền</p>
                  <p className="text-2xl font-medium">{formartCurrency(order?.totalPrice)}</p>
                </div>
                <div className="flex justify-between items-center py-6 border-gray-200">
                  <p className='font-medium'>
                    <i className="fa-solid fa-file-invoice-dollar "></i>
                    Phương thức Thanh toán
                  </p>
                  <p>{order?.paymentMethod}</p>
                </div>
              </div>
            </div>
          </div>

        </div>



      </div>

    </>
  )
}

export default OrderDetailAdmin