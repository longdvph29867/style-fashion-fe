import { ChangeEvent, useCallback, useEffect, useState } from "react";
import productService from "../../services/productService";
import Variant from "../DetailComponent/Variant";
import { Button, message, Skeleton, Space } from "antd";
import { localUserService } from "../../services/localService";
import cartService from "../../services/cartService";
import { setCartAll } from "../../Toolkits/cartSlice";
import { useDispatch } from "react-redux";
import { IProduct, IVariant } from "../../types/productType";
import QuantityAdjuster from "../Common/Customer/QuantityAdjuster";

interface DropdownVarianContentProps {
  idProduct: string;
  keyReset: number;
}

const DropdownVarianContent = ({ idProduct, keyReset }: DropdownVarianContentProps) => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [variant, setVariant] = useState<IVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const userId = localUserService.get()?.id;
  const dispatch = useDispatch();

  const fetchProductDetails = useCallback(() => {
    productService.getProductDetail(idProduct).then((res) => setProduct(res.data));
  }, [idProduct]);
  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  const setImage = (value: string) => {
    console.log(value);
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!variant) {
      message.error("Vui lòng chọn phân loại!");
      return;
    }
    if (isNaN(value)) {
      setQuantity(0);
    } else if (value < 0 || value > variant.stock) {
      setQuantity(1);
    } else {
      message.error("Số lượng không được vượt quá tồn kho");
      setQuantity(value);
    }
  };

  const handleChangeQuantity = (value: number) => {
    if (!variant) {
      message.error("Vui lòng chọn phân loại!");
      return;
    } else if (quantity + value < 1) {
      return;
    } else if (quantity + value > variant.stock && value > 0) {
      message.error("Số lượng không được vượt quá tồn kho");
      return;
    }
    setQuantity(quantity + value);
  };

  const submitChangeVariant = () => {
    if (variant) {
      const payload = { userId: userId, productId: idProduct, variantId: variant?.id, quantity: quantity };
      setLoading(true);
      cartService
        .updateVariant(payload)
        .then((res) => dispatch(setCartAll(res.data)))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
      return;
    } else {
      message.error("Vui lòng chọn phân loại hàng");
    }
  };

  return (
    <div className="bg-white shadow-[0px_3px_8px_3px_rgba(0,0,0,0.24)] px-4 pt-2 pb-3 rounded-md min-w-[300px] min-h-[200px]">
      {product ? (
        <>
          <Variant
            dataAttriubute={product?.attributes ?? []}
            dataVariant={product?.variants ?? []}
            setImage={setImage}
            setVariant={setVariant}
            keyReset={keyReset}
          />
          <div className="mt-4 h-20">
            <div className="font-semibold text-[#222]">Số lượng:</div>
            <QuantityAdjuster
              handleChangeInput={handleChangeInput}
              handleChangeQuantity={handleChangeQuantity}
              quantity={quantity}
            />
            {variant && <span className="text-sx italic">Còn: {variant.stock} sản phẩm</span>}
          </div>
          <div className="border border-slate-200 my-2" />
          <div className="text-end">
            <Button onClick={submitChangeVariant} loading={loading}>
              Xác nhận
            </Button>
          </div>
        </>
      ) : (
        <Space direction="vertical" className="w-full">
          <Skeleton.Button active className="relative !w-[96%] !h-14 my-2 !rounded-2xl" />
          <Skeleton.Button active className="relative !w-[96%] !h-14  !rounded-2xl" />
          <Skeleton.Button active className="relative !w-[50%] !h-12 my 2 !rounded-2xl" />
          <Skeleton.Button active className="relative !w-[96%] !h-14  !rounded-2xl" />
        </Space>
      )}
    </div>
  );
};

export default DropdownVarianContent;
