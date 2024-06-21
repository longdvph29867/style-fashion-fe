import { Product } from "../../types/products";

type IntroduceProductProps = {
  product: Product | null;
};

const IntroduceProduct = ({ product }: IntroduceProductProps) => {
  return (
    <>
      <div className="w-full rounded-2xl space-y-2.5">
        <div>
          <div className="flex items-center justify-between w-full px-4 py-2 font-medium rounded-lg bg-slate-100/80">
            <span>Mô tả</span>
          </div>
          <div className="p-4 pt-3 text-sm leading-6 text-slate-600">
            {product?.description}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between w-full px-4 py-2 font-medium rounded-lg bg-slate-100/80">
            <span>Vải + Chăm sóc</span>
          </div>
          <div className="p-4 pt-3 text-sm leading-6 text-slate-600">
            <ul className="leading-7 list-disc list-inside">
              <li>Được làm từ lưới micromesh siêu bền của Bỉ.</li>
              <li>74% Polyamide (Nylon) 26% Elastane (Spandex)</li>
              <li>Có thể điều chỉnh móc &amp; mắt đóng và dây đai</li>
              <li>Giặt tay bằng nước lạnh, phơi phẳng</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default IntroduceProduct;
