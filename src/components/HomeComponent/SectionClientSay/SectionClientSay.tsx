import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SectionClientSay = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    arrows: false,
  };

  return (
    <div className="relative my-10 md:my-20 space-y-6 md:space-y-10">
      <div className="relative flex flex-col justify-between mb-6 sm:flex-row sm:items-end lg:mb-10 text-neutral-900">
        <div className="flex flex-col items-center w-full mx-auto text-center">
          <h2 className="justify-center text-3xl font-semibold md:text-4xl">
            Good news from far away 🥇
          </h2>
          <span className="block mt-2 text-base font-normal md:mt-3 sm:text-xl text-neutral-500">
            Let's see what people think of Ciseco
          </span>
        </div>
      </div>

      <div className="relative max-w-2xl mx-auto md:mb-16">
        <div className="hidden lg:block">
          <img
            alt=""
            width="59"
            height="59"
            className="absolute top-9 -left-20"
            sizes="100px"
            srcSet="https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/444966/item/vngoods_01_444966.jpg"
          />
          <img
            alt=""
            width="60"
            height="59"
            className="absolute bottom-[100px] right-full mr-40"
            sizes="100px"
            srcSet="https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/444966/item/vngoods_01_444966.jpg"
          />
          <img
            alt=""
            width="55"
            height="58"
            className="absolute top-full left-[140px]"
            sizes="100px"
            srcSet="https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/444966/item/vngoods_01_444966.jpg"
          />
          <img
            alt=""
            width="47"
            height="49"
            className="absolute -bottom-10 right-[140px]"
            sizes="100px"
            srcSet="https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/444966/item/vngoods_01_444966.jpg"
          />
          <img
            alt=""
            width="65"
            height="63"
            className="absolute left-full ml-32 bottom-[80px]"
            sizes="100px"
            srcSet="https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/444966/item/vngoods_01_444966.jpg"
          />
          <img
            alt=""
            width="57"
            height="56"
            className="absolute -right-10 top-10"
            sizes="100px"
            srcSet="https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/444966/item/vngoods_01_444966.jpg"
          />
        </div>
        <div className="relative mt-6 lg:mt-10">
          <img
            alt=""
            width="52"
            height="45"
            className="absolute -mr-16 opacity-50 md:opacity-100 md:mr-0 lg:mr-5 right-full top-[36%] md:block hidden"
            srcSet="src/assets/img/quotation0027.png"
          />
          <img
            alt=""
            width="52"
            height="45"
            className="absolute -ml-16 opacity-50 md:opacity-100 md:ml-0 lg:ml-5 left-full top-[50%] md:block hidden"
            srcSet="src/assets/img/quotation28d7c.png"
          />
          <Slider {...settings}>
            {[0, 1, 2].map((item, index) => (
              <div key={index}>
                <img
                  alt=""
                  width="126"
                  height="120"
                  className="mx-auto"
                  srcSet="src/assets/img/clientSay1e4d5.png"
                />
                <li className="flex flex-col items-center text-center">
                  <span className="block md:text-2xl mt-4">
                    Great quality products, affordable prices, fast and friendly
                    delivery. I very recommend.
                  </span>
                  <span className="block mt-4 text-2xl font-semibold">
                    Tiana Abie
                  </span>
                  <div className="flex space-x-0.5 mt-3 text-yellow-500 justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </li>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default SectionClientSay;
