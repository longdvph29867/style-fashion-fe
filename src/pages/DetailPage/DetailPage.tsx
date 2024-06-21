// type Props = {}

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  formartCurrency,
  formartRating,
  hiddenSpinner,
  showSpinner,
} from "../../util/util";
import { https } from "../../config/axios";
import CustomerServices from "../../components/DetailComponent/CustomerServices";
import IntroduceProduct from "../../components/DetailComponent/IntroduceProduct";
import ProductsSame from "../../components/DetailComponent/ProductsSame";
// import ReviewsDetail from "../../components/DetailComponent/ReviewsDetail";
import DescriptionDetail from "../../components/DetailComponent/DescriptionDetail";
import BtnToCart from "../../components/DetailComponent/BtnToCart";
import BigThumbnail from "../../components/DetailComponent/BigThumbnail";
import { SmallThumbnail } from "../../components/DetailComponent/SmallThumbnail";
import SelectQuantity from "../../components/DetailComponent/SelectQuantity";
import { Attribute, Product } from "../../types/products";
import { message } from "antd";
import ReviewsDetail from "../../components/DetailComponent/ReviewsDetail";
const DetailPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [productsSame, setProductsSame] = useState<Product[]>([]);
  const [currentImage, setCurrentImage] = useState<string>("default-image.jpg");
  const [attribute, setAttribute] = useState<Attribute | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const handleIncrement = () => {
    if (!attribute?.stock) {
      message.error("Vui lòng chọn size!");
      return false;
    }
    if ((quantity + 1 <= attribute?.stock ?? 0) && attribute?.stock)
      setQuantity((prevQuantity) => prevQuantity + 1);
  };
  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };
  const fetchProduct = async () => {
    try {
      showSpinner();
      const API = `/products/${slug}`;
      const productDetail = await https.get(API);
      const ids = productDetail.data.categories.map(
        (item: { id: string }) => item.id
      );
      const resultString = ids.join(",");
      const API2 = `/products?categories=${resultString}`;
      const dataSameProduct = await https.get(API2);
      hiddenSpinner();
      setProduct(productDetail.data);
      setCurrentImage(productDetail.data.gallery[0]);
      setSelectedColor(productDetail.data.attributes[0]?.image);
      const dataSameProductFilter = dataSameProduct.data.results.filter(
        (item: Product) => item.slug !== slug
      );
      setProductsSame(dataSameProductFilter);
    } catch (error) {
      hiddenSpinner();
      console.error("Failed to fetch product:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  const handleThumbnailClick = (image: string) => {
    setCurrentImage(image);
  };

  const handleColorSelect = (image: string | null) => {
    if (typeof image === "string") {
      setCurrentImage(image);
      setSelectedColor(image);
    }
  };
  return (
    <>
      <div className="py-12">
        <div className="container mx-auto">
          <div className="lg:flex">
            <div className="w-full lg:w-[50%] ">
              <BigThumbnail images={[currentImage]} />
              <SmallThumbnail
                gallery={product?.gallery}
                onThumbnailClick={handleThumbnailClick}
              />
            </div>
            {/* right */}
            <div className="w-full lg:w-[50%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9">
              <div className="space-y-7">
                <div>
                  <h2 className="text-2xl font-semibold sm:text-3xl">
                    {product?.name}
                  </h2>
                  <div className="flex items-center mt-5 space-x-4 sm:space-x-5">
                    <div className="">
                      <div className="flex items-center border-2 border-green-500 rounded-lg py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold">
                        <span className="text-green-500 !leading-none">
                          {formartCurrency(product?.attributes[0].price)}
                        </span>
                      </div>
                    </div>
                    <div className="border-l h-7 border-slate-300" />
                    <div className="flex items-center">
                      <a
                        href="#"
                        className="flex items-center text-base font-medium"
                      >
                        <div className="relative w-20 h-6">
                          <div className="absolute bottom-0 left-0 w-20 h-full text-slate-400">
                            ★★★★★
                          </div>
                          <div
                            className={`absolute text-[#fbbf24] left-0 bottom-0 h-full overflow-hidden`}
                            style={{
                              width: `${formartRating(product?.scoreReview)}%`,
                            }}
                          >
                            ★★★★★
                          </div>
                        </div>
                        <div className="ml-1.5 flex text-sm">
                          <span>{product?.scoreReview}</span>
                        </div>
                      </a>
                      <span className="hidden sm:block mx-2.5">·</span>
                      <div className="items-center hidden text-sm sm:flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                          className="w-3.5 h-3.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                          ></path>
                        </svg>
                        <span className="ml-1 leading-none">Mới</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* SELECT COLOR THEO gallery */}
                <div className="flex mt-3">
                  {product?.attributes.map((attr, index) => (
                    <div
                      key={index}
                      className={`relative flex-1 max-w-[75px] h-10 sm:h-11 rounded-full border-2 cursor-pointer ${
                        selectedColor === attr.image
                          ? "border-primary-6000 dark:border-primary-500"
                          : "border-transparent"
                      }`}
                      onClick={() => handleColorSelect(attr.image)}
                    >
                      <div
                        className="absolute inset-0.5 rounded-full overflow-hidden z-0 object-cover bg-cover"
                        style={{
                          backgroundImage: `url(${attr.image})`,
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* SELECT SIZE FROM ATTRIBUTES */}
                {/* SELECT SIZE FROM ATTRIBUTES */}
                <div className="my-8">
                  <div>
                    <div>
                      Size:{" "}
                      <span className="ml-1 font-semibold">
                        {attribute?.name || "Select Size"}
                      </span>
                    </div>
                    <div className="grid grid-cols-5 mt-3 gap-[7rem] sm:grid-cols-7">
                      {product?.attributes.map((attr, index) => (
                        <div
                          key={index}
                          className={`relative flex items-center justify-center h-12 text-[14px] w-[100px] font-semibold uppercase border cursor-pointer rounded-2xl sm:text-base ${
                            attribute?.name === attr.name
                              ? "border-primary-6000 dark:border-primary-500"
                              : "border-slate-300"
                          } text-slate-900 hover:bg-neutral-50`}
                          onClick={() => setAttribute(attr)}
                        >
                          {attr.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3.5">
                  <SelectQuantity
                    quantity={quantity}
                    handleIncrement={handleIncrement}
                    handleDecrement={handleDecrement}
                  />
                  <BtnToCart />
                </div>
                <hr className=" 2xl:!my-10 border-slate-200" />
                <IntroduceProduct product={product} />
                <CustomerServices />
              </div>
            </div>
          </div>
          {/*  */}
        </div>

        <DescriptionDetail product={product} />
        <div className="container mx-auto mt-12">
          <hr />
          
          <div className="">
            <ReviewsDetail product={product}/> 
           
            <hr />
          </div>
        </div>
      </div>

      <div>
        <ProductsSame productsSame={productsSame} />
      </div>
    </>
  );
};

export default DetailPage;
