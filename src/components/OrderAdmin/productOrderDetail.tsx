import { Table, Typography, Image } from 'antd';

const { Text } = Typography;

type Props = {
    order: any;
}

const ProductOrderDetail = ({ order }: Props) => {
    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'productName',
            key: 'productName',
            render: (_: any, record: any) => (
                <div className='flex items-center gap-2'>
                    <Image
                        width={50}
                        src={record.image}
                        alt={record.productName}
                        style={{ height: '50px', objectFit: 'cover', marginRight: '8px', borderRadius: '8px' }}
                    />
                    <span className='font-medium'>{record.productName} - {record.variantName}</span>
                </div>
            ),
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
            render: (price: any) => <Text>{price.toLocaleString()} VND</Text>,
        },
        {
            title: 'Tổng tiền',
            key: 'total',
            render: (_: any, record: any) => (
                <Text>{(record.quantity * record.price).toLocaleString()} VND</Text>
            ),
        },
    ];


    return (
        <div>
            <Table
                columns={columns}
                dataSource={order?.products}
                pagination={false}
                rowKey="key"
            />
        </div>
    )
}

export default ProductOrderDetail