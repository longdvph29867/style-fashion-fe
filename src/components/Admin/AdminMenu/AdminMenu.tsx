import React from "react";
import imgLogo from "../../../assets/img/logo140.svg";
import imgLogoIcon from "../../../assets/img/logo_icon.png";
import { MdDashboard, MdCategory } from "react-icons/md";
import { FaBoxes, FaUserAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { BiSolidCoupon } from "react-icons/bi";
import { FaCartArrowDown } from "react-icons/fa";
type Menu = {
  link: string;
  title: string;
  icon: JSX.Element;
  active: boolean;
};
const listMenu: Menu[] = [
  {
    link: "/",
    title: "Trang chủ",
    icon: <MdDashboard />,
    active: false,
  },
  {
    link: "/admin/categories",
    title: "Danh mục",
    icon: <MdCategory />,
    active: false,
  },
  {
    link: "/admin/products",
    title: "Sản phẩm",
    icon: <FaBoxes />,
    active: true,
  },
  {
    link: "/admin/users",
    title: "Người dùng",
    icon: <FaUserAlt />,
    active: false,
  },
  {
    link: "/admin/order",
    title: "Đơn hàng",
    icon: <FaCartArrowDown />,
    active: false,
  },
  {
    link: "/admin/voucher",
    title: "Mã giảm giá",
    icon: <BiSolidCoupon />,
    active: false,
  },
];

const AdminMenu: React.FC = () => {
  const location = useLocation();
  const fullPath = location.pathname;
  const pathSegments = fullPath.split("/").slice(1, 3); // Chỉ lấy 'admin' và 'products'
  const pathAfterAdmin = "/" + pathSegments.join("/");

  return (
    <div className="lg:w-64 lg:px-4 pl-4 lg:min-w-[256px] duration-500">
      <div className="h-full w-8 lg:w-full">
        <Link
          className="block lg:px-8 lg:py-6 my-6 text-sm text-slate-700"
          to="/admin/products"
        >
          <img src={imgLogo} className="hidden lg:block" />
          <img src={imgLogoIcon} className="lg:hidden inline-block" />
        </Link>
        <hr className="h-px border-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />
        <div className="mt-4">
          <ul className="flex flex-col">
            {listMenu.map(({ link, title, icon, active }, index) => {
              return (
                <li key={index} className="">
                  <Link
                    className={`text-sm flex items-center lg:px-4 py-2.5 rounded-lg ${pathAfterAdmin === link ? "lg:bg-white lg:shadow-xl" : ""
                      } `}
                    to={link}
                  >
                    <div
                      className={`lg:mr-2 flex h-8 w-8 items-center justify-center rounded-lg ${active
                        ? "lg:bg-transparent lg:shadow-none bg-white shadow-lg"
                        : ""
                        } `}
                    >
                      {icon}
                    </div>
                    <span className="ml-1 opacity-100 hidden lg:block">
                      {title}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
