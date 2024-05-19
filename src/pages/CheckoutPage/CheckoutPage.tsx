import OrderSummary from "../../components/Checkout/OrderSummary"
import PaymentMethod from "../../components/Checkout/PaymentMethod"
import ShippingAddress from "../../components/Checkout/ShippingAddress"

const CheckoutPage = () => {
  return (
    <div className="Checkout-Page">
    <main className="container py-16 sm:py-24">
      <div className="mb-16">
        <h2 className="block text-2xl font-mono sm:text-3xl lg:text-4xl font-semibold">
          Checkout
        </h2>
        <div className="block mt-3 sm:mt-5 text-xs sm:text-sm font-medium text-slate-700">
          <a  href="/">Homepage</a>
          <span className="text-xs mx-1 sm:mx-1.5">/</span>
          <a  href="/collection-2">Clothing Categories</a>
          <span className="text-xs mx-1 sm:mx-1.5">/</span>
          <span className="underline">Checkout</span>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row">
        {/*  */}
        <div className="flex-1">
          <div className="space-y-8">
            {/* SHIPPING ADDRESS */}
            <ShippingAddress/>
            {/* PAYMENT METHOD */}
            <PaymentMethod/>
          </div>
        </div>
        {/* Border */}
        <div className="flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 my-10 lg:my-0 lg:mx-10 xl:lg:mx-14 2xl:mx-16" />
        {/* Order summary */}
        <OrderSummary/>
      </div>
    </main>
  </div>
  )
}

export default CheckoutPage