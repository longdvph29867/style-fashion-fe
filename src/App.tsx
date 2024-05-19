import { Route, Routes } from "react-router-dom";
import "./App.css";
import AccountPage from "./pages/AccountPage/AccountPage";
import AccountInfomation from "./components/Accout/AccountInfomation";
import ChangePassword from "./components/Accout/ChangePassword";

function App() {
  return (
    <div>
      <Routes>
      <Route path="/" Component={AccountPage}>
        <Route path="infomation" Component={AccountInfomation}/>
        <Route path="updatepassword" Component={ChangePassword}/>
      </Route>
        {/* Các route khác nếu có */}
      </Routes>
    </div>
  );
}

export default App;