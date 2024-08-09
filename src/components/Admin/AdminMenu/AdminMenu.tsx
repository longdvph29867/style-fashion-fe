import React from "react";
import imgLogo from "../../../assets/img/sf-logo2.png";
import imgLogoIcon from "../../../assets/img/logo_icon_v2.png";
import { MdDashboard, MdCategory } from "react-icons/md";
import { FaBoxes, FaUserAlt } from "react-icons/fa";
import { Link, NavLink, useLocation } from "react-router-dom";
import { BiSolidCoupon } from "react-icons/bi";
type Menu = {
  link: string;
  title: string;
  icon: JSX.Element;
  active: boolean;
  children?: [{ link: string; title: string; icon?: JSX.Element }];
};
const listMenu: Menu[] = [
  {
    link: "/",
    title: "Tổng quan",
    icon: <MdDashboard />,
    active: false,
  },
  {
    link: "/admin/categories",
    title: "Danh mục",
    icon: <MdCategory />,
    active: false,
    children: [{ link: "", title: "Xem danh mục" }],
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
    <div className="lg:w-52 lg:px-4 pl-4 lg:min-w-[200px] duration-500">
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
                <li key={index} className="group relative duration-300">
                  <NavLink
                    className={`text-sm flex items-center lg:px-4 py-2.5 rounded-lg ${
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
                    <span className="ml-1 opacity-100 hidden lg:block">
                      {title}
                    </span>
                    <div className="absolute z-10 left-full invisible w-40 bg-white opacity-0 group-hover:opacity-100 group-hover:visible duration-300">
                      <div className="bg-white m-2 p-1 shadow-[rgba(27,31,35,0.15)_0px_0px_0px_1px] rounded-lg w-full">
                        <Link
                          className="text-sm p-2 rounded-md hover:bg-[#e7e7e7] w-full block"
                          to={""}
                        >
                          Xem sản phẩm
                        </Link>
                      </div>
                    </div>
                  </NavLink>
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
