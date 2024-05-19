import "./App.css";
import MyOrderPage from "./components/MyOrderPage/MyOrderPage";
import ProductListPage from "./components/ProductListPage/ProductListPage";
import DetailProduct from "./pages/DetailProduct";
import { Route, Routes } from "react-router-dom";
import AccountPage from "./pages/AccountPage/AccountPage";
import AccountInfomation from "./components/Accout/AccountInfomation";
import ChangePassword from "./components/Accout/ChangePassword";
import MyOrderPage from "./components/MyOrderPage/MyOrderPage";
import ProductListPage from "./components/ProductListPage/ProductListPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" Component={AccountPage}>
          <Route path="account" Component={AccountInfomation} />
          <Route path="infomation" Component={AccountInfomation} />
          <Route path="updatepassword" Component={ChangePassword} />
          <Route path="detail" element={<DetailProduct />} />
          <Route path="detail" element={<ProductListPage />} />
        </Route>
        {/* Các route khác nếu có */}
      </Routes>
    </div>
  );
}

export default App;
