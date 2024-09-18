import { Image, message, Select, Table } from "antd";
import { useEffect, useState } from "react";
import { orderStatusValue } from "../../../../util/constant";
import { OrderStatus } from "../../../../components/OrderAdmin/status";
import { formartCurrency } from "../../../../util/util";
import { PaymentMethod } from "../../../../components/OrderAdmin/paymentMethod";
import { Link } from "react-router-dom";
import { OrderActions } from "../../../../components/OrderAdmin/OrderAction";
import { https } from "../../../../config/axios";
import TitleDashboard from "../../../../components/Common/Admin/TitleDashboard/TitleDashboard";


const OrderList = () => {
    const [ordersList, setOrdersList] = useState<any>(null);

    //   params.set("sortBy", "createdAt:desc");

    const [loading, setLoading] = useState(false);

    const fetchOrdersList = async () => {
        setLoading(true);
        try {
            const { data } = await https.get("/orders?sortBy=createdAt:desc&limit=10");
            setOrdersList(data.results);
            setLoading(false);
            window.scrollTo(0, 0);
        } catch (error) {
            setLoading(false);
            console.log(error);
            message.error("Lỗi khi lấy dữ liệu");
        }
    }

    useEffect(() => {
        fetchOrdersList();
    }, []);

    const statusFilters = orderStatusValue.map((status) => ({
        text: status.name,
        value: status.code,
    }));

    const columns: any = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'orderCode',
            key: 'orderCode',
            render: (text: any, record: any) => <span className="text-blue-600"><Link to={`/admin/order/${record._id}`}>{text}</Link></span>,
            width: 100
        },
        {
            title: 'Trạng thái',
            dataIndex: 'orderStatus',
            key: 'orderStatus',
            filters: statusFilters,
            // onFilter: (value: any, record: any) => record.orderStatus.code === value,
            render: (status: any) => <OrderStatus statusCode={status.code} />,
            width: 230,
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'products',
            key: 'imageAtrribute',
            render: (productsOrder: any) => (
                <div className="">
                    {productsOrder.map((product: any) => (
                        <Image
                            key={product._id}
                            src={product.image}
                            alt={product.productName}
                            style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '8px', borderRadius: '8px' }}
                        />
                    ))}
                </div>
            ),
            width: 280, // Chiều rộng tối đa của cột
            // ellipsis: true, // Sử dụng ellipsis nếu nội dung quá dài
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (price: any) => formartCurrency(price),
            //   sorter: true,
            //   sortOrder: sorterState.sortedInfo?.columnKey === 'totalPrice' && sorterState.sortedInfo?.order,
            // sorter: (a: any, b: any) => a.totalPrice - b.totalPrice,
        },
        {
            title: 'Thanh toán',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
            // filters: [
            //   { text: 'COD', value: 'COD' },
            //   { text: 'VNPAY', value: 'VNPAY' },
            // ],
            render: (paymentMethod: 'COD' | 'VNPAY') => <PaymentMethod paymentMethod={paymentMethod} />,
        },
        {
            title: 'Người dùng',
            dataIndex: ['shippingAddress', 'name'],
            key: 'recipientName',
            render: (_: any, record: any) => <Link to={`/admin/users/${record.user}`}>{record.shippingAddress.name}</Link>,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text: any) => new Date(text).toLocaleString(),
        },
        {
            fixed: "right",
            title: 'Hành động',
            dataIndex: "actions",
            key: "actions",
            render: (_value: any, record: any) => <OrderActions record={record} setOrderList={setOrdersList} onPage={'list'} fetchOrder={fetchOrdersList} />,
            width: 110,
        }

    ];

    return (
        <div className="">
            <TitleDashboard
                title="Đơn hàng mới nhất"
                subtitle="Danh sách 10 đơn hàng mới nhất"
            />
            <Table
                className="mt-8"
                loading={loading}
                pagination={false}
                dataSource={ordersList}
                columns={columns}
                rowKey="_id"
            />
        </div>

    );
};

export default OrderList;
