import { Link, useNavigate } from "react-router-dom";
import OrderSummary from "../../components/Checkout/OrderSummary";
import PaymentMethod from "../../components/Checkout/PaymentMethod";
import ShippingAddress from "../../components/Checkout/ShippingAddress";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { ShippingAddressType } from "../../types/shippingAddress";
import { majorCities, surroundingProvinces } from "../../constant/constant";
import orderService from "../../services/orderService";
import OrderNote from "../../components/Checkout/OrderNote";
import { useSelector } from "react-redux";
import { RootState } from "../../Toolkits/store";
import { message } from "antd";
import VoucherModal from "../../components/Checkout/VoucherModal";
import { Voucher } from "../../types/voucher";
import "../../assets/css/checkoutPage.css";
import { hiddenSpinner, showSpinner } from "../../util/util";
import { useQueryClient } from "@tanstack/react-query";
import {
  CreateOrder,
  OrderProduct,
  OrderShippingAddress,
} from "../../types/orderType";
import infoShipping from "../../services/infoShippingService";

const CheckoutPage = () => {
  const user = useSelector((state: RootState) => state.userSlice.userInfo);
  const [openModalVoucher, setOpenModalVoucher] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const navigate = useNavigate();
  const [orderNote, setOrderNote] = useState("");
  const [voucherSelected, setVoucherSelected] = useState<Voucher | null>(null);
  const [addressSelected, setAddressSelected] =
    useState<ShippingAddressType | null>(null);
  const productCheckout = useSelector(
    (state: RootState) => state.checkoutSlice.products
  );

  useEffect(() => {
    if (productCheckout.length === 0) {
      navigate("/carts");
    }
  }, [navigate, productCheckout.length]);

  useEffect(() => {
    infoShipping.getShippingFee();
  });
  const queryClient = useQueryClient();

  const subtotal = useMemo(() => {
    return productCheckout.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.quantity * currentValue.variant.currentPrice,
      0
    );
  }, [productCheckout]);

  const calculateDiscount = useMemo(() => {
    if (voucherSelected && voucherSelected.type === "percentage") {
      return subtotal * (voucherSelected.discount / 100);
    }
    return voucherSelected?.discount ?? 0;
  }, [subtotal, voucherSelected]);

  const handleCreateOrder = () => {
    if (addressSelected && user?.id) {
      // const productsOrder: OrderProduct[] = productCheckout.map((item) => ({
      //   variant: item._id,
      //   quantity: item.quantity,
      // }));
      // const shippingAddressOrder: OrderShippingAddress = {
      //   name: addressSelected.recipientName,
      //   phoneNumber: addressSelected.recipientPhoneNumber,
      //   address: addressSelected.streetAddress,
      //   ward: addressSelected.wardCommune,
      //   district: addressSelected.district,
      //   province: addressSelected.cityProvince,
      // };
      // const newOrder: CreateOrder = {
      //   products: productsOrder,
      //   shippingAddress: shippingAddressOrder,
      //   user: user.id,
      //   subTotal: subtotal,
      //   discountAmount: calculateDiscount,
      //   shippingFee: shippingFee,
      //   note: orderNote,
      //   totalPrice: subtotal + shippingFee - calculateDiscount,
      //   paymentMethod: paymentMethod,
      // };
      showSpinner();
      // if (paymentMethod === "VNPAY") {
      //   orderService.createVNPAY(newOrder).then(async (response) => {
      //     hiddenSpinner();
      //     window.location.href = response.data.url;
      //   });
      // } else {
      //   orderService.createCOD(newOrder).then(() => {
      //     queryClient.refetchQueries({
      //       queryKey: ["carts"],
      //       type: "active",
      //     });
      //     hiddenSpinner();
      //     navigate("/order");
      //     message.success("Đặt hàng thành công");
      //   });
      // }
    }
  };

  const handleChangeOrderNote = () => {
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setOrderNote(event.target.value);
    };
  };

  const onOpenVoucherModal = () => {
    setOpenModalVoucher(true);
  };

  const handleSelectVoucher = (voucher: Voucher) => {
    setVoucherSelected(voucher);
    setOpenModalVoucher(false);
  };

  return (
    <div className="Checkout-Page">
      <main className="container py-16 sm:py-24">
        <div className="mb-16">
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
            discountAmount={calculateDiscount}
            voucherName={voucherSelected?.name}
            confirmOrder={handleCreateOrder}
            productCheckout={productCheckout}
            shippingfee={shippingFee}
            onOpenVoucher={onOpenVoucherModal}
            subTotal={subtotal}
          />
          <VoucherModal
            totalCartPrice={subtotal}
            selectVoucher={handleSelectVoucher}
            openModalVoucher={openModalVoucher}
            setOpenModalVoucher={setOpenModalVoucher}
            voucherSelectedId={voucherSelected?.id ?? ""}
          />
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
