import { useEffect, useState } from "react";
import { hiddenSpinner, showSpinner } from "../../util/util";
import { https } from "../../config/axios";
import { IProduct } from "../../types/productType";
import moment from "moment";
import { Image, Pagination, Rate } from "antd";

type ReviewDetailProps = {
  product: IProduct | null;
};

const LIMIT = 10;

const ReviewsDetail = ({ product }: ReviewDetailProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [totalReview, setTotalReview] = useState(0);
  const [pageReview, setPageReview] = useState<number>(1);
  const fetchReviews = async () => {
    try {
      showSpinner();
      const API = `/reviews?productId=${product?.id}&limit=${LIMIT}&page=${pageReview}`;
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
  }, [product, pageReview]);

  const onChangePage = (page: number) => {
    setPageReview(page);
  };

  return (
    <>
      <h2 className="text-3xl font-semibold mb-3">Đánh giá sản phẩm</h2>
      <div className="my-4 ml-6 flex gap-3">
        <div className="flex gap-2 items-baseline mr-5">
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
        <div className="py-2 px-4 border border-[#ffbace] rounded-md ">
          <span>5 Sao ({product?.starCount[5]})</span>
        </div>
        <div className="py-2 px-4 border border-[#ffbace] rounded-md ">
          <span>4 Sao ({product?.starCount[4]})</span>
        </div>
        <div className="py-2 px-4 border border-[#ffbace] rounded-md ">
          <span>3 Sao ({product?.starCount[3]})</span>
        </div>
        <div className="py-2 px-4 border border-[#ffbace] rounded-md ">
          <span>2 Sao ({product?.starCount[2]})</span>
        </div>
        <div className="py-2 px-4 border border-[#ffbace] rounded-md ">
          <span>1 Sao ({product?.starCount[1]})</span>
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
                <div className="mt-2 prose-sm prose sm:prose dark:prose-invert sm:max-w-2xl">
                  <p className="text-slate-600">{item.content}</p>
                  <div className="mt-2">
                    {item.video && (
                      <Image
                        width={50}
                        preview={{
                          destroyOnClose: true,
                          imageRender: () => (
                            <video
                              muted
                              width="60%"
                              controls
                              autoPlay
                              src={item.video}
                            />
                          ),
                          toolbarRender: () => null,
                        }}
                        src="https://m.media-amazon.com/images/I/317JnWlo4kL.png"
                      />
                    )}
                    <Image.PreviewGroup items={item.images}>
                      {item.images.map((img) => (
                        <Image width={50} height={50} src={img} />
                      ))}
                    </Image.PreviewGroup>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        className="mt-6 text-center"
        onChange={onChangePage}
        current={pageReview}
        total={totalReview}
        pageSize={LIMIT}
      />
    </>
  );
};

export default ReviewsDetail;
