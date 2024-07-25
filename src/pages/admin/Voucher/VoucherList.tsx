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
import { format, set } from 'date-fns';
import PaginationPage from "../../../components/PaginationPage/PaginationPage";

const VoucherList: React.FC = () => {
  // const params = new URLSearchParams(location.search);
  // const [totalVoucher, setTotalVoucher] = useState(0);
  // const [loading, setLoading] = useState(true);
  // const limitPerPage = 10;
  // const currentPage = params.get("page") ? Number(params.get("page")) : 1;
  const [voucherList, setVoucherList] = useState<Voucher[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedVoucherId, setSelectedVoucherId] = useState(null);


  const fetchVoucher = async () => {
    showSpinner()
    try {
      // const { data } = await voucherService.getVoucherAll(limitPerPage, currentPage);
      const { data } = await voucherService.getVoucherAll();
      // setLoading(false);
      setVoucherList(data.results);
      // setTotalVoucher(data.totalResults);
      window.scrollTo(0, 0);
      hiddenSpinner();
    } catch (error) {
      hiddenSpinner();
      console.log(error);
    }

  }

  useEffect(() => {
    fetchVoucher();
  }, [location.search])

  const formatDateString = (dateString: string) => {
    return format(new Date(dateString), 'dd/MM/yyyy HH:mm');
  };

  const showDeleteModal = (id: any) => {
    setIsDeleteModalOpen(true);
    setSelectedVoucherId(id);
  };

  const handleDelete = async () => {
    // console.log('Deleting review with id:', selectedVoucherId);
    // return;
    setIsDeleteModalOpen(false);
    try {
      if (selectedVoucherId) {
        showSpinner()
        const data = await voucherService.deleteVoucher(selectedVoucherId);
        if (data) {
          message.success('Xóa thành công');
          fetchVoucher();
          hiddenSpinner();
        }
      }
    } catch (error) {
      hiddenSpinner();
      console.log(error);
      message.error(error.response.data.message);
    }
  };

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
  };

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
          <div className="w-full flex justify-left gap-2 mb-4">
            <div className="w-10 text-center font-bold uppercase text-slate-800">

            </div>
            <div className="  flex-1 text-left font-bold uppercase text-slate-800">
              Tên
            </div>
            <div className=" flex-1 text-left font-bold uppercase text-slate-800">
              Giảm giá
            </div>
            <div className="lg:block flex-1 text-left font-bold uppercase text-slate-800">
              Số lượng
            </div>
            <div className="sm:block flex-1 text-left  font-bold uppercase text-slate-800">
              Loại
            </div>
            <div className="sm:block flex-1 text-left  font-bold uppercase text-slate-800">
              Bắt đầu
            </div>
            <div className="sm:block flex-1 text-left font-bold uppercase text-slate-800">
              Kết thúc
            </div>
            <div className="sm:block flex-1 text-left font-bold uppercase text-slate-800">
              Thao tác
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
                  className="relative flex gap-2 py-2 border-b border-slate-100"
                >
                  {/* <span className='absolute top-10 left-0.5 text-slate-300'>{++index}</span> */}
                  <div className="w-10">
                    <div className="flex  items-center justify-center">
                      <h6 className="text-base text-left">{++index}</h6>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex  items-center justify-left">
                      <h6 className="text-base text-left">{voucher.name}</h6>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex  items-center justify-left">
                      <h6 className="text-base text-left">{voucher.discount}</h6>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex  items-center justify-left">
                      <h6 className="text-base text-left">{voucher.quantity}</h6>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex  items-center justify-left">
                      <h6 className="text-base text-left">{(voucher.type && (voucher.type === 'amount')) ? 'Giá trị cố định' : 'Phần trăm'}</h6>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex  items-center justify-left">
                      <h6 className="text-base text-left">{formatDateString(voucher.validFrom)}</h6>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex  items-center justify-left">
                      <h6 className="text-base text-left">{formatDateString(voucher.validTo)}</h6>
                    </div>
                  </div>
                  <div className="flex-1 justify-left absolute right-0 top-4 lg:block p-2 space-x-2 lg:static lg:top-auto lg:right-auto">
                    <Link
                      to={`/admin/voucher/update/${voucher.id}`}
                      className="text-sm font-semibold text-yellow-500 hover:text-yellow-600"
                    >
                      Sửa
                    </Link>
                    <>
                      <button
                        onClick={() => showDeleteModal(voucher.id)}
                        className="text-sm font-semibold text-red-500 hover:text-red-600"
                      >
                        Xoá
                      </button>
                      <Modal title="Xác nhận xóa" open={isDeleteModalOpen} onOk={handleDelete} onCancel={handleCancel}>
                        <p>Bạn có chắc chắn muốn xóa?</p>
                      </Modal>
                    </>
                  </div>
                </div>
              );
            })}
          </div>
          {/* <PaginationPage
            current={1}
            total={totalVoucher}
            pageSize={limitPerPage} /> */}
        </div>
      </div>
    </div>
  );
};

export default VoucherList;
