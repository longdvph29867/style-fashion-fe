import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import addIcon from "../../assets/add.svg";

import {
  formartCurrency,
  formartRating,
  hiddenSpinner,
  showSpinner,
} from "../../util/util";
import ImgDetail from "./ImgDetail";
import ProductsSame from "../../components/ProductsSame";
import { https } from "../../services/config";
import CustomerServices from "../../components/DetailComponent/CustomerServices";

const DetailPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [productsSame, setProductsSame] = useState<Product[]>([]);

  const fetchProduct = async () => {
    try {
      showSpinner();
      const API = `/products/${slug}`;
      const { data } = await https.get(API);
      hiddenSpinner();
      setProduct(data.data);
    } catch (error) {
      hiddenSpinner();
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
    fetchProduct();
  }, [slug]);

  useEffect(() => {
    const fetchProductsSame = async () => {
      if (!product?.id_category) {
        return;
      }
      try {
        showSpinner();
        const API = `/products?category_id=${product?.id_category}`;
        const { data } = await https.get(API);
        hiddenSpinner();
        const newData: Product[] = data.data.filter(
          (item: Product) => item._id !== product?._id
        );
        setProductsSame(newData);
      } catch (error) {
        hiddenSpinner();
        console.log(error);
      }
    };
    fetchProductsSame();
  }, [product]);

  return (
    <>
      <div className="py-12">
        <div className="container mx-auto">
          <div className="lg:flex">
            <div className="w-full lg:w-[50%] ">
              <div>
                <ImgDetail images={product?.images} />
              </div>
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
                          {formartCurrency(product?.price)}
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
                              width: `${formartRating(product?.rating)}%`,
                            }}
                          >
                            ★★★★★
                          </div>
                        </div>
                        <div className="ml-1.5 flex text-sm">
                          <span>{product?.rating}</span>
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
                {/* size */}
                <div className="">
                  <div>
                    <div>Size: </div>
                    <div className="grid grid-cols-5 gap-2 mt-3 sm:grid-cols-7">
                      <div className="relative flex items-center justify-center h-10 text-sm font-semibold uppercase border cursor-pointer rounded-2xl sm:text-base border-slate-300 text-slate-900 hover:bg-neutral-50">
                        S
                      </div>
                      <div className="relative flex items-center justify-center h-10 text-sm font-semibold uppercase border cursor-pointer rounded-2xl sm:text-base border-slate-300 text-slate-900 hover:bg-neutral-50">
                        M
                      </div>
                      <div className="relative flex items-center justify-center h-10 text-sm font-semibold uppercase border cursor-pointer rounded-2xl sm:text-base border-slate-300 text-slate-900 hover:bg-neutral-50">
                        L
                      </div>
                      <div className="relative flex items-center justify-center h-10 text-sm font-semibold uppercase border cursor-pointer rounded-2xl sm:text-base border-slate-300 text-slate-900 hover:bg-neutral-50">
                        XL
                      </div>
                      <div className="relative flex items-center justify-center h-10 text-sm font-semibold uppercase border cursor-pointer rounded-2xl sm:text-base border-slate-300 text-slate-900 hover:bg-neutral-50">
                        2XL
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3.5">
                  <div className="flex items-center justify-center bg-slate-100 px-2 py-3 sm:p-3.5 rounded-full">
                    <div className="flex items-center justify-between w-full space-x-5 ">
                      <div className=" flex items-center justify-between w-[104px] sm:w-28">
                        <button className="flex items-center justify-center w-8 h-8 bg-white border rounded-full outline-none border-neutral-400 hover:border-neutral-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill=""
                            aria-hidden="true"
                            className="w-4 h-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        <span className="flex-1 block leading-none text-center">
                          1
                        </span>
                        <button className="flex items-center justify-center w-8 h-8 bg-white border rounded-full outline-none border-neutral-400 hover:border-neutral-700">
                          <img src={addIcon} alt="Add Icon" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button className="h-auto inline-flex items-center justify-center rounded-full text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 bg-slate-900 hover:bg-slate-800 text-slate-50 shadow-xl flex-1">
                    <svg
                      className="hidden sm:inline-block w-5 h-5 mb-0.5"
                      viewBox="0 0 9 9"
                      fill="#fff"
                    >
                      <path d="M2.99997 4.125C3.20708 4.125 3.37497 4.29289 3.37497 4.5C3.37497 5.12132 3.87865 5.625 4.49997 5.625C5.12129 5.625 5.62497 5.12132 5.62497 4.5C5.62497 4.29289 5.79286 4.125 5.99997 4.125C6.20708 4.125 6.37497 4.29289 6.37497 4.5C6.37497 5.53553 5.5355 6.375 4.49997 6.375C3.46444 6.375 2.62497 5.53553 2.62497 4.5C2.62497 4.29289 2.79286 4.125 2.99997 4.125Z" />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.37497 2.625H7.17663C7.76685 2.625 8.25672 3.08113 8.29877 3.66985L8.50924 6.61641C8.58677 7.70179 7.72715 8.625 6.63901 8.625H2.36094C1.2728 8.625 0.413174 7.70179 0.490701 6.61641L0.70117 3.66985C0.743222 3.08113 1.23309 2.625 1.82331 2.625H2.62497L2.62497 2.25C2.62497 1.21447 3.46444 0.375 4.49997 0.375C5.5355 0.375 6.37497 1.21447 6.37497 2.25V2.625ZM3.37497 2.625H5.62497V2.25C5.62497 1.62868 5.12129 1.125 4.49997 1.125C3.87865 1.125 3.37497 1.62868 3.37497 2.25L3.37497 2.625ZM1.82331 3.375C1.62657 3.375 1.46328 3.52704 1.44926 3.72328L1.2388 6.66985C1.19228 7.32107 1.70805 7.875 2.36094 7.875H6.63901C7.29189 7.875 7.80766 7.32107 7.76115 6.66985L7.55068 3.72328C7.53666 3.52704 7.37337 3.375 7.17663 3.375H1.82331Z"
                      />
                    </svg>
                    <span className="ml-3">Thêm vào giỏ hàng</span>
                  </button>
                </div>
                <hr className=" 2xl:!my-10 border-slate-200" />
                <div className="w-full rounded-2xl space-y-2.5">
                  {/* item */}
                  <div>
                    <div className="flex items-center justify-between w-full px-4 py-2 font-medium rounded-lg bg-slate-100/80">
                      <span>Mô tả</span>
                    </div>
                    <div className="p-4 pt-3 text-sm leading-6 text-slate-600">
                      {product?.desc}
                    </div>
                  </div>
                  {/* item */}
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
                <CustomerServices />
              </div>
            </div>
          </div>
          {/*  */}
        </div>
      </div>
      <div>
        <ProductsSame productsSame={productsSame} />
      </div>
    </>
  );
};

export default DetailPage;
