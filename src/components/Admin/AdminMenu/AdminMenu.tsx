import React from "react";
import imgLogo from "../../../assets/img/sf-logo2.png";
import imgLogoIcon from "../../../assets/img/logo_icon_v2.png";
import { MdDashboard, MdCategory } from "react-icons/md";
import { FaBoxes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { BiSolidCoupon } from "react-icons/bi";
import { FaCartArrowDown } from "react-icons/fa";
import { FaBlog, FaTruckRampBox } from "react-icons/fa6";
import { Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";

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
      { key: "3-3", label: <Link to="/admin/products">Quản lý đánh giá</Link> },
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
      { key: "7-1", label: <Link to="/admin">Xem bài viết</Link> },
      { key: "7-2", label: <Link to="/admin">Thêm bài viết</Link> },
    ],
  },
  {
    key: "8",
    label: "Đơn hàng",
    icon: <FaTruckRampBox />,
    children: [
      { key: "8-1", label: <Link to="/admin/order">Xem đơn hàng</Link> },
      // { key: '7-2', label: <Link to="/admin/order">Xử lý đơn hàng</Link> },
      // { key: '7-3', label: <Link to="/admin/order">Cập nhật đơn hàng</Link> },
    ],
  },
];

type Props = {
  collapsed: boolean;
};

const AdminMenu: React.FC<Props> = ({ collapsed }): any => {
  const location = useLocation();
  const fullPath = location.pathname;
  const pathSegments = fullPath.split("/").slice(1, 3); // Chỉ lấy 'admin' và 'products'
  const pathAfterAdmin = "/" + pathSegments.join("/");

  return (
    <div className="">
      <Link className="block px-8 py-6 my-6 text-sm text-slate-700" to="/admin">
        {!collapsed && <img src={imgLogo} className="" />}
        {collapsed && <img src={imgLogoIcon} className="w-10" />}
        {/* <img src={imgLogoIcon} className="lg:hidden inline-block" /> */}
      </Link>
      <div>
        <Menu defaultOpenKeys={["1"]} mode="inline" items={menuItems} />
      </div>
    </div>
  );
};

export default AdminMenu;
