import "./App.css";
import { Route, Routes } from "react-router-dom";
import AccountPage from "./pages/AccountPage/AccountPage";
import AccountInfomation from "./components/Accout/AccountInfomation";
import ChangePassword from "./components/Accout/ChangePassword";
import MyOrderPage from "./components/MyOrderPage/MyOrderPage";
import ProductListPage from "./components/ProductListPage/ProductListPage";
import LoginLayout from "./Layout/LoginLayout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Spinner from "./components/Spinner/Spinner";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/Home/HomePage";
import Layout from "./Layout/Layout";
import DetailPage from "./pages/DetailPage/DetailPage";
import LayoutAdmin from "./Layout/LayoutAdmin";
import ProductsList from "./pages/admin/Product/ProductsList";
import AddProduct from "./pages/admin/Product/AddProduct";
import UpdateProduct from "./pages/admin/Product/UpdateProduct";
import MyShippingAddress from "./components/Accout/ShipingAddress/MyShippingAddress";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import { isAccessTokenValid, refreshToken } from "./util/token";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    if (!isAccessTokenValid()) {
      refreshToken();
    }
  }, []);

  return (
    <>
      <Spinner />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          {/* account */}
          <Route path="account" element={<AccountPage />}>
            <Route index element={<AccountInfomation />} />
            <Route path="shipping-address" element={<MyShippingAddress />} />
            <Route path="updatepassword" element={<ChangePassword />} />
            <Route path="myorder" element={<MyOrderPage />} />
          </Route>
          <Route path="detail/:slug" element={<DetailPage />} />
          {/* <Route path="details/:slug" element={<DetailProduct />} /> */}
          <Route path="products" element={<ProductListPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
        </Route>
        <Route path="/auth" element={<LoginLayout />}>
          <Route path="verify-email/:token" element={<ResetPassword />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route path="products" element={<ProductsList />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/update/:id" element={<UpdateProduct />} />
        </Route>
        {/* Các route khác nếu có */}
      </Routes>
    </>
  );
}

export default App;
