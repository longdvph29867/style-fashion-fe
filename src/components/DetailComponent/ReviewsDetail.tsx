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
      const API = `/reviews?productId=${product?.id}&limit=${
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
      <h2 className="text-3xl font-semibold mb-3">Đánh giá sản phẩm</h2>
      <div className="flex gap-2 items-baseline">
        <div className="text-3xl">
          <span className="mr-1.5 text-[#fadb14] font-semibold">
            {product?.finalScoreReview}
          </span>
          <Rate className="text-2xl" disabled defaultValue={1} count={1} />
        </div>
        <span className="text-base font-normal italic">
          {" "}
          - {totalReview} Đánh giá
        </span>
      </div>
      <div className="my-4 ml-6">
        <div>
          <Rate className="text-xl" disabled defaultValue={5} count={5} />
          <span className="ml-3">{product?.starCount[1]}</span>
        </div>
        <div>
          <Rate className="text-xl" disabled defaultValue={4} count={5} />
          <span className="ml-3">{product?.starCount[2]}</span>
        </div>
        <div>
          <Rate className="text-xl" disabled defaultValue={3} count={5} />
          <span className="ml-3">{product?.starCount[3]}</span>
        </div>
        <div>
          <Rate className="text-xl" disabled defaultValue={2} count={5} />
          <span className="ml-3">{product?.starCount[4]}</span>
        </div>
        <div>
          <Rate className="text-xl" disabled defaultValue={1} count={5} />
          <span className="ml-3">{product?.starCount[5]}</span>
        </div>
      </div>
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
