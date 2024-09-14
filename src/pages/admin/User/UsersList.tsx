import { useEffect, useState } from "react";
import {
  formartCurrency,
  hiddenSpinner,
  showSpinner,
} from "../../../util/util";
import { Link } from "react-router-dom";
import { Breadcrumb, Button, Image, Modal, Select, Table, message } from "antd";
import { https } from "../../../config/axios";
import { IUser } from "../../../types/userType";
import { CiCircleAlert } from "react-icons/ci";
import { IoIosCheckboxOutline } from "react-icons/io";
import userService from "../../../services/userService";
import PaginationPage from "../../../components/PaginationPage/PaginationPage";
import UserListSkeleton from "../../../components/Skeleton/Admin/UserListSkeleton";

const UsersList: React.FC = () => {
  const params = new URLSearchParams(location.search);
  const [totalUsers, setTotalUser] = useState(0);

  const [loading, setLoading] = useState(true);
  const limitPerPage = 15;
  const currentPage = params.get("page") ? Number(params.get("page")) : 1;
  params.set("limit", limitPerPage.toString());
  params.set("page", currentPage.toString());

  const [usersList, setUsersList] = useState<IUser[]>([]);

  const handleTableChange = (filters: any, sorter: any) => {
    // setLoading(true);
    console.log("filters", filters);
    console.log("sorter", sorter);

    if (sorter.field) {
      let sortOrder = '';
      if (sorter.order === 'ascend') {
        sortOrder = 'asc';
        params.set('sortBy', `${sorter.field}:${sortOrder}`);
      } else if (sorter.order === 'descend') {
        sortOrder = 'desc';
        params.set('sortBy', `${sorter.field}:${sortOrder}`);
      } else if (sorter.order === undefined) {
        sortOrder = '';
        params.delete('sortBy');
      }
      // setCurrentSorter(sorter); // Lưu sorter vào state
    }

    // Thêm filters vào queryParams
    for (const key in filters) {
      if (filters[key]) {
        console.log("key", key);
        console.log("filters[key]", filters[key]);
        // Nếu filters[key] là một mảng, chuyển đổi nó thành chuỗi
        const filterValue = Array.isArray(filters[key])
          ? filters[key].join(",")
          : filters[key];

        params.set(key, filterValue); // Set giá trị cho params
      } else {
        params.delete(key);

      }
    }

    // navigate(location.pathname + "?" + params.toString());
    window.history.replaceState(null, '', location.pathname + "?" + params.toString());
    fetchData();
  }

  const fetchData = async () => {
    showSpinner();
    try {
      // Biến queryUrl chứa tất cả các tham số
      const queryUrl = `${params.toString()}`;
      console.log("queryUrl", queryUrl);

      const { data } = await userService.getAllUsersV2(queryUrl);
      setLoading(false);
      setUsersList(data.results);
      setTotalUser(data.totalResults);
      window.scrollTo(0, 0);
      hiddenSpinner();
    } catch (error) {
      hiddenSpinner();
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handleDelete = async (id: string) => {
    showSpinner();
    try {
      const data = await https.delete(`/users/${id}`);
      if (data) {
        message.success("Thao tác thành công");
        fetchData();
        hiddenSpinner();
      }
    } catch (error) {
      hiddenSpinner();
      console.log(error);
      message.error(error.response.data.message);
    }
  };

  const { confirm } = Modal;

  const showConfirm = (id: string) => {
    confirm({
      title: 'Bạn có chắc chắn muốn xóa?',
      onOk() {
        handleDelete(id);
      },
      onCancel() {
        console.log('Cancel');
      },
      maskClosable: true,
    });
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_: any, __: any, index: number) => ((currentPage - 1) * limitPerPage + (index + 1)),
      width: "3%",
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (text: any, record: any) => (
        <Image
          src={record.image}
          alt={record.name}
          width={50}
          height={50}
          style={{ borderRadius: '8px' }}
        />
      ),
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text: any, record: any) => (
        <>
          <p>{record.email}</p>
          <div className="flex gap-1 items-center">
            {record.isEmailVerified ? (
              <>
                <IoIosCheckboxOutline color="green" />
                <span className="text-xs font-semibold text-slate-300">
                  Đã xác minh
                </span>
              </>
            ) : (
              <>
                <CiCircleAlert color="red" />
                <span className="text-xs font-semibold text-slate-300">
                  Chưa xác minh
                </span>
              </>
            )}
          </div>
        </>
      ),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      render: (text: any, record: any) => (
        <>
          <span>{record.phoneNumber}</span>
          <div className="flex gap-1 items-center">
            {record.isPhoneNumberVerified ? (
              <>
                <IoIosCheckboxOutline color="green" />
                <span className="text-xs font-semibold text-slate-300">
                  Đã xác minh
                </span>
              </>
            ) : (
              <>
                <CiCircleAlert color="red" />
                <span className="text-xs font-semibold text-slate-300">
                  Chưa xác minh
                </span>
              </>
            )}
          </div>
        </>
      ),
    },
    {
      title: 'Quận/Huyện',
      dataIndex: 'shippingAddress',
      key: 'districtName',
      render: (text: any, record: any) => (
        <p>{record.shippingAddress[0]?.districtName || "..."}</p>
      ),
      // sorter: true,
    },
    {
      title: 'Tỉnh/Thành phố',
      dataIndex: 'shippingAddress',
      key: 'provinceName',
      render: (text: any, record: any) => (
        <p>{record.shippingAddress[0]?.provinceName || "..."}</p>
      ),
      // sorter: true,
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => {
        let color = '';
        switch (role) {
          case 'admin':
            color = 'bg-orange-500 text-white'; // Màu cho admin
            break;
          case 'staff':
            color = 'bg-blue-500 text-white'; // Màu cho nhân viên (staff)
            break;
          case 'customer':
            color = 'bg-green-500 text-white'; // Màu cho khách hàng (customer)
            break;
          default:
            color = 'bg-gray-300 text-black'; // Mặc định nếu không khớp
            break;
        }

        return (
          <span className={`px-2 py-1 rounded ${color}`}>
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </span>
        );
      },
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }: any) => (
        <div style={{ padding: 8 }}>
          <Select
            value={selectedKeys[0]}
            onChange={(value) => {
              setSelectedKeys(value ? [value] : []);
              confirm();
            }}
            style={{ width: 120 }}
            placeholder="Chọn"
          >
            <Select.Option value="admin">admin</Select.Option>
            <Select.Option value="staff">nhân viên</Select.Option>
            <Select.Option value="customer">khách hàng</Select.Option>
          </Select>
          <div>
            <button
              className="text-left"
              onClick={() => {
                clearFilters && clearFilters();
                confirm();
              }}
              style={{ width: 90, marginTop: 8 }}
            >
              Reset
            </button>
          </div>
        </div>
      ),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (text: any, record: any) => (
        <div className="space-x-2">
          <Link
            to={`/admin/users/${record.id}`}
            className="text-yellow-500 hover:text-yellow-600"
          >
            Chi tiết
          </Link>
          {record.role !== 'admin' && (
            <Button
              type="link"
              className="text-red-500 hover:text-red-600"
              onClick={() => showConfirm(record.id)}
            >
              Xoá
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="">
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item><Link to="/admin">Trang chủ</Link></Breadcrumb.Item>
        <Breadcrumb.Item>Người dùng</Breadcrumb.Item>
      </Breadcrumb>
      <Table columns={columns} dataSource={usersList} pagination={false}
        onChange={(pagination, filters, sorter) => handleTableChange(filters, sorter)}

      />

      <PaginationPage
        current={1}
        total={totalUsers}
        pageSize={limitPerPage}
        currentUrl={window.location.href} // Truyền URL hiện tại vào

      />

    </div>
  );
};

export default UsersList;
