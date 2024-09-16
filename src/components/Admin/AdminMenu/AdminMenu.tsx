import React, { useContext } from "react";
import imgLogo from "../../../assets/img/sf-logo2.png";
import imgLogoIcon from "../../../assets/img/logo_icon_v2.png";
import { MdDashboard, MdCategory } from "react-icons/md";
import { FaBoxes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiSolidCoupon } from "react-icons/bi";
import { FaCartArrowDown } from "react-icons/fa";
import { FaBlog } from "react-icons/fa6";
import { Menu } from "antd";
import { CommentOutlined, StarOutlined, UserOutlined } from "@ant-design/icons";
import { AuthContext } from "../../../contexts/AuthContext";

type Menu = {
  link: string;
  title: string;
  icon: JSX.Element;
  active: boolean;
  children?: { link: string; title: string }[];
};

const menuItems = [
  {
    key: "1",
    label: <Link to="/admin">Tổng quan</Link>,
    icon: <MdDashboard />,
  },
  {
    key: "2",
    label: "Danh mục",
    icon: <MdCategory />,
    children: [
      { key: "2-1", label: <Link to="/admin/categories">Xem danh mục</Link> },
      {
        key: "2-2",
        label: <Link to="/admin/categories/add">Thêm danh mục</Link>,
      },
    ],
  },
  {
    key: "3",
    label: "Sản phẩm",
    icon: <FaBoxes />,
    children: [
      { key: "3-1", label: <Link to="/admin/products">Xem sản phẩm</Link> },
      {
        key: "3-2",
        label: <Link to="/admin/products/add">Thêm sản phẩm</Link>,
      },
      // { key: "3-3", label: <Link to="/admin/products">Quản lý đánh giá</Link> },
      { key: "3-3", label: <Link to="/admin/products/products-deleted">Khôi phục sản phẩm</Link> },
    ],
  },
  {
    key: "4",
    label: "Người dùng",
    icon: <UserOutlined />,
    children: [
      { key: "4-1", label: <Link to="/admin/users">Xem người dùng</Link> },
      { key: "4-2", label: <Link to="/admin/users/add">Thêm người dùng</Link> },
      // { key: '4-3', label: <Link to="/admin/users">Role</Link> },
    ],
  },
  {
    key: "5",
    label: <Link to="/admin/order">Đơn hàng</Link>,
    icon: <FaCartArrowDown />,
  },
  {
    key: "6",
    label: "Mã giảm giá",
    icon: <BiSolidCoupon />,
    children: [
      { key: "6-1", label: <Link to="/admin/voucher">Xem mã giảm giá</Link> },
      {
        key: "6-2",
        label: <Link to="/admin/voucher/add">Thêm mã giảm giá</Link>,
      },
    ],
  },
  {
    key: "7",
    label: "Bài viết",
    icon: <FaBlog />,
    children: [
      { key: "7-1", label: <Link to="/admin/blog">Xem bài viết</Link> },
      { key: "7-2", label: <Link to="/admin/blog/postnew">Thêm bài viết</Link> },
    ],
  },
  {
    key: "8",
    label: <Link to="/admin/reviews">Đánh giá</Link>,
    icon: <StarOutlined />,
  },
  {
    key: "9",
    label: <Link to="/admin/comments">Bình luận</Link>,
    icon: <CommentOutlined />,
  },
  // {
  //   key: "8",
  //   label: "Đơn hàng",
  //   icon: <FaTruckRampBox />,
  //   children: [
  //     { key: "8-1", label: <Link to="/admin/order">Xem đơn hàng</Link> },
  //     // { key: '7-2', label: <Link to="/admin/order">Xử lý đơn hàng</Link> },
  //     // { key: '7-3', label: <Link to="/admin/order">Cập nhật đơn hàng</Link> },
  //   ],
  // },
];

type Props = {
  collapsed: boolean;
};

const AdminMenu: React.FC<Props> = ({ collapsed }): any => {

  const { userRole }: any = useContext(AuthContext);


  // Lọc menu items dựa trên userRole
  const filteredMenuItems = menuItems.filter((item) => {
    if (userRole === "admin") {
      return true; // Hiển thị tất cả các menu cho admin
    }
    if (userRole === "staff") {
      // Lọc để chỉ hiển thị một số menu cho staff
      return ["5", "7", "8", "9"].includes(item.key); // Ví dụ: chỉ hiển thị "Đơn hàng" và "Bài viết" cho staff
    }
    return false; // Không hiển thị menu nếu userRole không khớp
  });
  return (
    <div className="">
      <Link className="block px-8 py-6 my-6 text-sm text-slate-700" to="/admin">
        {!collapsed && <img src={imgLogo} className="" />}
        {collapsed && <img src={imgLogoIcon} className="w-10" />}
        {/* <img src={imgLogoIcon} className="lg:hidden inline-block" /> */}
      </Link>
      <div>
        <Menu defaultOpenKeys={["1"]} mode="inline" items={filteredMenuItems} />
      </div>
    </div>
  );
};

export default AdminMenu;
