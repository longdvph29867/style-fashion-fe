import {
    BellOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    FileDoneOutlined,
    InfoCircleOutlined,
    CheckOutlined
} from "@ant-design/icons";
//   import { useTranslate } from "@refinedev/core";
import { Tag } from "antd";
import { getNameByStatusCode } from "../../util/constant";
//   import { BikeIcon, BikeWhiteIcon } from "../../icons";
import { FaShippingFast } from "react-icons/fa";
import { BikeWhiteIcon } from "../Icons/bike-white";
import { PackageIcon } from "../Icons/package";


type OrderStatusProps = {
    statusCode: number;
};

export const OrderStatus: React.FC<OrderStatusProps> = ({ statusCode }) => {
    // const t = useTranslate();
    let color;
    let icon;

    switch (statusCode) {
        case 0:
            // Chờ thanh toán
            color = "orange";
            icon = <ClockCircleOutlined />;
            break;
        case 1:
            // Đã thanh toán
            color = "cyan";
            icon = <FileDoneOutlined />;
            break;
        case 2:
            // Thanh toán thất bại
            color = "yellow";
            icon = <InfoCircleOutlined />;
            break;
        case 3:
            // Chờ xác nhận
            color = "green";
            icon = <BellOutlined />;
            break;
        case 4:
            // Chuẩn bị hàng    
            color = "purple";
            icon = <PackageIcon />;
            break;
        case 5:
            // Đang giao hàng
            color = "blue";
            icon = <BikeWhiteIcon />;
            break;
        case 6:
            // Đã giao hàng
            color = "teal";
            icon = <BikeWhiteIcon />;
            break;
        case 7:
            // Giao hàng không thành công
            color = "magenta";
            icon = <CloseCircleOutlined />;
            break;
        case 8:
            // Đã nhận được hàng
            color = "gold";
            icon = <CheckCircleOutlined />;
            break;
        case 9:
            // Đã hủy
            color = "grey";
            icon = <CloseCircleOutlined />;
            break;
    }

    return (
        <Tag color={color} icon={icon}>
            {getNameByStatusCode(statusCode)}
        </Tag>
    );
};
