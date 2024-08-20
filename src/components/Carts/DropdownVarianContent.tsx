import { useCallback, useEffect, useState } from "react";
import productService from "../../services/productService";
import Variant from "../DetailComponent/Variant";
import { Button, Skeleton } from "antd";
import { localUserService } from "../../services/localService";
import cartService from "../../services/cartService";
import { setCartAll } from "../../Toolkits/cartSlice";
import { useDispatch } from "react-redux";
import { hiddenSpinner, showSpinner } from "../../util/util";

interface DropdownVarianContentProps {
  idProduct: string;
  keyReset: number;
}

const DropdownVarianContent = ({ idProduct, keyReset }: DropdownVarianContentProps) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [variant, setVariant] = useState<Variant | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
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

  const submitChangeVariant = () => {
    if (variant) {
      const payload = { userId: userId, productId: idProduct, variantId: variant?.id, quantity: 1 };
      cartService
        .updateVariant(payload)
        .then((res) => dispatch(setCartAll(res.data)))
        .catch((err) => console.log(err));
      return;
    } else {
      setErrorMessage("Vui lòng chọn phân loại hàng");
    }
  };

  return (
    <div className="bg-white shadow-[0px_3px_8px_3px_rgba(0,0,0,0.24)] p-2 rounded-md min-w-[200px]">
      {product ? (
        <Variant
          dataAttriubute={product?.attributes ?? []}
          dataVariant={product?.variants ?? []}
          setImage={setImage}
          setVariant={setVariant}
          keyReset={keyReset}
        />
      ) : (
        <div className="w-[200px] h-[200px]">
          <Skeleton.Button active className="absolute !w-[96%] !h-4/5 !rounded-2xl" />
        </div>
      )}
      <div>{errorMessage && <span className="text-red-300">{errorMessage}</span>}</div>
      <div className="mt-3">
        <Button onClick={submitChangeVariant}>Xác nhận</Button>
      </div>
    </div>
  );
};

export default DropdownVarianContent;
