import { Button, message, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ReviewForm from './ReviewForm'
import orderService from '../../services/orderService'
import { hiddenSpinner, showSpinner } from '../../util/util'

type Props = {
    orderStatus: number,
    orderId: string,
    fetchOrdersList: any
}

const ButtonOption = ({ orderStatus, orderId, fetchOrdersList }: Props) => {
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
    return (
        <div className="flex space-x-2">

            {
                (orderStatus === 1) &&
                <Link to={`/order/${orderId}/detail`} className="btn1 block text-center rounded-md min-w-[150px] py-2 bg-[#fe385c] text-white uppercase" style={{ borderWidth: "1px" }}>
                    Thanh toán ngay
                </Link>
            }
            {
                orderStatus === 9 &&
                <>
                    <Button onClick={() => setReviewFormOpen(true)} className="h-10 btn1 block text-center rounded-md min-w-[150px] py-2 bg-[#fe385c] text-white uppercase" style={{ borderWidth: "1px" }}>
                        Đánh giá
                    </Button>
                    <Modal
                        title="Đánh giá sản phẩm"
                        // centered
                        footer={null}
                        open={reviewFormOpen}
                        onOk={() => setReviewFormOpen(false)}
                        onCancel={() => setReviewFormOpen(false)}
                        width={1000}
                    >
                        <ReviewForm orderId={orderId} setFormReviewValues={setFormReviewValues}></ReviewForm>
                    </Modal>
                </>
            }
            {
                orderStatus === 6 &&
                <>
                    <Button onClick={() => showReceiveModal(orderId)} className="h-10 btn1 block text-center rounded-md min-w-[180px] py-2 bg-[#fe385c] text-white uppercase" style={{ borderWidth: "1px" }}>
                        Đã nhận được hàng
                    </Button>
                    <Modal title="Xác nhận đã nhận hàng" open={isModalOpen} onOk={handleReceiveOrder} onCancel={handleCancel}>
                        <p>Xác nhận đã nhận hàng?</p>
                    </Modal>
                </>
            }
            {
                (orderStatus === 4 || orderStatus === 5) &&
                <button className="h-10 btn1 block text-center rounded-md min-w-[180px] py-2 bg-gray-200 text-white uppercase" style={{ borderWidth: "1px" }}>
                    Đã nhận được hàng
                </button>
            }

            {
                (orderStatus === 1 || orderStatus === 2 || orderStatus === 3) &&
                <>
                    <Button onClick={() => showCancelOrder(orderId)} className="btn2 block text-center rounded-md h-10 min-w-[130px] py-2 bg-slate-50 uppercase" style={{ borderWidth: "1px" }}>
                        Huỷ đơn hàng
                    </Button>
                    {/* <Modal title="Xác nhận hủy đơn hàng" open={isModalOpen} onOk={handleDelete} onCancel={handleCancel}>
                                                <p>Bạn có chắc chắn muốn hủy đơn hàng này?</p>
                                            </Modal> */}
                </>
            }
            {/* <Link to={`/order/${order._id}/detail`} className="btn1 block text-center rounded-md min-w-[100px] py-2 uppercase" style={{ borderWidth: "1px" }}>
                                            Chi tiết
                                        </Link> */}
        </div>
    )
}

export default ButtonOption