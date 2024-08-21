// import { useTranslate, useUpdate } from "@refinedev/core";
import { CheckCircleOutlined, CloseCircleOutlined, InfoCircleOutlined, DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, message, Modal, Space } from "antd";
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
    onPage: any;
    fetchOrder: any;
};



export const OrderActions: React.FC<OrderActionProps> = ({ record, setOrderList, onPage, fetchOrder }) => {
    //   const t = useTranslate();
    //   const { mutate } = useUpdate({ resource: "orders", id: record.id });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState<any>(null);
    const [selectedSatusCode, setSelectedStatusCode] = useState(null);
    const [selectedSatusName, setSelectedStatusName] = useState(null);

    const userInfo = JSON.parse(localStorage.getItem("USER_INFO_FASHION") || "{}");

    const handleUpdateStatusOrder = async () => {
        setIsModalOpen(false);
        try {
            showSpinner();
            if (selectedOrderId && selectedSatusCode) {
                const data = await orderService.updateStatusOrder(selectedOrderId, selectedSatusCode, userInfo.id);
                if (data) {
                    message.success('Thao tác thành công');
                    if (onPage === 'detail') {
                        // await fetchOrder();
                        setOrderList((prev: any) => {
                            return { ...prev, orderStatus: { code: selectedSatusCode } }
                        });
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


    const moreMenu = (record: any) => (
        <>
            <Menu
                mode="vertical"
                onClick={({ domEvent }) => domEvent.stopPropagation()}
            >

                <Menu.Item
                    //  Xác nhận đơn hàng
                    key="3"
                    style={{
                        fontSize: 15,
                        display: "flex",
                        alignItems: "center",
                        fontWeight: 500,
                    }}
                    disabled={record?.orderStatus.code !== 2}
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
                        showUpdateStatusModal(record._id, 3, getNameByStatusCodeAdmin(3));
                    }}
                >
                    Xác nhận đơn hàng
                </Menu.Item>

                <Menu.Item
                    // Giao hàng
                    key="4"
                    style={{
                        fontSize: 15,
                        display: "flex",
                        alignItems: "center",
                        fontWeight: 500,
                    }}
                    // disabled={(record.orderStatus.code !== 4 && record.orderStatus.code !== 7)}
                    disabled={(record?.orderStatus.code !== 3)}
                    icon={
                        <TruckIcon
                            style={{
                                color: "#FF5722",
                                fontSize: 17,
                                fontWeight: 500,
                            }}
                        />
                    }
                    onClick={() => showUpdateStatusModal(record._id, 4, getNameByStatusCodeAdmin(4))}
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
                    disabled={record?.orderStatus.code !== 4}
                    icon={
                        <VerificationIcon
                            style={{
                                color: "#3f51b5",
                                fontSize: 17,
                                fontWeight: 500,
                            }}
                        />
                    }
                    onClick={() => showUpdateStatusModal(record._id, 6, getNameByStatusCodeAdmin(6))}
                >
                    Đã giao hàng
                </Menu.Item>

                <Menu.Item
                    // Giao hàng không thành công
                    key="5"
                    style={{
                        fontSize: 15,
                        display: "flex",
                        alignItems: "center",
                        fontWeight: 500,
                    }}
                    disabled={record?.orderStatus.code !== 4}
                    icon={
                        <InfoCircleOutlined
                            style={{
                                color: "#FF9800",
                                fontSize: 17,
                                fontWeight: 500,
                            }}
                        />
                    }
                    onClick={() => showUpdateStatusModal(record._id, 5, getNameByStatusCodeAdmin(5))}
                >
                    Giao hàng không thành công
                </Menu.Item>

                {/* <Menu.Item
                    // Hủy đơn hàng
                    key="10"
                    style={{
                        fontSize: 15,
                        display: "flex",
                        alignItems: "center",
                        fontWeight: 500,
                    }}
                    disabled={record?.orderStatus.code !== 2 && record?.orderStatus.code !== 1}
                    icon={
                        <CloseCircleOutlined
                            style={{
                                color: "#F44336",
                                fontSize: 17,
                            }}
                        />
                    }
                    onClick={() => showUpdateStatusModal(record._id, 10, getNameByStatusCodeAdmin(10))}
                >
                    Hủy đơn hàng
                </Menu.Item> */}
            </Menu>

        </>
    );
    return (
        <>
            <Dropdown overlay={moreMenu(record)} trigger={["click"]}>
                {(onPage === 'list') ? <TableActionButton /> :
                    <Button className="p-5">
                        <Space>
                            Cập nhật trạng thái đơn hàng
                            <DownOutlined />
                        </Space>
                    </Button>}

            </Dropdown>
            <Modal title="Thông báo xác nhận" open={isModalOpen} onOk={handleUpdateStatusOrder} onCancel={handleCancel}>
                <p>Chuyển trạng thái đơn hàng thành: <span className="text-[#fe385c] font-medium">{selectedSatusName}</span></p>
            </Modal>
        </>
    );
};
