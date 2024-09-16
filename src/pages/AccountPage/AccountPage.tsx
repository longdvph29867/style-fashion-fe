import { Outlet } from "react-router-dom"
import Account from "../../components/Accout/Account"
const AccountPage = () => {
  return (
    <div className="accout_page container not-italic">
      <Account />
      <Outlet />
    </div>

  )
}

export default AccountPage