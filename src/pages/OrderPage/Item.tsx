import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { hiddenSpinner, showSpinner } from '../../util/util'
import { Button, message, Modal } from 'antd'
import orderService from '../../services/orderSerivce'

type Props = {
    orderList: any,
    fetchOrdersList: any
}

const Item = ({ orderList, fetchOrdersList }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [selectedReceivedOrderId, setSelectedReceivedOrderId] = useState(null);

    const handleReceiveOrder = async () => {
        console.log('Deleting review with id:', selectedOrderId);
        setIsModalOpen(false);
        try {
            showSpinner();
            if (selectedReceivedOrderId !== null) {
                const data = await orderService.receivedOrder(selectedReceivedOrderId);
                if (data) {
                    message.success('Thao tác thành công');
                    fetchOrdersList();
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

    const handleDelete = async () => {
        setIsModalOpen(false);
        try {
            showSpinner();
            if (selectedOrderId !== null) {
                const data = await orderService.cancelOrder(selectedOrderId);
                if (data) {
                    message.success('Hủy thành công');
                    fetchOrdersList();
                    hiddenSpinner();
                }
            }
        } catch (error) {
            hiddenSpinner();
            console.log(error);
            message.error(error.response.data.message);
        }
        setSelectedOrderId(null);
    };

    const showDeleteModal = (id: any) => {
        setIsModalOpen(true);
        setSelectedOrderId(id);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedOrderId(null);
        setSelectedReceivedOrderId(null);
    };
    return (
        <div className='mt-2'>
            {orderList?.map((order: any) => (
                <div key={order._id} className="shadow rounded  mb-12 bg-white">
                    <Link to={`/order/${order._id}`}>
                        {order?.productsOrder.map((product: any) => (
                            <>
                                <div className="flex justify-between items-center mb-2 p-6">
                                    <div className="flex">
                                        <div className="border-gray-400 mr-3" style={{ borderWidth: "1px" }}>
                                            <img className="w-20 h-20 object-cover" src={product.imageAtrribute} alt={product.productName} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg text-[#212121] ">{product.productName}</h3>
                                            <p className="normal-case text-[#757575]">
                                                Phân loại hàng: <span className="">{product.attribute}</span>
                                            </p>
                                            <p className="normal-case text-[#212121] ">
                                                {/* Số lượng: <span className="text-xl">{product.quantity} x </span> Cái */}
                                                x{product.quantity}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="normal-case">
                                        <span className="text-lg text-[#62d2a2]">{`₫${product.price * product.quantity}`}</span>
                                    </p>
                                </div>
                                <div className="h-[1px] bg-gray-100"></div>

                            </>

                        ))}
                        <div className="h-[1px] bg-gray-200"></div>
                        <div className=' p-6'>
                            <div className="pb-8 text-right">
                                <i className="fa-solid fa-file-invoice-dollar text-[#62d2a2]"></i>
                                <span>Thành tiền: </span>
                                <span className="text-2xl text-[#62d2a2] font-semibold">{`₫${order.totalPrice}`}</span>
                            </div>
                            <div className="flex justify-between items-end">
                                <div className="text-green-600 uppercase">
                                    <i className="fa-solid fa-truck"></i>
                                    <span>{order.paymentStatus.name}</span>
                                </div>
                                <div>

                                    <div className="flex space-x-2">

                                        {
                                            order.paymentStatus.code === 0 &&
                                            <Link to={`/order/${order._id}/detail`} className="btn1 block text-center rounded-md min-w-[150px] py-2 bg-green-600 text-white uppercase" style={{ borderWidth: "1px" }}>
                                                Thanh toán ngay
                                            </Link>
                                        }
                                        {
                                            order.paymentStatus.code === 5 &&
                                            <Link to={`/order/${order._id}/review`} className="btn1 block text-center rounded-md min-w-[150px] py-2 bg-[#EE4D2D] text-white uppercase" style={{ borderWidth: "1px" }}>
                                                Đánh giá
                                            </Link>
                                        }
                                        {
                                            order.paymentStatus.code === 4 &&
                                            <>
                                                <Button onClick={() => showReceiveModal(order._id)} className="h-10 btn1 block text-center rounded-md min-w-[180px] py-2 bg-[#EE4D2D] text-white uppercase" style={{ borderWidth: "1px" }}>
                                                    Đã nhận được hàng
                                                </Button>
                                                <Modal title="Xác nhận đã nhận hàng" open={isModalOpen} onOk={handleReceiveOrder} onCancel={handleCancel}>
                                                    <p>Xác nhận đã nhận hàng?</p>
                                                </Modal>
                                            </>
                                        }
                                        {
                                            (order.paymentStatus.code === 0 || order.paymentStatus.code === 1 || order.paymentStatus.code === 2) &&
                                            <>
                                                <Button onClick={() => showDeleteModal(order._id)} className="btn2 block text-center rounded-md h-10 min-w-[130px] py-2 bg-slate-50 uppercase" style={{ borderWidth: "1px" }}>
                                                    Huỷ đơn hàng
                                                </Button>
                                                <Modal title="Xác nhận hủy đơn hàng" open={isModalOpen} onOk={handleDelete} onCancel={handleCancel}>
                                                    <p>Bạn có chắc chắn muốn hủy đơn hàng này?</p>
                                                </Modal>
                                            </>
                                        }
                                        {/* <Link to={`/order/${order._id}/detail`} className="btn1 block text-center rounded-md min-w-[100px] py-2 uppercase" style={{ borderWidth: "1px" }}>
                                            Chi tiết
                                        </Link> */}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default Item