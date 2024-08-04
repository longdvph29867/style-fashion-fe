import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import review1 from "../../../assets/img/reviews/mung.jpg";
import review2 from "../../../assets/img/reviews/linh.jpg";
import review3 from "../../../assets/img/reviews/hien.jpg";
import review4 from "../../../assets/img/reviews/mien.jpg";
import review5 from "../../../assets/img/reviews/tung.jpg";
import review6 from "../../../assets/img/reviews/hoanganh.jpg";

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

  const reviews = [
    {
      name: "Mừng Loli",
      img: review1,
      content:
        "Tôi đã mua sắm tại Style Fashion nhiều lần và chưa bao giờ thất vọng. Sản phẩm đa dạng, hợp xu hướng, phù hợp với nhiều phong cách khác nhau.",
    },
    {
      name: "Khánh Linh",
      img: review2,
      content:
        "Style Fashion thật sự là thiên đường của thời trang! Mỗi lần mua sắm ở đây, mình luôn cảm thấy hài lòng vì chất lượng sản phẩm quá tuyệt vời.",
    },
    {
      name: "Hiển Hin",
      img: review3,
      content:
        "Website dễ sử dụng, các sản phẩm được trình bày rõ ràng và hình ảnh chân thực. Đặt hàng rất dễ dàng và mình nhận được sản phẩm nhanh hơn mong đợi.",
    },
    {
      name: "Vũ Miền",
      img: review4,
      content:
        "Mỗi lần mua sắm là một trải nghiệm tuyệt vời. Các sản phẩm không chỉ đẹp mắt mà còn rất bền và thoải mái.",
    },
    {
      name: "Minh Tùng",
      img: review5,
      content:
        "Đây là lần đầu tiên mình mua sắm online mà cảm thấy hài lòng đến vậy. Style Fashion không chỉ có nhiều lựa chọn thời trang phong phú mà còn có giá cả hợp lý.",
    },
    {
      name: "Hoàng anh",
      img: review6,
      content:
        "Sản phẩm đúng như mô tả, chất lượng tốt và giao hàng nhanh chóng. Mình chắc chắn sẽ quay lại để mua thêm nhiều sản phẩm khác.",
    },
  ];

  return (
    <div className="relative my-10 md:my-20 space-y-6 md:space-y-10">
      <div className="relative flex flex-col justify-between mb-6 sm:flex-row sm:items-end lg:mb-10 text-title">
        <div className="flex flex-col items-center w-full mx-auto text-center">
          <h2 className="justify-center text-3xl font-semibold md:text-4xl">
            Đánh giá từ những khách hàng 🥇
          </h2>
          <span className="block mt-2 text-base font-normal md:mt-3 sm:text-xl text-content">
            Khách hàng chia sẻ về những trải nghiệm mua hàng tại Style Fashion
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
            {reviews.map((item, index) => (
              <div key={index}>
                <img
                  alt=""
                  width="126"
                  height="120"
                  className="mx-auto rounded-full"
                  srcSet={item.img}
                />
                <li className="flex flex-col items-center text-center">
                  <span className="block md:text-2xl mt-4">{item.content}</span>
                  <span className="block mt-4 text-2xl font-semibold">
                    {item.name}
                  </span>
                  <div className="flex space-x-0.5 mt-3 text-[#fbbf24] justify-center">
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
