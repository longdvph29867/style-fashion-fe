import { useEffect, useState } from "react";
import {
  hiddenSpinner,
  showSpinner,
} from "../../../util/util";
import { Link } from "react-router-dom";
import { Breadcrumb, Button, Modal, Table, message } from "antd";
import voucherService from "../../../services/voucherService";
import { Voucher } from "../../../types/voucher";
import { format } from 'date-fns';

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

  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      render: (_: any, __: any, index: any) => <span>{index + 1}</span>,
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giảm giá',
      dataIndex: 'discount',
      key: 'discount',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
      render: (_: any, record: any) => (
        <span>{record.type === 'amount' ? 'Giá trị cố định' : 'Phần trăm'}</span>
      ),
    },
    {
      title: 'Bắt đầu',
      dataIndex: 'validFrom',
      key: 'validFrom',
      render: (text: any) => <span>{formatDateString(text)}</span>,
    },
    {
      title: 'Kết thúc',
      dataIndex: 'validTo',
      key: 'validTo',
      render: (text: any) => <span>{formatDateString(text)}</span>,
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_: any, record: any) => (
        <div className="space-x-2">
          <Link
            to={`/admin/voucher/update/${record.id}`}
            className="text-yellow-500 hover:text-yellow-600"
          >
            Sửa
          </Link>
          <Button
            type="link"
            className="text-red-500 hover:text-red-600"
            onClick={() => showDeleteModal(record.id)}
          >
            Xoá
          </Button>
          <Modal
            title="Xác nhận xóa"
            open={isDeleteModalOpen}
            onOk={handleDelete}
            onCancel={handleCancel}
          >
            <p>Bạn có chắc chắn muốn xóa?</p>
          </Modal>
        </div>
      ),
    },
  ];


  return (
    <div className="">
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item><Link to="/admin">Trang chủ</Link></Breadcrumb.Item>
        <Breadcrumb.Item>Mã giảm giá</Breadcrumb.Item>
      </Breadcrumb>
      <Table columns={columns} dataSource={voucherList} pagination={false} />;

      {/* <PaginationPage
            current={1}
            total={totalVoucher}
            pageSize={limitPerPage} /> */}
    </div>
  );
};

export default VoucherList;
