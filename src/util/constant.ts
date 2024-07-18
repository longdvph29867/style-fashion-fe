export const orderStatusValue = [
    { code: 0, name: "Chờ thanh toán" },
    { code: 1, name: "Đã thanh toán" },
    { code: 2, name: "Thanh toán thất bại" },
    { code: 3, name: "Chờ xác nhận" },
    { code: 4, name: "CHuẩn bị hàng" },
    { code: 5, name: "Đang giao hàng" },
    { code: 6, name: "Đã giao hàng" },
    { code: 7, name: "Giao hàng thành công" },
    { code: 8, name: "Giao hàng thành công" },
    { code: 9, name: "Đã nhận được hàng" },
    { code: 10, name: "Đã huỷ" }
]


export const getOrderStatusName = (code: number) => {
    const status = orderStatusValue.find(status => status.code === code);
    return status ? status.name : 'Unknown Status';
};