import CartListItem from "./CartListItem";

const CartList = () => {
  return (
    <>
      <div className="w-full lg:w-[60%] xl:w-[55%] divide-y divide-slate-200 dark:divide-slate-700">
        <CartListItem />
      </div>
    </>
  );
};

export default CartList;
