import {
    HomeOutlined,
    CreditCardOutlined

} from "@ant-design/icons";
//   import { useTranslate } from "@refinedev/core";
import { Tag } from "antd";



type OrderStatusProps = {
    paymentMethod: 'COD' | 'VNPAY';
};

export const PaymentMethod: React.FC<OrderStatusProps> = ({ paymentMethod }) => {
    // const t = useTranslate();
    let color;
    let icon;

    switch (paymentMethod) {
        case 'COD':
            // Chờ thanh toán
            color = "orange";
            icon = <HomeOutlined />;
            break;
        case 'VNPAY':
            // Đã thanh toán
            color = "cyan";
            icon = <CreditCardOutlined />;
            break;
    }

    return (
        <Tag color={color} icon={icon}>
            {paymentMethod}
        </Tag>
    );
};
