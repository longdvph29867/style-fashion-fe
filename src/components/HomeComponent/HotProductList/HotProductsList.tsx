import { hiddenSpinner, showSpinner } from "../../../util/util";
import { https } from "../../../config/axios";
import ProductCard from "../../ProductCard/ProductCard";
import Title from "../../Title/Title";
import { Product } from "../../../types/products";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
// import Line from "../../Line/Line";

const HotProductList = () => {
  const { data, isLoading } = useQuery<Product[]>({
    queryKey: ["product-hot"],
    queryFn: () => {
      return https
        .get("/products?limit=8")
        .then((response) => response.data.results);
    },
    staleTime:180000
  });

  useEffect(() => {
    if (isLoading) {
      showSpinner();
    } else {
      hiddenSpinner();
    }
  });

  return (
    <div className="relative my-10 md:my-20 space-y-6 md:space-y-10">
      <Title title="Sản phẩm hot" content="Đừng bỏ lỡ các ưu đãi đặc biệt" />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 xl:gap-12">
        {data?.map((product, index) => {
          return <ProductCard product={product} key={index} />;
        })}
      </div>
      {/* <Line /> */}
    </div>
  );
};

export default HotProductList;
