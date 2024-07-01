import { useEffect, useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import { https } from "../../config/axios";

const DiscoverMoreSlider = () => {
  const [products, setProducts] = useState<any[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await https.get('/products'); 
      console.log(response.data.results);
      setProducts(response.data.results); 
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
        {products.map((product, index) => (
          <SwiperSlide key={index} className="bg-yellow-50 rounded-3xl ">
            <div className="flex justify-around pt-10 ">
              <div>
                <div className="flex flex-col inset-5 sm:inset-8">
                  <div className="max-w-xs">
                    <span className="block mb-2 text-sm text-slate-700 ">
                      {product.category}
                    </span>
                    <h2 className="mt-2 text-xl font-semibold md:text-2xl text-slate-900">
                      {product.name}
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
                  src={product.thumbnail} // Đảm bảo URL hình ảnh đúng
                  alt={product.name}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DiscoverMoreSlider;
