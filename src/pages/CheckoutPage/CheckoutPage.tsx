import { Link, useNavigate } from "react-router-dom";
import OrderSummary from "../../components/Checkout/OrderSummary";
import PaymentMethod from "../../components/Checkout/PaymentMethod";
import ShippingAddress from "../../components/Checkout/ShippingAddress";
import cartService from "../../services/cartService";
import React, { useEffect, useMemo, useState } from "react";
import { CartType } from "../../types/cartType";
import { ShippingAddressType } from "../../types/shippingAddress";
import { hiddenSpinner, showSpinner } from "../../util/util";
import { majorCities, surroundingProvinces } from "../../constant/constant";
import { CheckoutType, ProductOrderType } from "../../types/orderType";
import orderService from "../../services/orderService";
import OrderNote from "../../components/Checkout/OrderNote";
import { useSelector } from "react-redux";
import { RootState } from "../../Toolkits/store";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { message } from "antd";

const CheckoutPage = () => {
  const user = useSelector((state: RootState) => state.userSlice.userInfo);
  const [productList, setProductList] = useState<CartType | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const navigate = useNavigate();
  const [orderNote, setOrderNote] = useState("");
  const [addressSelected, setAddressSelected] =
    useState<ShippingAddressType | null>(null);

  useEffect(() => {
    if (user?.id) {
      showSpinner();
      cartService
        .getCartByUserId(user.id)
        .then((res) => {
          setProductList(res.data);
          hiddenSpinner();
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        });
    }
  }, []);

  const subtotal = useMemo(() => {
    if (productList) {
      return productList.products_cart.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.quantity * currentValue.attribute.price,
        0
      );
    }
    return 0;
  }, [productList]);

  const shippingFee = useMemo(() => {
    if (addressSelected) {
      if (majorCities.includes(addressSelected.cityProvince)) {
        return 16000;
      } else if (surroundingProvinces.includes(addressSelected.cityProvince)) {
        return 24000;
      } else {
        return 28000;
      }
    }
    return 0;
  }, [addressSelected]);

  const handleCreateOrder = () => {
    if (productList && addressSelected && user?.id) {
      const productsOrder: ProductOrderType[] = productList.products_cart.map(
        (item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.attribute.price,
          productName: item.product.name,
          slug: item.product.slug,
          imageProduct: item.product.thumbnail,
          imageAtrribute: item.attribute.image,
          attribute: item.attribute.name,
        })
      );
      const shippingAddressOrder = {
        recipientName: addressSelected.recipientName,
        recipientPhoneNumber: addressSelected.recipientPhoneNumber,
        streetAddress: addressSelected.streetAddress,
        wardCommune: addressSelected.wardCommune,
        district: addressSelected.district,
        cityProvince: addressSelected.cityProvince,
      };
      const newOrder: CheckoutType = {
        productsOrder,
        shippingAddress: shippingAddressOrder,
        user: user.id,
        historicalCost: subtotal,
        salePrice: 0,
        shippingFee: shippingFee,
        note: orderNote,
        totalPrice: subtotal + shippingFee,
        paymentMethod: paymentMethod,
        paymentId: "",
        voucher: "",
      };
      if (paymentMethod === "VNPAY") {
        orderService.createVNPAY(newOrder).then((response) => {
          console.log(response);
          window.location.href = response.data.url;
        });
      } else {
        orderService.createCOD(newOrder).then((response) => {
          message.success("Đặt hàng thành công")
        });
      }
    }
  };

  const handleChangeOrderNote = () => {
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setOrderNote(event.target.value);
    };
  };

  const listBreadcrumb = [
    {
      label: "Giỏ hàng",
      link: "/carts",
    },
    { label: "Thanh toán" },
  ];

  return (
    <div className="Checkout-Page">
      <main className="container py-16 sm:py-24">
        <div className="mb-16">
          {/* <Breadcrumb list={listBreadcrumb} /> */}
          <h2 className="block text-2xl font-mono sm:text-3xl lg:text-4xl font-semibold">
            Thanh toán
          </h2>
          <div className="block mt-3 sm:mt-5 text-xs sm:text-sm font-medium text-slate-700">
            <Link to="/">Trang chủ</Link>
            <span className="text-xs mx-1 sm:mx-1.5">/</span>
            <Link to="/carts">Giỏ hàng</Link>
            <span className="text-xs mx-1 sm:mx-1.5">/</span>
            <span className="underline">Thanh toán</span>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/*  */}
          <div className="flex-1">
            <div className="space-y-8">
              {/* SHIPPING ADDRESS */}
              <ShippingAddress
                userId={user?.id}
                setAddressSelected={setAddressSelected}
                addressSelected={addressSelected}
              />
              {/* PAYMENT METHOD */}
              <PaymentMethod
                shippingMethod={paymentMethod}
                selectShippingMethod={setPaymentMethod}
              />
              <OrderNote onChange={handleChangeOrderNote} />
            </div>
          </div>
          {/* Border */}
          <div className="border border-slate-200 rounded-xl my-10 lg:my-0" />
          {/* Order summary */}
          <OrderSummary
            confirmOrder={handleCreateOrder}
            productList={productList}
            shippingfee={shippingFee}
            subTotal={subtotal}
          />
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
