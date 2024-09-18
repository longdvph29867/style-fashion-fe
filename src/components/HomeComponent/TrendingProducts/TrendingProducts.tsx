// import CategoryNavigation from "./CategoryNavigation/CategoryNavigation";
import { https } from "../../../config/axios";
import ProductCard from "../../ProductCard/ProductCard";
import { Product } from "../../../types/products";
import { useQuery } from "@tanstack/react-query";

const TrendingProducts = () => {
  const { data } = useQuery<Product[]>({
    queryKey: ["product-trending"],
    queryFn: () => {
      return https
        .get("/products?sortBy=finalScoreReview:asc&limit=8")
        .then((response) => response.data.results);
    },
  });
  return (
    <div className="relative my-14 md:my-20">
      <div className="relative flex flex-col justify-between mb-4 sm:flex-row sm:items-end md:mb-6 text-title">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold md:text-4xl">
            Xu hướng hiện nay
          </h2>
          <span className="block mt-2 text-base font-normal md:mt-4 sm:text-lg text-content">
            Khám phá các sản phẩm thịnh hành nhất ở Style Fashion.
          </span>
        </div>
      </div>
      {/* <CategoryNavigation /> */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 xl:gap-8 md:mt-6 mt-4">
        {data?.map((product, index) => {
          return <ProductCard product={product} key={index} />;
        })}
      </div>
    </div>
  );
};

export default TrendingProducts;
