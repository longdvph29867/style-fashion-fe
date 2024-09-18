type Props = {
  product: any;
};

const PrimaryProductCard = ({ product }: Props) => {
  const { name, thumbnail, rating, gallery } = product;
  return (
    <div>
      <div className="relative overflow-hidden bg-neutral-100 rounded-2xl pb-[100%]">
        <img
          className="object-contain w-full h-full rounded-2xl absolute top-0 left-0"
          src={thumbnail}
          alt="img product"
        />
      </div>
      <div className="grid grid-cols-3 gap-2.5 mt-2.5">
        {gallery?.slice(0, 3).map((item: any, index: any) => (
          <div key={index} className="relative pb-[100%]">
            <img
              className="object-cover w-full h-full rounded-2xl absolute left-0 top-0"
              src={item}
              alt="img product"
            />
          </div>
        ))}
      </div>
      <div className="relative flex justify-between mt-5">
        <div className="flex-1">
          <h2 className="text-lg font-semibold sm:text-xl my-line-2 text-title">
            {name}
          </h2>
          <div className="flex items-center mt-3 text-content">
            <span className="text-sm">
              <span className="line-clamp-1">Orange</span>
            </span>
            <span className="h-5 mx-1 border-l sm:mx-2 border-slate-200"></span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="w-4 h-4 text-[#fbbf24]"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="ml-1 text-sm">
              <span className="line-clamp-1">{rating} (269 reviews)</span>
            </span>
          </div>
        </div>
        <div className="mt-0.5 sm:mt-1 ml-4">
          <div className="flex items-center border-2 border-primary rounded-lg py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium">
            <span className="text-primary !leading-none">$52</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrimaryProductCard;
