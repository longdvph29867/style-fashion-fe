import { useEffect, useState } from "react";
import IntroduceProduct from "../../../components/DetailComponent/IntroduceProduct";
import ContentProduct from "./ContentProduct/ContentProduct";
import ImageProduct from "./ImageProduct/ImageProduct";

type Props = {
  product: Product;
};

const InfoProduct = ({ product }: Props) => {
  const [currentImage, setCurrentImage] = useState<string>("");

  useEffect(() => {
    if (product) {
      setCurrentImage(product.gallery[0]);
    }
  }, [product]);

  return (
    <div className="container mx-auto">
      <div className="lg:flex">
        <div className="w-full lg:w-[40%]">
          <ImageProduct
            image={currentImage}
            product={product}
            setCurrentImage={setCurrentImage}
          />
        </div>
        {/* right */}
        <div className="w-full lg:w-[60%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9">
          <div className="space-y-7">
            <ContentProduct
              setCurrentImage={setCurrentImage}
              product={product}
            />
            <hr className=" 2xl:!my-10 border-slate-200" />
            <IntroduceProduct product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoProduct;
