import { Link, useNavigate } from "react-router-dom";
import OrderSummary from "../../components/Checkout/OrderSummary";
import PaymentMethod from "../../components/Checkout/PaymentMethod";
import ShippingAddress from "../../components/Checkout/ShippingAddress";
import { ChangeEvent, useEffect, useState } from "react";
import { ShippingAddressType } from "../../types/shippingAddress";
import orderService from "../../services/orderService";
import OrderNote from "../../components/Checkout/OrderNote";
import { message } from "antd";
import VoucherModal from "../../components/Checkout/VoucherModal";
import "../../assets/css/checkoutPage.css";
import { useQueryClient } from "@tanstack/react-query";
import {
  CreateOrder,
  OrderProduct,
  OrderShippingAddress,
} from "../../types/orderType";
import infoShipping from "../../services/infoShippingService";
import { localUserService } from "../../services/localService";
import voucherService from "../../services/voucherService";
import { useSelectedCarts } from "../../hooks";
interface SelectedVoucher {
  code: string;
  name: string;
}

const CheckoutPage = () => {
  const user = localUserService.get();
  const [openModalVoucher, setOpenModalVoucher] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const navigate = useNavigate();
  const [orderNote, setOrderNote] = useState("");
  const [voucherSelected, setVoucherSelected] =
    useState<SelectedVoucher | null>(null);
  const [subTotal, setSubTotal] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [addressSelected, setAddressSelected] =
    useState<ShippingAddressType | null>(null);
  const [validVariant, setValidVariant] = useState(false);
  const queryClient = useQueryClient();

  const selectedItem = useSelectedCarts();

  useEffect(() => {
    if (selectedItem.length === 0) {
      navigate("/carts");
    }
  }, [navigate, selectedItem.length]);

  useEffect(() => {
    let subTotalPrice = 0;
    let sumQuantity = 0;
    for (const product of selectedItem) {
      if (!product.variant) {
        setValidVariant(true);
        return;
      }
      subTotalPrice += product.quantity * product.variant.currentPrice;
      sumQuantity += product.quantity;
    }
    setSubTotal(subTotalPrice);
    if (addressSelected) {
      infoShipping
        .getShippingFee({
          quantity: sumQuantity,
          totalPrice: subTotalPrice,
          toDistrict: addressSelected?.districtCode,
          toWard: addressSelected?.wardCode,
        })
        .then((res) => {
          setShippingFee(res.data.total);
        });
    }
  }, [addressSelected, selectedItem]);

  const createOrder = () => {
    if (addressSelected && user?.id) {
      const productsOrder: OrderProduct[] = selectedItem.map((item) => ({
        variant: item.variant._id,
        quantity: item.quantity,
      }));
      const shippingAddressOrder: OrderShippingAddress = {
        name: addressSelected.name,
        phoneNumber: addressSelected.phoneNumber,
        address: addressSelected.address,
        ward: addressSelected.wardName,
        district: addressSelected.districtName,
        province: addressSelected.provinceName,
      };
      const newOrder: CreateOrder = {
        products: productsOrder,
        shippingAddress: shippingAddressOrder,
        user: user.id,
        subTotal: subTotal,
        discountAmount: discountAmount,
        shippingFee: shippingFee,
        note: orderNote,
        totalPrice: subTotal + shippingFee - discountAmount,
        paymentMethod: paymentMethod,
      };
      if (paymentMethod === "VNPAY") {
        orderService.createVNPAY(newOrder).then(async (response) => {
          window.location.href = response.data.url;
        });
      } else {
        orderService.createCOD(newOrder).then(() => {
          queryClient.refetchQueries({
            queryKey: ["carts"],
            type: "active",
          });
          navigate("/order");
          message.success("Đặt hàng thành công");
        });
      }
    }
  };

  const handleCreateOrder = () => {
    if (voucherSelected) {
      voucherService
        .useVoucher({
          code: voucherSelected.code,
          cartPrice: subTotal,
        })
        .then(() => {
          createOrder();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      createOrder();
    }
  };

  const handleChangeOrderNote = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setOrderNote(event.target.value);
  };

  const onOpenVoucherModal = () => {
    setOpenModalVoucher(true);
  };

  const handleSelectVoucher = (
    code: string,
    name: string,
    discountAmount: number
  ) => {
    setDiscountAmount(discountAmount);
    setVoucherSelected({ code, name });
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
              <OrderNote onChange={handleChangeOrderNote} value={orderNote} />
            </div>
          </div>
          {/* Border */}
          <div className="border border-slate-200 rounded-xl my-10 lg:my-0" />
          {/* Order summary */}
          <OrderSummary
            discountAmount={discountAmount}
            voucherName={voucherSelected?.name ?? ""}
            confirmOrder={handleCreateOrder}
            productCheckout={selectedItem}
            shippingfee={shippingFee}
            onOpenVoucher={onOpenVoucherModal}
            subTotal={subTotal}
            isDisable={validVariant}
          />
          <VoucherModal
            totalCartPrice={subTotal}
            selectVoucher={handleSelectVoucher}
            openModalVoucher={openModalVoucher}
            setOpenModalVoucher={setOpenModalVoucher}
            voucherSelectedId={voucherSelected?.code ?? ""}
          />
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
