import { Flex, Grid, List, Space, Steps, Typography, theme } from "antd";
// import type { IEvent, IOrder } from "../../../interfaces";
// import { useTranslate } from "@refinedev/core";
import dayjs from "dayjs";
import {
    ClockCircleOutlined,
    HistoryOutlined,
    LoadingOutlined,
    PhoneOutlined,
    ShopOutlined,
    UserOutlined,
    CloseCircleOutlined,
    CheckOutlined,
    CheckCircleOutlined
} from "@ant-design/icons";
import { useMemo } from "react";
// import { BikeWhiteIcon } from "../../icons";
// import { useConfigProvider } from "../../../context";

type Props = {
    order: any;
};

export const StepStatus = ({ order }: Props) => {
    //   const t = useTranslate();
    const { token } = theme.useToken();
    const breakpoints = Grid.useBreakpoint();
    // const { mode } = useConfigProvider();

    const details = useMemo(() => {
        const list: {
            icon: React.ReactNode;
            title: string;
            description: string;
        }[] = [
                {
                    icon: <UserOutlined />,
                    title: "Khách hàng",
                    description: order?.shippingAddress?.name,
                },
                {
                    icon: <PhoneOutlined />,
                    title: "Số điện thoại",
                    description: order?.shippingAddress?.phoneNumber,
                },
                {
                    icon: <UserOutlined />,
                    title: "Địa chỉ giao hàng",
                    description: `${order?.user.firstName} ${order?.user.lastName}`,
                },
                {
                    icon: <HistoryOutlined />,
                    title: "Ngày tạo",
                    description: order?.createdAt,
                },
            ];

        return list;
    }, [order]);

    const stepsValue = [
        { code: 2, name: "Chờ xác nhận", message: "Chờ shop xác nhận đơn hàng cho bạn!" },
        { code: 3, name: "Chuẩn bị hàng", message: "Shop đang chuẩn bị hàng cho bạn!" },
        { code: 4, name: "Đang giao hàng", message: "Đơn hàng đang trên đường giao đến bạn, vui lòng để ý điện thoại!" },
        { code: 6, name: "Đã giao hàng", message: "Giao hàng thành công" },
        { code: 7, name: "Đã nhận được hàng", message: "Tặng shop 5 sao nhé!" },
    ]

    const getStepStatus = (currentCode: number, stepCode: number) => {
        if (currentCode === 5) {
            // Nếu currentCode là 5, tất cả các bước trước đó đều là 'finish', và sau đó là 'wait'
            return stepCode <= 4 ? 'finish' : 'wait';
        }

        // if (currentCode === 6 || currentCode === 8) {
        //     // Nếu currentCode là 6 hoặc 8, tất cả các bước trước đó đều là 'finish'
        //     return stepCode <= currentCode ? 'finish' : 'wait';
        // }

        if (currentCode === 9) {
            return 'finish';
        }

        if ([1, 10].includes(currentCode)) {
            // Nếu currentCode là 0, 1, 2, hoặc 9, tất cả các bước đều là 'wait'
            return 'wait';
        }

        if (stepCode < currentCode) return 'finish';
        if (stepCode === currentCode) return 'process';
        return 'wait';
    };

    // const steps = [...stepsValue];

    // // Thêm bước "Giao hàng không thành công" chỉ khi trạng thái hiện tại là 7
    // if (order?.orderStatus.code === 7) {
    //     steps.splice(3, 0, { code: 7, name: "Giao hàng không thành công", message: "Giao hàng không thành công" });
    // }

    return (
        <Flex vertical>
            <Steps
                direction="horizontal"
                items={stepsValue.map(step => {
                    // Kiểm tra nếu code của order là 7 thì đổi tên bước "Đang giao hàng" thành "Giao hàng không thành công"
                    let title = step.name;
                    let icon = null;
                    // Thay đổi title và icon khi code = 7
                    if (order?.orderStatus.code === 5 && step.code === 4) {
                        title = "Giao hàng không thành công";
                        icon = <CloseCircleOutlined className="text-red-500" />; // Icon cho 'Giao hàng không thành công'
                    } else if (order?.orderStatus.code === step.code) {
                        // Thêm điều kiện để không hiển thị loading khi code = 6
                        if ((order?.orderStatus.code === 6 && step.code === 6) || (order?.orderStatus.code === 7 && step.code === 7)) {
                            icon = <CheckOutlined />; // Không có icon loading cho 'Đã giao hàng'
                        } else if (order?.orderStatus.code !== 6) {
                            icon = <LoadingOutlined />; // Icon loading cho bước hiện tại
                        }
                    }

                    return {
                        title,
                        status: getStepStatus(order?.orderStatus.code, step.code),
                        icon: icon
                        // icon: order?.orderStatus.code === step.code ? <LoadingOutlined /> : null,
                    };
                })}
            />
            {/* <List
                size="large"
                dataSource={details}
                style={{
                    borderTop: `1px solid ${token.colorBorderSecondary}`,
                }}
                renderItem={(item) => (
                    <List.Item>
                        <Flex gap={8}>
                            <Space
                                style={{
                                    width: "120px",
                                }}
                            >
                                <div
                                    style={{
                                        // color: mode === "dark" ? token.volcano9 : token.volcano6,
                                    }}
                                >
                                    {item.icon}
                                </div>
                                <Typography.Text type="secondary">{item.title}</Typography.Text>
                            </Space>
                            <Typography.Text>{item.description}</Typography.Text>
                        </Flex>
                    </List.Item>
                )}
            /> */}
        </Flex>
    );
};

// const getCurrentStep = (order: IOrder) => {
//     return order?.events.findIndex((el) => el.status === order?.status?.text);
// };

// const getNotFinishedCurrentStep = (
//     order: IOrder,
//     event: IEvent,
//     index: number,
// ) => {
//     return (
//         event.status !== "Cancelled" &&
//         event.status !== "Delivered" &&
//         order?.events.findIndex((el) => el.status === order?.status?.text) === index
//     );
// };

// const getStepStatus = (order: IOrder, event: IEvent, index: number) => {
//     if (!event.date) return "wait";
//     if (event.status === "Cancelled") return "error";
//     if (getNotFinishedCurrentStep(order, event, index)) return "process";
//     return "finish";
// };
