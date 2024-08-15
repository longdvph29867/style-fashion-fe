import { Link, useNavigate } from "react-router-dom";
import OrderSummary from "../../components/Checkout/OrderSummary";
import PaymentMethod from "../../components/Checkout/PaymentMethod";
import ShippingAddress from "../../components/Checkout/ShippingAddress";
import { ChangeEvent, useMemo, useState } from "react";
import { ShippingAddressType } from "../../types/shippingAddress";
import { majorCities, surroundingProvinces } from "../../constant/constant";
import { CheckoutType, ProductOrderType } from "../../types/orderType";
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

const CheckoutPage = () => {
  const user = useSelector((state: RootState) => state.userSlice.userInfo);
  const [openModalVoucher, setOpenModalVoucher] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const navigate = useNavigate();
  const [orderNote, setOrderNote] = useState("");
  const [voucherSelected, setVoucherSelected] = useState<Voucher | null>(null);
  const [addressSelected, setAddressSelected] =
    useState<ShippingAddressType | null>(null);
  const products = useSelector(
    (state: RootState) => state.checkoutSlice.products
  );
  const queryClient = useQueryClient();

  const subtotal = useMemo(() => {
    return products.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.quantity * currentValue.variant.currentPrice,
      0
    );
  }, [products]);

  const calculateDiscount = useMemo(() => {
    if (voucherSelected && voucherSelected.type === "percentage") {
      return subtotal * (voucherSelected.discount / 100);
    }
    return voucherSelected?.discount ?? 0;
  }, [subtotal, voucherSelected]);

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
    // if (carts.length > 0 && addressSelected && user?.id) {
    //   const productsOrder: ProductOrderType[] = products.map((item) => ({
    //     productId: item.product.id,
    //     quantity: item.quantity,
    //     price: item.attribute.price,
    //     productName: item.product.name,
    //     slug: item.product.slug,
    //     imageProduct: item.product.thumbnail,
    //     imageAtrribute: item.attribute.image,
    //     attributeName: item.attribute.name,
    //     attributeId: item.attribute.id,
    //   }));
    //   const shippingAddressOrder = {
    //     recipientName: addressSelected.recipientName,
    //     recipientPhoneNumber: addressSelected.recipientPhoneNumber,
    //     streetAddress: addressSelected.streetAddress,
    //     wardCommune: addressSelected.wardCommune,
    //     district: addressSelected.district,
    //     cityProvince: addressSelected.cityProvince,
    //   };
    //   const newOrder: CheckoutType = {
    //     productsOrder,
    //     shippingAddress: shippingAddressOrder,
    //     user: user.id,
    //     subTotal: subtotal,
    //     discountAmount: calculateDiscount,
    //     shippingFee: shippingFee,
    //     note: orderNote,
    //     totalPrice: subtotal + shippingFee - calculateDiscount,
    //     paymentMethod: paymentMethod,
    //     voucherCode: voucherSelected?.code ?? "",
    //   };
    //   showSpinner();
    //   if (paymentMethod === "VNPAY") {
    //     orderService.createVNPAY(newOrder).then(async (response) => {
    //       hiddenSpinner();
    //       window.location.href = response.data.url;
    //     });
    //   } else {
    //     orderService.createCOD(newOrder).then(() => {
    //       queryClient.refetchQueries({
    //         queryKey: ["carts"],
    //         type: "active",
    //       });
    //       hiddenSpinner();
    //       navigate("/order");
    //       message.success("Đặt hàng thành công");
    //     });
    //   }
    // }
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
            productList={products}
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
