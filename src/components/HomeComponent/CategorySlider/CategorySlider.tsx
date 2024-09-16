import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Title from "../../Title/Title";
import "./customSlide.css";
const listData: {
  content: string;
  title: string;
  link: string;
  img: string;
  color: string;
}[] = [
    {
      content: "Explore new arrivals",
      title: `Explore new arrivals <br />from top brands`,
      link: "#",
      img: "https://ciseco-nextjs.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F1.fa5c86b4.png&w=750&q=75",
      color: "bg-yellow-50",
    },
    {
      content: "Digital gift cards",
      title: `Give the gift <br /> of choice`,
      link: "#",
      img: "https://ciseco-nextjs.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F5.fcd9d1db.png&w=750&q=75",
      color: "bg-red-50",
    },
    {
      content: "Sale collection",
      title: `Up to <br /> 80% off retail`,
      link: "#",
      img: "https://ciseco-nextjs.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F4.0ee67265.png&w=750&q=75",
      color: "bg-blue-50",
    },
    {
      content: "Sale collection",
      title: `Up to <br /> 80% off retail`,
      link: "#",
      img: "https://ciseco-nextjs.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F3.8cfc0955.png&w=750&q=75",
      color: "bg-green-50",
    },
  ];

const CategorySlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false,
    // centerPadding: "155px",
    // centerMode: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 0,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="relative my-14 md:my-20 space-y-6 md:space-y-10 category-slider">
      <Title
        title="Danh mục"
        content="Các sản phẩm tuyệt vời đang chờ bạn"
      // className="mb-10"
      />
      <div className="mx-[-12px]">
        <Slider {...settings}>
          {listData.map((item, index) => (
            <div key={index} className="px-3">
              <li className="list-none">
                <a className="block " href="#">
                  <div
                    className={`relative w-full pb-[55%] sm:aspect-h-9 h-0 rounded-2xl overflow-hidden group ${item.color}`}
                  >
                    <div>
                      <div className="absolute inset-5 sm:inset-8">
                        <img
                          alt="img"
                          loading="lazy"
                          width={362}
                          height={396}
                          decoding="async"
                          data-nimg={1}
                          className="absolute end-0 w-1/2 max-w-[260px] h-full object-contain drop-shadow-xl"
                          style={{ color: "transparent" }}
                          src={item.img}
                        />
                      </div>
                    </div>
                    <span className="opacity-0 group-hover:opacity-40 absolute inset-0 bg-black/10 transition-opacity" />
                    <div>
                      <div className="absolute inset-5 sm:inset-8 flex flex-col">
                        <div className="max-w-xs">
                          <span className="block mb-2 text-sm text-slate-700">
                            {item.content}
                          </span>
                          <h2
                            className="text-xl md:text-2xl text-slate-900 font-semibold"
                            dangerouslySetInnerHTML={{
                              __html: item.title,
                            }}
                          >
                            {/* {item.title} */}
                          </h2>
                        </div>
                        <div className="mt-auto">
                          <button className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm font-medium py-3 px-4 sm:py-3.5 sm:px-6  ttnc-ButtonSecondary bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 nc-shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">
                            Show me all
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CategorySlider;
