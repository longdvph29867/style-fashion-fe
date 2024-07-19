export const orderStatusValue = [
    { code: 0, name: "Chờ thanh toán", message: "Đơn hàng đang chờ bạn thanh toán!" },
    { code: 1, name: "Đã thanh toán", message: "Đã thanh toán" },
    { code: 2, name: "Thanh toán thất bại", message: "Thanh toán thất bại, vui lòng thanh toán lại!" },
    { code: 3, name: "Chờ xác nhận", message: "Chờ shop xác nhận đơn hàng cho bạn!" },
    { code: 4, name: "CHuẩn bị hàng", message: "Shop đang chuẩn bị hàng cho bạn!" },
    { code: 5, name: "Đang giao hàng", message: "Đơn hàng đang trên đường giao đến bạn, vui lòng để ý điện thoại!" },
    { code: 6, name: "Đã giao hàng", message: "Giao hàng thành công" },
    { code: 7, name: "Giao hàng không thành công", message: "Giao hàng không thành công" },
    { code: 8, name: "Đã nhận được hàng", message: "Tặng shop 5 sao nhé!" },
    { code: 9, name: "Đã huỷ", message: "Đơn hàng đã hủy" }
]


export const getOrderStatusName = (code: number) => {
    const status = orderStatusValue.find(status => status.code === code);
    return status ? status.message : 'Unknown Status';
};