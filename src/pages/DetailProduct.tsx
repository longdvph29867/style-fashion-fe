import DescriptionDetail from "../components/DetailComponent/DescriptionDetail";
import ButtonReviews from "../components/DetailComponent/ButtonReviews";
import ReviewsDetail from "../components/DetailComponent/ReviewsDetail";
import SmallThumbnail from "../components/DetailComponent/SmallThumbnail";
import SelectColor from "../components/DetailComponent/SelectColor";
import SelectSize from "../components/DetailComponent/SelectSize";
import CustomerServices from "../components/DetailComponent/CustomerServices";
import IntroduceProduct from "../components/DetailComponent/IntroduceProduct";
import BigThumbnail from "../components/DetailComponent/BigThumbnail";
import BtnToCart from '../components/DetailComponent/BtnToCart';

const DetailProduct = () => {
  return (
    <>
      <div className="py-12">
        <div className="container mx-auto">
          <div className="lg:flex">
            <div className="w-full lg:w-[50%] ">
              <BigThumbnail />
              <SmallThumbnail />
            </div>
            <div className="w-full lg:w-[50%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9">
              <div className="space-y-7">
                <div>
                  <h2 className="text-2xl font-semibold sm:text-3xl">
                    Heavy Weight Shoes
                  </h2>
                  <div className="flex items-center mt-5 space-x-4 sm:space-x-5">
                    <div>
                      <div className="flex items-center border-2 border-green-500 rounded-lg py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold">
                        <span className="text-green-500 !leading-none">
                          784.000&nbsp;₫
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
                            className="absolute text-[#fbbf24] left-0 bottom-0 h-full overflow-hidden"
                            style={{ width: "68%" }}
                          >
                            ★★★★★
                          </div>
                        </div>
                        <div className="ml-1.5 flex text-sm">
                          <span>3.4</span>
                        </div>
                      </a>
                      <span className="hidden sm:block mx-2.5">·</span>
                      <div className="items-center hidden text-sm sm:flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                          className="w-3.5 h-3.5"
                        >
                          <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                        </svg>
                        <span className="ml-1 leading-none">Mới</span>
                      </div>
                    </div>
                  </div>
                  <SelectColor />
                  <SelectSize />
                  <div className="flex space-x-3.5">
                    <div className="flex items-center justify-center bg-slate-100 px-2 py-3 sm:p-3.5 rounded-full">
                      <div className="flex items-center justify-between w-full space-x-5 ">
                        <div className=" flex items-center justify-between w-[104px] sm:w-28">
                          <button className="flex items-center justify-center w-8 h-8 bg-white border rounded-full outline-none border-neutral-400 hover:border-neutral-700">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                              className="w-4 h-4"
                            >
                              <path d="M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z" />
                            </svg>
                          </button>
                          <span className="flex-1 block leading-none text-center">
                            1
                          </span>
                          <button className="flex items-center justify-center w-8 h-8 bg-white border rounded-full outline-none border-neutral-400 hover:border-neutral-700">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                              className="w-4 h-4"
                            >
                              <path d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  <BtnToCart />
                  </div>
                  <hr className="my-10 border-slate-200" />
                  <IntroduceProduct />
                  <CustomerServices />
                </div>
              </div>
            </div>
          </div>
        </div>

        <DescriptionDetail />
        <div className="container mx-auto mt-12">
          <hr />
          <h2 className="flex items-center pt-16 text-2xl font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="w-7 h-7 mb-0.5"
            >
              <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" />
            </svg>
            <span className="ml-1.5"> 4,87 · 142 Reviews</span>
          </h2>
          <div className="mt-10">
            <ReviewsDetail />
            <ButtonReviews />
            <hr />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
