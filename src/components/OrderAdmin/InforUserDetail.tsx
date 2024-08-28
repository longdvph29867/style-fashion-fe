import React from 'react'
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
import { BikeWhiteIcon } from '../Icons/bike-white';

type Props = {
    order: any;
}

const InforUserDetail = ({ order }: Props) => {
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
                    icon: <BikeWhiteIcon />,
                    title: "Địa chỉ giao hàng",
                    description: `${order?.shippingAddress.address} ${order?.shippingAddress.ward} ${order?.shippingAddress.district} ${order?.shippingAddress.province}`,
                },
                {
                    icon: <HistoryOutlined />,
                    title: "Ngày tạo",
                    description: new Date(order?.createdAt).toLocaleString(),
                },
            ];

        return list;
    }, [order]);
    return (
        <div>
            <List
                size="large"
                dataSource={details}
                style={{
                }}
                renderItem={(item) => (
                    <List.Item>
                        {/* <Flex gap={8}>
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
                        </Flex> */}
                        <List.Item.Meta
                            avatar={item.icon}
                            title={item.title}
                            description={item.description}
                        />
                    </List.Item>
                )}
            />
        </div>
    )
}

export default InforUserDetail