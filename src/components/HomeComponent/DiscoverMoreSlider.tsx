import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation, Pagination } from "swiper/modules";

const DiscoverMoreSlider = () => {
  return (
    <div className="slider-product">
      <div className="flex justify-between pb-10">
        <h2 className="text-3xl font-semibold md:text-4xl">
          Discover more
          <span className="">. </span>
          <span className="text-neutral-500 dark:text-neutral-400">
            Good things are waiting for you
          </span>
        </h2>
        <div
          className="flex items-center justify-between w-20"
          style={{ textAlign: "center", marginTop: "40px" }}
        >
          <div className="static swiper-button-prev arrow">
            <FaArrowLeft />
          </div>
          <div className="static swiper-button-next arrow">
            {" "}
            <FaArrowRight />
          </div>
        </div>
      </div>

      <Swiper
        onSwiper={(a) => {
          console.log("slide", a);
        }}
        slidesPerView={2.5}
        centeredSlides={true}
        spaceBetween={30}
        navigation={{
          nextEl: ".swiper-button-prev",
          prevEl: ".swiper-button-next",
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide className="bg-yellow-50 rounded-3xl ">
          <div className="flex justify-around pt-10 ">
            <div>
              <div className="flex flex-col inset-5 sm:inset-8">
                <div className="max-w-xs">
                  <span className="block mb-2 text-sm text-slate-700 ">
                    Explore new arrivals
                  </span>
                  <h2 className="mt-2 text-xl font-semibold md:text-2xl text-slate-900">
                    Shop the latest <br /> from top brands
                  </h2>
                </div>
                <div className="mt-20">
                  <button className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm font-medium py-3 px-4 sm:py-3.5 sm:px-6 ttnc-ButtonSecondary bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 nc-shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">
                    Show me all
                  </button>
                </div>
              </div>
            </div>

            <div style={{ width: 210 }}>
              <img
                width="362"
                height="396"
                src="src/assets/img/1.webp"
                alt=""
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="bg-red-50 rounded-3xl ">
          <div className="flex justify-around pt-10 ">
            <div>
              <div className="flex flex-col inset-5 sm:inset-8">
                <div className="max-w-xs">
                  <span className="block mb-2 text-sm text-slate-700 ">
                    Explore new arrivals
                  </span>
                  <h2 className="mt-2 text-xl font-semibold md:text-2xl text-slate-900">
                    Shop the latest <br /> from top brands
                  </h2>
                </div>
                <div className="mt-20">
                  <button className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm font-medium py-3 px-4 sm:py-3.5 sm:px-6 ttnc-ButtonSecondary bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 nc-shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">
                    Show me all
                  </button>
                </div>
              </div>
            </div>

            <div style={{ width: 210 }}>
              <img
                width="362"
                height="396"
                src="src/assets/img/58195.png"
                alt=""
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="bg-blue-50 rounded-3xl ">
          <div className="flex justify-around pt-10 ">
            <div>
              <div className="flex flex-col inset-5 sm:inset-8">
                <div className="max-w-xs">
                  <span className="block mb-2 text-sm text-slate-700 ">
                    Explore new arrivals
                  </span>
                  <h2 className="mt-2 text-xl font-semibold md:text-2xl text-slate-900">
                    Shop the latest <br /> from top brands
                  </h2>
                </div>
                <div className="mt-20">
                  <button className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm font-medium py-3 px-4 sm:py-3.5 sm:px-6 ttnc-ButtonSecondary bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 nc-shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">
                    Show me all
                  </button>
                </div>
              </div>
            </div>

            <div style={{ width: 210 }}>
              <img
                width="362"
                height="396"
                src="src/assets/img/4741d.png"
                alt=""
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="bg-green-50 rounded-3xl ">
          <div className="flex justify-around pt-10 ">
            <div>
              <div className="flex flex-col inset-5 sm:inset-8">
                <div className="max-w-xs">
                  <span className="block mb-2 text-sm text-slate-700 ">
                    Explore new arrivals
                  </span>
                  <h2 className="mt-2 text-xl font-semibold md:text-2xl text-slate-900">
                    Shop the latest <br /> from top brands
                  </h2>
                </div>
                <div className="mt-20">
                  <button className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm font-medium py-3 px-4 sm:py-3.5 sm:px-6 ttnc-ButtonSecondary bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 nc-shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">
                    Show me all
                  </button>
                </div>
              </div>
            </div>

            <div style={{ width: 210 }}>
              <img
                width="362"
                height="396"
                src="src/assets/img/32d4b.png"
                alt=""
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default DiscoverMoreSlider;
