import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { hiddenSpinner, showSpinner } from "../../../util/util";
import IntroduceProduct from "../../../components/DetailComponent/IntroduceProduct";
import { Attribute, Product } from "../../../types/products";
import productService from "../../../services/productService";
import ContentProduct from "./ContentProduct/ContentProduct";
import ImageProduct from "./ImageProduct/ImageProduct";
type Props = {};

const InfoProduct = (props: Props) => {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  const [currentImage, setCurrentImage] = useState<string>("");

  const fetchProduct = async () => {
    try {
      showSpinner();
      const res = await productService.getProductBySlug(slug as string);
      const productDetail: Product = res.data;
      hiddenSpinner();
      setProduct(productDetail);
      setCurrentImage(productDetail.gallery[0]);
    } catch (error) {
      hiddenSpinner();
      console.error("Failed to fetch product:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="lg:flex">
        <div className="w-full lg:w-[40%]">
          <ImageProduct
            image={currentImage}
            product={product as Product}
            setCurrentImage={setCurrentImage}
          />
        </div>
        {/* right */}
        <div className="w-full lg:w-[60%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9">
          <div className="space-y-7">
            <ContentProduct
              setCurrentImage={setCurrentImage}
              product={product as Product}
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
