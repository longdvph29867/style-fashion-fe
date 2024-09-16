import { Outlet } from "react-router-dom"
import Account from "../../components/Accout/Account"
import { localUserService } from "../../services/localService";
import { useEffect } from "react";
const AccountPage = () => {
  const infoUser = localUserService.get();

  useEffect(() => {
    if (!infoUser) {
      window.location.href = "/auth/login";
    }
  }, [infoUser]);

  return (
    <div className="accout_page container not-italic">
      <Account />
      <Outlet />
    </div>

  )
}

export default AccountPage