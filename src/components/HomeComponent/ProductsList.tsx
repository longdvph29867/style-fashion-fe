import { useEffect, useState } from "react";
import ItemProduct from "../DetailComponent/ItemProduct";
import { hiddenSpinner, showSpinner } from "../../util/util";
import { https } from "../../config/axios";
type Props = {
  gender?: string;
};

const ProductsList: React.FC<Props> = ({ gender }) => {
  const [productsList, setProductsList] = useState<Product[]>([]);

  const fetchData = async () => {
    try {
      showSpinner();
      const API = `/products`;
      const { data } = await https.get(API);
      console.log(data.results);
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
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div className="">
        <div className="container mx-auto">
          <h2 className="mb-12 text-3xl font-semibold md:text-4xl">
            {!gender
              ? "Sản phẩm mới"
              : gender === "male"
              ? "Dành cho nam"
              : "Dành cho nữ"}
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 xl:gap-20">
            {productsList?.map((product, index) => {
              return <ItemProduct product={product} key={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
