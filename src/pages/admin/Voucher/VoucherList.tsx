import { useEffect, useState } from "react";
import {
  formartCurrency,
  hiddenSpinner,
  showSpinner,
} from "../../../util/util";
import { Link } from "react-router-dom";
import { Modal, message } from "antd";
import { https } from "../../../config/axios";
import { IUser } from "../../../types/userType";
import { CiCircleAlert } from "react-icons/ci";
import { IoIosCheckboxOutline } from "react-icons/io";
import voucherService from "../../../services/voucherService";
import { Voucher } from "../../../types/voucher";

const VoucherList: React.FC = () => {
  // const [usersList, setUsersList] = useState<IUser[]>([]);
  const [voucherList, setVoucherList] = useState<Voucher[]>([]);


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

  // const handleDelete = async (id: string) => {
  //   showSpinner();
  //   try {
  //     const data = await https.delete(`/users/${id}`);
  //     if (data) {
  //       message.success(data.data.message);
  //       fetchData();
  //       hiddenSpinner();
  //     }
  //   } catch (error) {
  //     hiddenSpinner();
  //     console.log(error);
  //     message.error(error.response.data.message);
  //   }
  // };

  // const { confirm } = Modal;

  // const showConfirm = (id: string) => {
  //   confirm({
  //     title: 'Bạn có chắc chắn muốn xóa?',
  //     onOk() {
  //       handleDelete(id);
  //     },
  //     onCancel() {
  //       console.log('Cancel');
  //     },
  //     maskClosable: true,
  //   });
  // };

  return (
    <div className="">
      <div className="p-4 pb-0 my-4 bg-white rounded-t-2xl">
        <Link
          to="/admin/voucher/add"
          className="text-white text-base font-semibold bg-green-500 py-2 px-2 rounded my-5 hover:bg-green-600"
        >
          <span>Thêm mới</span>
        </Link>
      </div>
      <div className="h-full overflow-x-auto">
        <div className="w-full border-gray-200 text-slate-500">
          <div className="w-full grid grid-cols-7  gap-2">
            <div className="pr-6 pl-4 py-3  text-left font-bold uppercase text-slate-800">
              Tên
            </div>
            <div className="pl-4 py-3  text-left font-bold uppercase text-slate-800">
              Giảm giá
            </div>
            <div className="lg:block text-left pr-6 pl-2 py-3 font-bold uppercase text-slate-800">
              Số lượng
            </div>
            <div className="sm:block text-left  pl-2 py-3 font-bold uppercase text-slate-800">
              Loại
            </div>
            <div className="sm:block text-left  pl-2 py-3 font-bold uppercase text-slate-800">
              Bắt đầu
            </div>
            <div className="sm:block text-left pl-2 py-3 font-bold uppercase text-slate-800">
              Kết thúc
            </div>
            {/* <div className="lg:block hidden  pl-2 py-3  text-left font-bold uppercase text-slate-800">
              Role
            </div>
            <div className="sm:block hidden pl-2 py-3  text-left font-bold uppercase text-slate-800">
              Thao tác
            </div> */}
          </div>
          <div>
            {voucherList.map((voucher, index) => {
              return (
                <div
                  key={index}
                  className="relative grid grid-cols-7 gap-2 border-b lg:border-transparent border-slate-300"
                >
                  {/* <span className='absolute top-10 left-0.5 text-slate-300'>{++index}</span> */}

                  <div className="p-2">
                    <div className="flex  items-center">
                      <h6 className="text-base text-left">{voucher.name}</h6>
                    </div>
                  </div>
                  <div className="p-2">
                    <div className="flex  items-center">
                      <h6 className="text-base text-left">{voucher.discount}</h6>
                    </div>
                  </div>
                  <div className="p-2">
                    <div className="flex  items-center">
                      <h6 className="text-base text-left">{voucher.quantity}</h6>
                    </div>
                  </div>
                  <div className="p-2">
                    <div className="flex  items-center">
                      <h6 className="text-base text-left">{voucher.type}</h6>
                    </div>
                  </div>
                  <div className="p-2">
                    <div className="flex  items-center">
                      <h6 className="text-base text-left">{voucher.validFrom}</h6>
                    </div>
                  </div>
                  <div className="p-2">
                    <div className="flex  items-center">
                      <h6 className="text-base text-left">{voucher.validTo}</h6>
                    </div>
                  </div>
                  <div className="absolute right-0 top-4 lg:block p-2 space-x-2 lg:static lg:top-auto lg:right-auto">
                    <Link
                      to={`/admin/voucher/${voucher.id}`}
                      className="text-sm font-semibold text-yellow-500 hover:text-yellow-600"
                    >
                      Chi tiết
                    </Link>
                    <button
                      // onClick={() => showConfirm(user.id)}
                      className="text-sm font-semibold text-red-500 hover:text-red-600"
                    >
                      Xoá
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherList;
