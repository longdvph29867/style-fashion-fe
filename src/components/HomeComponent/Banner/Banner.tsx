import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "animate.css";
import imgBanner1 from "../../../assets/img/banner/hero-right-3.png";
import imgBanner2 from "../../../assets/img/banner/hero-right-2.png";
import imgBanner3 from "../../../assets/img/banner/hero-right.png";
import imgBannerBg from "../../../assets/img/bg-banner.svg";
import "./slick.css";
const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    cssEase: "linear",
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: false,
        },
      },
    ],
    beforeChange: (current: number, next: number) => {
      // animate.css trước khi chuyển đổi slide
      const currentSlideText = document.getElementById(
        `slick-slide-text${current}`
      );
      const currentSlideImg = document.getElementById(
        `slick-slide-img${current}`
      );
      const nextSlideText = document.getElementById(`slick-slide-text${next}`);
      const nextSlideImg = document.getElementById(`slick-slide-img${next}`);
      if (currentSlideText) {
        currentSlideText.classList.remove(
          "animate__animated",
          "animate__fadeInLeft"
        );
        (currentSlideImg as HTMLElement).classList.remove(
          "animate__animated",
          "animate__fadeInUp"
        );
      }
      if (nextSlideText) {
        nextSlideText.classList.add(
          "animate__animated",
          "animate__fadeInLeft",
          "animate__fast"
        );
        (nextSlideImg as HTMLElement).classList.add(
          "animate__animated",
          "animate__fadeInUp",
          "animate__fast"
        );
      }
    },
  };

  const bannerList = [
    {
      img: imgBanner2,
      content: "Trong mùa này, hãy tìm điều tốt nhất",
      title: "Bộ sưu tập độc quyền <br /> cho mọi người",
    },
    {
      img: imgBanner1,
      content: "Khám phá những điều tuyệt vời nhất",
      title: "Khám phá xu hướng <br /> mới nhất",
    },
    {
      img: imgBanner3,
      content: "Hãy tìm kiếm những niềm vui tuyệt vời",
      title: "Chọn lựa phong cách <br /> tuyệt vời",
    },
  ];
  return (
    <>
    <div className="bg-[#ffecf09a] relative banner-slider">
      <img
        src={imgBannerBg}
        alt="img-banner-bg"
        className="absolute top-0 left-0 object-cover w-full h-full"
      />
      <Slider {...settings}>
        {bannerList.map((item, index) => (
          <div>
            <div className="relative left-0 top-0 w-full h-full pb-[42%]">
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="container flex justify-end h-full mx-auto">
                  <img
                    src={item.img}
                    alt="img-banner"
                    className="absolute h-full"
                    id={`slick-slide-img${index}`}
                  />
                  <div
                    id={`slick-slide-text${index}`}
                    className="w-full h-full"
                  >
                    <div className="flex flex-col items-start justify-center h-full relative z-10">
                      <span className="text-sm sm:text-xl text-[#6a6a6a]">
                        {item.content}
                      </span>
                      <h1
                        dangerouslySetInnerHTML={{ __html: item.title }}
                        className="mt-1 text-xl font-semibold ls:leading-10 sm:mt-2 lg:mt-6 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#222]"
                      ></h1>
                      <a
                        className="relative inline-flex items-center justify-center h-auto px-6 py-3 mt-2 text-sm font-medium transition-colors rounded-full shadow-xl sm:mt-4 lg:mt-12 sm:text-base sm:py-5 sm:px-9 bg-[#fe385c] text-white"
                        href="/"
                      >
                        <span>Xem ngay</span>
                        <span>
                          <svg
                            className="w-5 h-5 ml-2.5"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                              stroke="#fff"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M222 222L20 20"
                              stroke="#fff"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  </>
  );
};

export default Banner;
