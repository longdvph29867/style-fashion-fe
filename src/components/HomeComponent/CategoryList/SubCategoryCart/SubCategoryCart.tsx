type CategoryProps = {
  category: {
    name: string;
    productCount: number;
    thumbnail: string;
  };
};

const SubCategoryCart: React.FC<CategoryProps> = ({ category }) => {
  const { name, productCount, thumbnail } = category;
  const defaultImageUrl =
    "https://ciseco-nextjs.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fexplore6.ab5c1b32.png&w=256&q=75"; // Đường dẫn đến hình ảnh mặc định của bạn

  return (
    <div className="p-10 relative w-full rounded-3xl overflow-hidden bg-white hover:shadow-xl shadow-md duration-200">
      <div className="flex items-center justify-between">
        <div className="z-0 w-24 h-24 overflow-hidden rounded-full bg-indigo-50">
          <img
            className="object-cover w-full h-full"
            // src={thumbnail || defaultImageUrl}
            src={defaultImageUrl}
            alt={name}
          />
        </div>
        <div className="text-xs font-medium text-content">
          {productCount} sản phẩm
        </div>
      </div>
      <div className="pt-10">
        <div className="">
          <span className="block mb-2 text-sm text-content">
            Manufacturar
          </span>
          <h2 className="text-2xl font-semibold sm:text-3xl my-line-1 text-title">
            {name}
          </h2>
          <a
            href="/collection"
            className="flex items-center pt-6 text-sm font-medium transition-colors text-primary"
          >
            <span>Xem ngay</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              className="w-4 h-4 ml-2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              ></path>
            </svg>
          </a>
        </div>
        <div>{/* <img width="100" height="376" src="" alt="" /> */}</div>
      </div>
    </div>
  );
};

export default SubCategoryCart;
