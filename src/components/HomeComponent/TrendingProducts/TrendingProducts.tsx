import { useEffect, useState } from "react";
import CategoryNavigation from "./CategoryNavigation/CategoryNavigation";
import Filter from "./Filter/Filter";
import { https } from "../../../config/axios";
import { showSpinner, hiddenSpinner } from "../../../util/spinner";
import ProductCard from "../../ProductCard/ProductCard";

type Props = {};

const TrendingProducts = (props: Props) => {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const fetchData = async () => {
    try {
      showSpinner();
      const { data } = await https.get("/products?limit=8");
      hiddenSpinner();
      setProductsList(data.results);
    } catch (error) {
      hiddenSpinner();
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="relative my-14 md:my-20">
      <div className="relative flex flex-col justify-between mb-4 sm:flex-row sm:items-end md:mb-6 text-[#222]">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold md:text-4xl">
            Xu hướng hiện nay
          </h2>
          <span className="block mt-2 text-base font-normal md:mt-4 sm:text-lg text-[#6a6a6a]">
            Khám phá các sản phẩm thịnh hành nhất ở Style Fashion.
          </span>
        </div>
      </div>
      <CategoryNavigation />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 xl:gap-8 md:mt-6 mt-4">
        {productsList?.map((product, index) => {
          return <ProductCard product={product} key={index} />;
        })}
      </div>
    </div>
  );
};

export default TrendingProducts;
