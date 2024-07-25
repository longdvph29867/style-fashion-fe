import { message, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { Voucher } from '../../types/voucher';
import voucherService from '../../services/voucherService';
import { hiddenSpinner, showSpinner } from '../../util/util';
import { IoIosRadioButtonOff } from 'react-icons/io';
import { GiConfirmed } from "react-icons/gi";
import dayjs from 'dayjs';

type Props = {
    openModalVoucher: boolean;
    setOpenModalVoucher: (open: boolean) => void;
}

const VoucherModal = ({ openModalVoucher, setOpenModalVoucher }: Props) => {
    const [voucherList, setVoucherList] = useState<Voucher[]>([]);
    const [selectedVoucher, setSelectedVoucher] = useState<string>('');

    const formattedValidTo = voucherList.length > 0 && voucherList[0].validTo
        ? dayjs(new Date(voucherList[0].validTo)).format('DD/MM/YYYY HH:mm')
        : 'Không xác định';

    const fetchVoucher = async () => {
        showSpinner
        try {
            const data = await voucherService.getVoucherAll();
            setVoucherList(data.results);
            hiddenSpinner();
        } catch (error) {
            hiddenSpinner();
            console.log(error);
        }

    }

    useEffect(() => {
        fetchVoucher();
    }, [])

    // console.log(voucherList, 'voucherList')
    return (
        <div className='pb-2'>
            <Modal
                title=""
                centered
                open={openModalVoucher}
                onOk={() => setOpenModalVoucher(false)}
                onCancel={() => setOpenModalVoucher(false)}
                width={500}
            >
                <p className='text-[18px] font-semibold mb-6'>Chọn Voucher</p>
                {voucherList.map((voucher: Voucher) => (
                    <div
                        key={voucher.id}
                        onClick={() => setSelectedVoucher(voucher.id)}
                        className="flex justify-between items-center p-4 mb-4 border border-gray-300 rounded-lg shadow-md bg-white cursor-pointer hover:shadow-lg transition-shadow duration-300 hover:transform hover:scale-105"
                    >
                        <div>
                            <h2 className="text-xl font-semibold mb-2">{voucher.name}</h2>
                            <div className="flex flex-col space-y-2">
                                <p className="text-base">
                                    <span className="font-medium">Giảm giá:</span> {voucher.discount.toLocaleString()} VND
                                </p>
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">Ngày hết hạn:</span> {voucher.validTo
                                        ? dayjs(voucher.validTo).format('DD/MM/YYYY HH:mm')
                                        : 'Không xác định'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            {selectedVoucher === voucher.id ? (
                                <GiConfirmed size={22} color="#ff385c" />
                            ) : (
                                <IoIosRadioButtonOff size={20} />
                            )}
                        </div>
                    </div>
                ))}
            </Modal>
        </div>
    )
}

export default VoucherModal