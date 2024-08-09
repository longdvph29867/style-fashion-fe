import React from 'react'

type Props = {}

const ButtonOptionOrderAdmin = (props: Props) => {
    return (
        <div className="flex space-x-2">
            {
                order.orderStatus === 0 &&
                <>
                    <span className='text-green-600 uppercase text-lg'>Chờ người mua thanh toán</span>
                    {/* <Button onClick={() => showReceiveModal(order._id)} className="h-10 btn1 block text-center rounded-md min-w-[180px] py-2 bg-[#EE4D2D] text-white uppercase" style={{ borderWidth: "1px" }}>
                                                Đã nhận được hàng
                                            </Button> */}
                    {/* <Modal title="Xác nhận đã nhận hàng" open={isModalOpen} onOk={handleReceiveOrder} onCancel={handleCancel}>
                                                <p>Xác nhận đã nhận hàng?</p>
                                            </Modal> */}
                </>
            }
            {
                order.orderStatus === 3 &&
                <>
                    <Button onClick={() => showReceiveModal(order._id)} className="btn2 block text-center rounded-md h-10 min-w-[130px] py-2 bg-green-600 text-white uppercase" style={{ borderWidth: "1px" }}>
                        Xác nhận đơn hàng
                    </Button>
                </>
            }
            {
                order.orderStatus === 5 &&
                <Button onClick={() => showReceiveModal(order._id)} className="btn2 block text-center rounded-md h-10 min-w-[130px] py-2 bg-green-600 text-white uppercase" style={{ borderWidth: "1px" }}>
                    Giao hàng thành công
                </Button>
                // <Link to={`/order/${order._id}/review`} className="btn1 block text-center rounded-md min-w-[150px] py-2 bg-[#EE4D2D] text-white uppercase" style={{ borderWidth: "1px" }}>
                //     Đánh giá
                // </Link>
            }
            {
                order.orderStatus === 6 &&
                <>
                    <span className='text-green-600 uppercase text-lg'>Chờ người mua xác nhận</span>

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
                order.orderStatus === 4 &&
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
    )
}

export default ButtonOptionOrderAdmin