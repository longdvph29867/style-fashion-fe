import imgBg from "../assets/img/bg-login1.jpg";
import imgBgForm from "../assets/img/login/bg-form-login.jpg";
import imgBgFormMen from "../assets/img/login/bg-form-login-men.jpg";
import imgBgFormKid from "../assets/img/login/bg-form-login-kid.jpg";
import { Outlet, useLocation } from "react-router-dom";

const LoginLayout = () => {
  const location = useLocation();
  return (
    <div
      className={`w-screen h-screen flex items-center justify-center bg-gray-400 px-5 
    bg-cover
    bg-center
    relative
    `}
      style={{ backgroundImage: `url(${imgBg})` }}
    >
      <div className="bg-white rounded-xl md:max-w-3xl w-full max-w-md z-10 overflow-hidden max-h-[95vh]">
        <div className=" grid md:grid-cols-2">
          <div className="p-5">
            <Outlet />
          </div>
          <div
            className="bg-cover bg-center min-h-[458px] md:block hidden"
            style={{
              backgroundImage: `url(${
                location?.pathname == "/auth/login"
                  ? imgBgForm
                  : location?.pathname == "/auth/register"
                  ? imgBgFormKid
                  : imgBgFormMen
              })`,
            }}
          ></div>
        </div>
      </div>
      <div
        className="
  absolute
  w-full
  h-full
  left-0
  top-0
  bg-black/50
  "
      ></div>
    </div>
  );
};

export default LoginLayout;
