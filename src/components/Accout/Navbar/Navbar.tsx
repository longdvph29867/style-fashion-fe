import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
const Navbar = () => {
  const [selectedNavItem, setSelectedNavItem] = useState("");

  const handleNavItemClick = (id: any) => {
    setSelectedNavItem(id);
  };
  return (
    <>
      <div className="account-navbar">
        <hr className="mt-10 border-slate-200" />
        <div className="accout-navbar__container flex space-x-8 md:space-x-14 overflow-x-auto overflow-y-hidden">
          <NavLink
            to={""}
            className={`block py-5 md:py-8  flex-shrink-0 text-sm sm:text-base ${
              selectedNavItem === ""
                ? "border-b-2 border-primary2 text-slate-900 font-medium"
                : ""
            } hover:text-slate-800 text-slate-500`}
            onClick={() => handleNavItemClick("")}
          >
            Thông tin người dùng
          </NavLink>
          <NavLink
            to={"shipping-address"}
            className={`block py-5 md:py-8  flex-shrink-0 text-sm sm:text-base ${
              selectedNavItem === "shipping-address"
                ? "border-b-2 border-primary2 text-slate-900 font-medium"
                : ""
            } hover:text-slate-800 text-slate-500`}
            onClick={() => handleNavItemClick("shipping-address")}
          >
            Địa chỉ giao hàng
          </NavLink>
          {/* <NavLink to={'savelists'} className={`block py-5 md:py-8  flex-shrink-0 text-sm sm:text-base ${selectedNavItem === 'savelists' ? 'border-b-2 border-primary2 text-slate-900 font-medium' : ''} hover:text-slate-800 text-slate-500`} onClick={() => handleNavItemClick('savelists')}>Save lists</NavLink> */}
          {/* <NavLink to={'myorder'} className={`block py-5 md:py-8  flex-shrink-0 text-sm sm:text-base ${selectedNavItem === 'myorder' ? 'border-b-2 border-primary2 text-slate-900 font-medium' : ''} hover:text-slate-800 text-slate-500`} onClick={() => handleNavItemClick('myorder')}> My order</NavLink> */}
          <NavLink
            to="updatepassword"
            className={`block py-5 md:py-8  flex-shrink-0 text-sm sm:text-base ${
              selectedNavItem === "updatepassword"
                ? "border-b-2 border-primary2 text-slate-900 font-medium"
                : ""
            } hover:text-slate-800 text-slate-500`}
            onClick={() => handleNavItemClick("updatepassword")}
          >
            Thay đổi mật khẩu
          </NavLink>
          {/* <NavLink to={'bill'} className={`block py-5 md:py-8  flex-shrink-0 text-sm sm:text-base ${selectedNavItem === 'bill' ? 'border-b-2 border-primary2 text-slate-900 font-medium' : ''} hover:text-slate-800 text-slate-500`} onClick={() => handleNavItemClick('bill')}>Change Billing</NavLink> */}
        </div>
        <hr className="border-slate-200 " />
      </div>
    </>
  );
};

export default Navbar;
