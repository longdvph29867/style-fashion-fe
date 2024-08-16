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
} from "@ant-design/icons";
import { useMemo } from "react";
// import { BikeWhiteIcon } from "../../icons";
// import { useConfigProvider } from "../../../context";

type Props = {
    order: any;
};

export const OrderDeliveryDetails = ({ order }: Props) => {
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

    return (
        <Flex vertical>
            <Steps
                direction="horizontal"
                items={[
                    {
                        title: 'Đặt hàng thành công',
                        status: 'finish',
                        // icon: <UserOutlined />,
                    },
                    {
                        title: 'Chờ xác nhận',
                        status: 'finish',
                        // icon: <SolutionOutlined />,
                    },
                    {
                        title: 'Chuẩn bị hàng',
                        status: 'process',
                        // icon: <LoadingOutlined />,
                    },
                    {
                        title: 'Đang giao hàng',
                        status: 'wait',
                        // icon: <SmileOutlined />,
                    },
                    {
                        title: 'Đã giao hàng',
                        status: 'wait',
                        // icon: <SmileOutlined />,
                    },
                    {
                        title: 'Đã nhận được hàng',
                        status: 'wait',
                        // icon: <SmileOutlined />,
                    },
                ]}
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
