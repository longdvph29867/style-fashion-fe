import { Button, message, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ReviewForm from './ReviewForm'
import orderService from '../../services/orderService'
import { hiddenSpinner, showSpinner } from '../../util/util'
import { getNameByStatusCodeUser } from '../../util/constant'

type Props = {
    orderStatus: number,
    orderId: string,
    fetchOrdersList: any,
    setOrderList: any,
    onPage: string,
    userInfo: any
}

const ButtonOption = ({ orderStatus, orderId, setOrderList, fetchOrdersList, onPage, userInfo }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState<any>(null);
    const [selectedSatusCode, setSelectedStatusCode] = useState(null);
    const [selectedSatusName, setSelectedStatusName] = useState(null);

    const [reviewFormOpen, setReviewFormOpen] = useState(false);
    // const [formReviewValue, setFormReviewValues] = useState(null);


    // useEffect(() => {
    //     console.log(formReviewValue)
    //     if (formReviewValue) {
    //         orderService.reviewProduct(formReviewValue).then((res) => {
    //             if (res) {
    //                 message.success('Đánh giá thành công')
    //                 setOrderList((prev: any) => {
    //                     return prev.map((order: any) => {
    //                         if (order._id === selectedOrderId) {
    //                             order.orderStatus.code = 9
    //                         }
    //                         return order
    //                     })
    //                 })
    //                 hiddenSpinner();
    //                 fetchOrdersList()
    //             }
    //         }).catch((error) => {
    //             console.log(error)
    //             message.error(error.response.data.message)
    //         }).finally(() => {
    //             setReviewFormOpen(false)
    //         })
    //     }
    // }, [formReviewValue])

    const handleUpdateStatusOrder = async () => {
        setIsModalOpen(false);
        try {
            showSpinner();
            if (selectedOrderId && selectedSatusCode) {
                const data = await orderService.updateStatusOrder(selectedOrderId, selectedSatusCode, userInfo.id);
                if (data) {
                    message.success('Thao tác thành công');
                    if (onPage === 'detail') {
                        await fetchOrdersList();
                    } else {
                        setOrderList((prev: any) => {
                            return prev.map((order: any) => {
                                if (order._id === selectedOrderId) {
                                    order.orderStatus.code = selectedSatusCode
                                }
                                return order
                            })
                        })
                    }
                    hiddenSpinner();
                }
            }
        } catch (error) {
            hiddenSpinner();
            console.log(error);
            message.error(error.response.data.message);
        }
        setSelectedOrderId(null);
        setSelectedStatusCode(null);
        setSelectedStatusName(null);
    };

    const showUpdateStatusModal = (id: any, orderStatus: any, orderStatusName: any) => {
        setSelectedOrderId(id);
        setSelectedStatusCode(orderStatus);
        setSelectedStatusName(orderStatusName);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setSelectedOrderId(null);
        setSelectedStatusCode(null);
        setSelectedStatusName(null);
        setIsModalOpen(false);
    };

    const handlePayment = async () => {
        showSpinner();
        try {
            const data = await orderService.createVnpayV2(orderId);
            console.log(data)
            if (data) {
                window.location.href = data.data.url;
            }
            hiddenSpinner();
        } catch (error) {
            hiddenSpinner();
            message.error(error.response.data.message);
            console.log(error);
        }

    }
    return (
        <div className="flex space-x-2">
            {
                (orderStatus === 0) &&
                <Button onClick={handlePayment} className="h-10 btn1 block text-center rounded-md min-w-[180px] py-2 bg-[#fe385c] text-white uppercase" style={{ borderWidth: "1px" }}>
                    Thanh toán ngay
                </Button>
            }
            {
                orderStatus === 7 &&
                <>
                    <Button onClick={() => setReviewFormOpen(true)} className="h-10 btn1 block text-center rounded-md min-w-[150px] py-2 bg-[#fe385c] text-white uppercase" style={{ borderWidth: "1px" }}>
                        Đánh giá
                    </Button>
                    <Button onClick={() => showUpdateStatusModal(orderId, 8, getNameByStatusCodeUser(8))} className="h-10 btn1 block text-center rounded-md min-w-[150px] py-2 bg-slate-50  uppercase" style={{ borderWidth: "1px" }}>
                        Yêu Cầu Trả hàng/Hoàn tiền
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
                        <ReviewForm userInfo={userInfo} orderId={orderId} setOrderList={setOrderList} fetchOrdersList={fetchOrdersList} setReviewFormOpen={setReviewFormOpen} onPage={onPage}></ReviewForm>
                    </Modal>
                </>
            }
            {
                orderStatus === 6 &&
                <>
                    <Button onClick={() => showUpdateStatusModal(orderId, 7, getNameByStatusCodeUser(7))} className="h-10 btn1 block text-center rounded-md min-w-[180px] py-2 bg-[#fe385c] text-white uppercase" style={{ borderWidth: "1px" }}>
                        Đã nhận được hàng
                    </Button>
                </>
            }
            {
                (orderStatus === 4 || orderStatus === 5) &&
                <button className="h-10 btn1 block text-center rounded-md min-w-[180px] py-2 bg-gray-200 text-white uppercase" style={{ borderWidth: "1px" }}>
                    Đã nhận được hàng
                </button>
            }

            {
                (orderStatus === 1 || orderStatus === 2) &&
                <>
                    <Button onClick={() => showUpdateStatusModal(orderId, 10, getNameByStatusCodeUser(10))} className="btn2 block text-center rounded-md h-10 min-w-[130px] py-2 bg-slate-50 uppercase" style={{ borderWidth: "1px" }}>
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
            <Modal title="Thông báo xác nhận" open={isModalOpen} onOk={handleUpdateStatusOrder} onCancel={handleCancel}>
                <p>Xác nhận <span className="font-medium text-primary">{selectedSatusName}</span></p>
            </Modal>
        </div>
    )
}

export default ButtonOption