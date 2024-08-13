import React, { useState } from "react";
import imgLogo from "../../../assets/img/sf-logo2.png";
import imgLogoIcon from "../../../assets/img/logo_icon_v2.png";
import { MdDashboard, MdCategory } from "react-icons/md";
import { FaBoxes, FaUserAlt, FaAngleRight } from "react-icons/fa";
import { Link, NavLink, useLocation } from "react-router-dom";
import { BiSolidCoupon } from "react-icons/bi";
import { FaBlog, FaTruckRampBox } from "react-icons/fa6";
import { Button, Menu } from "antd";
import { CaretDownOutlined, DownOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';

type Menu = {
  link: string;
  title: string;
  icon: JSX.Element;
  active: boolean;
  children?: { link: string; title: string }[];
};
// const listMenu: Menu[] = [
//   {
//     link: "/",
//     title: "Tổng quan",
//     icon: <MdDashboard />,
//     active: false,
//   },
//   {
//     link: "/admin/categories",
//     title: "Danh mục",
//     icon: <MdCategory />,
//     active: false,
//     children: [
//       { link: "", title: "Xem danh mục" },
//       { link: "", title: "Thêm danh mục" },
//     ],
//   },
//   {
//     link: "/admin/products",
//     title: "Sản phẩm",
//     icon: <FaBoxes />,
//     active: false,
//     children: [
//       { link: "", title: "Xem sản phẩm" },
//       { link: "", title: "Thêm sản phẩm" },
//       { link: "", title: "Quản lý đánh giá" },
//     ],
//   },
//   {
//     link: "/admin/users",
//     title: "Người dùng",
//     icon: <FaUserAlt />,
//     active: false,
//     children: [
//       { link: "", title: "Xem người dùng" },
//       { link: "", title: "Thêm người dùng" },
//       { link: "", title: "Role" },
//     ],
//   },
//   {
//     link: "/admin/voucher",
//     title: "Mã giảm giá",
//     icon: <BiSolidCoupon />,
//     active: false,
//   },
//   {
//     link: "/admin/voucher",
//     title: "Bài viết",
//     icon: <FaBlog />,
//     active: false,
//     children: [
//       { link: "", title: "Xem bài viết" },
//       { link: "", title: "Thêm bài viết" },
//     ],
//   },
//   {
//     link: "/admin/voucher",
//     title: "Đơn hàng",
//     icon: <FaTruckRampBox />,
//     active: false,
//     children: [
//       { link: "", title: "Xem đơn hàng" },
//       { link: "", title: "Xử lý đơn hàng" },
//       { link: "", title: "Cập nhật đơn hàng" },
//     ],
//   },
// ];

const menuItems = [
  {
    key: '1',
    label: <Link to="/admin">Tổng quan</Link>,
    icon: <MdDashboard />,
  },
  {
    key: '2',
    label: 'Danh mục',
    icon: <MdCategory />,
    children: [
      { key: '2-1', label: <Link to="/admin/categories">Xem danh mục</Link> },
      { key: '2-2', label: <Link to="/admin/categories/add">Thêm danh mục</Link> },
    ],
  },
  {
    key: '3',
    label: 'Sản phẩm',
    icon: <FaBoxes />,
    children: [
      { key: '3-1', label: <Link to="/admin/products">Xem sản phẩm</Link> },
      { key: '3-2', label: <Link to="/admin/products/add">Thêm sản phẩm</Link> },
      { key: '3-3', label: <Link to="/admin/products">Quản lý đánh giá</Link> },
    ],
  },
  {
    key: '4',
    label: 'Người dùng',
    icon: <UserOutlined />,
    children: [
      { key: '4-1', label: <Link to="/admin/users">Xem người dùng</Link> },
      { key: '4-2', label: <Link to="/admin/users/add">Thêm người dùng</Link> },
      { key: '4-3', label: <Link to="/admin/users">Role</Link> },
    ],
  },
  {
    key: '5',
    label: <Link to="/admin/voucher">Mã giảm giá</Link>,
    icon: <BiSolidCoupon />,
  },
  {
    key: '6',
    label: 'Bài viết',
    icon: <FaBlog />,
    children: [
      { key: '6-1', label: <Link to="/admin">Xem bài viết</Link> },
      { key: '6-2', label: <Link to="/admin">Thêm bài viết</Link> },
    ],
  },
  {
    key: '7',
    label: 'Đơn hàng',
    icon: <FaTruckRampBox />,
    children: [
      { key: '7-1', label: <Link to="/admin/order">Xem đơn hàng</Link> },
      { key: '7-2', label: <Link to="/admin/order">Xử lý đơn hàng</Link> },
      { key: '7-3', label: <Link to="/admin/order">Cập nhật đơn hàng</Link> },
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
    // <div className="lg:w-[255px] lg:px-4 pl-4  duration-500">
    //   <div className="h-full w-8 lg:w-full">
    //     <Link
    //       className="block lg:px-8 lg:py-6 my-6 text-sm text-slate-700"
    //       to="/admin/products"
    //     >
    //       <img src={imgLogo} className="hidden lg:block" />
    //       <img src={imgLogoIcon} className="lg:hidden inline-block" />
    //     </Link>
    //     {/* <hr className="h-px border-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" /> */}
    //     {/* <div className="mt-4">
    //       <ul className="flex flex-col">
    //         {listMenu.map(({ link, title, icon, active, children }, index) => {
    //           return (
    //             <li
    //               key={index}
    //               className="relative group hover:bg-gray-200 duration-300 rounded-lg"
    //             >
    //               <NavLink
    //                 className={`text-sm flex items-center lg:px-2 py-2.5 ${
    //                   pathAfterAdmin === link ? "lg:bg-white lg:shadow-xl" : ""
    //                 } `}
    //                 to={link}
    //               >
    //                 <div
    //                   className={`lg:mr-2 flex h-8 w-8 items-center justify-center rounded-lg ${
    //                     active
    //                       ? "lg:bg-transparent lg:shadow-none bg-white shadow-lg"
    //                       : ""
    //                   } `}
    //                 >
    //                   {icon}
    //                 </div>
    //                 <div className="hidden justify-between items-center flex-grow opacity-100 lg:flex">
    //                   <span className="ml-1">{title}</span>
    //                   {children && <FaAngleRight />}
    //                 </div>
    //                 {children ? (
    //                   <div className="absolute z-10 left-full -top-1 invisible w-40 bg-white opacity-0 group-hover:opacity-100 group-hover:visible duration-300">
    //                     <div className="bg-white m-2 p-1 shadow-[rgba(27,31,35,0.15)_0px_0px_0px_1px] rounded-lg w-full">
    //                       <span className="font-semibold text-gray-400 p-2">
    //                         {title}
    //                       </span>
    //                       {children?.map((child) => (
    //                         <Link
    //                           className="text-sm p-2 rounded-md hover:bg-[#e7e7e7] w-full block"
    //                           to={child.link}
    //                         >
    //                           {child.title}
    //                         </Link>
    //                       ))}
    //                     </div>
    //                     <span className="absolute border-[8px] border-t-transparent border-b-transparent border-l-transparent top-5 -left-2"></span>
    //                   </div>
    //                 ) : (
    //                   <div className="absolute z-10 left-full -top-1 invisible w-40 bg-white opacity-0 group-hover:visible duration-300 group-hover:opacity-100 lg:hidden cursor-text">
    //                     <div className="bg-white m-2 p-1 shadow-[rgba(27,31,35,0.15)_0px_0px_0px_1px] rounded-lg w-full">
    //                       <p className="font-semibold p-2">{title}</p>
    //                     </div>
    //                     <span className="absolute border-[8px] border-t-transparent border-b-transparent border-l-transparent top-5 -left-2"></span>
    //                   </div>
    //                 )}
    //               </NavLink>
    //             </li>
    //           );
    //         })}
    //       </ul>
    //     </div> */}
    //     <div className="">
    //       <Button className="block lg:hidden " type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
    //         {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    //       </Button>
    //     </div>
    //     <div className={`${collapsed ? 'block' : 'hidden'} lg:block`}>
    //       <Menu
    //         // onClick={onClick}
    //         style={{ width: 256 }}
    //         // defaultSelectedKeys={['3-1']}
    //         defaultOpenKeys={['1']}
    //         mode="inline"
    //         items={menuItems}
    //         inlineCollapsed={collapsed}
    //       // expandIcon={({ isOpen }) => <CaretDownOutlined rotate={isOpen ? 180 : 0} />}
    //       />
    //     </div>
    //   </div>
    // </div>
    <div className="">
      <div className="">
        <Link
          className="block lg:px-8 lg:py-6 my-6 text-sm text-slate-700"
          to="/admin/products"
        >
          <img src={imgLogo} className="hidden lg:block" />
          {/* <img src={imgLogoIcon} className="lg:hidden inline-block" /> */}
        </Link>
        {/* <hr className="h-px border-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" /> */}
        {/* <div className="mt-4">
          <ul className="flex flex-col">
            {listMenu.map(({ link, title, icon, active, children }, index) => {
              return (
                <li
                  key={index}
                  className="relative group hover:bg-gray-200 duration-300 rounded-lg"
                >
                  <NavLink
                    className={`text-sm flex items-center lg:px-2 py-2.5 ${
                      pathAfterAdmin === link ? "lg:bg-white lg:shadow-xl" : ""
                    } `}
                    to={link}
                  >
                    <div
                      className={`lg:mr-2 flex h-8 w-8 items-center justify-center rounded-lg ${
                        active
                          ? "lg:bg-transparent lg:shadow-none bg-white shadow-lg"
                          : ""
                      } `}
                    >
                      {icon}
                    </div>
                    <div className="hidden justify-between items-center flex-grow opacity-100 lg:flex">
                      <span className="ml-1">{title}</span>
                      {children && <FaAngleRight />}
                    </div>
                    {children ? (
                      <div className="absolute z-10 left-full -top-1 invisible w-40 bg-white opacity-0 group-hover:opacity-100 group-hover:visible duration-300">
                        <div className="bg-white m-2 p-1 shadow-[rgba(27,31,35,0.15)_0px_0px_0px_1px] rounded-lg w-full">
                          <span className="font-semibold text-gray-400 p-2">
                            {title}
                          </span>
                          {children?.map((child) => (
                            <Link
                              className="text-sm p-2 rounded-md hover:bg-[#e7e7e7] w-full block"
                              to={child.link}
                            >
                              {child.title}
                            </Link>
                          ))}
                        </div>
                        <span className="absolute border-[8px] border-t-transparent border-b-transparent border-l-transparent top-5 -left-2"></span>
                      </div>
                    ) : (
                      <div className="absolute z-10 left-full -top-1 invisible w-40 bg-white opacity-0 group-hover:visible duration-300 group-hover:opacity-100 lg:hidden cursor-text">
                        <div className="bg-white m-2 p-1 shadow-[rgba(27,31,35,0.15)_0px_0px_0px_1px] rounded-lg w-full">
                          <p className="font-semibold p-2">{title}</p>
                        </div>
                        <span className="absolute border-[8px] border-t-transparent border-b-transparent border-l-transparent top-5 -left-2"></span>
                      </div>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div> */}

        <div>
          <Menu
            // onClick={onClick}
            // style={{ width: 256 }}
            // defaultSelectedKeys={['3-1']}
            defaultOpenKeys={['1']}
            mode="inline"
            items={menuItems}
            inlineCollapsed={collapsed}
          // expandIcon={({ isOpen }) => <CaretDownOutlined rotate={isOpen ? 180 : 0} />}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
