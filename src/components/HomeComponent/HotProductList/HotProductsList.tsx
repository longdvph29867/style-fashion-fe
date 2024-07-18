import { useEffect, useState } from "react";
import { hiddenSpinner, showSpinner } from "../../../util/util";
import { https } from "../../../config/axios";
import ProductCard from "../../ProductCard/ProductCard";
import Title from "../../Title/Title";
import Line from "../../Line/Line";

const HotProductList = () => {
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
    <div className="relative my-10 md:my-20 space-y-6 md:space-y-10">
      <Title title="Sản phẩm hot" content="Đừng bỏ lỡ các ưu đãi đặc biệt" />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 xl:gap-12">
        {productsList?.map((product, index) => {
          return <ProductCard product={product} key={index} />;
        })}
      </div>
      {/* <Line /> */}
    </div>
  );
};
export default HotProductList;
