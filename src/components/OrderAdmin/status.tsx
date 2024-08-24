import {
    BellOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    FileDoneOutlined,
    InfoCircleOutlined,
    CheckOutlined,
    CreditCardOutlined
} from "@ant-design/icons";
//   import { useTranslate } from "@refinedev/core";
import { Tag } from "antd";
import { getNameByStatusCode } from "../../util/constant";
//   import { BikeIcon, BikeWhiteIcon } from "../../icons";
import { FaShippingFast } from "react-icons/fa";
import { BikeWhiteIcon } from "../Icons/bike-white";
import { PackageIcon } from "../Icons/package";
import Icon from "@ant-design/icons";
import { RefundIcon } from "../Icons/refund-icon";




type OrderStatusProps = {
    statusCode: number;
};

export const OrderStatus: React.FC<OrderStatusProps> = ({ statusCode }) => {
    // const t = useTranslate();
    let color;
    let icon;

    switch (statusCode) {
        case 0:
            // Thanh toán thất bại
            color = "yellow";
            icon = <InfoCircleOutlined />;
            break;
        case 1:
            // Thanh toán thành công
            color = "green";
            icon = <CreditCardOutlined />;
            break;
        case 2:
            // Chờ xác nhận
            color = "green";
            icon = <BellOutlined />;
            break;
        case 3:
            // Chuẩn bị hàng    
            color = "purple";
            icon = <PackageIcon />;
            break;
        case 4:
            // Đang giao hàng
            color = "blue";
            icon = <BikeWhiteIcon />;
            break;
        case 5:
            // Giao hàng không thành công
            color = "magenta";
            icon = <CloseCircleOutlined />;
            break;
        case 6:
            // Đã giao hàng
            color = "teal";
            icon = <BikeWhiteIcon />;
            break;
        case 7:
            // Đã nhận được hàng
            color = "gold";
            icon = <CheckCircleOutlined />;
            break;
        case 8:
            // Trả hàng 
            color = "red";
            icon = <RefundIcon />;
            break;
        case 9:
            // Hoàn thành
            color = "green";
            icon = <CheckCircleOutlined />;
            break;
        case 10:
            // Đã hủy
            color = "gray";
            icon = <CloseCircleOutlined />;
            break;
    }

    return (
        <Tag color={color} icon={icon}>
            {getNameByStatusCode(statusCode)}
        </Tag>
    );
};
