import { Link } from 'react-router-dom'
import { formartCurrency } from '../../../util/util'
import { getNameByStatusCode } from '../../../util/constant'

type Props = {
    orderList: any,
    fetchOrdersList: any
}

const Item = ({ orderList }: Props) => {
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
                                <span>{getNameByStatusCode(order?.orderStatus)}</span>
                            </div>
                            <div>




                            </div>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    )
}

export default Item