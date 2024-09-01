import { useEffect, useState } from "react";
import { hiddenSpinner, showSpinner } from "../../util/util";
import { https } from "../../config/axios";
import { IProduct } from "../../types/productType";
import moment from "moment";
import { Image, Rate } from "antd";

type ReviewDetailProps = {
  product: IProduct | null;
};

const ReviewsDetail = ({ product }: ReviewDetailProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [totalReview, setTotalReview] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState<boolean>(false);
  const fetchReviews = async () => {
    try {
      showSpinner();
      const API = `/reviews/v2?productId=${product?.id}&limit=${
        totalReview ?? 10
      }`;
      const { data } = await https.get(API);

      hiddenSpinner();
      setReviews(data.results);
      setTotalReview(data.totalResults);
    } catch (error) {
      hiddenSpinner();
      console.log(error);
    }
  };
  useEffect(() => {
    if (product) {
      fetchReviews();
    }
  }, [product]);

  return (
    <>
      <h2 className="flex items-center text-2xl font-semibold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="w-7 h-7 mb-0.5"
        >
          <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" />
        </svg>
        <span className="ml-1.5">
          {product?.finalScoreReview} - {totalReview} Đánh giá
        </span>
      </h2>
      <div className="grid grid-cols-1 mt-10 md:grid-cols-2 gap-y-11 gap-x-28">
        {reviews?.map((item, index) => (
          <div key={index} className="flex flex-col">
            <div className="flex space-x-4 ">
              <div className="pt-0.5">
                <div className="relative inline-flex items-center justify-center w-10 h-10 text-lg font-semibold uppercase rounded-full shadow-inner text-neutral-100 ring-1 ring-white dark:ring-neutral-900">
                  <img
                    className="absolute inset-0 object-cover w-full h-full rounded-full"
                    sizes="100px"
                    src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                    style={{
                      height: "100%",
                      width: "100%",
                      color: "transparent",
                    }}
                  />

                  <span className="wil-avatar__name">C</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between ">
                  <div className="text-sm sm:text-base">
                    <span className="block font-semibold">{item.name}</span>
                    <span className="block mt-0.5 text-slate-500 dark:text-slate-400 text-sm">
                      {moment(item.created).format("HH:MM DD-MM-YYYY")}
                    </span>
                  </div>
                  <div className="mt-0.5 flex text-yellow-500">
                    <Rate disabled defaultValue={item.score} />
                  </div>
                </div>
                <div className="mt-4 prose-sm prose sm:prose dark:prose-invert sm:max-w-2xl">
                  <p className="text-slate-600">{item.content}</p>
                  <Image.PreviewGroup items={item.images}>
                    {item.images.map((img) => (
                      <Image width={50} height={50} src={img} />
                    ))}
                  </Image.PreviewGroup>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {totalReview >= 10 && (
        <button
          onClick={() => setShowAllReviews(true)}
          className="mb-16 nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6  ttnc-ButtonSecondary bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 mt-10 border border-slate-300 dark:border-slate-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0"
        >
          Show me all reviews
        </button>
      )}
    </>
  );
};

export default ReviewsDetail;
