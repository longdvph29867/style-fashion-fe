import { Link } from "react-router-dom";
import {
  localTokenService,
  localUserService,
} from "../../services/localService";
import { https } from "../../config/axios";
import { hiddenSpinner, showSpinner } from "../../util/spinner";
import { message } from "antd";

const User = () => {
  const infoUser = localUserService.get();

  const handleLogOut = async () => {
    localUserService.remove();
    const data = {
      refreshToken: localTokenService.get()?.refresh.token,
    };
    localTokenService.remove();
    showSpinner();
    await https.post("/auth/logout", data);
    hiddenSpinner();
    message.success("Đăng xuất thành công!");
    setTimeout(() => {
      window.location.href = "/";
    }, 400);
  };

  return (
    <div className="flex items-center">
      <button className="relative flex items-center justify-center w-10 h-10 rounded-full group lg:w-12 lg:h-12 text-content hover:text-title hover:bg-[#ebebeb] duration-300">
        <svg
          className="w-6 h-6 "
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="absolute right-0 z-10 invisible w-40 duration-300 transform opacity-0 group-hover:visible group-hover:opacity-100 top-full">
          <ul className="relative grid gap-1 py-4 text-sm bg-white border rounded-lg shadow-lg border-neutral-100">
            {infoUser ? (
              <>
                <li className="px-2">
                  <Link
                    className="flex items-center px-4 py-2 font-normal rounded-md text-content hover:text-title hover:bg-[#ebebeb] duration-300"
                    to="/account"
                  >
                    Thông tin
                  </Link>
                </li>
                <li className="px-2">
                  <Link
                    className="flex items-center px-4 py-2 font-normal rounded-md text-content hover:text-title hover:bg-[#ebebeb] duration-300"
                    to="/order"
                  >
                    Đơn hàng
                  </Link>
                </li>
                {infoUser.role === "admin" ? (
                  <li className="px-2">
                    <Link
                      className="flex items-center px-4 py-2 font-normal rounded-md text-content hover:text-title hover:bg-[#ebebeb] duration-300"
                      to="/admin/products"
                    >
                      Quản trị
                    </Link>
                  </li>
                ) : (
                  <></>
                )}
                <li className="px-2">
                  <div
                    onClick={handleLogOut}
                    className="flex items-center px-4 py-2 font-normal rounded-md text-content hover:text-title hover:bg-[#ebebeb] duration-300"
                  >
                    Đăng xuất
                  </div>
                </li>
              </>
            ) : (
              <>
                <li className="px-2">
                  <Link
                    className="flex items-center px-4 py-2 font-normal rounded-md text-content hover:text-title hover:bg-[#ebebeb] duration-300"
                    to="/auth/login"
                  >
                    Đăng nhập
                  </Link>
                </li>
                <li className="px-2">
                  <Link
                    className="flex items-center px-4 py-2 font-normal rounded-md text-content hover:text-title hover:bg-[#ebebeb] duration-300"
                    to="/auth/register"
                  >
                    Đăng ký
                  </Link>
                </li>
            
                <li className="px-2">
                  <Link
                    className="flex items-center px-4 py-2 font-normal rounded-md text-content hover:text-title hover:bg-[#ebebeb] duration-300"
                    to="/account"
                  >
                    My Account
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </button>
      {infoUser ? (
        <div className="text-xs text-slate-700">
          Hi,
          {infoUser.name}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default User;
