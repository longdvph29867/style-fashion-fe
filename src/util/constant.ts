export const orderStatusValue = [
    { code: 1, name: "Thanh toán thất bại", message: "Thanh toán thất bại, vui lòng thanh toán lại!" },
    { code: 2, name: "Chờ xác nhận", message: "Chờ shop xác nhận đơn hàng cho bạn!" },
    { code: 3, name: "Chuẩn bị hàng", message: "Shop đang chuẩn bị hàng cho bạn!" },
    { code: 4, name: "Đang giao hàng", message: "Đơn hàng đang trên đường giao đến bạn, vui lòng để ý điện thoại!" },
    { code: 5, name: "Giao hàng không thành công", message: "Giao hàng không thành công" },
    { code: 6, name: "Đã giao hàng", message: "Giao hàng thành công" },
    { code: 7, name: "Đã nhận được hàng", message: "Tặng shop 5 sao nhé!" },
    { code: 8, name: "Trả hàng", message: "Trả hàng" },
    { code: 9, name: "Hoàn thành", message: "Đơn hàng đã hoàn thành!" },
    { code: 10, name: "Đã huỷ", message: "Đơn hàng đã hủy" }
]

export const actionAdminOrder = [
    {
        code: 3,
        name: 'Xác nhận đơn hàng',
    },
    {
        code: 4,
        name: 'Giao hàng',
    },
    {
        code: 5,
        name: 'Giao hàng không thành công',
    },
    {
        code: 6,
        name: 'Đã giao hàng',
    },
    {
        code: 10,
        name: 'Hủy đơn hàng',
    },
]

export const actionUserOrder = [
    {
        code: 7,
        name: 'Đã nhận được hàng',
    },
    {
        code: 8,
        name: 'Trả hàng',
    },
    {
        code: 10,
        name: 'Hủy đơn hàng',
    }
]



export const getMessageByStatusCode = (code: number) => {
    const status = orderStatusValue.find(status => status.code === code);
    return status ? status.message : '';
};

export const getNameByStatusCode = (code: number) => {
    const status = orderStatusValue.find(status => status.code === code);
    return status ? status.name : '';
};

export const getNameByStatusCodeAdmin = (code: number) => {
    const status = actionAdminOrder.find(status => status.code === code);
    return status ? status.name : '';
};
export const getNameByStatusCodeUser = (code: number) => {
    const status = actionUserOrder.find(status => status.code === code);
    return status ? status.name : '';
};