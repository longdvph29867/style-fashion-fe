// import { useTranslate, useUpdate } from "@refinedev/core";
import { CheckCircleOutlined, CloseCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Dropdown, Menu, message, Modal } from "antd";
import { TableActionButton } from "./tableActionButton";
import { actionAdminOrder, getNameByStatusCode, getNameByStatusCodeAdmin } from "../../util/constant";
import { BikeWhiteIcon } from "../Icons/bike-white";
import { MdDomainVerification } from "react-icons/md";
import { TruckIcon } from "../Icons/truck";
import { VerificationIcon } from "../Icons/verification";
import orderService from "../../services/orderService";
import { useState } from "react";
import { hiddenSpinner, showSpinner } from "../../util/util";
// import { TableActionButton } from "../../tableActionButton";
// import type { IOrder } from "../../../interfaces";

type OrderActionProps = {
    record: any;
    setOrderList: any;
};



export const OrderActions: React.FC<OrderActionProps> = ({ record, setOrderList }) => {
    //   const t = useTranslate();
    //   const { mutate } = useUpdate({ resource: "orders", id: record.id });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState<any>(null);
    const [selectedSatusCode, setSelectedStatusCode] = useState(null);
    const [selectedSatusName, setSelectedStatusName] = useState(null);

    const handleReceiveOrder = async () => {
        setIsModalOpen(false);
        try {
            showSpinner();
            if (selectedOrderId && selectedSatusCode) {
                const data = await orderService.updateStatusOrder(selectedOrderId, selectedSatusCode);
                if (data) {
                    message.success('Thao tác thành công');
                    setOrderList((prev: any) => {
                        return prev.map((order: any) => {
                            if (order._id === selectedOrderId) {
                                order.orderStatus.code = selectedSatusCode
                            }
                            return order
                        })
                    })
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

    const showReceiveModal = (id: any, orderStatus: any, orderStatusName: any) => {
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


    const moreMenu = (record: any) => (
        <>
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
                    disabled={record.orderStatus.code !== 3}
                    icon={
                        <CheckCircleOutlined
                            style={{
                                color: "#4CAF50",
                                fontSize: 17,
                                fontWeight: 500,
                            }}
                        />
                    }
                    onClick={() => {
                        showReceiveModal(record._id, 4, getNameByStatusCodeAdmin(4));
                    }}
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
                    disabled={(record.orderStatus.code !== 4 && record.orderStatus.code !== 7)}
                    icon={
                        <TruckIcon
                            style={{
                                color: "#FF5722",
                                fontSize: 17,
                                fontWeight: 500,
                            }}
                        />
                    }
                    onClick={() => showReceiveModal(record._id, 5, getNameByStatusCodeAdmin(5))}
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
                    disabled={record.orderStatus.code !== 5}
                    icon={
                        <VerificationIcon
                            style={{
                                color: "#3f51b5",
                                fontSize: 17,
                                fontWeight: 500,
                            }}
                        />
                    }
                    onClick={() => showReceiveModal(record._id, 6, getNameByStatusCodeAdmin(6))}
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
                    disabled={record.orderStatus.code !== 5}
                    icon={
                        <InfoCircleOutlined
                            style={{
                                color: "#FF9800",
                                fontSize: 17,
                                fontWeight: 500,
                            }}
                        />
                    }
                    onClick={() => showReceiveModal(record._id, 7, getNameByStatusCodeAdmin(7))}
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
                    disabled={record.orderStatus.code === 8 || record.orderStatus.code === 9}
                    icon={
                        <CloseCircleOutlined
                            style={{
                                color: "#F44336",
                                fontSize: 17,
                            }}
                        />
                    }
                    onClick={() => showReceiveModal(record._id, 9, getNameByStatusCodeAdmin(9))}
                >
                    Hủy đơn hàng
                </Menu.Item>
            </Menu>

        </>
    );
    return (
        <>
            <Dropdown overlay={moreMenu(record)} trigger={["click"]}>
                <TableActionButton />

            </Dropdown>
            <Modal title="Thông báo xác nhận" open={isModalOpen} onOk={handleReceiveOrder} onCancel={handleCancel}>
                <p>Chuyển trạng thái đơn hàng thành: <span className="text-[#fe385c] font-medium">{selectedSatusName}</span></p>
            </Modal>
        </>
    );
};
