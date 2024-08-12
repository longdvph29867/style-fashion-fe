// import { useTranslate, useUpdate } from "@refinedev/core";
import { CheckCircleOutlined, CloseCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import { TableActionButton } from "./tableActionButton";
import { actionAdminOrder, getNameByStatusCode } from "../../util/constant";
import { BikeWhiteIcon } from "../Icons/bike-white";
import { MdDomainVerification } from "react-icons/md";
import { TruckIcon } from "../Icons/truck";
import { VerificationIcon } from "../Icons/verification";
// import { TableActionButton } from "../../tableActionButton";
// import type { IOrder } from "../../../interfaces";

type OrderActionProps = {
    record: any;
};

export const OrderActions: React.FC<OrderActionProps> = ({ record }) => {
    //   const t = useTranslate();
    //   const { mutate } = useUpdate({ resource: "orders", id: record.id });

    const moreMenu = (record: any) => (
        // <Menu
        //     mode="vertical"
        //     onClick={({ domEvent }) => domEvent.stopPropagation()}
        // >
        //     <Menu.Item
        //         key={record.orderStatus}
        //         style={{
        //             fontSize: 15,
        //             display: "flex",
        //             alignItems: "center",
        //             fontWeight: 500,
        //         }}
        //         // disabled={record.status.text !== "Pending"}
        //         icon={
        //             <CheckCircleOutlined
        //                 style={{
        //                     color: "#52c41a",
        //                     fontSize: 17,
        //                     fontWeight: 500,
        //                 }}
        //             />
        //         }
        //         onClick={(value) => {
        //             console.log('value', value)
        //             console.log('record', record)
        //         }}
        //     >
        //         {getNameByStatusCode(record.orderStatus)}
        //     </Menu.Item>
        //     <Menu.Item
        //         key="reject"
        //         style={{
        //             fontSize: 15,
        //             display: "flex",
        //             alignItems: "center",
        //             fontWeight: 500,
        //         }}
        //         icon={
        //             <CloseCircleOutlined
        //                 style={{
        //                     color: "#EE2A1E",
        //                     fontSize: 17,
        //                 }}
        //             />
        //         }
        //         // disabled={
        //         //     record.status.text === "Delivered" ||
        //         //     record.status.text === "Cancelled"
        //         // }
        //         onClick={() =>
        //             console.log('reject')
        //         }
        //     >
        //     </Menu.Item>
        // </Menu>
        <Menu
            mode="vertical"
            onClick={({ domEvent }) => domEvent.stopPropagation()}
        >
            <Menu.Item
                //  Xác nhận đơn hàng
                key="4"
                style={{
                    fontSize: 15,
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 500,
                }}
                disabled={record.orderStatus !== 3}
                icon={
                    <CheckCircleOutlined
                        style={{
                            color: "#4CAF50",
                            fontSize: 17,
                            fontWeight: 500,
                        }}
                    />
                }
                onClick={() => console.log('Xác nhận đơn hàng')}
            >
                Xác nhận đơn hàng
            </Menu.Item>

            <Menu.Item
                // Giao hàng
                key="5"
                style={{
                    fontSize: 15,
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 500,
                }}
                disabled={(record.orderStatus !== 4 && record.orderStatus !== 7)}
                icon={
                    <TruckIcon
                        style={{
                            color: "#FF5722",
                            fontSize: 17,
                            fontWeight: 500,
                        }}
                    />
                }
                onClick={() => console.log('Giao hàng')}
            >
                Giao hàng
            </Menu.Item>

            <Menu.Item
                //  Đã giao hàng
                key="6"
                style={{
                    fontSize: 15,
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 500,
                }}
                disabled={record.orderStatus !== 5}
                icon={
                    <VerificationIcon
                        style={{
                            color: "#3f51b5",
                            fontSize: 17,
                            fontWeight: 500,
                        }}
                    />
                }
                onClick={() => console.log('Đã giao hàng')}
            >
                Đã giao hàng
            </Menu.Item>

            <Menu.Item
                // Giao hàng không thành công
                key="7"
                style={{
                    fontSize: 15,
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 500,
                }}
                disabled={record.orderStatus !== 5}
                icon={
                    <InfoCircleOutlined
                        style={{
                            color: "#FF9800",
                            fontSize: 17,
                            fontWeight: 500,
                        }}
                    />
                }
                onClick={() => console.log('Giao hàng không thành công')}
            >
                Giao hàng không thành công
            </Menu.Item>

            <Menu.Item
                // Hủy đơn hàng
                key="9"
                style={{
                    fontSize: 15,
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 500,
                }}
                disabled={record.orderStatus === 8 || record.orderStatus === 9}
                icon={
                    <CloseCircleOutlined
                        style={{
                            color: "#F44336",
                            fontSize: 17,
                        }}
                    />
                }
                onClick={() => console.log('Hủy đơn hàng')}
            >
                Hủy đơn hàng
            </Menu.Item>
        </Menu>
    );
    return (
        <Dropdown overlay={moreMenu(record)} trigger={["click"]}>
            <TableActionButton />
        </Dropdown>
    );
};
