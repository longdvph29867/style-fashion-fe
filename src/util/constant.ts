export const orderStatusValue = [
    { code: 0, name: 'Chờ thanh toán' },
    { code: 1, name: 'Chờ xác nhận' },
    { code: 2, name: 'Chuẩn bị hàng' },
    { code: 3, name: 'Đang giao hàng' },
    { code: 4, name: 'Đã giao hàng' },
    { code: 5, name: 'Giao hàng thành công' },
    { code: 6, name: 'Hoàn thành' },
    { code: 7, name: 'Đã hủy' },
]

export const getOrderStatusName = (code: number) => {
    const status = orderStatusValue.find(status => status.code === code);
    return status ? status.name : 'Unknown Status';
};