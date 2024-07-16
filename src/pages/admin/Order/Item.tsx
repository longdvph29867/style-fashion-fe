import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, message, Modal } from 'antd'
import { formartCurrency, hiddenSpinner, showSpinner } from '../../../util/util'
import orderService from '../../../services/orderSerivce'
import { getOrderStatusName } from '../../../util/constant'

type Props = {
    orderList: any,
    fetchOrdersList: any
}

const Item = ({ orderList, fetchOrdersList }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [selectedReceivedOrderId, setSelectedReceivedOrderId] = useState(null);

    const { confirm } = Modal;



    const handleReceiveOrder = async () => {
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

    const handleCancelOrder = async (id: string) => {
        setIsModalOpen(false);
        try {
            showSpinner();
            if (id) {
                const data = await orderService.cancelOrder(id);
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
    // const showDeleteModal = (id: any) => {
    //     setIsModalOpen(true);
    //     setSelectedOrderId(id);
    // };
    return (
        <div className=' mt-2'>
            {orderList?.map((order: any) => (
                <div key={order._id} className="shadow rounded  mb-12 bg-white">
                    {order?.productsOrder.map((product: any) => (
                        <Link to={`/admin/order/${order._id}`} key={product._id}>
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
                                    <span className="text-lg text-[#62d2a2]">{`₫${formartCurrency(product.price * product.quantity)}`}</span>
                                </p>
                            </div>
                            <div className="h-[1px] bg-gray-100"></div>

                        </Link>

                    ))}
                    <div className="h-[1px] bg-gray-200"></div>
                    <div className=' p-6'>
                        <div className="pb-8 text-right">
                            <i className="fa-solid fa-file-invoice-dollar text-[#62d2a2]"></i>
                            <span>Thành tiền: </span>
                            <span className="text-2xl text-[#62d2a2] font-semibold">{`${formartCurrency(order.totalPrice)}`}</span>
                        </div>
                        <div className="flex justify-between items-end">
                            <div className="text-[#EE4D2D] uppercase">
                                <i className="fa-solid fa-truck"></i>
                                <span>{getOrderStatusName(order?.orderStatus)}</span>
                            </div>
                            <div>

                                <div className="flex space-x-2">

                                    {
                                        order.orderStatus === 0 &&
                                        <span className='text-green-600 uppercase text-lg'>Chờ người bán thanh toán</span>
                                        // <Link to={`/order/${order._id}/detail`} className="btn1 block text-center rounded-md min-w-[150px] py-2 bg-green-600 text-white uppercase" style={{ borderWidth: "1px" }}>
                                        //     Thanh toán ngay
                                        // </Link>
                                    }
                                    {
                                        order.orderStatus === 5 &&
                                        <Link to={`/order/${order._id}/review`} className="btn1 block text-center rounded-md min-w-[150px] py-2 bg-[#EE4D2D] text-white uppercase" style={{ borderWidth: "1px" }}>
                                            Đánh giá
                                        </Link>
                                    }
                                    {
                                        order.orderStatus === 4 &&
                                        <>
                                            <span className='text-green-600 uppercase text-lg'>Chờ người bán xác nhận</span>
                                            {/* <Button onClick={() => showReceiveModal(order._id)} className="h-10 btn1 block text-center rounded-md min-w-[180px] py-2 bg-[#EE4D2D] text-white uppercase" style={{ borderWidth: "1px" }}>
                                                Đã nhận được hàng
                                            </Button> */}
                                            {/* <Modal title="Xác nhận đã nhận hàng" open={isModalOpen} onOk={handleReceiveOrder} onCancel={handleCancel}>
                                                <p>Xác nhận đã nhận hàng?</p>
                                            </Modal> */}
                                        </>
                                    }
                                    {
                                        order.orderStatus === 1 &&
                                        <>
                                            <>
                                                <Button onClick={() => showReceiveModal(order._id)} className="btn2 block text-center rounded-md h-10 min-w-[130px] py-2 bg-green-600 text-white uppercase" style={{ borderWidth: "1px" }}>
                                                    Xác nhận đơn hàng
                                                </Button>
                                                <Modal title="Xác nhận đã nhận hàng" open={isModalOpen} onOk={handleReceiveOrder} onCancel={handleCancel}>
                                                    <p>Xác nhận đã nhận hàng?</p>
                                                </Modal>
                                            </>
                                            <>
                                                <Button onClick={() => showCancelOrder(order._id)} className="btn2 block text-center rounded-md h-10 min-w-[130px] py-2 bg-slate-50 uppercase" style={{ borderWidth: "1px" }}>
                                                    Huỷ đơn hàng
                                                </Button>
                                            </>
                                        </>
                                    }
                                    {
                                        order.orderStatus === 2 &&
                                        <>
                                            <Button onClick={() => showReceiveModal(order._id)} className="btn2 block text-center rounded-md h-10 min-w-[130px] py-2 bg-green-600 text-white uppercase" style={{ borderWidth: "1px" }}>
                                                Giao hàng
                                            </Button>
                                        </>
                                    }
                                    {/* <Link to={`/order/${order._id}/detail`} className="btn1 block text-center rounded-md min-w-[100px] py-2 uppercase" style={{ borderWidth: "1px" }}>
                                            Chi tiết
                                        </Link> */}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    )
}

export default Item