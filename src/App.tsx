import "./App.css";
import DetailProduct from "./pages/DetailProduct";
import { Route, Routes } from "react-router-dom";
import AccountPage from "./pages/AccountPage/AccountPage";
import AccountInfomation from "./components/Accout/AccountInfomation";
import ChangePassword from "./components/Accout/ChangePassword";
import MyOrderPage from "./components/MyOrderPage/MyOrderPage";
import ProductListPage from "./components/ProductListPage/ProductListPage";
// import Layout from "antd/es/layout/layout";
import LoginLayout from "./Layout/LoginLayout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Spinner from "./components/Spinner";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/Home/HomePage";
import Layout from "./Layout/Layout";
import LayoutAdmin from "./Layout/LayoutAdmin";
import ProductsList from "./pages/admin/Product/ProductsList";
import AddProduct from "./pages/admin/Product/AddProduct";
import UpdateProduct from "./pages/admin/Product/UpdateProduct";
import UsersList from "./pages/admin/User/UsersList";
import AddUser from "./pages/admin/User/AddUser";
import UpdateUser from "./pages/admin/User/UpdateUser";

function App() {
  return (
    <>
      <Spinner />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="account" element={<AccountPage />}>
            <Route index element={<AccountInfomation />} />
            <Route path="updatepassword" element={<ChangePassword />} />
            <Route path="myorder" element={<MyOrderPage />} />
          </Route>
          <Route path="detail" element={<DetailProduct />} />
          <Route path="products" element={<ProductListPage />} />
        </Route>
        <Route path="/auth" element={<LoginLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route path="products" element={<ProductsList />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/update/:id" element={<UpdateProduct />} />
          <Route path="users" element={<UsersList />} />
          <Route path="users/add" element={<AddUser />} />
          <Route path="users/update/:id" element={<UpdateUser />} />
        </Route>
        {/* Các route khác nếu có */}
      </Routes>
    </>
  );
}

export default App;
