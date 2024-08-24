import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { formartCurrency, hiddenSpinner, showSpinner } from '../../util/util'
import { Button, Image, message, Modal, Skeleton } from 'antd'
import { getMessageByStatusCode } from '../../util/constant';
import ReviewForm from './ReviewForm'
import orderService from '../../services/orderService';
import ButtonOption from './ButtonOption';

type Props = {
    orderList: any,
    fetchOrdersList: any,
    setOrderList: any,
    userInfo: any
}

const Item = ({ orderList, fetchOrdersList, setOrderList, userInfo }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [selectedReceivedOrderId, setSelectedReceivedOrderId] = useState(null);

    const { confirm } = Modal;

    const [reviewFormOpen, setReviewFormOpen] = useState(false);
    const [formReviewValue, setFormReviewValues] = useState(null);

    useEffect(() => {
        console.log(formReviewValue)
        if (formReviewValue) {
            orderService.reviewProduct(formReviewValue).then((res) => {
                if (res) {
                    message.success('Đánh giá thành công')
                    fetchOrdersList()
                }
            }).catch((error) => {
                console.log(error)
                message.error(error.response.data.message)
            }).finally(() => {
                setReviewFormOpen(false)
            })
        }
    }, [formReviewValue])


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

    const handleReview = (id: string) => {
        setReviewFormOpen(true)

    }

    return (
        <div className='mt-2'>
            {/* {!orderList ? <>
                <div className='flex gap-2 mb-4'>
                    <Skeleton.Image active />
                    <Skeleton active />
                </div>
                <div className='flex gap-2 mb-4'>
                    <Skeleton.Image active />
                    <Skeleton active />
                </div>
                <div className='flex gap-2 mb-4'>
                    <Skeleton.Image active />
                    <Skeleton active />
                </div>
            </> : null} */}
            {orderList?.map((order: any) => (
                <div key={order._id} className="shadow rounded  mb-12 bg-white">
                    {order?.products.map((product: any) => (
                        <Link to={`/order/${order._id}`} key={product._id}>
                            <div className="flex justify-between items-center p-4">
                                <div className="flex gap-4">
                                    <div>
                                        <Image
                                            width={80}
                                            src={product.image}
                                            alt={product.productName}
                                            style={{ height: '80px', objectFit: 'cover', marginRight: '8px', borderRadius: '8px' }}
                                        />
                                    </div>
                                    {/* <div className="border-gray-400 mr-3" style={{ borderWidth: "1px" }}>
                                        <img className="w-20 h-20 object-cover" src={product.image} alt={product.productName} />
                                        
                                    </div> */}
                                    <div>
                                        <h3 className="text-lg text-[#212121] ">{product.productName}</h3>
                                        <p className="normal-case text-[#757575]">
                                            Phân loại hàng: <span className="">{product.variantName}</span>
                                        </p>
                                        <p className="normal-case text-[#212121] ">
                                            {/* Số lượng: <span className="text-xl">{product.quantity} x </span> Cái */}
                                            x{product.quantity}
                                        </p>
                                    </div>
                                </div>
                                <p className="normal-case">
                                    <span className="text-xl text-[#fe385c] font-medium">{formartCurrency(product.price * product.quantity)}</span>
                                </p>
                            </div>
                            <div className="h-[1px] bg-gray-100"></div>

                        </Link>

                    ))}
                    <div className="h-[1px] bg-gray-200"></div>
                    <div className=' p-6'>
                        <div className="pb-8 text-right">
                            <i className="fa-solid fa-file-invoice-dollar text-[#fe385c]"></i>
                            <span className='text-lg'>Thành tiền: </span>
                            <span className="text-2xl ml-2 text-[#fe385c] font-semibold">{formartCurrency(order.totalPrice)}</span>
                        </div>
                        <div className="flex justify-between items-end">
                            <div className="text-[#fe385c]">
                                <i className="fa-solid fa-truck"></i>
                                <span className='font-medium'>{getMessageByStatusCode(order?.orderStatus.code)}</span>
                            </div>
                            <div>
                                <ButtonOption userInfo={userInfo} orderId={order._id} orderStatus={order.orderStatus.code} fetchOrdersList={fetchOrdersList} setOrderList={setOrderList} onPage='all' />

                            </div>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    )
}

export default Item