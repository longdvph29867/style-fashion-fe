import { CartType } from "../../types/cartType";
import { formartCurrency } from "../../util/util";
import AtrributeSvgCheckout from "../../assets/svgs/AtrributeSvgCheckout";
import { memo } from "react";
import { ProductCartType } from "../../types/cart";
type Props = {
  productList: ProductCartType[];
};
const ListOrder = ({ productList }: Props) => {
  return (
    <div className="mt-8">
      {productList.map((item) => (
        <div
          key={item._id}
          className="relative flex border-b last:border-0 border-[#e5e7eb] py-7 first:pt-0 last:pb-0"
        >
          <div className="relative h-24 w-24 sm:w-28 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
            <img
              className="h-full w-full object-contain object-center"
              src={item.product.thumbnail}
            />
          </div>
          <div className="ml-3 sm:ml-6 flex flex-1 flex-col">
            <div>
              <div className="flex justify-between">
                <div className="flex-[2]">
                  <h3 className="text-base font-semibold">
                    <a href="/product-detail" className="my-line-3">
                      {item.product.name}
                    </a>
                  </h3>
                  <div className="mt-1.5 sm:mt-2.5 flex items-center text-sm text-slate-600">
                    <div className="flex items-center space-x-1.5">
                      <AtrributeSvgCheckout />
                      <span>{item.attribute.name}</span>
                    </div>
                    <span className="mx-2 h-5 border-l border-slate-400" />
                    <div className="flex items-center space-x-1.5">
                      <p>
                        Số lượng: <span>{item.quantity}</span>
                      </p>
                    </div>
                    <div className="hidden flex-1 sm:flex justify-end">
                      <div className="mt-0.5">
                        <div className="flex items-center border-2 border-[#fe385c] rounded-lg py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium">
                          <span className="text-[#fe385c] !leading-none">
                            {formartCurrency(item.attribute.price)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(ListOrder);
